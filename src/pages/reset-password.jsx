import React from "react";
import { Navigate } from "react-router-dom";
import { PATH } from "../config/path";

export default function ResetPasswordPage({ user }) {
  if (user) return <Navigate to={PATH.profile.index} />;

  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          <h2 className="title">Đặt lại mật khẩu</h2>
          <input type="text" placeholder="Email" />
          <button className="btn rect main">Đặt lại mật khẩu</button>
        </div>
        <div className="wrap">
          <h2 className="title">Đặt lại mật khẩu</h2>
          <input type="password" placeholder="Mật khẩu " />
          <input type="password" placeholder="Nhập lại mật khẩu" />
          <button className="btn rect main">Đặt lại mật khẩu</button>
        </div>
      </div>
    </main>
  );
}
