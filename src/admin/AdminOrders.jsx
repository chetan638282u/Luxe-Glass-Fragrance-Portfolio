import React, { useState } from 'react';
import { getOrders, updateOrderStatus } from './adminStore';

const STATUS_FLOW = ['pending', 'confirmed', 'shipped', 'delivered'];

export default function AdminOrders() {
  const [orders, setOrders] = useState(getOrders);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? orders : orders.filter(o => o.status === filter);

  const handleStatus = (id) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;
    const idx = STATUS_FLOW.indexOf(order.status);
    if (idx < STATUS_FLOW.length - 1) {
      updateOrderStatus(id, STATUS_FLOW[idx + 1]);
      setOrders(getOrders());
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-primary">Orders</h1>
        <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">{orders.length} total orders</p>
      </div>

      <div className="flex gap-2">
        {['all', ...STATUS_FLOW].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-sans text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm transition-all cursor-pointer ${
              filter === f ? 'bg-primary text-background' : 'text-on-surface/50 hover:text-primary border border-primary/10'
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="glass-panel rounded-sm border-primary/10 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Order</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4 hidden md:table-cell">Customer</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Items</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Total</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Status</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center font-sans text-xs text-on-surface/40">No orders found.</td></tr>
            ) : filtered.map(order => (
              <tr key={order.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                <td className="p-4">
                  <span className="font-sans text-[10px] text-on-surface/60 font-mono">#{order.id.slice(-6).toUpperCase()}</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <div>
                    <p className="font-sans text-xs text-on-background">{order.customerName || '—'}</p>
                    <p className="font-sans text-[10px] text-on-surface/40">{order.customerEmail || order.email}</p>
                  </div>
                </td>
                <td className="p-4">
                  <span className="font-sans text-xs text-on-surface-variant">
                    {order.items ? order.items.map(i => i.name).join(', ') : order.productName || '—'}
                  </span>
                </td>
                <td className="p-4">
                  <span className="font-serif text-sm text-primary">${order.total}</span>
                </td>
                <td className="p-4">
                  <span className={`font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                    order.status === 'pending' ? 'text-tertiary bg-tertiary-container/30' :
                    order.status === 'confirmed' ? 'text-primary bg-primary/10' :
                    order.status === 'shipped' ? 'text-secondary bg-secondary-container/20' :
                    order.status === 'delivered' ? 'text-on-surface/40' : ''
                  }`}>{order.status}</span>
                </td>
                <td className="p-4">
                  {order.status !== 'delivered' && (
                    <button onClick={() => handleStatus(order.id)}
                      className="font-sans text-[9px] text-primary uppercase tracking-wider hover:text-primary-container transition-colors cursor-pointer">
                      {STATUS_FLOW[STATUS_FLOW.indexOf(order.status) + 1] || '—'}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
