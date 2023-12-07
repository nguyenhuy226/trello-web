import React, { useState } from "react";
import { courseServer } from "../../services/course";
import CourseCard from "../CourseCard";

export default function ListCourse() {
  const [courses, setCourses] = useState(() => {
    return courseServer.getCourse();
  });
  return (
    <section className="section-1">
      <div className="container">
        <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
        <p className="top-des">
          Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt động
          kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy chọn lộ
          trình học tập mà bạn muốn và bắt đầu câu chuyện thành công của bạn.
        </p>
        <div className="textbox" style={{ marginTop: 100 }}>
          <h3 className="sub-title">KHÓA HỌC</h3>
          <h2 className="main-title">OFFLINE</h2>
        </div>
        <div className="flex justify-between items-center mt-10 mb-10">
          <div className="category">
            <a href="#" className="item active">
              Cất cả
            </a>
            <a href="#" className="item">
              Frontend
            </a>
            <a href="#" className="item">
              Backend
            </a>
            <a href="#" className="item">
              UI/UX
            </a>
            <a href="#" className="item">
              Devops
            </a>
          </div>
          <div className="flex">
            <div className="input-search">
              <input defaultValue="Reactjs" />
              <button>Tìm kiếm</button>
            </div>
          </div>
        </div>
        <div className="list row">
          {courses.map((e) => (
            <CourseCard key={e.id} {...e} />
          ))}
        </div>
        <div className="flex justify-end mt-10">
          <div className="paginate">
            <a href="#" className="prev">
              Trang trước
            </a>
            <a href="#" className="item">
              1
            </a>
            <a href="#" className="item">
              2
            </a>
            <a href="#" className="item active">
              3
            </a>
            <a href="#" className="item">
              4
            </a>
            <a href="#" className="item">
              5
            </a>
            <a href="#" className="next">
              Trang sau
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
