const PROFILE_PATH = "/profile";
const COURSE_PATH = "/course";
const REGISTER_PATH = "/register";

export const PATH = {
  home: "/",
  team: "/team",
  course: COURSE_PATH,
  courseDetail: COURSE_PATH + "/:slugId",
  project: "/project",
  coin: "/coin",
  payment: "/payment",
  contact: "/contact",
  faq: "/faq",
  signin: "/signin",
  signup: "/signup",
  resetPassword: "/reset-password",
  courseRegister: REGISTER_PATH + "/:slugId",
  profile: {
    index: PROFILE_PATH,
    course: PROFILE_PATH + "/course",
    coin: PROFILE_PATH + "/coin",
    oldCourse: PROFILE_PATH + "/old-course",
    payment: PROFILE_PATH + "/payment",
    project: PROFILE_PATH + "/project",
  },
};
