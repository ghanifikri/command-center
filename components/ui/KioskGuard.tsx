"use client";

import { useEffect } from "react";

/**
 * KioskGuard enforces a completely distraction-free kiosk / touchscreen environment:
 * - Blocks context menu (right-click & long-press touch)
 * - Blocks text selection & touch callouts
 * - Blocks image & element dragging
 * - Blocks multi-touch pinch-to-zoom
 * - Blocks rapid double-tap zoom
 * - Blocks Safari/WebKit gesture zoom
 * - Blocks mouse wheel zoom (Ctrl + Wheel)
 * - Blocks browser zoom, save, print, and DevTools keyboard shortcuts
 */
export default function KioskGuard() {
  useEffect(() => {
    // 1. Block right click and touch long-press context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // 2. Block text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault();
      return false;
    };

    // 3. Block image and element drag
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 4. Block multi-touch pinch-to-zoom
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // 5. Block double-tap to zoom
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    // 6. Block Safari / WebKit gestures
    const handleGesture = (e: Event) => {
      e.preventDefault();
    };

    // 7. Block Ctrl + Mouse Wheel zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };

    // 8. Block browser keyboard shortcuts (zoom, print, save, devtools)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isCtrlOrMeta = e.ctrlKey || e.metaKey;
      const key = e.key;

      // Browser zoom shortcuts: Ctrl/Cmd + (+, -, =, 0, _)
      if (isCtrlOrMeta && ["+", "-", "=", "0", "_"].includes(key)) {
        e.preventDefault();
        return;
      }

      // Hotkeys: Ctrl+S (Save), Ctrl+P (Print), Ctrl+U (View Source)
      if (isCtrlOrMeta && ["s", "S", "p", "P", "u", "U"].includes(key)) {
        e.preventDefault();
        return;
      }

      // DevTools: F12, Ctrl+Shift+I/J/C
      if (
        key === "F12" ||
        (isCtrlOrMeta && e.shiftKey && ["I", "J", "C", "i", "j", "c"].includes(key))
      ) {
        e.preventDefault();
        return;
      }
    };

    // Register event listeners with passive: false for touch/wheel to allow preventDefault
    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("selectstart", handleSelectStart, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: false, capture: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false, capture: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false, capture: true });
    window.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    // iOS/Safari gesture events
    window.addEventListener("gesturestart" as any, handleGesture, { passive: false, capture: true });
    window.addEventListener("gesturechange" as any, handleGesture, { passive: false, capture: true });
    window.addEventListener("gestureend" as any, handleGesture, { passive: false, capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("selectstart", handleSelectStart, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
      window.removeEventListener("touchstart", handleTouchStart, { capture: true });
      window.removeEventListener("touchmove", handleTouchMove, { capture: true });
      window.removeEventListener("touchend", handleTouchEnd, { capture: true });
      window.removeEventListener("wheel", handleWheel, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("gesturestart" as any, handleGesture, { capture: true });
      window.removeEventListener("gesturechange" as any, handleGesture, { capture: true });
      window.removeEventListener("gestureend" as any, handleGesture, { capture: true });
    };
  }, []);

  return null;
}
