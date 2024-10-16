import { createSlice } from "@reduxjs/toolkit";


const initialStateObj = {
    gender: [],
    maritalstatus: [],
    profile: [],
    candidatestatus: [],
    countries: [],
    states: [],
    cities: [],
    technologies: [],
    workstatus: [],
    job_titles: [],
    notes_type: [],
    pay_type: [],
    generic_status: []
};

// Check if there is a value in localStorage
const getInitialValue = () => {
    const storedValue = localStorage.getItem('reference');
    return storedValue ? JSON.parse(storedValue) : initialStateObj;
};

const initialState = getInitialValue();

const referenceSlice = createSlice({
    name: "reference",
    initialState,
    reducers: {
        setReference: (state, action) => {
            state = action.payload;
        }
    },
});

export const { setReference } = referenceSlice.actions;
export default referenceSlice.reducer;
