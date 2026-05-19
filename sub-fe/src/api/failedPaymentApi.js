import axiosInstance from './axiosConfig';

export const createFailedPaymentLog = async (logData) => {
    const response = await axiosInstance.post('/failed-payments', logData);
    return response.data;
};

export const getAllFailedPayments = async () => {
    const response = await axiosInstance.get('/failed-payments');
    return response.data;
};

export const getPendingRetries = async () => {
    const response = await axiosInstance.get('/failed-payments/pending');
    return response.data;
};

export const updateRetryCount = async (id) => {
    const response = await axiosInstance.patch(`/failed-payments/${id}/retry`);
    return response.data;
};
