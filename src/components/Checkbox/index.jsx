import React from "react";
import { ErrorText } from "../Input/style.";

export const Checkbox = ({ value, error, children, onChange }) => {
  const _onChange = (ev) => {
    onChange({ target: { value: ev.target.checked } });
  };
  return (
    <>
      <div className="checkcontainer">
        {children}
        {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
        {/* Cần ít nhất 200 COIN để giảm giá */}
        <input type="checkbox" checked={value} onChange={_onChange} />
        <span className="checkmark" />
      </div>
      {error && <ErrorText>{error}</ErrorText>}
    </>
  );
};
