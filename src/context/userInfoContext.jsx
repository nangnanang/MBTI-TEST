import { createContext, useEffect, useState } from "react";
import { getUser } from "../api/auth";

export const userInfoContext = createContext();

const UserInfoContextProvider = ({ children }) => {
  const [token, setToken] = useState(sessionStorage.getItem("loginToken"));
  const [userInfo, setUserInfo] = useState();
  console.log(userInfo);

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

  const logout = () => {
    sessionStorage.removeItem("loginToken");
    setToken(sessionStorage.getItem("loginToken"));
  };

  return (
    <userInfoContext.Provider value={{ token, setToken, userInfo, logout }}>
      {children}
    </userInfoContext.Provider>
  );
};
export default UserInfoContextProvider;
