import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  basic: {
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    maritalStatus: "",
    dob: "",
    email: "",
    phone: "",
    alternatePhoneNum: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    status: ""
  },
  professional: {
    jobTitle: "",
    salesPerson: "",
    technology: "",
    workPermitStatus: "",
    workStatusIssueDate: "",
    workStatusEndDate: "",
    SSN: "",
    employmentStatus: "",
    referredBy: "",
  },
  profile: {
    totalInterviews: "",
    activeInterviews: "",
    passedInterviews: "",
    failedInterviews: "",
    holdInterviews: "",
    lastInterviewOn: "",
    rating: 0,
  },
  emergencyContacts: {
    contactInfo1: {
      contactName: "",
      contactPhoneNum: "",
      email: "",
      contactRelation: "",
    },
    contactInfo2: {
      contactName: "",
      contactPhoneNum: "",
      email: "",
      contactRelation: "",
    },
  },
  candidateId: ''
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    setBasicInfo: (state, action) => {
      state.basic.firstName = action.payload.firstName;
      state.basic.middleName = action.payload.middleName;
      state.basic.lastName = action.payload.lastName;
      state.basic.gender = action.payload.gender;
      state.basic.maritalStatus = action.payload.maritalStatus;
      state.basic.dob = action.payload.dob;
      state.basic.email = action.payload.email;
      state.basic.phone = action.payload.phone;
      state.basic.alternatePhoneNum = action.payload.alternatePhoneNum;
      state.basic.address1 = action.payload.address1;
      state.basic.address2 = action.payload.address2;
      state.basic.city = action.payload.city;
      state.basic.state = action.payload.state;
      state.basic.zip = action.payload.zip;
      state.basic.status = action.payload.status;
    },
    setProfessionalInfo: (state, action) => {
      state.professional.jobTitle = action.payload.jobTitle;
      state.professional.salesPerson = action.payload.salesPerson;
      state.professional.technology = action.payload.technology;
      state.professional.workPermitStatus = action.payload.workPermitStatus;
      state.professional.SSN = action.payload.SSN;
      state.professional.workStatusIssueDate =
        action.payload.workStatusIssueDate;
      state.professional.workStatusEndDate =
        action.payload.workStatusEndDate;
      state.professional.employmentStatus = action.payload.employmentStatus;
      state.professional.referredBy = action.payload.referredBy;
    },
    setProfileInfo: (state, action) => {
      state.profile.totalInterviews = +action.payload.totalInterviews;
      state.profile.activeInterviews = +action.payload.activeInterviews;
      state.profile.passedInterviews = +action.payload.passedInterviews;
      state.profile.failedInterviews = +action.payload.failedInterviews;
      state.profile.holdInterviews = +action.payload.holdInterviews;
      state.profile.lastInterviewOn = action.payload.lastInterviewOn;
      state.profile.rating = action.payload.rating;
    },
    setEmergencyContacts: (state, action) => {
      // set contact1
      state.emergencyContacts.contactInfo1.firstName =
        action.payload.contact1.firstName;
      state.emergencyContacts.contactInfo1.lastName =
        action.payload.contact1.lastName;
      state.emergencyContacts.contactInfo1.contactPhoneNum =
        action.payload.contact1.contactPhoneNum;
      state.emergencyContacts.contactInfo1.email =
        action.payload.contact1.email;
      state.emergencyContacts.contactInfo1.contactRelation =
        action.payload.contact1.contactRelation;

      // set contact2
      state.emergencyContacts.contactInfo2.firstName =
        action.payload.contact2.firstName;
      state.emergencyContacts.contactInfo2.lastName =
        action.payload.contact2.lastName;
      state.emergencyContacts.contactInfo2.contactPhoneNum =
        action.payload.contact2.contactPhoneNum;
      state.emergencyContacts.contactInfo2.email =
        action.payload.contact2.email;
      state.emergencyContacts.contactInfo2.contactRelation =
        action.payload.contact2.contactRelation;
    },
    setCandidateId: (state, action) => {
      state.candidateId = action.payload;
    },

    resetState: (state, action) => initialState,
  },
});

export const {
  setBasicInfo,
  setProfessionalInfo,
  setProfileInfo,
  setEmergencyContacts,
  setCandidateId,
  resetState,
} = personalSlice.actions;

export default personalSlice.reducer;
