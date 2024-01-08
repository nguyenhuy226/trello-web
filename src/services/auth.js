import { AUTHENTICATION_API, api } from "../config/api";

export const authService = {
  login(data) {
    return api.post(`${AUTHENTICATION_API}/login`, data);
  },
};
