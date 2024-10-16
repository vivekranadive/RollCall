import { createSlice } from "@reduxjs/toolkit";

// Check if there is a value in localStorage
const getInitialValue = () => {
  const storedValue = localStorage.getItem('user');
  const userInfo = localStorage.getItem('userInfo');
  return storedValue ? { isAuth: true, user: JSON.parse(storedValue), userInfo: JSON.parse(userInfo) } : { isAuth: false, user: null, userInfo: { company: '', client: '' } };
};

const initialState = getInitialValue();

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    setAuth: (state, action) => {
      state.isAuth = true;
    },
    logout: state => {
      state.user = null;
      state.isAuth = false;
    }
  },
});

export const { setUser, logout, setUserInfo, setAuth } = userSlice.actions;
export default userSlice.reducer;
