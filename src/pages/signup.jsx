import React, { useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { userService } from "../services/user";
import Button from "../components/Button";
import { useForm } from "../hooks/useForm";
import { minMax, regexp, required, confirm } from "../utils/Validate";
import styled from "styled-components";
import { message } from "antd";
import Input from "../components/Input";
import { LoadingOutlined } from "@ant-design/icons";

export default function SignUpPage() {
  const { excute: resendEmailServervice, loading: resendEmailLoading } =
    useAsync(userService.resendEmail);
  const { excute: signup, loading } = useAsync(userService.signup);
  const [isSignupSuccess, setIsgnupSuccess] = useState(false);
  const { values, validate, register } = useForm({
    name: [required()],
    password: [required(), minMax(6, 32)],
    username: [required(), regexp("email")],
    confirmPassword: [required(), confirm("password")],
  });
  const onSubmit = async () => {
    try {
      if (validate()) {
        const res = await signup(values);
        setIsgnupSuccess(true);
        message.success(
          "Tạo tài khoản thành công, vui lòng kiểm tra email để kích hoạt"
        );
      }
      message.success("Email kích hoạt đã được gửi lại thành công ");
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message);
      }
      console.log(err);
    }
  };
  const onResendEmail = async (ev) => {
    ev.preventDefault();
    try {
      await resendEmailServervice({ username: values.username });
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message);
      }
      console.log(err);
    }
  };
  return (
    <main id="main">
      {isSignupSuccess ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <h1 style={{ fontWeight: "bold", fontSize: 20 }}>
            Đăng ký tài khoản thành công
          </h1>
          <p>
            Vui lòng kiểm tra email để kích hoạt. Nếu bạn không nhận được email,
            vui lòng bấm{" "}
            <span className="font-bold">"Gửi lại email kích hoạt"</span>bên dưới
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <a
              onClick={onResendEmail}
              href="#"
              style={{
                display: "flex",
                gap: 10,
                opacity: "50%",
                cursor: "none",
                color: "green",
                pointerEven: "none",
              }}
            >
              {resendEmailLoading && <LoadingOutlined />}
              Gửi lại email kích hoạt
            </a>
          </div>
        </div>
      ) : (
        <div className="auth">
          <div className="wrap">
            <h2 className="title">Đăng ký</h2>
            <Input {...register("username")} placeholder="Địa chỉ Email" />
            <Input {...register("name")} placeholder="Họ và tên" />
            <Input
              {...register("password")}
              type="password"
              placeholder="Mật khẩu"
            />
            <Input
              {...register("confirmPassword")}
              type="password"
              placeholder="Nhập lại mật khẩu"
            />

            <p className="policy">
              Bằng việc đăng kí, bạn đã đồng ý{" "}
              <a href="#">Điều khoản bảo mật</a> của Spacedev
            </p>
            {/* <button className="btn rect main btn-login">Đăng ký</button> */}
            <Button
              onClick={onSubmit}
              className="btn rect main btn-login"
              loading={loading}
            >
              Đăng ký
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}
