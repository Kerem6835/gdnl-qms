;(function (global) {
  "use strict";

  const defaults = Object.freeze({
    drawerId: "mobileDrawer",
    overlayId: "mobileOverlay",
    activeClass: "active",
    lockBody: true
  });

  function getElement(id) {
    return typeof id === "string" ? document.getElementById(id) : id;
  }

  function withConfig(options) {
    return { ...defaults, ...(options || {}) };
  }

  function open(options) {
    const config = withConfig(options);
    const drawer = getElement(config.drawerId);
    const overlay = getElement(config.overlayId);
    if (drawer) drawer.classList.add(config.activeClass);
    if (overlay) overlay.classList.add(config.activeClass);
    if (config.lockBody) document.body.style.overflow = "hidden";
  }

  function close(options) {
    const config = withConfig(options);
    const drawer = getElement(config.drawerId);
    const overlay = getElement(config.overlayId);
    if (drawer) drawer.classList.remove(config.activeClass);
    if (overlay) overlay.classList.remove(config.activeClass);
    if (config.lockBody) document.body.style.overflow = "";
  }

  function toggle(options) {
    const config = withConfig(options);
    const drawer = getElement(config.drawerId);
    if (drawer && drawer.classList.contains(config.activeClass)) {
      close(config);
    } else {
      open(config);
    }
  }

  function bind(options) {
    const config = withConfig(options);
    const overlay = getElement(config.overlayId);
    if (overlay) overlay.addEventListener("click", () => close(config));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close(config);
    });
  }

  global.GDNL_MOBILE_MENU = {
    open,
    close,
    toggle,
    bind
  };
})(window);
