import React, { useState } from 'react';
import { Check, Archive, Eye, X } from 'lucide-react';
import { getInquiries, updateInquiryStatus } from './adminStore';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState(getInquiries);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  const handleStatus = (id, status) => {
    updateInquiryStatus(id, status);
    setInquiries(getInquiries());
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-primary">Inquiries</h1>
        <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">{inquiries.length} total submissions</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {['all', 'pending', 'resolved', 'archived'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`font-sans text-[10px] uppercase tracking-wider px-4 py-2 rounded-sm transition-all cursor-pointer ${
              filter === f ? 'bg-primary text-background' : 'text-on-surface/50 hover:text-primary border border-primary/10'
            }`}>
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* List */}
        <div className="glass-panel rounded-sm border-primary/10 max-h-[70vh] overflow-y-auto no-scrollbar">
          {filtered.length === 0 ? (
            <p className="p-6 font-sans text-xs text-on-surface/40 text-center">No inquiries found.</p>
          ) : filtered.map(inq => (
            <div key={inq.id}
              onClick={() => setSelected(inq)}
              className={`p-4 border-b border-primary/5 cursor-pointer transition-all hover:bg-primary/5 ${
                selected?.id === inq.id ? 'bg-primary/10 border-l-2 border-l-primary' : ''
              }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-serif text-sm text-on-background">{inq.name}</span>
                <span className={`font-sans text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                  inq.status === 'pending' ? 'text-tertiary bg-tertiary-container/30' :
                  inq.status === 'resolved' ? 'text-primary bg-primary/10' : 'text-on-surface/30'
                }`}>{inq.status}</span>
              </div>
              <p className="font-sans text-[10px] text-on-surface/40 truncate">{inq.email}</p>
              <p className="font-sans text-xs text-on-surface-variant mt-1 line-clamp-2">{inq.notes || inq.message}</p>
            </div>
          ))}
        </div>

        {/* Detail Panel */}
        <div className="glass-panel rounded-sm border-primary/10 p-6">
          {!selected ? (
            <p className="font-sans text-xs text-on-surface/40 text-center mt-12">Select an inquiry to view details.</p>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-primary">{selected.name}</h3>
                <button onClick={() => setSelected(null)} className="text-on-surface/30 hover:text-primary cursor-pointer">
                  <X size={16} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                <div><span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block">Email</span><span className="font-sans text-xs text-on-background">{selected.email}</span></div>
                {selected.productName && <div><span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block">Product</span><span className="font-sans text-xs text-on-background">{selected.productName}</span></div>}
                {selected.type && <div><span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block">Type</span><span className="font-sans text-xs text-on-background">{selected.type}</span></div>}
                <div><span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block">Message</span><p className="font-sans text-xs text-on-surface-variant leading-relaxed">{selected.notes || selected.message}</p></div>
                <div><span className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block">Submitted</span><span className="font-sans text-xs text-on-surface/60">{new Date(selected.createdAt).toLocaleString()}</span></div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-primary/10">
                {selected.status !== 'resolved' && (
                  <button onClick={() => handleStatus(selected.id, 'resolved')}
                    className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary font-sans text-[10px] tracking-widest uppercase hover:bg-primary/20 transition-all cursor-pointer">
                    <Check size={12} /> Resolve
                  </button>
                )}
                {selected.status !== 'archived' && (
                  <button onClick={() => handleStatus(selected.id, 'archived')}
                    className="flex items-center gap-2 px-4 py-2.5 border border-primary/10 text-on-surface/50 font-sans text-[10px] tracking-widest uppercase hover:text-primary transition-all cursor-pointer">
                    <Archive size={12} /> Archive
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
