import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useAsync } from "../hooks/useAsync";
import { userService } from "../services/user";
import { confirm, regexp, required } from "../utils/Validate";
import Input from "../components/Input";
import Button from "../components/Button";
import { handlError } from "../utils/hanldeError";
import { useSearchParams } from "react-router-dom";
import { message } from "antd";
import { useAuth } from "../components/AuthContext";
import { setToken } from "../utils/token";

export default function ResetPasswordPage() {
  const [search] = useSearchParams();
  const { getProfile } = useAuth();
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    excute: sendEmailResetPasswwordService,
    loading: sendEmailResetPasswordLoading,
  } = useAsync(userService.sendEmailResetPassword);
  const {
    excute: resetPasswordByCodeService,
    loading: resetPasswordByCodeLoading,
  } = useAsync(userService.resetPasswordByCode);
  const code = search.get("code");

  const resetPasswordFrom = useForm({
    password: [required()],
    confirmPassword: [required(), confirm("password")],
  });
  const sendEmailForm = useForm({
    username: [required(), regexp("email")],
  });

  const onSendEmail = async () => {
    try {
      if (sendEmailForm.validate()) {
        const res = await sendEmailResetPasswwordService(sendEmailForm.values);
        message.success(res.message);
        setIsSuccess(true);
      }
    } catch (error) {
      handlError(error);
    }
  };
  const onResetPassword = async () => {
    try {
      if (resetPasswordFrom.validate()) {
        const res = await resetPasswordByCodeService({
          password: resetPasswordFrom.values.password,
          code,
        });
        setToken(res.data);
        getProfile();
      }
    } catch (error) {
      handlError(error);
    }
  };

  return (
    <main id="main">
      <div className="auth">
        {code ? (
          <div className="wrap">
            <h2 className="title">Đặt lại mật khẩu</h2>
            <Input
              type="password"
              {...resetPasswordFrom.register("password")}
              placeholder="Nhập mật khẩu"
            />
            <Input
              type="password"
              {...resetPasswordFrom.register("confirmPassword")}
              placeholder="Nhập lại mật khẩu"
            />
            <Button
              onClick={onResetPassword}
              loading={resetPasswordByCodeLoading}
            >
              Đặt lại mật khẩu
            </Button>
          </div>
        ) : isSuccess ? (
          <div
            style={{ textAlign: "center", paddingTop: 60, paddingBottom: 60 }}
          >
            <h1 style={{ paddingBottom: 20, fontWeight: 600, fontSize: 22 }}>
              Gửi Email lấy lại mật khẩu thành công!
            </h1>
            <p>
              Chúng tôi đã gửi cho bạn email lấy lại mật khẩu, xin vui lòng kiểm
              tra email
            </p>
          </div>
        ) : (
          <div className="wrap">
            <h2 className="title">Đặt lại mật khẩu</h2>
            <Input
              placeholder="Nhập email"
              {...sendEmailForm.register("username")}
            />
            <Button
              onClick={onSendEmail}
              loading={sendEmailResetPasswordLoading}
            >
              Đặt lại mật khẩu
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
