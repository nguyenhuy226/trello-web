import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { courseServer } from "../../services/course";
import Skeleton from "../../components/Skeleton";
import moment from "moment";
import { Link } from "react-router-dom";

export default function MyCourse() {
  const { loading, data: courses } = useFetch(courseServer.getMyCourse);
  if (loading)
    return (
      <div className="tab2">
        {Array.from(Array(3)).map((_, i) => (
          <div className="item" key={i}>
            <div className="cover">
              {/* <img src="/img/img3.png" alt="" /> */}
              <Skeleton height={250} />
            </div>
            <div className="info">
              {/* <a href="#" className="name">
                Reactjs Advanced
              </a> */}
              <Skeleton height={31} />
              {/* <div className="date">Khai giảng ngày 09/09/2019</div> */}
              <Skeleton height={26} width={200} />

              <div className="row">
                <div>
                  <img src="/img/clock.svg" alt="" className="icon" />
                  {/* 54 giờ */}
                  <Skeleton height={26} width={50} />
                </div>
                <div>
                  <img src="/img/play.svg" alt="" className="icon" />
                  {/* 25 video */}
                  <Skeleton height={26} width={50} />
                </div>
                <div>
                  <img src="/img/user.svg" alt="" className="icon" />
                  {/* 20 học viên */}
                  <Skeleton height={26} width={50} />
                </div>
              </div>
              <div className="process">
                {/* <div className="line">
                  <div className="rate" style={{ width: "30%" }} />
                </div>
                30% */}
                <Skeleton height={26} />
              </div>
              <div className="btn overlay round btn-continue">Tiếp tục học</div>
            </div>
          </div>
        ))}
        ;
      </div>
    );
  return (
    <div className="tab2">
      {courses.data.length === 0 && (
        <p>
          Hiện tại bạn chưa đăng ký khóa học nào. Vui lòng đăng ký khóa học rồi
          quay lại
        </p>
      )}
      {courses.data.map((e) => (
        <div className="item" key={e.course.id}>
          <div className="cover">
            <img src={e.course.thumbnailUrl} alt="" />
          </div>
          <div className="info">
            <Link
              to={`/course/${e.course.slug}-${e.course.id}`}
              className="name"
            >
              {e.course.title}
            </Link>
            <div className="date">
              Khai giảng ngày{" "}
              {moment(e.course.opening_time).format("DD/MM/YYYY")}
            </div>
            <div className="row">
              <div>
                <img src="/img/clock.svg" alt="" className="icon" />
                {e.total_hours} giờ
              </div>
              <div>
                <img src="/img/play.svg" alt="" className="icon" />
                {e.video} video
              </div>
              <div>
                <img src="/img/user.svg" alt="" className="icon" />
                {e.student} học viên
              </div>
            </div>
            <div className="process">
              <div className="line">
                <div className="rate" style={{ width: `${e.process}%` }} />
              </div>
              {e.process}%
            </div>
            <Link
              to={`/course/${e.course.slug}-${e.course.id}`}
              className="btn overlay round btn-continue"
            >
              Tiếp tục học
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
