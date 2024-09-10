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
    const resultData = {
      id: userInfo.id,
      nickname: userInfo.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    // 결과 저장하기
    await createTestResult(resultData);
  };

  return <TestForm handleTestSubmit={handleTestSubmit} />;
};

export default Test;
