import axiosInstance from './axiosConfig';

export const getAllPlans = async () => {
    const response = await axiosInstance.get('/subscription-plans');
    return response.data;
};

export const getActivePlans = async () => {
    const response = await axiosInstance.get('/subscription-plans/active');
    return response.data;
};

export const getPlanById = async (id) => {
    const response = await axiosInstance.get(`/subscription-plans/${id}`);
    return response.data;
};

export const createPlan = async (planData) => {
    const response = await axiosInstance.post('/subscription-plans', planData);
    return response.data;
};

export const updatePlan = async (id, planData) => {
    const response = await axiosInstance.put(`/subscription-plans/${id}`, planData);
    return response.data;
};

export const deletePlan = async (id) => {
    await axiosInstance.delete(`/subscription-plans/${id}`);
};
