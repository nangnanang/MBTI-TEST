import axios from "axios";

// 환경 변수 앞에 VITE를 꼭 붙여야 한다.
const API_URL = import.meta.env.VITE_TEST_RESULT_API_URL;

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
  await axios.patch(`${API_URL}/${id}`, updateData);
};
