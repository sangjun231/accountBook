import axios from "axios";

const JSON_SERVER_HOST = "http://localhost:5000";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);

    return response.data;
  } catch (error) {
    alert("expense error!!");
  }
};
