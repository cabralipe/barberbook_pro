import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api/',
});

export const getShops = async () => {
    const response = await api.get('shops/');
    return response.data;
};

export const getServices = async () => {
    const response = await api.get('services/');
    return response.data;
};

export const getBarbers = async () => {
    const response = await api.get('barbers/');
    return response.data;
};

export const createBooking = async (bookingData: any) => {
    const response = await api.post('bookings/', bookingData);
    return response.data;
};

export const login = async (credentials: any) => {
    const response = await api.post('auth/jwt/create/', credentials);
    return response.data;
};

export const register = async (userData: any) => {
    const response = await api.post('auth/users/', userData);
    return response.data;
};

export const setAuthToken = (token: string) => {
    if (token) {
        api.defaults.headers.common['Authorization'] = `JWT ${token}`;
    } else {
        delete api.defaults.headers.common['Authorization'];
    }
};

export default api;
