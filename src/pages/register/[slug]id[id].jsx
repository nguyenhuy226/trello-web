import React, { useState } from "react";
import { regexp, required, validate } from "../../utils/Validate";
import Field from "../../components/Field";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";
import { courseServer } from "../../services/course";

export default function RegisterPage() {
  const { register, validate, values } = useForm({
    name: [required("Xin vui lòng nhập họ và tên")],
    email: [
      required("Xin vui lòng nhập email"),
      regexp("email", "Xin vui lòng nhập đúng địa chỉ email"),
    ],
    phone: [
      required("Xin vui lòng nhập số điện thoại"),
      regexp("phone", "Xin vui lòng nhập đúng số điện thoại"),
    ],
    fb: [
      required("Xin vui lòng nhập facebook"),
      regexp(
        /(?:https?:\/\/)?(?:www\.)?(mbasic.facebook|m\.facebook|facebook|fb)\.(com|me)\/(?:(?:\w\.)*#!\/)?(?:pages\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/,
        "Xin vui lòng nhập đúng url facbook của bạn"
      ),
    ],
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = () => {
    if (validate()) {
      console.log("validate thành công");
      setIsSuccess(true);
    } else {
      console.log("validate thất bại");
    }
  };

  const { slugId } = useParams();
  const id = slugId.split("-").pop();
  const [detail, setDetail] = useState(() => {
    return courseServer.getCourseDetail(parseInt(id));
  });

  return (
    <main id="main">
      {isSuccess ? (
        <div className="register-success" style={{ textAlign: "center" }}>
          <div className="contain">
            <div className="main-title">Đăng Ký Thành Công</div>
            <p style={{ paddingBottom: 30 }}>
              <strong>
                Chào mừng {values.name} đã trở thành thành viên mới của Spacedev
                Team.
              </strong>{" "}
              <br />
              Cảm ơn bạn đã đăng ký khóa học tại <strong>Spacedev</strong>,
              chúng tôi sẽ chủ động liên lạc với bạn thông qua facebook hoặc số
              điện thoại của bạn.
            </p>
          </div>
          <a href="/" className="btn main rect">
            về trang chủ
          </a>
        </div>
      ) : (
        <section className="register-course">
          <div className="container">
            <div className="wrap container">
              <div className="main-sub-title">ĐĂNG KÝ</div>
              <h1 className="main-title">{detail.title}</h1>
              <div className="main-info">
                <div className="date">
                  <strong>Khai giảng:</strong> 15/11/2020
                </div>
                <div className="time">
                  <strong>Thời lượng:</strong> 18 buổi
                </div>
                <div className="time">
                  <strong>Học phí:</strong>
                  {detail.money} VND
                </div>
              </div>
              <div className="form">
                <Field
                  label="Họ và tên"
                  placeholder="Họ và tên"
                  required
                  {...register("name")}
                />
                <Field
                  label="Số điện thoại"
                  placeholder="Số điện thoại"
                  {...register("phone")}
                />
                <Field
                  label="Email"
                  placeholder="Địa chỉ email"
                  required
                  {...register("email")}
                />
                <Field
                  placeholder="URL Facebook"
                  required
                  label="URL Facebook"
                  {...register("fb")}
                />
                <Field
                  label="Sử dụng COIN"
                  {...register("COIN")}
                  renderInput={(props) => (
                    <div className="checkcontainer">
                      Hiện có <strong>300 COIN</strong>
                      {/* Giảm giá còn <span><strong>5.800.000 VND</strong>, còn lại 100 COIN</span> */}
                      {/* Cần ít nhất 200 COIN để giảm giá */}
                      <input type="checkbox" {...props} />
                      <span className="checkmark" />
                    </div>
                  )}
                />
                <Field
                  label="Hình thức thanh toán"
                  renderInput={(props) => (
                    <div className="select">
                      <div className="head">Chuyển khoản</div>
                      <div className="sub">
                        <a href="#">Chuyển khoản</a>
                        <a href="#">Thanh toán tiền mặt</a>
                      </div>
                    </div>
                  )}
                  {...register("payment")}
                />
                <Field
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                  label="Ý kiến cá nhân"
                  {...register("note")}
                />
                <button onClick={onSubmit} className="btn main rect">
                  đăng ký
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
