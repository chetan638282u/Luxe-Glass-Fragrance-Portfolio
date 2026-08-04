import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { getProducts, getProduct, saveProduct, updateProduct } from './adminStore';
import { products as staticProducts } from '../products';

export default function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const existing = isEdit ? getProduct(id) : null;

  const [form, setForm] = useState({
    name: existing?.name || '',
    slug: existing?.slug || '',
    tagline: existing?.tagline || '',
    description: existing?.description || '',
    category: existing?.category || 'oriental',
    price50: existing?.price?.["50ml"] ?? existing?.price ?? '',
    price100: existing?.price?.["100ml"] ?? '',
    stock: existing?.stock ?? 10,
    notesTop: existing?.notes?.top || '',
    notesHeart: existing?.notes?.heart || '',
    notesBase: existing?.notes?.base || '',
    image: existing?.image || '',
  });

  const handleChange = (field) => (e) => {
    const value = e.target.value;
    setForm(prev => ({
      ...prev,
      [field]: value,
      ...(field === 'name' && !isEdit ? { slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') } : {}),
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: form.name,
      slug: form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline: form.tagline,
      description: form.description,
      category: form.category,
      price: { "50ml": Number(form.price50), "100ml": Number(form.price100) },
      stock: Number(form.stock),
      notes: { top: form.notesTop, heart: form.notesHeart, base: form.notesBase },
      image: form.image,
    };

    if (isEdit) {
      updateProduct(id, data);
    } else {
      saveProduct(data);
    }
    navigate('..');
  };

  const categories = ['oriental', 'woody', 'floral', 'citrus'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('..')} className="text-primary hover:text-primary-container transition-colors cursor-pointer">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-primary">{isEdit ? 'Edit Product' : 'New Product'}</h1>
          <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">
            {isEdit ? `Editing: ${existing?.name}` : 'Add a new fragrance'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-sm border-primary/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Name</label>
            <input type="text" value={form.name} onChange={handleChange('name')} required
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Slug</label>
            <input type="text" value={form.slug} onChange={handleChange('slug')} required
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div className="md:col-span-2">
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Tagline</label>
            <input type="text" value={form.tagline} onChange={handleChange('tagline')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div className="md:col-span-2">
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Description</label>
            <textarea rows={3} value={form.description} onChange={handleChange('description')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors resize-none" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Category</label>
            <select value={form.category} onChange={handleChange('category')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors appearance-none cursor-pointer">
              {categories.map(c => <option key={c} value={c} className="bg-background text-on-background">{c}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Price (50ml)</label>
              <input type="number" step="0.01" value={form.price50} onChange={handleChange('price50')} required
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Price (100ml)</label>
              <input type="number" step="0.01" value={form.price100} onChange={handleChange('price100')}
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Stock</label>
            <input type="number" value={form.stock} onChange={handleChange('stock')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
        </div>

        {/* Notes Pyramid */}
        <div className="border-t border-primary/10 pt-6">
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-4">Olfactory Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Top Notes</label>
              <input type="text" value={form.notesTop} onChange={handleChange('notesTop')}
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Heart Notes</label>
              <input type="text" value={form.notesHeart} onChange={handleChange('notesHeart')}
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Base Notes</label>
              <input type="text" value={form.notesBase} onChange={handleChange('notesBase')}
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="border-t border-primary/10 pt-6">
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-4">Product Image</h3>
          <div className="flex items-center gap-6">
            {form.image && (
              <div className="w-24 h-24 rounded-sm border border-primary/20 overflow-hidden flex-shrink-0 bg-[#1c1912]/40">
                <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex-1">
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-2">Upload Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload}
                className="w-full text-sm text-on-surface/60 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-sans file:uppercase file:tracking-widest file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-colors cursor-pointer" />
              <p className="text-[10px] text-on-surface/40 mt-2">Recommended: Square image, max 2MB.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-primary/10">
          <button type="button" onClick={() => navigate('..')}
            className="px-6 py-3 border border-primary/20 text-on-surface/60 hover:text-primary font-sans text-[10px] tracking-widest uppercase transition-all cursor-pointer">
            Cancel
          </button>
          <button type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background font-sans text-[10px] tracking-widest uppercase hover:bg-primary-container transition-all cursor-pointer">
            <Save size={14} /> {isEdit ? 'Update Product' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
