import React from 'react';
import StatusBadge from './StatusBadge';
import { Download, FileText } from 'lucide-react';

const InvoiceList = ({ invoices }) => {
    if (!invoices || invoices.length === 0) {
        return (
            <div className="p-12 text-center bg-white rounded-lg border border-gray-200">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No invoices found for your account.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                        <th className="px-6 py-3">Invoice ID</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3">Amount</th>
                        <th className="px-6 py-3">Status</th>
                        <th className="px-6 py-3">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4 font-medium text-gray-900">#INV-{invoice.id}</td>
                            <td className="px-6 py-4">{new Date(invoice.billingDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 font-semibold text-gray-900">${invoice.amount}</td>
                            <td className="px-6 py-4">
                                <StatusBadge status={invoice.status} />
                            </td>
                            <td className="px-6 py-4">
                                <button className="text-primary-600 hover:text-primary-800 flex items-center font-medium">
                                    <Download className="w-4 h-4 mr-1" /> PDF
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InvoiceList;
