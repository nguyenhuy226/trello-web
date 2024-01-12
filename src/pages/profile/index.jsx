import React from "react";
import { useAsync } from "../../hooks/useAsync";
import { userService } from "../../services/user";
import { useForm } from "../../hooks/useForm";
import { useAuth } from "../../components/AuthContext";
import { regexp, required } from "../../utils/Validate";
import Field from "../../components/Field";
import Button from "../../components/Button";
import { message } from "antd";
import { handlError } from "../../utils/hanldeError";

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const { loading, excute: upadateInfoService } = useAsync(
    userService.updateInfo
  );
  const { register, values, validate } = useForm(
    {
      name: [required()],
      phone: [required(), regexp("phone")],
      fb: [regexp("url"), required()],
    },
    user
  );

  const onSubmit = async () => {
    try {
      if (validate) {
        const res = await upadateInfoService(values);
        console.log(res);
        setUser(res.data);
        message.success("Bạn đã cập nhật thông tin tài khoản thành công!");
      }
    } catch (err) {
      handlError(err);
    }
  };
  return (
    <div className="tab1">
      <Field
        {...register("name")}
        placeholder="Nguyễn Văn A"
        label="Họ và tên"
        required
      />
      <Field
        {...register("phone")}
        placeholder="0949******"
        label="Số điện thoại"
        required
      />
      <Field {...register("username")} disabled label="Email" />
      <Field
        {...register("fb")}
        placeholder="Facebook url"
        label="Facebook"
        required
      />
      {/* <label>
          <p />
          <div className="checkcontainer">
            Thay đổi mật khẩu */}
      {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
      {/* Cần ít nhất 200 COIN để giảm giá */}
      {/* <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </div>
      </label>
      <label>
        <p>
          Mật khẩu cũ<span>*</span>
        </p>
        <input type="password" placeholder="Mật khẩu cũ" />
      </label>
      <label>
        <p>
          Mật khẩu mới<span>*</span>
        </p>
        <input type="password" placeholder="Mật khẩu mới" />
      </label>
      <label>
        <p>
          Xác nhận<span>*</span>
        </p>
        <input type="password" placeholder="Xác nhận mật khẩu" />
      </label> */}
      <Button loading={loading} onClick={onSubmit}>
        LƯU LẠI
      </Button>
    </div>
  );
}
