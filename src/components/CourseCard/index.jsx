import React from "react";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../../config/path";
import Skeleton from "../Skeleton";

export default function CourseCard({
  money,
  thumbnailUrl,
  long_description,
  short_description,
  title,
  slug,
  id,
}) {
  //   const path = generatePath(PATH.courseDetail, { slug, id });
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to={`/course/${slug}-${id}`}>
          <img src={thumbnailUrl} alt="" />
        </Link>
        <div className="info">
          <Link className="name" to={`/course/${slug}-${id}`}>
            {title}
          </Link>
          <p className="des">{short_description}</p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              <img src="/img/avt.png" alt="" />
            </div>
            <div className="name">Vương Đặng</div>
          </div>
          <Link to={PATH.courseRegister} className="register-btn">
            {money} đ
          </Link>
        </div>
      </div>
    </div>
  );
}

export const CourseCardLoading = () => {
  return (
    <div className="col-md-4 course">
      <div className="wrap">
        <Link className="cover" to="#">
          {/* <img src={thumbnailUrl} alt="" /> */}
          <Skeleton height={250} />
        </Link>
        <div className="info">
          <Link className="name" to="#">
            {/* {title} */}
            <Skeleton height={30} />
          </Link>
          <p className="des">
            {/* {" "} */}
            <Skeleton height={50} />
          </p>
        </div>
        <div className="bottom">
          <div className="teacher">
            <div className="avatar">
              {/* <img src="/img/avt.png" alt="" /> */}
              <Skeleton height={36} width={36} shap="circle" />
            </div>

            <div className="name">
              <Skeleton height={24} width={150} />
            </div>
          </div>
          <Link to={PATH.courseRegister} className="register-btn">
            {/* {money} đ */}
            <Skeleton height={40} width={128} />
          </Link>
        </div>
      </div>
    </div>
  );
};
