import React, { useState, useEffect } from 'react';
import { getActivePlans } from '../api/subscriptionPlanApi';
import { subscribeToPlan, getSubscriptionsByUserId, cancelSubscription, upgradeSubscription } from '../api/subscriptionApi';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import {
  Check, Zap, ShieldCheck, Building2, ArrowRight,
  RefreshCw, AlertCircle, Star, ChevronDown, X
} from 'lucide-react';

const PLAN_META = {
  Basic:      { icon: ShieldCheck, gradient: 'from-blue-500 to-cyan-500',   shadow: 'shadow-blue-200',   ring: 'ring-blue-200',   popular: false },
  Premium:    { icon: Zap,         gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-200', ring: 'ring-violet-200', popular: true  },
  Enterprise: { icon: Building2,   gradient: 'from-amber-500 to-orange-600', shadow: 'shadow-amber-200',  ring: 'ring-amber-200',  popular: false },
};

const PlanCard = ({ plan, currentSub, onSubscribe, onUpgrade, onCancel, loading }) => {
  const meta = PLAN_META[plan.name] || PLAN_META.Basic;
  const Icon = meta.icon;
  const isCurrentPlan = currentSub?.planId === plan.id;
  const isLoading = loading === plan.id;
  const features = (plan.feature || '').split(',').filter(Boolean);

  return (
    <div className={`relative bg-white rounded-2xl border-2 p-6 flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      isCurrentPlan
        ? 'border-blue-500 shadow-lg shadow-blue-100'
        : meta.popular
        ? 'border-violet-300 shadow-md'
        : 'border-gray-100 shadow-sm'
    }`}>
      {meta.popular && !isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-md">
            <Star className="w-3 h-3 fill-white" /> Most Popular
          </span>
        </div>
      )}
      {isCurrentPlan && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md">
            <Check className="w-3 h-3" /> Current Plan
          </span>
        </div>
      )}

      {/* Plan Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.gradient} flex items-center justify-center shadow-sm`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
          <p className="text-xs text-gray-400">{plan.billingCycle?.toLowerCase()} billing</p>
        </div>
      </div>

      {/* Price */}
      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-extrabold text-gray-900">${plan.price?.toFixed(2)}</span>
          <span className="text-gray-500 text-sm font-medium">/mo</span>
        </div>
        <p className="text-xs text-gray-400 mt-1">{plan.description}</p>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 flex-1 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${meta.gradient} flex items-center justify-center flex-shrink-0 mt-0.5`}>
              <Check className="w-3 h-3 text-white" />
            </div>
            {feature.trim()}
          </li>
        ))}
      </ul>

      {/* Action Button */}
      {isCurrentPlan ? (
        <button
          onClick={() => onCancel(currentSub.id)}
          disabled={isLoading}
          className="w-full py-2.5 rounded-xl border-2 border-red-200 text-red-600 text-sm font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
          Cancel Plan
        </button>
      ) : currentSub ? (
        <button
          onClick={() => onUpgrade(currentSub.id, plan.id)}
          disabled={isLoading}
          className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${meta.gradient} text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-sm`}
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />}
          {plan.price > (currentSub?.price || 0) ? 'Upgrade' : 'Switch'} to {plan.name}
        </button>
      ) : (
        <button
          onClick={() => onSubscribe(plan.id)}
          disabled={isLoading}
          className={`w-full py-2.5 rounded-xl bg-gradient-to-r ${meta.gradient} text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 shadow-sm ${meta.shadow}`}
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
          Get Started
        </button>
      )}
    </div>
  );
};

const PlansPage = () => {
  const { user } = useAuth();
  const [plans, setPlans] = useState([]);
  const [currentSub, setCurrentSub] = useState(null);
  const [loading, setLoading] = useState(false); // plan id being actioned
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchData = async () => {
    setPageLoading(true);
    try {
      const [plansData, subs] = await Promise.all([
        getActivePlans(),
        user?.id ? getSubscriptionsByUserId(user.id) : Promise.resolve([])
      ]);
      setPlans(plansData);
      const active = subs.find(s => s.status === 'ACTIVE') || null;
      setCurrentSub(active);
    } catch (err) {
      setError('Failed to load plans. Please try again.');
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleSubscribe = async (planId) => {
    if (!user?.id) return;
    setLoading(planId);
    try {
      await subscribeToPlan({ userId: user.id, planId });
      showSuccess('Successfully subscribed! Welcome to SubSys.');
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgrade = async (subId, newPlanId) => {
    setLoading(newPlanId);
    try {
      await upgradeSubscription(subId, newPlanId);
      showSuccess('Plan updated successfully!');
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Plan change failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (subId) => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) return;
    setLoading(currentSub?.planId);
    try {
      await cancelSubscription(subId);
      showSuccess('Subscription cancelled successfully.');
      await fetchData();
    } catch (err) {
      setError('Cancellation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Subscription Plans</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Choose the plan that fits your needs. Upgrade or downgrade at any time.
          All plans include our core features.
        </p>
      </div>

      {/* Alerts */}
      {error && (
        <div className="max-w-2xl mx-auto p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      {successMsg && (
        <div className="max-w-2xl mx-auto p-4 text-sm text-emerald-800 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <Check className="w-5 h-5 flex-shrink-0" />
          {successMsg}
        </div>
      )}

      {/* Current Plan Banner */}
      {currentSub && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-200">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Active Subscription</p>
              <p className="text-lg font-bold text-gray-900">{currentSub.planName} — <span className="text-blue-700">${currentSub.price?.toFixed(2)}/mo</span></p>
              <p className="text-xs text-gray-500">Next billing: {new Date(currentSub.nextBillingDate).toLocaleDateString()}</p>
            </div>
          </div>
          <StatusBadge status={currentSub.status} />
        </div>
      )}

      {/* Plan Cards */}
      {pageLoading ? (
        <div className="flex items-center justify-center h-64">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {plans.map(plan => (
            <PlanCard
              key={plan.id}
              plan={plan}
              currentSub={currentSub}
              onSubscribe={handleSubscribe}
              onUpgrade={handleUpgrade}
              onCancel={handleCancel}
              loading={loading}
            />
          ))}
          {plans.length === 0 && (
            <div className="md:col-span-3 flex flex-col items-center justify-center py-16 text-center">
              <ShieldCheck className="w-12 h-12 text-gray-300 mb-3" />
              <p className="text-gray-500">No active plans available at the moment.</p>
            </div>
          )}
        </div>
      )}

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mt-4">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {[
            ['Can I change my plan at any time?', 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.'],
            ['What happens when I cancel?', 'Your subscription remains active until the end of the billing period. You will not be charged again.'],
            ['Do you offer refunds?', 'We offer a 30-day money-back guarantee for all new subscriptions. Contact support to request a refund.'],
          ].map(([q, a], i) => (
            <details key={i} className="group border border-gray-100 rounded-xl overflow-hidden">
              <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-semibold text-gray-900 hover:bg-gray-50 list-none">
                {q}
                <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="px-4 pb-4 text-sm text-gray-500">{a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlansPage;
