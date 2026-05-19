import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSubscriptionsByUserId } from '../api/subscriptionApi';
import { getAllInvoices } from '../api/invoiceApi';
import StatusBadge from '../components/StatusBadge';
import {
  TrendingUp, CreditCard, FileText, ShieldCheck,
  RefreshCw, AlertCircle, ArrowUpRight, Zap,
  DollarSign, Calendar, Activity, Package
} from 'lucide-react';
import { Link } from 'react-router-dom';

const StatCard = ({ icon: Icon, label, value, sub, gradient, trend }) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div className="flex items-start justify-between">
      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-sm`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${trend >= 0 ? 'text-emerald-700 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>
          <TrendingUp className="w-3 h-3" />
          {trend >= 0 ? '+' : ''}{trend}%
        </div>
      )}
    </div>
    <div className="mt-4">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-600 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

const DashboardPage = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');
      try {
        if (user?.id) {
          const subs = await getSubscriptionsByUserId(user.id);
          const activeSub = subs.find(s => s.status === 'ACTIVE') || subs[0] || null;
          setSubscription(activeSub);

          if (activeSub?.id) {
            const allInvoices = await getAllInvoices();
            setInvoices(allInvoices.slice(0, 5));
          }
        }
      } catch (err) {
        setError('Could not load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-sm text-gray-500">Loading your dashboard...</p>
      </div>
    );
  }

  const totalSpend = invoices.filter(i => i.status === 'PAID').reduce((acc, i) => acc + i.amount, 0);
  const pendingCount = invoices.filter(i => i.status === 'PENDING').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Here's what's happening with your subscription today.
          </p>
        </div>
        <Link
          to="/plans"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
        >
          <Zap className="w-4 h-4" />
          Upgrade Plan
        </Link>
      </div>

      {error && (
        <div className="p-4 text-sm text-amber-800 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-3" role="alert">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ShieldCheck}
          label="Active Plan"
          value={subscription?.planName || 'None'}
          sub={subscription ? `$${subscription.price?.toFixed(2)}/mo` : 'No active plan'}
          gradient="from-blue-500 to-indigo-600"
          trend={subscription ? 0 : undefined}
        />
        <StatCard
          icon={DollarSign}
          label="Total Spent"
          value={`$${totalSpend.toFixed(2)}`}
          sub="All-time billing"
          gradient="from-emerald-500 to-teal-600"
          trend={12}
        />
        <StatCard
          icon={FileText}
          label="Total Invoices"
          value={invoices.length}
          sub={`${pendingCount} pending`}
          gradient="from-amber-500 to-orange-500"
        />
        <StatCard
          icon={Activity}
          label="Status"
          value={subscription?.status || 'INACTIVE'}
          sub={subscription ? `Since ${new Date(subscription.startDate).toLocaleDateString()}` : 'Subscribe to activate'}
          gradient="from-violet-500 to-purple-600"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Subscription Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden h-full">
            {!subscription ? (
              <div className="flex flex-col items-center justify-center p-8 h-full text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 mb-1">No Active Plan</h2>
                <p className="text-sm text-gray-500 mb-6">Choose a plan to unlock all features.</p>
                <Link to="/plans" className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg transition">
                  Browse Plans
                </Link>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Current Plan</p>
                    <h2 className="text-2xl font-bold text-gray-900 mt-1">{subscription.planName}</h2>
                  </div>
                  <StatusBadge status={subscription.status} />
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 mb-5">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-blue-700">${subscription.price?.toFixed(2)}</span>
                    <span className="text-sm text-blue-500 font-medium">/month</span>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>Start Date</span>
                    </div>
                    <span className="font-semibold text-gray-800">{new Date(subscription.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                      <CreditCard className="w-4 h-4" />
                      <span>Next Billing</span>
                    </div>
                    <span className="font-semibold text-gray-800">{new Date(subscription.nextBillingDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link to="/plans" className="flex-1 text-center px-3 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition">
                    Manage
                  </Link>
                  <button className="flex-1 px-3 py-2 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition border border-red-100">
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="font-bold text-gray-900">Recent Invoices</h2>
              <Link to="/invoices" className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition">
                View all <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {invoices.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-12 text-center">
                <FileText className="w-10 h-10 text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">No invoices yet.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">#INV-{invoice.id}</p>
                        <p className="text-xs text-gray-400">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="text-sm font-bold text-gray-900">${invoice.amount?.toFixed(2)}</p>
                      <StatusBadge status={invoice.status} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl text-white shadow-lg shadow-blue-200">
          <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-1">Need Help?</h3>
          <p className="text-blue-100 mb-5 text-sm">Our support team is available 24/7 to assist you with any billing or technical issues.</p>
          <button className="px-4 py-2 bg-white text-blue-700 rounded-xl text-sm font-bold hover:bg-blue-50 transition shadow-sm">
            Contact Support
          </button>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mb-4">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-bold mb-1 text-gray-900">Refer & Earn</h3>
          <p className="text-gray-500 mb-5 text-sm">Invite friends to SubSys and earn $10 credit for every successful referral.</p>
          <button className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold hover:from-amber-600 hover:to-orange-600 transition shadow-sm shadow-amber-200">
            Invite Friends
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
