import axiosInstance from "./axiosInstance";
import { getUserInfoDetails } from "../utlis";
import { formatDate } from "../utlis";

const { companyId, clientId } = getUserInfoDetails()

// POST Request

export const createCandidate = async (parseBody) => {
  return axiosInstance.post(`/candidates?client=${clientId}&company=${companyId}`, {
    ...parseBody, dob: formatDate(parseBody.dob),
    workStatusIssueDate: formatDate(parseBody.workStatusIssueDate),
    workStatusEndDate: formatDate(parseBody.workStatusEndDate),
    lastInterviewOn: formatDate(parseBody.lastInterviewOn)
  });
};

export const updateCandidate = async (parseBody, candidateID) => {
  return axiosInstance.put(`/candidates/${candidateID}?client=${clientId}&company=${companyId}`, {
    ...parseBody, dob: formatDate(parseBody.dob),
    workStatusIssueDate: formatDate(parseBody.workStatusIssueDate),
    workStatusEndDate: formatDate(parseBody.workStatusEndDate),
    lastInterviewOn: formatDate(parseBody.lastInterviewOn)
  });
};

export const createMarketingHistory = async (data, candidateID) => {
  return axiosInstance.post(`/marketing?client=${clientId}&company=${companyId}`, {
    candidateId: String(candidateID),
    email: data.email,
    startDate: formatDate(data.marketingStartDate),
    endDate: formatDate(data.marketingEndDate),
    salesPersonId: +data.salesPerson,
    linkedin: data.linkedInID,
    skype: data.skypeID,
    status: data.marketingStatus
  });
};

export const createNote = async (data, candidateID, noteType) => {
  return axiosInstance.post(`/notes?client=${clientId}&company=${companyId}&candidateId=${candidateID}`, {
    "candidateId": String(candidateID),
    "notes": data,
    "recordType": noteType
  });
};

export const createMarketingList = async (data, candidateID) => {
  return axiosInstance.post(`/marketing?client=${clientId}&company=${companyId}`, {
    candidateId: String(candidateID),
    startDate: formatDate(data.salesStartDate),
    endDate: formatDate(data.salesEndDate),
    totalJobsApplied: +data.jobsApplied,
    totalInterviewsAttended: +data.interviewsAttended,
    status: data.marketingStatus
  });
};


export const createMarketingJob = async (data, candidateID) => {
  return axiosInstance.post(`/jobs?client=${clientId}&company=${companyId}&candidateId=${candidateID}`, {
    candidateId: String(candidateID),
    jobTitle: data.jobTitle,
    vendorId: +data.vendorId,
    technologyId: +data.technology,
    billRate: +data.billRate,
    duration: +data.duration,
    jobDesc: data.jobType,
    city: data.city,
    state: data.state,
    salesPerson: data.salesPerson
  });
};


export const createJobInterview = async (data, candidateID) => {
  return axiosInstance.post(`/interview?client=${clientId}&company=${companyId}`, {
    candidateId: candidateID,
    interviewDate: formatDate(data.interviewDate),
    vendorId: data.vendorName || 2,
    //inteviewTime: data.interviewTime,
    appointmentLink: data.appointmentDetailsLink,
    interviewPanelDetails: data.panelDetails,
    feedback: data.feedback,
    rating: String(data.rating)
  });
};

export const createInterview = async (data, candidateID) => {
  return axiosInstance.post(`/interview?client=${clientId}&company=${companyId}`, {
    candidateId: candidateID,
    jobId: +data.job,
    interviewDate: formatDate(data.date),
    interviewPanelDetails: data.interviewPanelDetails,
    feedback: data.feedBack,
  });
};

export const createProject = async (data, candidateID) => {
  return axiosInstance.post(`/projects?client=${clientId}&company=${companyId}`, {
    candidateId: candidateID,
    client: data.client,
    jobId: +data.job,
    startDate: formatDate(data.startDate),
    estimatedEndDate: formatDate(data.endDate),
    status: data.projectStatus,
    city: data.city
  });
};

export const createTraining = async (data, candidateID) => {
  return axiosInstance.post(`/training?client=${clientId}&company=${companyId}`, {
    candidateId: candidateID,
    clientName: data.clientName,
    status: data.trainingStatus,
    vendor: data.vendor,
    city: data.city,
    startDate: formatDate(data.startDate),
    endDate: formatDate(data.endDate)
  });
};

export const createDocment = async (data, candidateID) => {
  return axiosInstance.post(`/document?client=${clientId}&company=${companyId}`, {
    candidateId: candidateID,
    documentName: data.documentName,
    link: data.link,
    description: data.description,
    createdDate: formatDate(data.createdDate),
    updatedDate: formatDate(data.updatedDate),
  });
};

export const fetchMarketingList = (additionalParam) => {
  return axiosInstance.get('/marketing', {
    params: { company: companyId, client: clientId, ...additionalParam }
  });
}

export const fetchJobList = (additionalParam) => {
  return axiosInstance.get('/jobs', {
    params: { company: companyId, client: clientId, ...additionalParam }
  });
}

export const fetchProjectList = (additionalParam) => {
  return axiosInstance.get('/projects', {
    params: { company: companyId, client: clientId, ...additionalParam }
  });
}

export const fetchTrainingList = (additionalParam) => {
  return axiosInstance.get('/training', {
    params: { company: companyId, client: clientId, ...additionalParam }
  });
}

export const getAllSalesPerson = () => {
  return axiosInstance.get('/salesteam', {
    params: { company: companyId, client: clientId }
  })
}

const ContactType = {
  1: 'primary',
  2: 'secondary'
};

export const createEmergencyContact = (contactInfo, candidateId, sequence) => {

  return axiosInstance.post('/emergencycontact', {
    sequence,
    candidateId: candidateId.toString(),
    "firstName": contactInfo.firstName,
    "type": ContactType[sequence],
    "lastName": contactInfo.lastName,
    "phone": {
      "phone": contactInfo.contactPhoneNum,
    },
    "relation": contactInfo.contactRelation,
    status: "ACTIVE"
  })
}

export const updateEmergencyContact = (contactInfo, candidateId, sequence) => {

  return axiosInstance.put('/emergencycontact', {
    sequence,
    candidateId: candidateId.toString(),
    "firstName": contactInfo.firstName,
    "type": ContactType[sequence],
    "lastName": contactInfo.lastName,
    "phone": {
      "phone": contactInfo.contactPhoneNum,
    },
    "relation": contactInfo.contactRelation,
    status: "ACTIVE"
  })
}

export const getAllNotes = (additionalParam) => {
  return axiosInstance.get('/notes', {
    params: {
      company: companyId, client: clientId, ...additionalParam
    }
  })
}