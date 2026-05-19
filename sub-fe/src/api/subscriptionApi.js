import axiosInstance from './axiosConfig';

export const subscribeToPlan = async (subscriptionData) => {
    const response = await axiosInstance.post('/subscriptions/subscribe', subscriptionData);
    return response.data;
};

export const getAllSubscriptions = async () => {
    const response = await axiosInstance.get('/subscriptions');
    return response.data;
};

export const getSubscriptionById = async (id) => {
    const response = await axiosInstance.get(`/subscriptions/${id}`);
    return response.data;
};

export const getSubscriptionsByUserId = async (userId) => {
    const response = await axiosInstance.get(`/subscriptions/user/${userId}`);
    return response.data;
};

export const cancelSubscription = async (id) => {
    await axiosInstance.post(`/subscriptions/${id}/cancel`);
};

export const upgradeSubscription = async (id, newPlanId) => {
    const response = await axiosInstance.put(`/subscriptions/${id}/upgrade`, null, {
        params: { newPlanId }
    });
    return response.data;
};

export const downgradeSubscription = async (id, newPlanId) => {
    const response = await axiosInstance.put(`/subscriptions/${id}/downgrade`, null, {
        params: { newPlanId }
    });
    return response.data;
};
