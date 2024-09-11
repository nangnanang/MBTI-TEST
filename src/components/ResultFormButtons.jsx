import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "./Button";
import { API_URL, deleteTestResult } from "../api/testResults";
import axios from "axios";

const ResultFormButtons = ({ result }) => {
  const queryClient = useQueryClient();
  // 결과 데이터 업데이트 함수
  const updateMutation = useMutation({
    mutationFn: async (updateData) => {
      await axios.patch(`${API_URL}/${result.id}`, updateData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["result"]);
      alert("공개 여부가 변경되었습니다.");
    },
    onError: () => {
      alert("업데이트 실패");
    },
  });

  // 결과 데이터 삭제 함수
  const deleteMutaion = useMutation({
    mutationFn: deleteTestResult,
    onSuccess: () => {
      queryClient.invalidateQueries(["result"]);
      alert("삭제 되었습니다.");
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
          // onClick={() => handleUpdate(result.id, false)}
          onClick={() => updateMutation.mutate({ visibility: false })}
        />
      ) : (
        <Button
          name={"공개로 전환"}
          onClick={() => updateMutation.mutate({ visibility: true })}
        />
      )}
      <Button
        name={"삭제하기"}
        onClick={() => deleteMutaion.mutate(result.id)}
      />
      {/* <Button name={"삭제하기"} onClick={() => handleDelete(result.id)} /> */}
    </div>
  );
};

export default ResultFormButtons;
