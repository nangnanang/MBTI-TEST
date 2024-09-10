import { useState } from "react";
import { register } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");

  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    const { data } = await register({ id, password, nickname });
    console.log("회원가입", data);

    if (data.success) {
      alert("회원가입되었습니다. 로그인해주세요.");
      navigate("/sign#in");
    } else {
      alert("회원가입이 실패했습니다.");
    }
  };

  return (
    <>
      <p className="text-5xl py-2">회원가입</p>
      <form className="w-full">
        <p className="text-3xl py-4">ID</p>
        <input
          className="text-xl p-3 w-full"
          onChange={(e) => setId(e.target.value)}
          placeholder="이메일을 입력하시오"
        />
        <p className="text-3xl py-4">비밀번호</p>
        <input
          type="password"
          className="text-xl p-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호을 입력하시오"
        />
        <p className="text-3xl py-4">닉네임</p>
        <input
          className="text-xl p-3 w-full"
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력하시오"
        />
        <button
          className="text-3xl my-5 py-2 w-full border-solid border-4 border-blue-900 bg-indigo-700 text-indigo-100"
          onClick={signupHandler}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignUp;
