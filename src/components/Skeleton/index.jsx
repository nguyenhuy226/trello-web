import React from "react";
import { SkeletonStyle } from "./style";

export default function Skeleton({ width, height, children }) {
  return <SkeletonStyle style={{ width, height }}>{children}</SkeletonStyle>;
}
