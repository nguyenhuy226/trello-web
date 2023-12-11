import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function AuthRouter({ user, redirect = "/" }) {
  if (user) return <Navigate to={redirect} />;
  return <Outlet />;
}
