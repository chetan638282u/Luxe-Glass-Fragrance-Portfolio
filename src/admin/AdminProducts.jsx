import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit3, Trash2, Search } from 'lucide-react';
import { getProducts, deleteProduct } from './adminStore';

export default function AdminProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(getProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    if (window.confirm('Delete this product? This cannot be undone.')) {
      deleteProduct(id);
      setProducts(getProducts());
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-primary">Products</h1>
          <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">{products.length} fragrances</p>
        </div>
        <button
          onClick={() => navigate('new')}
          className="flex items-center gap-2 bg-primary text-background font-sans text-[10px] tracking-widest uppercase px-5 py-3 hover:bg-primary-container transition-all cursor-pointer"
        >
          <Plus size={14} /> Add Product
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface/30" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 pl-9 pr-3 text-xs focus:outline-none transition-colors"
        />
      </div>

      {/* Table */}
      <div className="glass-panel rounded-sm border-primary/10 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Name</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4 hidden md:table-cell">Category</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4">Price (50ml)</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4 hidden md:table-cell">Stock</th>
              <th className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan="5" className="p-8 text-center font-sans text-xs text-on-surface/40">No products found.</td></tr>
            ) : filtered.map(p => (
              <tr key={p.id} className="border-b border-primary/5 hover:bg-primary/5 transition-colors">
                <td className="p-4">
                  <span className="font-serif text-sm text-on-background">{p.name}</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className="font-sans text-[10px] text-on-surface/40 uppercase tracking-wider">{p.category}</span>
                </td>
                <td className="p-4">
                  <span className="font-sans text-sm text-primary">${p.price?.["50ml"] ?? p.price ?? '—'}</span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  <span className={`font-sans text-xs ${(p.stock || 0) < 5 ? 'text-tertiary' : 'text-on-surface/60'}`}>
                    {p.stock ?? '—'}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => navigate(`edit/${p.id}`)}
                      className="text-on-surface/30 hover:text-primary transition-colors p-1.5 cursor-pointer"
                      title="Edit"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-on-surface/30 hover:text-red-400 transition-colors p-1.5 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
