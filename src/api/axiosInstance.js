import axios from 'axios';
import { store } from '../store/store';
import { logout } from '../features/user/userSlice';

const axiosInstance = axios.create({
    baseURL: 'https://5mlq865rl8.execute-api.us-east-1.amazonaws.com/dev',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const user = state.user?.user;

        if (user) {
            const auth_token_key = `CognitoIdentityServiceProvider.${user.aud}.${user['cognito:username']}.idToken`;
            config.headers.Authorization = localStorage.getItem(auth_token_key);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error.toJSON(), 'Cheking the error')
        if (error.response.status === 401) {
            store.dispatch(logout()); // Clear user data from the store
            localStorage.clear();
            window.location.replace('/login'); // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;