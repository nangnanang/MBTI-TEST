import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const explanation = [
    { title: "성격 유형 검사", content: "간단한 테스트로 MBTI 알아가세요" },
    {
      title: "성격 유형 이해",
      content:
        "자신의 성격 유형이 삶의 여러 영역에서 어떤 형태로 나타나는지 알아보세요",
    },
    {
      title: "상호작용",
      content:
        "나의 성격이 다른 사람과 어떻게 다른지 알아보고 원활한 의사소통을 도모해 보세요",
    },
  ];

  return (
    <div className="w-3/4 text-center">
      <p className="text-5xl m-12">무료 성격 테스트</p>
      <div className="flex flex-row gap-11">
        {explanation.map((a, i) => {
          return (
            <div
              key={i}
              className="border-solid border-4 border-sky-200 rounded-xl bg-red-100 w-full p-6"
            >
              <p className="text-3xl p-3">{a.title}</p>
              <p className="text-xl">{a.content}</p>
            </div>
          );
        })}
      </div>
      <button
        className="text-3xl my-10 py-2 w-2/5 border-solid border-4 border-red-300 rounded-xl bg-sky-400"
        onClick={() => navigate("/test")}
      >
        테스트 하러 가기
      </button>
    </div>
  );
};

export default Home;
