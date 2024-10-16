import api from "./http-common";

// POST Request

export const createAccount = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createUser  = async (data, client, company) => {
  let response;
  try {
    const baseUrl = "https://5mlq865rl8.execute-api.us-east-1.amazonaws.com/dev/user";
    const url = `${baseUrl}?client=${encodeURIComponent(client)}&company=${encodeURIComponent(company)}`;
    const options = {
      headers: {
        Authorization: `Bearer ${'authToken'}`
      }
    };

    response = await api.post(url, data, options);
    return response;
  } catch (error) {
    return error;
  }
};

export const createUserRole = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};
