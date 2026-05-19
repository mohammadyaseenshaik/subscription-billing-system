import React, { useState, useEffect } from 'react';
import { getAllInvoices } from '../api/invoiceApi';
import StatusBadge from '../components/StatusBadge';
import {
  FileText, Search, RefreshCw, Download, X, AlertCircle,
  Calendar, CreditCard, Building2, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';

const FILTERS = ['All', 'PAID', 'PENDING', 'FAILED'];

const InvoiceModal = ({ invoice, onClose }) => {
  if (!invoice) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-5 text-white">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-200 uppercase tracking-wider">Invoice Receipt</p>
              <h2 className="text-2xl font-bold mt-0.5">#INV-{invoice.id}</h2>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-blue-200 text-xs">Amount Due</p>
              <p className="text-3xl font-extrabold">${invoice.amount?.toFixed(2)}</p>
            </div>
            <StatusBadge status={invoice.status} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <Calendar className="w-3.5 h-3.5" />
                <p className="text-xs font-medium">Due Date</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2 text-gray-400 mb-1">
                <CreditCard className="w-3.5 h-3.5" />
                <p className="text-xs font-medium">Paid Date</p>
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {invoice.paidAt ? new Date(invoice.paidAt).toLocaleDateString() : 'Unpaid'}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-700">Subscription Service</p>
              <p className="text-sm font-bold text-gray-900">${invoice.amount?.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-500">Tax (0%)</p>
              <p className="text-sm text-gray-500">$0.00</p>
            </div>
            <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
              <p className="text-base font-bold text-gray-900">Total</p>
              <p className="text-base font-bold text-gray-900">${invoice.amount?.toFixed(2)}</p>
            </div>
          </div>

          <div className="p-3 bg-blue-50 rounded-xl text-xs text-blue-700 border border-blue-100">
            <div className="flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5" />
              <span className="font-semibold">SubSys Billing Platform</span>
            </div>
            <p className="mt-1 text-blue-500">Subscription ID: #{invoice.subscriptionId || 'N/A'}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

const PAGE_SIZE = 8;

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      try {
        const data = await getAllInvoices();
        setInvoices(data);
      } catch (err) {
        setError('Failed to load invoices.');
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  useEffect(() => {
    let result = invoices;
    if (activeFilter !== 'All') result = result.filter(i => i.status === activeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i =>
        String(i.id).includes(q) ||
        String(i.amount).includes(q) ||
        (i.status || '').toLowerCase().includes(q)
      );
    }
    setFiltered(result);
    setPage(1);
  }, [invoices, activeFilter, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const statusCounts = FILTERS.reduce((acc, f) => {
    acc[f] = f === 'All' ? invoices.length : invoices.filter(i => i.status === f).length;
    return acc;
  }, {});

  const FILTER_COLORS = {
    All:     'from-gray-600 to-gray-700',
    PAID:    'from-emerald-500 to-teal-600',
    PENDING: 'from-amber-500 to-orange-500',
    FAILED:  'from-red-500 to-rose-600',
  };

  return (
    <div className="space-y-6">
      {selectedInvoice && <InvoiceModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage your full billing history.</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
          <p className="text-xs text-gray-400">Total Invoices</p>
        </div>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-800 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
          <AlertCircle className="w-4 h-4" />{error}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === f
                ? `bg-gradient-to-r ${FILTER_COLORS[f]} text-white shadow-sm`
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {f}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              activeFilter === f ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-500'
            }`}>
              {statusCounts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* Search + Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search Bar */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by invoice ID, amount, or status..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <RefreshCw className="w-7 h-7 text-blue-600 animate-spin" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <FileText className="w-12 h-12 text-gray-200 mb-3" />
            <p className="text-gray-500 text-sm">No invoices match your filters.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Due Date</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginated.map(invoice => (
                    <tr key={invoice.id} className="hover:bg-gray-50 transition group">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            <FileText className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">#INV-{invoice.id}</p>
                            <p className="text-xs text-gray-400">Sub #{invoice.subscriptionId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="text-gray-600">{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : '—'}</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="font-bold text-gray-900">${invoice.amount?.toFixed(2)}</span>
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={invoice.status} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-800 transition"
                          >
                            <Eye className="w-3.5 h-3.5" /> View
                          </button>
                          <button
                            onClick={() => setSelectedInvoice(invoice)}
                            className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition"
                          >
                            <Download className="w-3.5 h-3.5" /> PDF
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100">
                <p className="text-xs text-gray-400">
                  Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition ${
                        page === p
                          ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
