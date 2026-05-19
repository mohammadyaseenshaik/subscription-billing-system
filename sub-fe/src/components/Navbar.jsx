import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bell, ChevronDown, User, Settings, HelpCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const notifications = [
    { id: 1, title: 'Invoice #1004 Due', body: 'Your invoice is due in 7 days.', time: '2h ago', unread: true },
    { id: 2, title: 'Payment Processed', body: 'Invoice #1003 paid successfully.', time: '3d ago', unread: false },
    { id: 3, title: 'Plan Renewed', body: 'Your Premium plan renewed automatically.', time: '1mo ago', unread: false },
  ];
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/70 fixed w-full z-30 top-0">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Left - Logo (visible on mobile) */}
        <div className="flex items-center gap-2 sm:hidden pl-10">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 text-lg">SubSys</span>
        </div>

        {/* Page context / breadcrumb area */}
        <div className="hidden sm:block">
          <p className="text-sm text-gray-500">
            Welcome back, <span className="font-semibold text-gray-800">{user?.name || 'User'}</span> 👋
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              id="notification-btn"
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="relative w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 transition"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">Notifications</p>
                  <span className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">Mark all read</span>
                </div>
                {notifications.map(n => (
                  <div key={n.id} className={`flex gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition ${n.unread ? 'bg-blue-50/50' : ''}`}>
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.unread ? 'bg-blue-500' : 'bg-gray-300'}`} />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{n.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{n.body}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              id="profile-btn"
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-gray-100 transition group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700 group-hover:text-gray-900">{user?.name?.split(' ')[0] || 'User'}</span>
              <ChevronDown className={`hidden md:block w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</p>
                  <span className="inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">{user?.role}</span>
                </div>
                <div className="py-1">
                  <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition" onClick={() => setProfileOpen(false)}>
                    <User className="w-4 h-4 text-gray-400" /> My Profile
                  </Link>
                  <Link to="/plans" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition" onClick={() => setProfileOpen(false)}>
                    <Settings className="w-4 h-4 text-gray-400" /> Settings
                  </Link>
                  <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition" onClick={() => setProfileOpen(false)}>
                    <HelpCircle className="w-4 h-4 text-gray-400" /> Help & Support
                  </Link>
                </div>
                <div className="border-t border-gray-100 py-1">
                  <button
                    onClick={() => { logout(); setProfileOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
