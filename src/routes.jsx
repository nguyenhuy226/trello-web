import AuthRouter from "./components/AuthRouter";
import PrivateRouter from "./components/PrivateRouter";
import { PATH } from "./config/path";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import HomePage from "./pages";
import Page404 from "./pages/404";
import CoinPage from "./pages/coin";
import ContactPage from "./pages/contact";
import CoursePage from "./pages/course";
import CourseDetail from "./pages/course/[slug]";
import FAQPage from "./pages/faq";
import PaymentPage from "./pages/payment";
import ProfilePage from "./pages/profile";
import MyCoin from "./pages/profile/coin";
import MyCourse from "./pages/profile/course";
import OldCourse from "./pages/profile/old-course";
import Payment from "./pages/profile/payment";
import MyProject from "./pages/profile/project";
import ProjectPage from "./pages/project";
import RegisterPage from "./pages/register/[slug]id[id]";
import ResetPasswordPage from "./pages/reset-password";
import SignInPage from "./pages/signin";
import SignUpPage from "./pages/signup";
import TeamPage from "./pages/team";

export const routes = (user, login, logout) => {
  return [
    {
      element: <MainLayout user={user} login={login} logout={logout} />,
      childrent: [
        {
          element: <HomePage />,
          index: true,
        },
        {
          element: <ContactPage />,
          path: PATH.contact,
        },
        {
          path: PATH.course,
          childrent: [
            {
              element: <CoursePage />,
              index: true,
            },
            {
              element: <CourseDetail />,
              path: PATH.courseDetail,
            },
          ],
        },
        {
          element: <TeamPage />,
          path: PATH.team,
        },
        {
          element: <RegisterPage />,
          path: PATH.courseRegister,
        },
        {
          element: <ProjectPage />,
          path: PATH.project,
        },
        {
          element: <FAQPage />,
          path: PATH.faq,
        },
        {
          element: <PaymentPage />,
          path: PATH.payment,
        },
        {
          element: <CoinPage />,
          path: PATH.coin,
        },
        {
          element: <AuthRouter user={user} redirect={PATH.profile.index} />,
          childrent: [
            {
              element: <SignInPage login={login} />,
              path: PATH.signin,
            },
            {
              element: <SignUpPage />,
              path: PATH.signup,
            },
            {
              element: <ResetPasswordPage />,
              path: PATH.resetPassword,
            },
          ],
        },
        {
          element: <PrivateRouter user={user} redirec={PATH.signin} />,
          childrent: [
            {
              element: <ProfileLayout user={user} />,
              path: PATH.profile.index,
              childrent: [
                {
                  element: <ProfilePage />,
                  index: true,
                },
                {
                  element: <MyCourse />,
                  path: PATH.profile.course,
                },
                {
                  element: <MyCoin />,
                  path: PATH.profile.coin,
                },
                {
                  element: <MyProject />,
                  path: PATH.profile.project,
                },
                {
                  element: <Payment />,
                  path: PATH.profile.payment,
                },
                {
                  element: <OldCourse />,
                  path: PATH.profile.oldCourse,
                },
              ],
            },
          ],
        },
        {
          element: <Page404 />,
          path: "*",
        },
      ],
    },
  ];
};
