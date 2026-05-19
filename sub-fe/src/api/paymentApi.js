import axiosInstance from './axiosConfig';

// Payment Methods
export const savePaymentMethod = async (paymentMethodData) => {
    const response = await axiosInstance.post('/payment-methods', paymentMethodData);
    return response.data;
};

export const getAllPaymentMethods = async () => {
    const response = await axiosInstance.get('/payment-methods');
    return response.data;
};

export const getPaymentMethodsByCustomer = async (customerId) => {
    const response = await axiosInstance.get(`/payment-methods/customer/${customerId}`);
    return response.data;
};

export const setDefaultPaymentMethod = async (id) => {
    const response = await axiosInstance.patch(`/payment-methods/${id}/default`);
    return response.data;
};

// Payment Transactions
export const createTransaction = async (transactionData) => {
    const response = await axiosInstance.post('/transactions', transactionData);
    return response.data;
};

export const getAllTransactions = async () => {
    const response = await axiosInstance.get('/transactions');
    return response.data;
};

export const getTransactionsByInvoice = async (invoiceId) => {
    const response = await axiosInstance.get(`/transactions/invoice/${invoiceId}`);
    return response.data;
};

export const updateTransactionStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/transactions/${id}/status`, null, {
        params: { status }
    });
    return response.data;
};
