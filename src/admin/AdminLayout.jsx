import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, MessageSquare, ShoppingCart, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { clearSession } from './adminStore';

const SIDEBAR_LINKS = [
  { path: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: 'products', label: 'Products', icon: Package },
  { path: 'inquiries', label: 'Inquiries', icon: MessageSquare },
  { path: 'orders', label: 'Orders', icon: ShoppingCart },
  { path: 'settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const currentBase = location.pathname.split('/').pop();
  const active = SIDEBAR_LINKS.find(l => currentBase === l.path || (currentBase === '' && l.path === 'dashboard'))
    ? currentBase || 'dashboard'
    : 'dashboard';

  const handleNav = (path) => {
    const base = `/${location.pathname.split('/')[1]}`;
    navigate(`${base}/${path}`);
  };

  const handleLogout = () => {
    clearSession();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} transition-all duration-300 border-r border-primary/10 bg-surface/50 flex flex-col flex-shrink-0`}>
        <div className="p-4 border-b border-primary/10 flex items-center justify-between">
          {!collapsed && <span className="font-serif text-lg text-primary font-medium tracking-wider">AETHERIS</span>}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-primary/50 hover:text-primary transition-colors p-1 cursor-pointer"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="flex-1 py-4 space-y-1 px-2">
          {SIDEBAR_LINKS.map(({ path, label, icon: Icon }) => (
            <button
              key={path}
              onClick={() => handleNav(path)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                active === path
                  ? 'bg-primary/10 text-primary border-l-2 border-primary'
                  : 'text-on-surface/50 hover:text-primary hover:bg-primary/5 border-l-2 border-transparent'
              }`}
            >
              <Icon size={16} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-primary/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 text-xs text-on-surface/40 hover:text-red-400 transition-colors uppercase tracking-wider cursor-pointer"
          >
            <LogOut size={16} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
