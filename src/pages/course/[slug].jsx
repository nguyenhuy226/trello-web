import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { courseServer } from "../../services/course";
import { PATH } from "../../config/path";
import { useFetch } from "../../hooks/useFetch";
import CourseCard from "../../components/CourseCard";
import { useScrollToTop } from "../../hooks/useScrollToTop";
import Skeleton from "../../components/Skeleton";
import { Accordion } from "../../components/Accordion";
import moment from "moment";
import { Teacher } from "../../components/Teacher";
import Page404 from "../404";
import Modal from "../../components/Modal";

export default function CourseDetail() {
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);

  const { slugId } = useParams();
  const id = slugId.split("-").pop();
  useScrollToTop(id);
  const { data, loading } = useFetch(
    () => courseServer.getCourseDetail(id),
    [id]
  );
  const { data: related } = useFetch(() => courseServer.getRelative(id), [id]);

  if (loading) {
    return (
      <main id="main">
        <section
          className="banner style2"
          style={{ "--background": "#cde6fb" }}
        >
          <div className="container">
            <div className="info">
              <h1 style={{ display: "flex", justifyContent: "center" }}>
                <Skeleton height={64} width={500} />
              </h1>
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                  gap: 30,
                }}
              >
                <div className="date">
                  <Skeleton width={200} height={24} />
                </div>
                <div className="time">
                  <Skeleton width={200} height={24} />
                </div>
              </div>
              <Skeleton
                height={46}
                width={200}
                style={{
                  marginTop: 40,
                  position: "absolute",
                  right: "50%",
                  transform: "translateX(50%)",
                }}
              />
            </div>
          </div>
        </section>
      </main>
    );
  }
  {
    const { data: detail } = data;
    // const { openingTime } = useMemo(() => {
    //   if (detail) {
    const openingTime = moment(detail.opening_time).format("DD/MM/YYYY");
    //     return openingTime;
    //   }
    //   return {};
    // }, [detail]);
    if (!detail) return <Page404 />;
    return (
      <main id="main">
        <div className="course-detail">
          <section
            className="banner style2"
            style={{ "--background": detail.template_color_btn || "#cde6fb" }}
          >
            <div className="container">
              <div className="info">
                <h1>{detail.title}</h1>
                <div className="row">
                  <div className="date">
                    <strong>Khai giảng:</strong>
                    {openingTime}
                  </div>
                  <div className="time">
                    <strong>Thời lượng:</strong> 18 buổi
                  </div>
                </div>
                <Link
                  className="btn white round"
                  style={{
                    "--color-Btn": detail.template_color_banner || "#70b6f1",
                  }}
                  to={`/register/${detail.slug}-${detail.id}`}
                >
                  đăng ký
                </Link>
              </div>
            </div>
            <div className="bottom">
              <div className="container">
                <div
                  className="video"
                  onClick={() => setIsOpenVideoModal(true)}
                >
                  <div className="icon">
                    <img src="/img/play-icon-white.png" alt="" />
                  </div>{" "}
                  <span>giới thiệu</span>
                </div>
                <div className="money">{detail.money} VND</div>
              </div>
            </div>
            <Modal
              visbile={isOpenVideoModal}
              onCancel={() => setIsOpenVideoModal(false)}
              maskeCloseable
            >
              <iframe
                width="800"
                height="450"
                src="https://www.youtube.com/embed/PBc-OXqqDwc?si=yCGq0XztwCHDfqlR"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </Modal>
          </section>
          <section className="section-2">
            <div className="container">
              <p className="des">{detail.long_description}</p>
              <h2 className="title">giới thiệu về khóa học</h2>
              <div className="cover">
                <img src="/img/course-detail-img.png" alt="" />
              </div>
              <h3 className="title">nội dung khóa học</h3>
              <Accordion.Group>
                {detail.content.map((e, i) => (
                  <Accordion key={i} {...e} date={i + 1}>
                    {e.content}
                  </Accordion>
                ))}
              </Accordion.Group>
              <h3 className="title">yêu cầu cần có</h3>
              <div className="row row-check">
                {detail.required.map((e, i) => (
                  <div key={i} className="col-md-6">
                    {e.content}
                  </div>
                ))}
              </div>
              <h3 className="title">hình thức học</h3>
              <div className="row row-check">
                {detail.benefits.map((e, i) => (
                  <div key={i} className="col-md-6">
                    {e.content}
                  </div>
                ))}
              </div>
              <h3 className="title">
                <div className="date-start">lịch học</div>
                <div className="sub">
                  *Lịch học và thời gian có thể thống nhất lại theo số đông học
                  viên.
                </div>
              </h3>
              <p>
                <strong>Ngày bắt đầu: </strong>
                {openingTime}
                <br />
                <strong>Thời gian học: </strong> {detail.schedule}
              </p>
              <h3 className="title">Người dạy</h3>
              <div className="teachers">
                <Teacher {...detail.teacher} />
              </div>
              {detail.mentor.length > 0 && (
                <>
                  <h3 className="title">Người hướng dẫn</h3>
                  <div className="teachers">
                    {detail.mentor.map((e) => (
                      <Teacher key={e.id} {...e} />
                    ))}
                  </div>
                </>
              )}
              <div className="bottom">
                <div className="user">
                  <img src="/img/user-group-icon.png" alt="" /> 12 bạn đã đăng
                  ký
                </div>
                <Link
                  className="btn main btn-register round"
                  to={`/register/${detail.slug}-${detail.id}`}
                >
                  đăng ký
                </Link>
                <div className="btn-share btn overlay round btn-icon">
                  <img src="/img/facebook.svg" alt="" />
                </div>
              </div>
            </div>
          </section>
          <section className="section-4">
            <div className="container">
              <div className="textbox">
                <h3 className="sub-title">Khóa học</h3>
                <h2 className="main-title">Liên quan</h2>
              </div>
              <div className="list row">
                {related &&
                  related?.data.map((e) => <CourseCard key={e.id} {...e} />)}
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }
}
