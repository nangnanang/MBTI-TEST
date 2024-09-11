import { createContext, useEffect, useState } from "react";
import { getUser } from "../api/auth";

export const userInfoContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("loginToken"));
  const [userInfo, setUserInfo] = useState();

  // 새로고침 시에도 토큰이 있으면 유저 정보를 불러올 수 있도록 짠 코드
  useEffect(() => {
    if (!token) {
      return;
    }
    const getUserInfo = async () => {
      const { data } = await getUser(token);
      setUserInfo(data);
    };
    getUserInfo();
  }, [token]);

  // 로그아웃 함수
  const logout = () => {
    sessionStorage.removeItem("loginToken");
    setToken(sessionStorage.getItem("loginToken"));
  };

  return (
    <userInfoContext.Provider
      value={{ token, setToken, userInfo, setUserInfo, logout }}
    >
      {children}
    </userInfoContext.Provider>
  );
};
export default UserInfoContextProvider;
