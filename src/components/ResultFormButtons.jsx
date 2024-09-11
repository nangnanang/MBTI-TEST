import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import {
  deleteTestResult,
  updateTestResultVisibility,
} from "../api/testResults";

const ResultFormButtons = ({ result }) => {
  const queryClient = useQueryClient();
  // 결과 데이터 업데이트 함수
  const updateMutation = useMutation({
    mutationFn: ({ id, visibility }) => {
      updateTestResultVisibility(id, { visibility });
    },
    onSuccess: () => {
      alert("공개 여부가 변경되었습니다.");
      queryClient.invalidateQueries(["result"]);
    },
    onError: () => {
      alert("업데이트 실패");
    },
  });

  // 결과 데이터 삭제 함수
  const deleteMutaion = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      alert("삭제 되었습니다.");
      queryClient.invalidateQueries(["result"]);
    },
    onError: () => {
      alert("삭제 실패 실패");
    },
  });
  return (
    <div className="flex flex-row gap-4">
      {result.visibility ? (
        <Button
          name={"비공개로 전환"}
          onClick={() =>
            updateMutation.mutate({ id: result.id, visibility: false })
          }
        />
      ) : (
        <Button
          name={"공개로 전환"}
          onClick={() =>
            updateMutation.mutate({ id: result.id, visibility: true })
          }
        />
      )}
      <Button
        name={"삭제하기"}
        onClick={() => deleteMutaion.mutate(result.id)}
      />
    </div>
  );
};

export default ResultFormButtons;
