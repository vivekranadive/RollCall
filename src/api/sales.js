import api from "./http-common";

import axiosInstance from "./axiosInstance";
import { getUserInfoDetails } from "../utlis";

const { companyId, clientId } = getUserInfoDetails()

// POST Request

export const createJobLead = async (data) => {
  return axiosInstance.post(`/jobs?client=${clientId}&company=${companyId}`, {
    "division": "division1",
    "jobTitle": data.jobTitle,
    "vendorId": +data.vendorId,
    "technologyId": +data.technology,
    // "paymentTypeId": +data.payType, // we dont have paytype id from config object
    "paymentTypeId": 1, // we dont have paytype id from config object
    "billRate": +data.billRate,
    "noOfOpenings": +data.numOfPositions,
    "duration": +data.durationMonths,
    "city": data.city,
    "state": data.state,
    "payType": data.state,
    "createdOn": data.createdOn,
    "statusReason": data.statusReason,
    "jobContactName": data.jobContactName,
    "jobContactEmail": data.jobContactEmail,
    "jobContactPhoneNum": data.jobContactPhoneNum,
    "jobDescription": data.jobDescription,
  })
};

export const updateJobLead = async (data) => {
  return axiosInstance.put(`/jobs/${data.jobId}?client=${clientId}&company=${companyId}`, {
    "division": "division1",
    "jobTitle": data.jobTitle,
    "vendorId": +data.vendorId,
    "technologyId": +data.technology,
    // "paymentTypeId": +data.payType, // we dont have paytype id from config object
    "billRate": +data.billRate,
    "noOfOpenings": +data.numOfPositions,
    "duration": +data.durationMonths,
    "city": data.city,
    "state": data.state,
  })
};

export const createSalesInterview = (data) => {
  console.log(data);
  const payload = {
    "division": "division",
    "candidateId": data.candidateName,
    "vendorId":data.vendor.toString(),
    "jobId":data.job,
    "client":data.clientName,
    "company":data.clientCompany,
    "technology_id":data.technology,
    "schedulingStatus": data.interviewStatus,
    "interviewDate": data.createdOn,
    "appointmentLink": data.link,
    "interviewPanelDetails": `${data.interviewer1},${data.interviewer2}`,
    "feedback": data.feedback,
    "rating": data.rating.toString(),
  }
  return axiosInstance.post(`/interview?company=${companyId}&client=${clientId}`, payload)
};
export const createProject = (data) => {
  console.log(data);
   
  return axiosInstance.post(`/projects?company=${companyId}&client=${clientId}`, data)
};
export const UpdateProject = (data) => {
  console.log(data);
   
  return axiosInstance.post(`/projects/${data.project_id}?company=${companyId}&client=${clientId}`, data)
};
export const updateSalesInterview = (data) => {

  const payload = {
    "division": "division",
    "candidateId": data.candidateName,
    "schedulingStatus": data.interviewStatus,
    "appointmentLink": data.link,
    "interviewPanelDetails": `${data.interviewer1},${data.interviewer2}`,
    "feedback": data.feedback,
    "rating": data.rating.toString(),
  }

  return axiosInstance.put(`/interview/${data.interviewId}?company=${companyId}&client=${clientId}`, payload)
};

export const createAccountInfo = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createContact = async (data, client, company) => {
  let response;
  try {
    const baseUrl = "https://5mlq865rl8.execute-api.us-east-1.amazonaws.com/dev/emergencycontact";
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

export const createBillAddress = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createCompanyProfile = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createCompanyPreference = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createBillingTerm = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};
export const createDescription = async (data) => {
  let response;

  try {
    response = await api.post("endpoint", data);
    return response;
  } catch (error) {
    return error;
  }
};

export const createSalesTeam = async (data) => {
  return axiosInstance.post(`/salesteam?client=${clientId}&company=${companyId}`, data);
};

export const updateSalesTeam = async (data) => {
  return axiosInstance.put(`/salesteam/${data.sales_person_id}?client=${clientId}&company=${companyId}`, data);
};

export const createSalesContact = async (data) => {
  return axiosInstance.post(`/contacts?client=${clientId}&company=${companyId}`, data);
};

export const updateSalesContact = async (data) => {
  return axiosInstance.put(`/contacts/${data.contact_id}?client=${clientId}&company=${companyId}`, data);
};

export const createContactNote = async (data) => {
  return axiosInstance.post(`/notes?client=${clientId}&company=${companyId}`, {
    "notes": data,
    "recordType": 'contact'
  });
};

export const getAllSalesContacts = () => {
  return axiosInstance.get(`/contacts?client=${clientId}&company=${companyId}`)
}


export const getAllSalesVendors = () => {
  return axiosInstance.get(`/vendors?client=${clientId}&company=${companyId}`)
}

export const createVendor = (reqBody) => {
  return axiosInstance.post(`/vendors?client=${clientId}&company=${companyId}`, reqBody)
}

export const getAllTechnologies = () => {
  return axiosInstance.get(`/technology?client=${clientId}&company=${companyId}`)
}

export const createTechnology = (data) => {
  return axiosInstance.post(`/technology?client=${clientId}&company=${companyId}`, {
    "technologyName": data.technologyName,
    "description": data.description,
    "terminology": {
      "test": data.terminology
    }
  })
}

export const updateTechnology = (data) => {
  return axiosInstance.put(`/technology/${data.technologyId}?client=${clientId}&company=${companyId}`, {
    "technologyName": data.technologyName,
    "description": data.description,
    "terminology": {
      "test": data.terminology
    }
  })
}