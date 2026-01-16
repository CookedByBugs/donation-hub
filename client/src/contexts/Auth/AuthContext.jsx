import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { Loading3QuartersOutlined as LoadingIcon } from "@ant-design/icons"
const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [state, setState] = useState({ isAuth: false, user: {} });
  const [session, setSession] = useState({});
  const [isAppLoading, setIsAppLoading] = useState(true);
  const fetchProfile = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setState({ isAuth: false, user: {} });
      setIsAppLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState({ isAuth: true, user: res.data.user });
      setSession(res.data.session);
    } catch (err) {
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.removeItem("authToken");
      }
      setState({ isAuth: false, user: {} });
    } finally {
      setIsAppLoading(false);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setState({ isAuth: false, user: {} });
  };
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (session.exp < Date.now()) {
      handleLogout();
    }
  }, [])

  if (isAppLoading) return <div className="bg-primary flex justify-center items-center h-screen">
    <div className="animate-spin">
      <LoadingIcon className="text-5xl !text-white" />
    </div>
  </div>;
  return (
    <AuthContext.Provider value={{ fetchProfile, ...state, handleLogout, session }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
