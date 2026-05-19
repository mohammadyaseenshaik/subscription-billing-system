import axiosInstance from './axiosConfig';

export const createInvoice = async (invoiceData) => {
    const response = await axiosInstance.post('/invoices', invoiceData);
    return response.data;
};

export const getAllInvoices = async () => {
    const response = await axiosInstance.get('/invoices');
    return response.data;
};

export const getInvoiceById = async (id) => {
    const response = await axiosInstance.get(`/invoices/${id}`);
    return response.data;
};

export const getInvoicesBySubscription = async (subscriptionId) => {
    const response = await axiosInstance.get(`/invoices/subscription/${subscriptionId}`);
    return response.data;
};

export const updateInvoiceStatus = async (id, status) => {
    const response = await axiosInstance.patch(`/invoices/${id}/status`, null, {
        params: { status }
    });
    return response.data;
};
