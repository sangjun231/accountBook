import axios from "axios";

const AUTH_API_HOST = "https://moneyfulpublicpolicy.co.kr";

export const register = async ({ id, password, nickname }) => {
  try {
    const response = await axios.post(`${AUTH_API_HOST}/register`, {
      id,
      password,
      nickname,
    });
    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
  }
};

export const login = async ({ id, password }) => {
  try {
    const response = await axios.post(`${AUTH_API_HOST}/login?expiresIn=10m`, {
      id,
      password,
    });
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    alert(error?.response?.data?.message);
  }
};

export const getUserInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const response = await axios.get(`${AUTH_API_HOST}/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      alert("AccessToken이 만료되었습니다.");
      localStorage.clear();
    }
  }
};

export const updateProfile = async (formData) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    try {
      const response = await axios.patch(`${AUTH_API_HOST}/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      alert("업데이트 실패했습니다.");
    }
  }
};
