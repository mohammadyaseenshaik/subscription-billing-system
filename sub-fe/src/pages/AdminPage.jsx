import React, { useState, useEffect } from 'react';
import { getAllPlans, createPlan, deletePlan, updatePlan } from '../api/subscriptionPlanApi';
import { getAllInvoices, createInvoice, updateInvoiceStatus } from '../api/invoiceApi';
import {
  ShieldAlert, Plus, Trash2, CheckCircle2, XCircle,
  RefreshCw, DollarSign, ListPlus, ToggleLeft, ToggleRight,
  Sparkles, Check, AlertCircle, FileText, Settings, CreditCard,
  Layers, Clock, Filter
} from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('plans'); // 'plans' or 'invoices'
  const [plans, setPlans] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form State for Plans
  const [planForm, setPlanForm] = useState({
    name: '',
    description: '',
    price: '',
    billingCycle: 'MONTHLY',
    feature: '',
    isActive: true
  });

  // Form State for Invoices
  const [invoiceForm, setInvoiceForm] = useState({
    subscriptionId: '',
    invoiceNumber: '',
    amount: '',
    status: 'PENDING',
    dueDate: '',
    pdfUrl: 'https://example.com/invoice-receipt.pdf'
  });

  const fetchPlans = async () => {
    try {
      const data = await getAllPlans();
      setPlans(data);
    } catch (err) {
      setError('Failed to fetch subscription plans.');
    }
  };

  const fetchInvoices = async () => {
    try {
      const data = await getAllInvoices();
      setInvoices(data);
    } catch (err) {
      setError('Failed to fetch invoices.');
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError('');
    await Promise.all([fetchPlans(), fetchInvoices()]);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSuccessMsg = (msg) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(''), 4000);
  };

  // Plan Form handlers
  const handlePlanInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlanForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const parsedPrice = parseFloat(planForm.price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      setError('Please enter a valid price.');
      setSubmitting(false);
      return;
    }

    try {
      await createPlan({
        ...planForm,
        price: parsedPrice
      });
      showSuccessMsg('New subscription plan created successfully!');
      setPlanForm({
        name: '',
        description: '',
        price: '',
        billingCycle: 'MONTHLY',
        feature: '',
        isActive: true
      });
      await fetchPlans();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create plan.');
    } finally {
      setSubmitting(false);
    }
  };

  // Invoice Form handlers
  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateInvoice = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const parsedAmount = parseFloat(invoiceForm.amount);
    const parsedSubId = parseInt(invoiceForm.subscriptionId);
    const parsedInvNo = parseInt(invoiceForm.invoiceNumber);

    if (isNaN(parsedSubId) || parsedSubId <= 0) {
      setError('Please enter a valid Subscription ID.');
      setSubmitting(false);
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount < 0) {
      setError('Please enter a valid invoice amount.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        subscriptionId: parsedSubId,
        invoiceNumber: isNaN(parsedInvNo) ? Date.now() % 1000000 : parsedInvNo,
        amount: parsedAmount,
        status: invoiceForm.status,
        dueDate: invoiceForm.dueDate || new Date().toISOString().split('T')[0],
        pdfUrl: invoiceForm.pdfUrl
      };
      await createInvoice(payload);
      showSuccessMsg('Invoice generated and posted successfully!');
      setInvoiceForm({
        subscriptionId: '',
        invoiceNumber: '',
        amount: '',
        status: 'PENDING',
        dueDate: '',
        pdfUrl: 'https://example.com/invoice-receipt.pdf'
      });
      await fetchInvoices();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post invoice. Verify if the Subscription ID exists.');
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle plan active status
  const handleTogglePlanStatus = async (plan) => {
    try {
      await updatePlan(plan.id, {
        name: plan.name,
        description: plan.description,
        price: plan.price,
        billingCycle: plan.billingCycle,
        feature: plan.feature,
        isActive: !plan.isActive
      });
      showSuccessMsg(`Plan "${plan.name}" status updated!`);
      await fetchPlans();
    } catch (err) {
      setError('Failed to update plan status.');
    }
  };

  // Delete plan tier
  const handleDeletePlan = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete the plan "${name}"?`)) return;
    try {
      await deletePlan(id);
      showSuccessMsg(`Plan "${name}" deleted.`);
      await fetchPlans();
    } catch (err) {
      setError('Failed to delete plan. Active subscriptions might be attached to this plan tier.');
    }
  };

  // Change invoice status directly (PATCH)
  const handleInvoiceStatusChange = async (id, newStatus) => {
    try {
      await updateInvoiceStatus(id, newStatus);
      showSuccessMsg(`Invoice ID ${id} status updated to ${newStatus}!`);
      await fetchInvoices();
    } catch (err) {
      setError('Failed to update invoice status.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="w-8 h-8 text-rose-500" />
            Admin Control Center
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Configure system pricing tiers, manage active billing schedules, and post manual invoice records.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-100 rounded-xl px-4 py-2 text-rose-700 text-xs font-semibold self-start sm:self-auto">
          <Sparkles className="w-4 h-4 text-rose-500 animate-pulse" />
          Admin Mode Active
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition ${
            activeTab === 'plans'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          Pricing Plans ({plans.length})
        </button>
        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex items-center gap-2 px-6 py-3 border-b-2 font-semibold text-sm transition ${
            activeTab === 'invoices'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-800'
          }`}
        >
          <FileText className="w-4 h-4" />
          Invoices & Billing ({invoices.length})
        </button>
      </div>

      {/* Alerts */}
      {error && (
        <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 text-sm text-emerald-800 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <Check className="w-5 h-5 flex-shrink-0" />
          {success}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <RefreshCw className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-sm text-gray-500">Loading configurations...</p>
        </div>
      ) : activeTab === 'plans' ? (
        /* PLANS TAB CONTENT */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create Plan Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Plus className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-gray-900 text-base">Add Subscription Tier</h2>
              </div>

              <form onSubmit={handleCreatePlan} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Plan Name</label>
                  <input
                    type="text"
                    name="name"
                    value={planForm.name}
                    onChange={handlePlanInputChange}
                    placeholder="e.g. Pro Premium"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Description</label>
                  <textarea
                    name="description"
                    value={planForm.description}
                    onChange={handlePlanInputChange}
                    placeholder="Summarize features..."
                    rows={2}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Price ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        name="price"
                        value={planForm.price}
                        onChange={handlePlanInputChange}
                        placeholder="29.99"
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Billing Cycle</label>
                    <select
                      name="billingCycle"
                      value={planForm.billingCycle}
                      onChange={handlePlanInputChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition bg-white"
                    >
                      <option value="MONTHLY">Monthly</option>
                      <option value="QUARTERLY">Quarterly</option>
                      <option value="HALF_YEARLY">Half Yearly</option>
                      <option value="YEARLY">Yearly</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    Features <span className="text-gray-400 font-normal">(Comma-separated)</span>
                  </label>
                  <input
                    type="text"
                    name="feature"
                    value={planForm.feature}
                    onChange={handlePlanInputChange}
                    placeholder="10 Users, 50GB Storage"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    required
                  />
                </div>

                <div className="flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={planForm.isActive}
                    onChange={handlePlanInputChange}
                    className="w-4.5 h-4.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="isActive" className="text-xs font-semibold text-gray-700 select-none">
                    Set plan active on creation
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60 transition flex items-center justify-center gap-2 shadow-md shadow-blue-200"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Add Plan Tier
                </button>
              </form>
            </div>
          </div>

          {/* Configured Plans list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Configured Plans</h2>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{plans.length} active tiers</span>
              </div>

              {plans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <Layers className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400">No plan tiers found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Plan Details</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Cycle</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3.5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {plans.map(plan => (
                        <tr key={plan.id} className="hover:bg-gray-50/50 transition">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">{plan.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{plan.description}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">
                            {plan.billingCycle}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            ${plan.price?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            {plan.isActive ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <CheckCircle2 className="w-3 h-3" /> Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-semibold">
                                <XCircle className="w-3 h-3" /> Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button
                                onClick={() => handleTogglePlanStatus(plan)}
                                className="text-gray-400 hover:text-blue-600 transition"
                                title="Toggle Status"
                              >
                                {plan.isActive ? <ToggleRight className="w-6 h-6 text-blue-600" /> : <ToggleLeft className="w-6 h-6" />}
                              </button>
                              <button
                                onClick={() => handleDeletePlan(plan.id, plan.name)}
                                className="text-gray-400 hover:text-red-600 transition"
                                title="Delete Plan"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* INVOICES TAB CONTENT (POST / UPDATE INVOICES) */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Post/Create Invoice Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-2.5 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                  <CreditCard className="w-4.5 h-4.5" />
                </div>
                <h2 className="font-bold text-gray-900 text-base">Generate Invoice</h2>
              </div>

              <form onSubmit={handleCreateInvoice} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Subscription ID</label>
                  <input
                    type="number"
                    name="subscriptionId"
                    value={invoiceForm.subscriptionId}
                    onChange={handleInvoiceInputChange}
                    placeholder="e.g. 1"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    required
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Provide an existing subscription ID linked to a user</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Invoice Number</label>
                    <input
                      type="number"
                      name="invoiceNumber"
                      value={invoiceForm.invoiceNumber}
                      onChange={handleInvoiceInputChange}
                      placeholder="e.g. 100234"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Amount ($)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="number"
                        step="0.01"
                        name="amount"
                        value={invoiceForm.amount}
                        onChange={handleInvoiceInputChange}
                        placeholder="49.00"
                        className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Initial Status</label>
                    <select
                      name="status"
                      value={invoiceForm.status}
                      onChange={handleInvoiceInputChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition bg-white"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PAID">Paid</option>
                      <option value="FAILED">Failed</option>
                      <option value="OVERDUE">Overdue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Due Date</label>
                    <input
                      type="date"
                      name="dueDate"
                      value={invoiceForm.dueDate}
                      onChange={handleInvoiceInputChange}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition bg-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">Receipt PDF Link</label>
                  <input
                    type="url"
                    name="pdfUrl"
                    value={invoiceForm.pdfUrl}
                    onChange={handleInvoiceInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold hover:opacity-95 disabled:opacity-60 transition flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
                >
                  {submitting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                  Post & Save Invoice
                </button>
              </form>
            </div>
          </div>

          {/* Configured Invoices table */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-gray-900">Posted Invoices</h2>
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{invoices.length} billed records</span>
              </div>

              {invoices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <FileText className="w-12 h-12 text-gray-300 mb-3" />
                  <p className="text-sm text-gray-400">No billed invoices found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice / Subscription</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status (Click to toggle)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {invoices.map(invoice => (
                        <tr key={invoice.id} className="hover:bg-gray-50/50 transition">
                          <td className="px-6 py-4">
                            <p className="font-semibold text-gray-900">#INV-{invoice.invoiceNumber || invoice.id}</p>
                            <p className="text-xs text-gray-400 mt-0.5">Sub ID: {invoice.subscriptionId || 'Manual Entry'}</p>
                          </td>
                          <td className="px-6 py-4 text-gray-600 font-medium">
                            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
                          </td>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            ${invoice.amount?.toFixed(2)}
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={invoice.status}
                              onChange={(e) => handleInvoiceStatusChange(invoice.id, e.target.value)}
                              className={`text-xs font-semibold px-2 py-1 rounded-full border-none focus:ring-2 focus:ring-blue-500 bg-opacity-10 cursor-pointer ${
                                invoice.status === 'PAID'
                                  ? 'text-emerald-700 bg-emerald-100'
                                  : invoice.status === 'PENDING'
                                  ? 'text-amber-700 bg-amber-100'
                                  : invoice.status === 'OVERDUE'
                                  ? 'text-rose-700 bg-rose-100'
                                  : 'text-gray-700 bg-gray-100'
                              }`}
                            >
                              <option value="PENDING">Pending</option>
                              <option value="PAID">Paid</option>
                              <option value="FAILED">Failed</option>
                              <option value="OVERDUE">Overdue</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
