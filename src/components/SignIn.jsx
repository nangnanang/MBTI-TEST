import { useContext, useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { userInfoContext } from "../context/userInfoContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken } = useContext(userInfoContext);
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const signinHandler = async (e) => {
    e.preventDefault();

    // JWT로 로그인
    const { data } = await login(formData);

    // 로그인 하면 로그인 토큰 저장
    if (data.success) {
      sessionStorage.setItem("loginToken", data.accessToken);
      setToken(sessionStorage.getItem("loginToken"));
      navigate("/");
    } else {
      alert("로그인이 실패했습니다.");
    }
  };
  return (
    <>
      <p className="text-5xl py-2">로그인</p>
      <form className="w-full">
        <p className="text-3xl py-4">ID</p>
        <input
          name="id"
          onChange={changeHandler}
          className="text-xl p-3 w-full"
          placeholder="이메일을 입력하시오"
        />
        <p className="text-3xl py-4">비밀번호</p>
        <input
          name="password"
          onChange={changeHandler}
          type="password"
          className="text-xl p-3 w-full"
          placeholder="비밀번호을 입력하시오"
        />
        <button
          className="text-3xl my-5 py-2 w-full border-solid border-4 border-blue-900 bg-indigo-700 text-indigo-100"
          onClick={signinHandler}
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default SignIn;
