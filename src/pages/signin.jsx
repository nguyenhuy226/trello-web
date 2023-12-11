import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { regexp, required } from "../utils/Validate";
import Field from "../components/Field";

export default function SignInPage({ login }) {
  const navigate = useNavigate();
  const { register, validate, values, errors } = useForm({
    username: [required(), regexp("email", "Nhập đúng định dạng email")],
    password: [required()],
  });
  const onSubmit = (ev) => {
    ev.preventDefault();
    if (validate()) {
      login();
      navigate(PATH.profile.index);
    }
  };
  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          {/* login-form */}
          <form className="ct_login" onSubmit={onSubmit}>
            <h2 className="title">Đăng nhập</h2>
            <input
              label="Email / số điện thoại"
              placeholder="Nhập Email hoặc số điện thoại"
              {...register("username")}
            />
            {errors.username && (
              <p style={{ color: "red" }}>{errors.username}</p>
            )}
            <input
              label="password"
              placeholder="Nhập password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p style={{ color: "red" }}>{errors.password}</p>
            )}
            {/* <input type="text" placeholder="Email / Số điện thoại" />
            <input type="password" placeholder="Mật khẩu" /> */}
            <div className="remember">
              <label className="btn-remember">
                <div>
                  <input type="checkbox" />
                </div>
                <p>Nhớ mật khẩu</p>
              </label>
              <Link to={PATH.resetPassword} className="forget">
                Quên mật khẩu?
              </Link>
            </div>
            <button className="btn rect main btn-login">đăng nhập</button>
            <div className="text-register">
              <span>Nếu bạn chưa có tài khoản?</span>{" "}
              <Link className="link" to={PATH.signup}>
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
