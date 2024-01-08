import React from "react";
import { ErrorText, InputStyle } from "./style.";
import clsx from "clsx";

export default function Input({ className, error, type = "text", ...props }) {
  return (
    <InputStyle className={clsx(className, { error })}>
      <input {...props} type={type} />
      {error && <ErrorText>{error}</ErrorText>}
    </InputStyle>
  );
}
