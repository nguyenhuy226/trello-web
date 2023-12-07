import React from "react";
import { Link, generatePath } from "react-router-dom";
import { PATH } from "../../config/path";

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
          <Link to={PATH.register} className="register-btn">
            6,000,000 đ
          </Link>
        </div>
      </div>
    </div>
  );
}
