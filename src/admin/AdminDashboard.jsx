import React from 'react';
import { Package, MessageSquare, ShoppingCart, DollarSign, TrendingUp } from 'lucide-react';
import { getProducts, getInquiries, getOrders } from './adminStore';

export default function AdminDashboard() {
  const products = getProducts();
  const inquiries = getInquiries();
  const orders = getOrders();

  const pendingInquiries = inquiries.filter(i => i.status === 'pending').length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const lowStock = products.filter(p => (p.stock || 0) < 5).length;

  const stats = [
    { label: 'Products', value: products.length, icon: Package, color: 'text-primary' },
    { label: 'Pending Inquiries', value: pendingInquiries, icon: MessageSquare, color: 'text-tertiary' },
    { label: 'Orders', value: orders.length, icon: ShoppingCart, color: 'text-secondary' },
    { label: 'Revenue', value: `$${totalRevenue}`, icon: DollarSign, color: 'text-primary' },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-primary">Dashboard</h1>
        <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">Atelier Overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="glass-panel p-5 rounded-sm border-primary/10">
            <div className="flex items-center justify-between mb-3">
              <span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest">{label}</span>
              <Icon size={18} className={color} />
            </div>
            <span className="font-serif text-2xl text-on-background">{value}</span>
          </div>
        ))}
      </div>

      {/* Alerts + Recent */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Low Stock Alert */}
        <div className="glass-panel p-5 rounded-sm border-primary/10">
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
            <TrendingUp size={14} /> Stock Alerts
          </h3>
          {lowStock > 0 ? (
            <p className="font-sans text-sm text-tertiary">
              {lowStock} product{lowStock > 1 ? 's' : ''} with low stock ({'<'}5)
            </p>
          ) : (
            <p className="font-sans text-xs text-on-surface/40">All products adequately stocked.</p>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="glass-panel p-5 rounded-sm border-primary/10">
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-4">Recent Inquiries</h3>
          {recentInquiries.length === 0 ? (
            <p className="font-sans text-xs text-on-surface/40">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map(inq => (
                <div key={inq.id} className="flex items-center justify-between border-b border-primary/5 pb-2 last:border-b-0">
                  <div>
                    <p className="font-sans text-xs text-on-background">{inq.name}</p>
                    <p className="font-sans text-[10px] text-on-surface/40">{inq.email}</p>
                  </div>
                  <span className={`font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    inq.status === 'pending' ? 'text-tertiary bg-tertiary-container/30' : 'text-on-surface/40'
                  }`}>
                    {inq.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
