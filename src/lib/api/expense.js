import axios from "axios";

const JSON_SERVER_HOST =
  "http://localhost:https://grey-concise-galette.glitch.me";

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${JSON_SERVER_HOST}/expenses`);
    return response.data;
  } catch (error) {
    alert("getExpenses error!!");
  }
};

export const getExpense = async ({ queryKey }) => {
  // const [_,id] = queryKey
  try {
    const response = await axios.get(
      `${JSON_SERVER_HOST}/expenses/${queryKey[1]}`
    );
    return response.data;
  } catch (error) {
    alert("getExpense error!!");
  }
};

export const postExpense = async (newExpense) => {
  try {
    const { data } = await axios.post(
      `${JSON_SERVER_HOST}/expenses`,
      newExpense
    );
    return data;
  } catch (error) {
    console.log(error);
    alert("postExpense error!!");
  }
};

export const putExpense = async (updatedExpense) => {
  const { id, ...rest } = updatedExpense;
  try {
    const { data } = await axios.put(
      `${JSON_SERVER_HOST}/expenses/${id}`,
      rest
    );
    return data;
  } catch (error) {
    console.log(error);
    alert("putExpense error!!");
  }
};

export const deleteExpense = async (id) => {
  try {
    const { data } = await axios.delete(`${JSON_SERVER_HOST}/expenses/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    alert("deleteExpense error!!");
  }
};
