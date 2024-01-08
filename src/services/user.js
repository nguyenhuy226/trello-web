import { USER_API, api } from "../config/api";

export const userService = {
  signup(data) {
    return api.post(`${USER_API}/register`, data);
  },
  getProfile() {
    return api.get(`${USER_API}`);
  },
  resendEmail(data) {
    return api.post(`${USER_API}/resend-email`, data);
  },
};
