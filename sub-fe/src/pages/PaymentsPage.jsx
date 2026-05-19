import React, { useState, useEffect } from 'react';
import {
  getAllPaymentMethods, getPaymentMethodsByCustomer,
  savePaymentMethod, setDefaultPaymentMethod,
  getAllTransactions
} from '../api/paymentApi';
import StatusBadge from '../components/StatusBadge';
import {
  CreditCard, Plus, RefreshCw, Check, AlertCircle,
  X, Trash2, Star, ArrowDownLeft, ArrowUpRight, Wifi,
  Building2, Activity
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CARD_GRADIENTS = [
  'from-blue-600 to-indigo-700',
  'from-violet-600 to-purple-700',
  'from-emerald-600 to-teal-700',
  'from-rose-600 to-pink-700',
  'from-amber-500 to-orange-600',
];

const getCardGradient = (index) => CARD_GRADIENTS[index % CARD_GRADIENTS.length];

const getCardType = (cardNumber) => {
  const n = (cardNumber || '').replace(/\s/g, '');
  if (n.startsWith('4')) return 'VISA';
  if (n.startsWith('5') || n.startsWith('2')) return 'MASTERCARD';
  if (n.startsWith('3')) return 'AMEX';
  return 'CARD';
};

const CreditCardVisual = ({ method, index, onSetDefault, onDelete }) => {
  const gradient = getCardGradient(index);
  const cardType = method.methodType || getCardType(method.cardNumber || '');
  const last4 = method.last4 || (method.cardNumber || '').slice(-4) || '••••';

  return (
    <div className={`relative bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full aspect-[1.586/1] min-h-[200px] flex flex-col justify-between overflow-hidden`}>
      {/* Decorative circles */}
      <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/10" />
      <div className="absolute -right-4 -top-4 w-20 h-20 rounded-full bg-white/10" />

      <div className="flex items-start justify-between">
        <div>
          {method.isDefault && (
            <span className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm">
              <Star className="w-3 h-3 fill-white" /> Default
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Wifi className="w-5 h-5 opacity-70 rotate-90" />
        </div>
      </div>

      <div>
        <p className="text-lg font-mono font-semibold tracking-widest opacity-90">
          •••• •••• •••• {last4}
        </p>
        <div className="flex items-end justify-between mt-3">
          <div>
            <p className="text-xs opacity-60 uppercase tracking-wider">Card Holder</p>
            <p className="text-sm font-semibold">{method.cardHolderName || 'Card Holder'}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-60 uppercase tracking-wider">Expires</p>
            <p className="text-sm font-semibold">{method.expiryDate || '••/••'}</p>
          </div>
          <div className="text-2xl font-bold opacity-90">{cardType}</div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-3 right-3 flex gap-1.5">
        {!method.isDefault && (
          <button
            onClick={() => onSetDefault(method.id)}
            title="Set as default"
            className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition backdrop-blur-sm"
          >
            <Star className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDelete && onDelete(method.id)}
          title="Remove card"
          className="w-7 h-7 rounded-lg bg-white/20 hover:bg-red-400/50 flex items-center justify-center transition backdrop-blur-sm"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

const AddCardModal = ({ onClose, onSave, loading }) => {
  const [form, setForm] = useState({
    cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '', methodType: 'CREDIT_CARD'
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.cardHolderName.trim()) e.cardHolderName = 'Name is required';
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Enter a valid 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(form.expiryDate)) e.expiryDate = 'Format: MM/YY';
    if (form.cvv.length < 3) e.cvv = 'CVV must be at least 3 digits';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSave(form);
  };

  const formatCardNumber = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (v) => {
    const digits = v.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 overflow-hidden">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5 flex items-center justify-between text-white">
          <div>
            <h2 className="text-lg font-bold">Add Payment Method</h2>
            <p className="text-blue-200 text-xs mt-0.5">Your card details are securely encrypted.</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Holder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.cardHolderName}
              onChange={e => setForm(f => ({ ...f, cardHolderName: e.target.value }))}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${errors.cardHolderName ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
            />
            {errors.cardHolderName && <p className="text-xs text-red-500 mt-1">{errors.cardHolderName}</p>}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Number</label>
            <div className="relative">
              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={e => setForm(f => ({ ...f, cardNumber: formatCardNumber(e.target.value) }))}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${errors.cardNumber ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
            </div>
            {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                value={form.expiryDate}
                onChange={e => setForm(f => ({ ...f, expiryDate: formatExpiry(e.target.value) }))}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${errors.expiryDate ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.expiryDate && <p className="text-xs text-red-500 mt-1">{errors.expiryDate}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">CVV</label>
              <input
                type="password"
                placeholder="•••"
                maxLength={4}
                value={form.cvv}
                onChange={e => setForm(f => ({ ...f, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition ${errors.cvv ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
              />
              {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">Card Type</label>
            <select
              value={form.methodType}
              onChange={e => setForm(f => ({ ...f, methodType: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition"
            >
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="DEBIT_CARD">Debit Card</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition">
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              Save Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PaymentsPage = () => {
  const { user } = useAuth();
  const [methods, setMethods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const showSuccessMsg = (msg) => { setSuccess(msg); setTimeout(() => setSuccess(''), 4000); };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [methodsData, txData] = await Promise.all([
        getAllPaymentMethods(),
        getAllTransactions(),
      ]);
      setMethods(methodsData);
      setTransactions(txData);
    } catch (err) {
      setError('Failed to load payment data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSaveCard = async (formData) => {
    setSaving(true);
    try {
      await savePaymentMethod({ ...formData, customerId: user?.id });
      setShowModal(false);
      showSuccessMsg('Payment method added successfully!');
      await fetchData();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save payment method.');
    } finally {
      setSaving(false);
    }
  };

  const handleSetDefault = async (id) => {
    try {
      await setDefaultPaymentMethod(id);
      showSuccessMsg('Default payment method updated!');
      await fetchData();
    } catch {
      setError('Failed to set default payment method.');
    }
  };

  return (
    <div className="space-y-6">
      {showModal && <AddCardModal onClose={() => setShowModal(false)} onSave={handleSaveCard} loading={saving} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Payment Methods</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your cards and view transaction history.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold shadow-md shadow-blue-200 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
        >
          <Plus className="w-4 h-4" /> Add Card
        </button>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-4 h-4" />{error}
          <button onClick={() => setError('')} className="ml-auto"><X className="w-4 h-4" /></button>
        </div>
      )}
      {success && (
        <div className="p-4 text-sm text-emerald-800 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-3">
          <Check className="w-4 h-4" />{success}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {/* Credit Cards Wallet */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">My Cards</h2>
            {methods.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                  <CreditCard className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">No cards yet</h3>
                <p className="text-sm text-gray-400 mb-5">Add a credit or debit card to get started.</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
                >
                  <Plus className="w-4 h-4" /> Add First Card
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {methods.map((method, idx) => (
                  <CreditCardVisual
                    key={method.id}
                    method={method}
                    index={idx}
                    onSetDefault={handleSetDefault}
                  />
                ))}
                {/* Add Card Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center py-12 hover:border-blue-300 hover:bg-blue-50 transition group min-h-[200px]"
                >
                  <div className="w-12 h-12 rounded-xl bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition">
                    <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition" />
                  </div>
                  <p className="text-sm font-semibold text-gray-500 group-hover:text-blue-600 transition">Add New Card</p>
                </button>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Transaction History</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Activity className="w-12 h-12 text-gray-200 mb-3" />
                  <p className="text-sm text-gray-500">No transactions found.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition group">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          tx.status === 'SUCCESS' || tx.status === 'COMPLETED'
                            ? 'bg-emerald-100'
                            : tx.status === 'FAILED'
                            ? 'bg-red-100'
                            : 'bg-amber-100'
                        }`}>
                          {tx.status === 'SUCCESS' || tx.status === 'COMPLETED'
                            ? <ArrowDownLeft className="w-5 h-5 text-emerald-600" />
                            : tx.status === 'FAILED'
                            ? <AlertCircle className="w-5 h-5 text-red-600" />
                            : <ArrowUpRight className="w-5 h-5 text-amber-600" />
                          }
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {tx.transactionType || 'Payment'} — Txn #{tx.id}
                          </p>
                          <p className="text-xs text-gray-400">
                            Invoice #{tx.invoiceId} • {tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString() : 'N/A'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="font-bold text-gray-900">${tx.amount?.toFixed(2)}</p>
                        <StatusBadge status={tx.status} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentsPage;
