import axios from "axios";
// 왜 이 변수는 써먹을 수가 없는가...
const API_URL = "http://localhost:4000/testResults";

// 결과 데이터 가져오기
export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// 결과 데이터 추가하기
export const createTestResult = async (resultData) => {
  const response = await axios.post(`${API_URL}`, resultData);
  return response;
};

// 결과 데이터 삭제하기
export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response;
};

// 결과 데이터 업데이트하기
export const updateTestResultVisibility = async (id, updateData) => {
  const response = await axios.patch(`${API_URL}/${id}`, updateData);
  return response;
};
