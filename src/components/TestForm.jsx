import { useState } from "react";
import { questions } from "../data/questions";
import calculateMBTI from "../utils/mbtiCalculator";
import { mbti } from "../data/mbti";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const TestForm = ({ handleTestSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [result, setResult] = useState();
  const [isLoading, changeLoading] = useState(false);
  const navigate = useNavigate();

  // 테스트 답안 저장하기
  const handleChange = (index, answer) => {
    const newAnswers = [...answers];
    newAnswers[index] = answer;
    setAnswers(newAnswers);
  };

  // 테스트 답안 결과 데이터로 보내기
  const handleSubmit = async (e) => {
    e.preventDefault();
    changeLoading(true);
    await handleTestSubmit(answers);
    changeLoading(false);

    // 단일 테스트 결과를 확인하기 위한 상태값 관리
    setResult(calculateMBTI(answers));
  };

  return (
    <>
      {result ? (
        <div className="flex flex-col gap-2 w-3/5">
          <p className="text-xl">테스트 결과 : {result}</p>
          <p>
            {result} : {mbti.find((a) => a.type === result).detail}
          </p>
          <Button
            name={"결과 페이지로 이동"}
            onClick={() => navigate("/result")}
          />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 p-4 m-4 bg-gray-100 rounded shadow-md"
        >
          {questions.map((question, index) => {
            return (
              <div key={question.id} className="mb-4">
                <div className="flex flex-row gap-2">
                  <p>{question.id}문. </p>
                  <p>{question.question}</p>
                </div>
                <div className="flex w-full gap-3">
                  {question.options.map((option) => {
                    return (
                      <label
                        key={option}
                        className="flex flex-row w-full rounded-md bg-gray-300 gap-2 p-3"
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={answers[index] === option}
                          onChange={() => handleChange(index, option)}
                        />
                        <p>{option}</p>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="flex flex-col justify-center w-full">
            {isLoading ? (
              <div>제출중</div>
            ) : (
              <Button type="submit" name={"제출하기"} />
            )}
          </div>
        </form>
      )}
    </>
  );
};

export default TestForm;
