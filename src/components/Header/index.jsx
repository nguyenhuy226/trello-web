import React, { useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { PATH } from "../../config/path";
import { useAuth } from "../AuthContext";
import avatar from "../../assets/img/anh-avatar-trang-nen-den.webp";

export default function Header() {
  useEffect(() => {
    // $(".menu-hambeger").on("click", function () {
    //   $("body").toggleClass("menu-is-show");
    // });

    $("#header nav ul").on("click", function (e) {
      e.stopPropagation();
    });
    // $(".overlay_nav").on("click", function (e) {
    //   $("body").removeClass("menu-is-show");
    // });
    $(document).keyup(function (e) {
      if (e.key === "Escape") {
        $("body").removeClass("menu-is-show");
      }
    });
  }, []);
  const { user, logout } = useAuth();
  const _logout = (ev) => {
    ev.preventDefault();
    logout();
  };
  const closeNavByMenu = () => {
    $("body").removeClass("menu-is-show");
  };
  return (
    <>
      <header id="header">
        <div className="wrap">
          <div
            className="menu-hambeger"
            onClick={() => {
              $("body").toggleClass("menu-is-show");
            }}
          >
            <div className="button">
              <span />
              <span />
              <span />
            </div>
            <span className="text">menu</span>
          </div>
          <Link to={PATH.home} className="logo">
            <img src="/img/logo.svg" alt="" />
            <h1>Spacedev</h1>
          </Link>
          <div className="right">
            {user ? (
              <div className="have-login">
                <div className="account">
                  <Link to={PATH.profile.index} className="info">
                    <div className="name">{user.name}</div>
                    <div className="avatar">
                      <img src={user.avatar || avatar} alt="" />
                    </div>
                  </Link>
                </div>
                <div className="hamberger"></div>
                <div className="sub">
                  <Link to={PATH.course}>Khóa học của tôi</Link>
                  <Link to={PATH.profile.index}>Thông tin tài khoản</Link>
                  <a onClick={_logout} href="#">
                    Đăng xuất
                  </a>
                </div>
              </div>
            ) : (
              <div className="not-login bg-none">
                <Link to={PATH.signin} className="btn-register">
                  Đăng nhập
                </Link>
                <Link to={PATH.signup} className="btn main btn-open-login">
                  Đăng ký
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="progress" />
      </header>
      <nav className="nav">
        <ul>
          <li onClick={closeNavByMenu}>
            <Link to={PATH.signin}>Đăng ký / Đăng nhập</Link>
          </li>
          {user && (
            <li onClick={closeNavByMenu}>
              <NavLink to={PATH.profile.index} className="account">
                <div className="avatar">
                  <img src={user.avatar || avatar} alt="" />
                </div>
                <div className="name">{user.name}</div>
              </NavLink>
            </li>
          )}
          <li onClick={closeNavByMenu}>
            <NavLink to={PATH.home}>Trang chủ</NavLink>
          </li>
          <li onClick={closeNavByMenu}>
            <NavLink to={PATH.team}>Spacedev Team</NavLink>
          </li>
          <li onClick={closeNavByMenu}>
            <NavLink to={PATH.course}>Khóa Học</NavLink>
          </li>
          <li onClick={closeNavByMenu}>
            <NavLink to={PATH.project}>Dự Án</NavLink>
          </li>
          <li onClick={closeNavByMenu}>
            <NavLink to={PATH.contact}>Liên hệ</NavLink>
          </li>
        </ul>
      </nav>
      <div
        className="overlay_nav"
        onClick={(e) => {
          $("body").removeClass("menu-is-show");
        }}
      />
    </>
  );
}
