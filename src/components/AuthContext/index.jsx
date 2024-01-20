import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { authService } from "../../services/auth";
import { message } from "antd";
import {
  clearToken,
  clearUser,
  getUser,
  setToken,
  setUser,
} from "../../utils/token";
import { userService } from "../../services/user";
import { useNavigate, useLocation } from "react-router-dom";
import { PATH } from "../../config/path";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { state } = useLocation();
  const [user, _setUser] = useState(() => {
    try {
      return getUser();
    } catch (error) {
      return null;
    }
  });
  useEffect(() => {
    setUser(user || null);
  }, [user]);

  const navigate = useNavigate();

  const login = useCallback(async (data) => {
    try {
      const res = await authService.login(data);
      if (res.data) {
        setToken(res.data);
        await getProfile();
      }
    } catch (err) {
      if (err?.response?.data?.message) {
        message.error(err?.response?.data?.message);
      }
    }
  }, []);
  const getProfile = useCallback(async () => {
    const user = await userService.getProfile();
    _setUser(user.data);
    message.success("Đăng nhập tài khoản thành công");
    if (state?.redirect) {
      navigate(state.redirect);
    } else {
      navigate(PATH.profile.index);
    }
  }, []);
  const logout = useCallback(() => {
    clearToken();
    clearUser();
    _setUser(null);
    message.success("Đăng xuất tài khoàn thành công");
  }, []);

  const value = useMemo(() => {
    return { user, login, logout, setUser: _setUser, getProfile };
  }, [user, login, logout, _setUser, getProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
