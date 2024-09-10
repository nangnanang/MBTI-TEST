import axios from "axios";

// kim@test.com       123123
// kimkim@test.com    kim123

const API_URL = "https://moneyfulpublicpolicy.co.kr";

// 회원가입
// userData
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response;
};

// 로그인
// userData
export const login = async (userData) => {
  // 로그인 유효기간 10분
  // const response = await axios.post(`${API_URL}/login?expiresIn=10m`, userData);
  const response = await axios.post(`${API_URL}/login`, userData);

  return response;
};

// 유저 정보 가져오기
// token
export const getUser = async (token) => {
  const response = await axios.get(`${API_URL}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// 유저 정보 변경
// token + userData
export const updateUser = async (token, userData) => {
  const response = await axios.patch(`${API_URL}/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};
