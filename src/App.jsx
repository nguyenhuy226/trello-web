import { Route, Routes, useRoutes } from "react-router-dom";
import ContactPage from "./pages/contact";
// import { Form } from 'react-router-dom'
import CoursePage from "./pages/course";
import HomePage from "./pages";
import TeamPage from "./pages/team";
import ProjectPage from "./pages/project";
import FAQPage from "./pages/faq";
import PaymentPage from "./pages/payment";
import CoinPage from "./pages/coin";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import ResetPasswordPage from "./pages/reset-password";
import Page404 from "./pages/404";
import ProfilePage from "./pages/profile";
import ProfileLayout from "./layouts/ProfileLayout";
import MyCourse from "./pages/profile/course";
import MyCoin from "./pages/profile/coin";
import MyProject from "./pages/profile/project";
import Payment from "./pages/profile/payment";
import OldCourse from "./pages/profile/old-course";
import MainLayout from "./layouts/MainLayout";
import { PATH } from "./config/path";
import CourseDetail from "./pages/course/[slug]";
import RegisterPage from "./pages/register/[slug]id[id]";
import { useEffect, useState } from "react";
import PrivateRouter from "./components/PrivateRouter";
import AuthRouter from "./components/AuthRouter";
import { routes } from "./routes";
import "./assets/css/custom.css";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      return null;
    }
  });
  const login = () => {
    setUser({
      name: "Đặng Thuyền Vương",
      avatar: "/img/avt.png",
    });
  };
  const logout = () => {
    setUser();
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // sử dụng hook useRoutes trong react-router-dom
  // const element = useRoutes(routes(user, login, logout));
  return (
    <>
      {/* {element} */}
      <Routes>
        <Route element={<MainLayout user={user} logout={logout} />}>
          <Route index element={<HomePage />} />
          <Route path={PATH.contact} element={<ContactPage />} />
          <Route path={PATH.course}>
            <Route index element={<CoursePage />} />
            <Route path={PATH.courseDetail} element={<CourseDetail />} />
          </Route>
          <Route path={PATH.team} element={<TeamPage />} />
          <Route path={PATH.courseRegister} element={<RegisterPage />} />
          <Route path={PATH.project} element={<ProjectPage />} />
          <Route path={PATH.faq} element={<FAQPage />} />
          <Route path={PATH.payment} element={<PaymentPage />} />
          <Route path={PATH.coin} element={<CoinPage />} />
          <Route
            element={<AuthRouter user={user} redirect={PATH.profile.index} />}
          >
            <Route path={PATH.signin} element={<SignInPage login={login} />} />
            <Route path={PATH.signup} element={<SignUpPage />} />
            <Route path={PATH.resetPassword} element={<ResetPasswordPage />} />
          </Route>
          <Route element={<PrivateRouter redirect={PATH.signin} user={user} />}>
            <Route path={PATH.profile.index} element={<ProfileLayout />}>
              <Route index element={<ProfilePage />} />
              <Route path={PATH.profile.course} element={<MyCourse />} />
              <Route path={PATH.profile.coin} element={<MyCoin />} />
              <Route path={PATH.profile.project} element={<MyProject />} />
              <Route path={PATH.profile.payment} element={<Payment />} />
              <Route path={PATH.profile.oldCourse} element={<OldCourse />} />
            </Route>
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
