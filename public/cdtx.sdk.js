/**
 * CDT-X Behavioral Ingestion SDK
 * (c) 2026 CDT-X Enterprise integrity platform
 */
(function () {
  // Auto-detect the telemetry endpoint from the script location
  const currentScript = document.currentScript;
  const defaultServer = currentScript ? new URL(currentScript.src).origin : window.location.origin;

  let trackingActive = false;
  let candidateId = "USR_DEFAULT";
  let serverEndpoint = defaultServer;
  let eventBuffer = [];
  let flushTimer = null;
  let lastMouseMoveTime = 0;

  // Throttled mouse movements to prevent network bloat
  const MOUSE_THROTTLE_MS = 100;

  function recordEvent(type, payload) {
    if (!trackingActive) return;
    eventBuffer.push({
      event_type: type,
      timestamp: Date.now(),
      payload: payload || {}
    });
  }

  // Event Listeners
  const listeners = {
    keydown: function (e) {
      recordEvent("KEYSTROKE", {
        key: e.key,
        action: "keydown",
        modifiers: [
          e.ctrlKey && "ctrl",
          e.altKey && "alt",
          e.shiftKey && "shift",
          e.metaKey && "meta"
        ].filter(Boolean)
      });
    },
    keyup: function (e) {
      recordEvent("KEYSTROKE", {
        key: e.key,
        action: "keyup"
      });
    },
    mousemove: function (e) {
      const now = Date.now();
      if (now - lastMouseMoveTime > MOUSE_THROTTLE_MS) {
        lastMouseMoveTime = now;
        recordEvent("MOUSE_MOVE", {
          x: e.clientX,
          y: e.clientY,
          viewport_w: window.innerWidth,
          viewport_h: window.innerHeight
        });
      }
    },
    mousedown: function (e) {
      recordEvent("MOUSE_CLICK", {
        x: e.clientX,
        y: e.clientY,
        button: e.button
      });
    },
    focus: function () {
      recordEvent("FOCUS_CHANGE", { state: "focus" });
    },
    blur: function () {
      recordEvent("FOCUS_CHANGE", { state: "blur" });
    },
    paste: function (e) {
      let pastedLength = 0;
      try {
        pastedLength = (e.clipboardData || window.clipboardData).getData("text").length;
      } catch (err) {}
      recordEvent("CLIPBOARD", {
        action: "paste",
        length: pastedLength
      });
    }
  };

  function setupListeners() {
    window.addEventListener("keydown", listeners.keydown, true);
    window.addEventListener("keyup", listeners.keyup, true);
    window.addEventListener("mousemove", listeners.mousemove, true);
    window.addEventListener("mousedown", listeners.mousedown, true);
    window.addEventListener("focus", listeners.focus, true);
    window.addEventListener("blur", listeners.blur, true);
    window.addEventListener("paste", listeners.paste, true);
  }

  function removeListeners() {
    window.removeEventListener("keydown", listeners.keydown, true);
    window.removeEventListener("keyup", listeners.keyup, true);
    window.removeEventListener("mousemove", listeners.mousemove, true);
    window.removeEventListener("mousedown", listeners.mousedown, true);
    window.removeEventListener("focus", listeners.focus, true);
    window.removeEventListener("blur", listeners.blur, true);
    window.removeEventListener("paste", listeners.paste, true);
  }

  function flushEvents() {
    if (eventBuffer.length === 0) return;

    const packetsToSend = [...eventBuffer];
    eventBuffer = [];

    // Send packets one-by-one or in batch
    packetsToSend.forEach((pkt) => {
      fetch(`${serverEndpoint}/api/behavior/event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          candidate_id: candidateId,
          event_type: pkt.event_type,
          payload: pkt.payload,
          timestamp: pkt.timestamp
        }),
        mode: "cors"
      }).catch((err) => {
        // Silent catch for network drops
        console.warn("[CDT-X SDK] Ingestion failure:", err);
      });
    });
  }

  // Public Interface
  window.CDTX = {
    init: function (config = {}) {
      if (config.candidateId) candidateId = config.candidateId;
      if (config.serverUrl) serverEndpoint = config.serverUrl;
      
      console.log(`[CDT-X SDK] Initialized for ${candidateId}. Server: ${serverEndpoint}`);
      
      if (config.autoStart !== false) {
        this.start();
      }
    },
    
    start: function () {
      if (trackingActive) return;
      trackingActive = true;
      setupListeners();
      flushTimer = setInterval(flushEvents, 2000);
      recordEvent("SESSION_START", { agent: "cdtx-browser-sdk" });
      console.log("[CDT-X SDK] Behavioral tracking active.");
    },

    stop: function () {
      if (!trackingActive) return;
      trackingActive = false;
      removeListeners();
      clearInterval(flushTimer);
      recordEvent("SESSION_END", { agent: "cdtx-browser-sdk" });
      flushEvents();
      console.log("[CDT-X SDK] Behavioral tracking stopped.");
    },

    setCandidate: function (id) {
      if (!id) return;
      candidateId = id;
      console.log(`[CDT-X SDK] Active candidate identity updated to: ${id}`);
    }
  };

  // Auto-init if data attributes are present on script tag
  if (currentScript) {
    const autoCid = currentScript.getAttribute("data-candidate-id");
    if (autoCid) {
      window.CDTX.init({ candidateId: autoCid });
    }
  }
})();
