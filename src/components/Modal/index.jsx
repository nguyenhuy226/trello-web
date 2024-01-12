import React from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, maskeCloseable, visbile, onCancel }) {
  const onMaskeCLick = () => {
    if (maskeCloseable) onCancel?.();
  };

  if (!visbile) return null;
  return createPortal(
    <div className="popup-video" onClick={onMaskeCLick}>
      <div className="wrap">{children}</div>
      <div className="close" onClick={onCancel} />
    </div>,
    document.body
  );
}
