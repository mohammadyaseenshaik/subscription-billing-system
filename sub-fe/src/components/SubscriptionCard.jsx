import React from 'react';
import StatusBadge from './StatusBadge';
import { CreditCard, Calendar, Package } from 'lucide-react';

const SubscriptionCard = ({ subscription }) => {
    if (!subscription) {
        return (
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200 text-center">
                <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">No Active Plan</h2>
                <p className="text-gray-500 mb-6">Choose a plan to get started with our premium services.</p>
                <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">
                    View Plans
                </button>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Subscription</h2>
                    <h3 className="text-2xl font-bold text-gray-900 mt-1">{subscription.planName}</h3>
                </div>
                <StatusBadge status={subscription.status} />
            </div>

            <div className="space-y-4">
                <div className="flex items-center text-gray-700">
                    <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
                    <span className="text-lg font-semibold">${subscription.amount}/month</span>
                </div>
                <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-gray-400" />
                    <span>Next billing date: <strong>{new Date(subscription.nextBillingDate).toLocaleDateString()}</strong></span>
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button className="flex-1 px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
                    Manage Plan
                </button>
                <button className="flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default SubscriptionCard;
