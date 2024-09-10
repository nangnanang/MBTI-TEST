import { useContext, useEffect, useState } from "react";
import { updateUser } from "../api/auth";
import { userInfoContext } from "../context/userInfoContext";
const Mypage = () => {
  const { token, userInfo } = useContext(userInfoContext);
  const [nickname, setNickname] = useState("");
  const [newNickName, setNewNickName] = useState("");
  // const queryClient = useQueryClient();

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname);
    }
  }, [userInfo]);

  const updateHandler = async (e) => {
    e.preventDefault();

    // 닉네임 업데이트
    const { data } = await updateUser(token, {
      nickname: newNickName,
    });

    // 리렌더링
    if (data.success) {
      setNickname(newNickName);
      setNewNickName("");
      alert("닉네임이 변경되었습니다.");
    }
  };

  return (
    <div className=" w-2/5 text-center border-solid border-4 border-red-200 rounded-xl bg-sky-200">
      <p className="text-5xl m-12">프로필 수정</p>
      {nickname ? (
        <>
          <p className="text-3xl p-3">닉네임: {nickname}</p>
        </>
      ) : (
        <div>불러오는 중</div>
      )}
      <form className="flex flex-col items-center">
        <p className="text-xl p-3">새 닉네임</p>
        <input
          value={newNickName}
          onChange={(e) => setNewNickName(e.target.value)}
          className="text-xl p-3 w-4/5 rounded-xl"
          placeholder="새로운 닉네임을 입력하시오"
        />
        <button
          className="text-xl my-10 py-2 w-2/5 border-solid border-2 border-red-300 rounded-xl bg-sky-400"
          onClick={updateHandler}
        >
          닉네임 변경
        </button>
      </form>
    </div>
  );
};

export default Mypage;
