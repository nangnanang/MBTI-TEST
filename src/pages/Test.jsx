import { useContext } from "react";
import TestForm from "../components/TestForm";
import calculateMBTI from "../utils/mbtiCalculator";
import { userInfoContext } from "../context/userInfoContext";
import { createTestResult } from "../api/testResults";

const Test = () => {
  const { userInfo } = useContext(userInfoContext);

  const handleTestSubmit = async (answers) => {
    // mbti테스트 결과 도출
    const result = calculateMBTI(answers);
    // id는 post 할 때 자동으로 생성됨
    const resultData = {
      userId: userInfo.id,
      nickname: userInfo.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    // 결과를 API에 저장하기
    await createTestResult(resultData);
  };

  return (
    <>
      {userInfo ? (
        <TestForm handleTestSubmit={handleTestSubmit} />
      ) : (
        <div>불러오는 중</div>
      )}
    </>
  );
};

export default Test;
