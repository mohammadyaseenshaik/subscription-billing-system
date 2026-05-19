import axiosInstance from './axiosConfig';

export const login = async (credentials) => {
    const response = await axiosInstance.post('/auth/login', credentials);
    if (response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

export const register = async (userData) => {
    const response = await axiosInstance.post('/auth/register', userData);
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const createUser = async (userData) => {
    const response = await axiosInstance.post('/users/create', userData);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axiosInstance.get('/users');
    return response.data;
};

export const getUserById = async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axiosInstance.put(`/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    await axiosInstance.delete(`/users/${id}`);
};
