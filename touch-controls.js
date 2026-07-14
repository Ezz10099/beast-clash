(function () {
  "use strict";

  const canvas = document.querySelector("#game");
  if (!canvas || typeof canvas.addEventListener !== "function") return;

  const THUMB_CLEARANCE_CANVAS_Y = 84;
  const originalAddEventListener = canvas.addEventListener.bind(canvas);

  function adjustedClientY(event) {
    const bounds = canvas.getBoundingClientRect();
    const canvasHeight = Number(canvas.height) || 480;
    const scaleY = bounds.height > 0 ? bounds.height / canvasHeight : 1;
    return event.clientY - THUMB_CLEARANCE_CANVAS_Y * scaleY;
  }

  function touchAdjustedEvent(event) {
    if (!event || event.pointerType === "mouse") return event;
    const adjusted = Object.create(event);
    Object.defineProperties(adjusted, {
      clientX: { value: event.clientX, enumerable: true },
      clientY: { value: adjustedClientY(event), enumerable: true },
      pointerId: { value: event.pointerId, enumerable: true },
      pointerType: { value: event.pointerType, enumerable: true },
      preventDefault: {
        value: typeof event.preventDefault === "function" ? event.preventDefault.bind(event) : function () {},
      },
    });
    return adjusted;
  }

  canvas.addEventListener = function (type, listener, options) {
    if ((type === "pointerdown" || type === "pointermove") && typeof listener === "function") {
      return originalAddEventListener(type, function (event) {
        return listener.call(this, touchAdjustedEvent(event));
      }, options);
    }
    return originalAddEventListener(type, listener, options);
  };

  window.PixelMageTouchControls = Object.freeze({
    thumbClearanceCanvasY: THUMB_CLEARANCE_CANVAS_Y,
    adjustedClientY,
  });
})();
