import React, { useEffect, useState } from "react";
import { regexp, required } from "../../utils/validate";
import Field from "../../components/Field";
import { useForm } from "../../hooks/useForm";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { courseServer } from "../../services/course";
import { useFetch } from "../../hooks/useFetch";
import Skeleton from "../../components/Skeleton";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import { Select } from "../../components/Select";
import { Checkbox } from "../../components/Checkbox";
import { useAuth } from "../../components/AuthContext";
import { message } from "antd";
import { PATH } from "../../config/path";
import { useAsync } from "../../hooks/useAsync";
import Button from "../../components/Button";
import { handlError } from "../../utils/hanldeError";

export default function RegisterPage() {
  const { slugId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const id = slugId.split("-").pop();
  const { excute: courseRegisterService, loading: registerLoading } = useAsync(
    courseServer.register
  );
  useScrollToTop(id);
  useEffect(() => {
    if (!user) {
      message.warning("Vui lòng đăng nhập trước khi đăng ký khóa học");
      navigate(PATH.signin, { state: { redirect: pathname } });
    }
  });

  const { data, loading } = useFetch(() => courseServer.getCourseDetail(id));
  const { register, validate, values } = useForm(
    {
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
      payment: [required("Xin vui lòng chọn hình thức thanh toán")],
      // COIN: [required()],
    },
    {
      email: user?.username,
      name: user?.name,
      fb: user?.fb,
      phone: user?.phone,
    }
  );
  const [isSuccess, setIsSuccess] = useState(false);
  const onSubmit = async () => {
    try {
      if (validate()) {
        await courseRegisterService(id, values);
        setIsSuccess(true);
      } else {
        console.log("validate thất bại");
      }
    } catch (error) {
      handlError(error);
    }
  };

  if (loading)
    return (
      <section className="register-course">
        <div className="container">
          <div className="wrap container">
            <div className="main-sub-title">ĐĂNG KÝ</div>
            <h1 className="main-title">
              <Skeleton height={60} />
            </h1>
            <div className="main-info">
              <div className="date">
                <strong>Khai giảng:</strong>{" "}
                <Skeleton width={100} height={26} />
              </div>
              <div className="time">
                <strong>Thời lượng:</strong>{" "}
                <Skeleton width={100} height={26} />
              </div>
              <div className="time">
                <strong>Học phí:</strong>
                <Skeleton width={100} height={26} />
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
                  <Select
                    placeholder="Hình thức thanh toán"
                    options={[
                      {
                        value: "chuyen-khoan",
                        label: "chuyển khoản",
                      },
                      {
                        value: "thanh-toan-tien-mat",
                        label: "thanh toán tiền mặt",
                      },
                    ]}
                    {...props}
                  />
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
    );
  let { data: detail } = data;
  if (!detail) return <div style={{ margin: "100px 0" }}>...Not Found... </div>;

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
          <Link to={PATH.profile.course} className="btn main rect">
            về trang khóa học của tôi
          </Link>
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
                  disabled
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
                    <Checkbox {...props}>
                      Hiện có <strong>300 COIN</strong>
                    </Checkbox>
                  )}
                />
                <Field
                  {...register("payment")}
                  label="Hình thức thanh toán"
                  renderInput={(props) => (
                    <Select
                      placeholder="Hình thức thanh toán"
                      options={[
                        {
                          value: "chuyen-khoan",
                          label: "chuyển khoản",
                        },
                        {
                          value: "thanh-toan-tien-mat",
                          label: "thanh toán tiền mặt",
                        },
                      ]}
                      {...props}
                    />
                  )}
                />
                <Field
                  placeholder="Mong muốn cá nhân và lịch bạn có thể học."
                  label="Ý kiến cá nhân"
                  {...register("note")}
                />
                <Button loading={registerLoading} onClick={onSubmit}>
                  đăng ký
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
