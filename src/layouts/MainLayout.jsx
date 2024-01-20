import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout(props) {
  return (
    <>
      <Header {...props} />
      <Suspense fallback={<div>Loanding page...</div>}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
}
