import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useContext } from "react";
import { userInfoContext } from "../context/userInfoContext";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  // 로그인 상태를 가져와서 로그인/로그아웃 버튼 핸들링
  const { token, logout } = useContext(userInfoContext);
  return (
    <>
      <div className="fixed w-full bg-sky-200 h-22 p-5">
        <div className="flex flex-row justify-between">
          <p className="text-2xl" onClick={() => navigate("/")}>
            MBTI 테스트
          </p>
          <div className="flex gap-4">
            {token ? (
              <>
                <Button
                  name={"마이페이지"}
                  onClick={() => {
                    navigate("/mypage");
                  }}
                />
                <Button
                  name={"테스트"}
                  onClick={() => {
                    navigate("/test");
                  }}
                />
                <Button
                  name={"결과 보기"}
                  onClick={() => {
                    navigate("/result");
                  }}
                />
                <Button
                  name={"로그아웃"}
                  onClick={() => {
                    logout();
                  }}
                />
              </>
            ) : (
              <>
                <Button
                  name={"로그인"}
                  onClick={() => {
                    navigate("/sign#in");
                  }}
                />
                <Button
                  name={"회원가입"}
                  onClick={() => {
                    navigate("/sign#up");
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full pt-24">
        {children}
      </div>
    </>
  );
};

export default Layout;
