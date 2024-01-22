import React, { useEffect, useState } from "react";
import { courseServer } from "../services/course";
import CourseCard, { CourseCardLoading } from "../components/CourseCard";
import Modal from "../components/Modal";
import Testimonal from "../components/Testimonal";
import TeamGallery from "../components/TeamGallery";
import { useQuery } from "../hooks/useQuery";

export default function HomePage() {
  useEffect(() => {
    // localStorage.removeItem("TO_DO_APP");
    $(".slider").flickity({
      contain: true,
      wrapAround: false,
      autoPlay: true,
      // freeScroll: true,
      cellAlign: "left",
      prevNextButtons: false,
    });
  }, []);
  const [isOpenVideoModal, setIsOpenVideoModal] = useState(false);
  // const { data: courses, loading } = useFetch(() =>
  //   courseServer.getCourse("?limit=6")
  // );
  const { data: { data: courses = [] } = {}, loading } = useQuery({
    queryFn: () => courseServer.getCourse("?limit=6"),
    queryKey: "courses",
    cacheTime: 10000,
  });
  // const [loading, setLoading] = useState(true);
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   setLoading(true);
  //   courseServer
  //     .getCourse()
  //     //sử dụng khi dùng fetch
  //     // .then((res) => res.json())
  //     .then((data) => {
  //       setCourses(data.data);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  //   //cách làm bằng async await và có sử dụng try catch để bắt lỗi ==> khi dùng async await trong useEfect thì phải chạy trong hàm chạy liền
  //   // (async () => {
  //   //   try {
  //   //     setLoading(true)
  //   //     let res = await courseServer.getCourse()
  //   //     res = await res.json()
  //   //     setCourses(res.data)
  //   //   } finally {
  //   //     setLoading(false)
  //   //   }
  //   // })()
  // }, []);
  return (
    <main id="main">
      <div className="homepage">
        <div className="slider">
          <div className="item">
            <div className="container">
              <div className="content">
                <h2 className="title">
                  Điều quan trọng không phải là{" "}
                  <span style={{ color: "rgb(229, 57, 53)" }}>vị trí đứng</span>{" "}
                  mà là{" "}
                  <span style={{ color: "rgb(63, 81, 181)" }}>hướng đi</span>
                </h2>
                <a
                  href="https://spacedev.vn/roadmap"
                  className="btn main round"
                >
                  Roadmap
                </a>
              </div>
            </div>
            <div className="jarallax-img">
              <img src="/img/banner1.jpg" alt="" />
            </div>
          </div>
          <div className="item">
            <div className="container">
              <div className="content">
                <h2 className="title">Kiến thức</h2>
                <h2 className="title">mở ra trang mới cuộc đời bạn</h2>
                <a href="https://spacedev.vn" className="btn main round">
                  KHÓA HỌC
                </a>
              </div>
            </div>
            <div className="jarallax-img">
              <img src="/img/banner2.jpg" alt="" />
            </div>
          </div>
          <div className="item">
            <div className="container">
              <div className="content">
                <h2 className="title">Chuyên nghiệp</h2>
                <h2 className="title">làm cho bạn khác biệt</h2>
                <a href="https://spacedev.vn/about" className="btn main round">
                  KHÓA HỌC
                </a>
              </div>
            </div>
            <div className="jarallax-img">
              <img src="/img/banner3.jpg" alt="" />
            </div>
          </div>
        </div>
        <section className="section-1">
          <div className="container">
            <h2 className="main-title">KHÓA HỌC SPACEDEV</h2>
            <p className="top-des">
              Cho dù bạn muốn tìm kiếm công việc, khởi nghiệp, phát triển hoạt
              động kinh doanh hay chỉ đơn giản là muốn khám phá thế giới, hãy
              chọn lộ trình học tập mà bạn muốn và bắt đầu câu chuyện thành công
              của bạn.
            </p>
            <div className="textbox" style={{ marginTop: "100px" }}>
              <h3 className="sub-title">KHÓA HỌC</h3>
              <h2 className="main-title">OFFLINE</h2>
            </div>
            <div className="list row">
              {loading
                ? Array.from(Array(6)).map((_, i) => (
                    <CourseCardLoading key={i} />
                  ))
                : courses?.map((e) => <CourseCard key={e.id} {...e} />)}
            </div>
            <div className="flex justify-center">
              <a href="./course-list.html" className="btn main">
                Tất cả khóa học
              </a>
            </div>
          </div>
        </section>
        <section className="section-different">
          <div className="container">
            <div className="row">
              <div className="titlebox col-md-6 col-sm-12 col-xs-12">
                <h2 className="main-title white textleft">
                  <span>Giá trị Cốt lỗi</span> <br /> tại Spacedev
                </h2>
                <div className="videodif" data-src="video/cfd-video-intro.mp4">
                  <img
                    src="https://svtech.com.vn/wp-content/uploads/2020/07/dexus-office-space.jpg"
                    alt=""
                  />
                  <div
                    className="play-btn btn-video-intro"
                    onClick={() => setIsOpenVideoModal(true)}
                  >
                    <img src="img/play-icon.svg" alt="" />
                  </div>
                </div>
                <div className="item" style={{ marginTop: 35 }}>
                  <h4>Sáng tạo và đơn giản</h4>
                  <p>
                    Spacedev đề cao những sáng tạo đơn giản thay đổi thế giới,
                    gia tăng năng suất và cải thiện cuộc sống.
                  </p>
                </div>
              </div>
              <Modal
                visbile={isOpenVideoModal}
                onCancel={() => setIsOpenVideoModal(false)}
                maskeCloseable
              >
                {" "}
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
              <div className="contentbox col-md-6 col-sm-12 col-xs-12">
                <div className="item">
                  <h4>Tập trung vào khách hàng</h4>
                  <p>
                    Spacedev được tạo ra với mục tiêu cao nhất giúp cho việc học
                    trở nên dễ dàng hơn và kiến thức thật sự ý nghĩa. Những học
                    viên là đối tượng phục vụ của spacedev vì thế những yêu cầu
                    chính đáng của học viên sẽ được nền tảng tiếp thu và cải
                    thiện.
                  </p>
                </div>
                <div className="item">
                  <h4>Gây dựng lòng tin</h4>
                  <p>
                    Spacedev luôn trung thực với những gì mình phát ngôn cũng
                    như công bố trên các nền tảng mạng xã hội. Trung thực và giữ
                    chữ tín với học viên, với đối tác và với những người sáng
                    lập luôn là tiêu chí hàng đầu giúp nền tảng phát triển bền
                    vững ở hiện tại và trong tương lai.
                  </p>
                </div>
                <div className="item">
                  <h4>Phát triển nhưng không dừng lại</h4>
                  <p>
                    Bằng việc áp dụng những công nghệ trên nền tảng và sự hoàn
                    thiện về chức năng là mình chứng rõ nhất cho sự chuyên
                    nghiệp cũng như sự tận tâm của những người sáng lập nền tảng
                    spacedev.vn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section class="section-3">
              <div class="container">
                  <div class="video">
                      <iframe id="video-intro"
                          src="https://www.youtube-nocookie.com/embed/6t-MjBazs3o?controls=0&showinfo=0&rel=0&enablejsapi=1&version=3&playerapiid=ytplayer"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen allowscriptaccess="always"></iframe>
        
                      <div class="video-src" data-src="video/Spacedev-video-intro.mp4"></div>
                      <div class="play-btn btn-video-intro">
                          <img src="img/play-video-btn.png" alt="">
                      </div>
                  </div>
              </div>
          </section> */}
        <Testimonal />
        <TeamGallery />
        <section className="section-action">
          <div className="container">
            <h3>Học thử trước khi đăng ký khóa học tại Spacedev?</h3>
            <div className="btn main round bg-white">Học thử</div>
          </div>
        </section>
      </div>
    </main>
  );
}
