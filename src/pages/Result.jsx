import { useQuery } from "@tanstack/react-query";
import {
  deleteTestResult,
  getTestResults,
  updateTestResultVisibility,
} from "../api/testResults";
import { useContext } from "react";
import { userInfoContext } from "../context/userInfoContext";
import { mbti } from "../data/mbti";
import ResultFormButtons from "../components/ResultFormButtons";

const Result = () => {
  const { userInfo } = useContext(userInfoContext);

  // 결과 데이터 가져오는 함수
  const { data, isPending, isError } = useQuery({
    queryKey: ["result"],
    queryFn: getTestResults,
  });

  if (isPending) return <div>가져오는 중</div>;
  if (isError) return <div>오류남</div>;

  // 내 결과정보인지 확인하는 함수
  const myResult = (id) => {
    if (userInfo && id === userInfo.id) return true;
  };

  return (
    <div className="flex flex-col p-10 gap-y-10">
      <p className="text-5xl">테스트 결과</p>
      {data
        ?.filter((result) => result.visibility || myResult(result.id))
        .map((result) => {
          return (
            <div
              key={result.date}
              className="flex flex-col bg-red-100 rounded-lg p-5 gap-4"
            >
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <p className="mr-5">{result.nickname}</p>
                  <p>{result.result}</p>
                </div>
                <p>{result.date.slice(0, 10)}</p>
              </div>
              <p>{mbti.find((a) => a.type === result.result).detail}</p>
              {myResult(result.id) ? (
                <ResultFormButtons result={result} />
              ) : (
                <></>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default Result;
