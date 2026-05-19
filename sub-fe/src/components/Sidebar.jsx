import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CreditCard, FileText, Settings,
  ShieldCheck, ChevronRight, Zap, Menu, X
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard',       path: '/',         icon: LayoutDashboard, color: 'from-blue-500 to-indigo-600' },
    { name: 'Plans',           path: '/plans',    icon: ShieldCheck,     color: 'from-violet-500 to-purple-600' },
    { name: 'Invoices',        path: '/invoices', icon: FileText,        color: 'from-emerald-500 to-teal-600' },
    { name: 'Payment Methods', path: '/payments', icon: CreditCard,      color: 'from-amber-500 to-orange-600' },
  ];

  if (isAdmin) {
    navItems.push({ name: 'Admin Panel', path: '/admin', icon: Settings, color: 'from-rose-500 to-red-600' });
  }

  const SidebarContent = () => (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-md shadow-blue-200">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-gray-900 text-lg leading-none tracking-tight">SubSys</p>
          <p className="text-xs text-gray-400 mt-0.5">Billing Platform</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">Navigation</p>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.path === '/'}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? `bg-gradient-to-br ${item.color} shadow-sm`
                    : 'bg-gray-100 group-hover:bg-gray-200'
                }`}>
                  <item.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`} />
                </div>
                <span className="flex-1">{item.name}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-blue-500 opacity-70" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Info Footer */}
      <div className="px-4 py-4 border-t border-gray-100">
        <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition cursor-pointer">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm flex-shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
          </div>
          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium flex-shrink-0 ${
            isAdmin ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'
          }`}>
            {user?.role || 'USER'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 w-9 h-9 rounded-lg bg-white shadow-md border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-30"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <aside className={`sm:hidden fixed top-0 left-0 z-40 w-72 h-screen transition-transform duration-300 ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarContent />
      </aside>

      {/* Sidebar - Desktop */}
      <aside className="hidden sm:block fixed top-0 left-0 z-20 w-64 h-screen">
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;
