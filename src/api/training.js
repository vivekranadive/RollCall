import api from "./http-common";

// POST Request

export const createClasses = async (data, company, client) => {
  let response;
  try {
    const baseUrl = "https://5mlq865rl8.execute-api.us-east-1.amazonaws.com/dev/class";
    const url = `${baseUrl}?company=${encodeURIComponent(company)}&client=${encodeURIComponent(client)}`;
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

export const createFaculty = async (data, company, client) => {
  let response;
  try {
    const baseUrl = "https://5mlq865rl8.execute-api.us-east-1.amazonaws.com/dev/faculty";
    const url = `${baseUrl}?company=${encodeURIComponent(company)}&client=${encodeURIComponent(client)}`;
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
