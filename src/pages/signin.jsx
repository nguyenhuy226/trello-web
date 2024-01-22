import React from "react";
import { Link } from "react-router-dom";
import { PATH } from "../config/path";
import { useForm } from "../hooks/useForm";
import { regexp, required } from "../utils/validate";
import { useAuth } from "../components/AuthContext";
import Input from "../components/Input";
import { useAsync } from "../hooks/useAsync";
import { message } from "antd";
import Button from "../components/Button";

export default function SignInPage() {
  const { login } = useAuth();
  const { excute: loginService, loading } = useAsync(login);
  const { register, validate, values } = useForm({
    username: [required(), regexp("email", "Nhập đúng định dạng email")],
    password: [required()],
  });
  const onSubmit = async (ev) => {
    ev.preventDefault();
    try {
      if (validate()) {
        const res = await loginService(values);
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message);
      }
      console.log(err);
    }
  };
  return (
    <main id="main">
      <div className="auth">
        <div className="wrap">
          {/* login-form */}
          <form className="ct_login" onSubmit={onSubmit}>
            <h2 className="title">Đăng nhập</h2>
            <Input
              label="Email / số điện thoại"
              placeholder="Nhập Email hoặc số điện thoại"
              {...register("username")}
            />
            <Input
              label="password"
              placeholder="Nhập password"
              type="password"
              {...register("password")}
            />
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
            <Button className="btn rect main btn-login" loading={loading}>
              đăng nhập
            </Button>
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
