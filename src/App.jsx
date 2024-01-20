import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { PATH } from "./config/path";
const ContactPage = lazy(() => import("./pages/contact"));
const CoursePage = lazy(() => import("./pages/course"));
const HomePage = lazy(() => import("./pages"));
const TeamPage = lazy(() => import("./pages/team"));
const ProjectPage = lazy(() => import("./pages/project"));
const FAQPage = lazy(() => import("./pages/faq"));
const PaymentPage = lazy(() => import("./pages/payment"));
const CoinPage = lazy(() => import("./pages/coin"));
const SignInPage = lazy(() => import("./pages/signin"));
const SignUpPage = lazy(() => import("./pages/signup"));
const ResetPasswordPage = lazy(() => import("./pages/reset-password"));
const Page404 = lazy(() => import("./pages/404"));
const ProfilePage = lazy(() => import("./pages/profile"));
const ProfileLayout = lazy(() => import("./layouts/ProfileLayout"));
const MyCourse = lazy(() => import("./pages/profile/course"));
const MyCoin = lazy(() => import("./pages/profile/coin"));
const MyProject = lazy(() => import("./pages/profile/project"));
const Payment = lazy(() => import("./pages/profile/payment"));
const OldCourse = lazy(() => import("./pages/profile/old-course"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));
const CourseDetail = lazy(() => import("./pages/course/[slug]"));
const RegisterPage = lazy(() => import("./pages/register/[slug]id[id]"));
const PrivateRouter = lazy(() => import("./components/PrivateRouter"));
const AuthRouter = lazy(() => import("./components/AuthRouter"));

import "./assets/css/custom.css";

function App() {
  // const [user, setUser] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("user"));
  //   } catch (error) {
  //     return null;
  //   }
  // });
  // const login = () => {
  //   setUser({
  //     name: "Đặng Thuyền Vương",
  //     avatar: "/img/avt.png",
  //   });
  // };
  // const logout = () => {
  //   setUser();
  // };
  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }, [user]);

  // sử dụng hook useRoutes trong react-router-dom
  // const element = useRoutes(routes(user, login, logout));
  return (
    <Suspense fallback={<div>Loading.....</div>}>
      {/* {element} */}
      <Routes>
        <Route element={<MainLayout />}>
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
          <Route element={<AuthRouter redirect={PATH.profile.index} />}>
            <Route path={PATH.signin} element={<SignInPage />} />
            <Route path={PATH.signup} element={<SignUpPage />} />
            <Route path={PATH.resetPassword} element={<ResetPasswordPage />} />
          </Route>
          <Route element={<PrivateRouter redirect={PATH.signin} />}>
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
    </Suspense>
  );
}

export default App;
