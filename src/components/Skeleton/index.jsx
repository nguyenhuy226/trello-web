import React from "react";
import { SkeletonStyle } from "./style";

export default function Skeleton({
  shap = "rectangle",
  width,
  height,
  children,
}) {
  return (
    <SkeletonStyle className={shap} style={{ width, height }}>
      {children}
    </SkeletonStyle>
  );
}
