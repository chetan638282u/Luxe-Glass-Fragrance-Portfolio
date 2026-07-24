import React, { useState } from 'react';
import { Save, ShieldAlert } from 'lucide-react';
import { getSettings, saveSettings, changePassword } from './adminStore';

export default function AdminSettings() {
  const initial = getSettings();
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);

  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    setSaved(false);
  };

  const handleSocial = (platform) => (e) => {
    setForm(prev => ({ ...prev, socialLinks: { ...prev.socialLinks, [platform]: e.target.value } }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess(false);

    if (passForm.newPass !== passForm.confirm) {
      setPassError('New passwords do not match.');
      return;
    }

    const result = changePassword(passForm.current, passForm.newPass);
    if (result.success) {
      setPassSuccess(true);
      setPassForm({ current: '', newPass: '', confirm: '' });
      setTimeout(() => setPassSuccess(false), 3000);
    } else {
      setPassError(result.reason);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl text-primary">Settings</h1>
        <p className="font-sans text-xs text-on-surface/40 uppercase tracking-widest mt-1">Store Configuration</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-panel p-6 md:p-8 rounded-sm border-primary/10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Store Name</label>
            <input type="text" value={form.storeName} onChange={handleChange('storeName')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Contact Email</label>
            <input type="email" value={form.contactEmail} onChange={handleChange('contactEmail')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Phone</label>
            <input type="text" value={form.contactPhone} onChange={handleChange('contactPhone')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1">Address</label>
            <input type="text" value={form.address} onChange={handleChange('address')}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
        </div>

        <div className="border-t border-primary/10 pt-6">
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest mb-4">Social Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Instagram</label>
              <input type="url" value={form.socialLinks.instagram} onChange={handleSocial('instagram')} placeholder="https://instagram.com/..."
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Twitter / X</label>
              <input type="url" value={form.socialLinks.twitter} onChange={handleSocial('twitter')} placeholder="https://twitter.com/..."
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
            <div>
              <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Facebook</label>
              <input type="url" value={form.socialLinks.facebook} onChange={handleSocial('facebook')} placeholder="https://facebook.com/..."
                className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          {saved && <span className="font-sans text-[10px] text-primary">Settings saved.</span>}
          <button type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-primary text-background font-sans text-[10px] tracking-widest uppercase hover:bg-primary-container transition-all cursor-pointer ml-auto">
            <Save size={14} /> Save Settings
          </button>
        </div>
      </form>

      {/* Password Change */}
      <div className="glass-panel p-6 md:p-8 rounded-sm border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldAlert size={18} className="text-primary" />
          <h3 className="font-sans text-[10px] text-primary uppercase tracking-widest">Change Access Code</h3>
        </div>

        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
          {passError && (
            <div className="text-red-400 border border-red-400/20 bg-red-400/5 p-3 rounded-sm font-sans text-xs">{passError}</div>
          )}
          {passSuccess && (
            <div className="text-primary border border-primary/20 bg-primary/5 p-3 rounded-sm font-sans text-xs">Access code updated successfully.</div>
          )}

          <div>
            <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Current Access Code</label>
            <input type="password" value={passForm.current} onChange={(e) => setPassForm(p => ({ ...p, current: e.target.value }))} required
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">New Access Code</label>
            <input type="password" value={passForm.newPass} onChange={(e) => setPassForm(p => ({ ...p, newPass: e.target.value }))} required minLength={6}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <div>
            <label className="font-sans text-[9px] text-on-surface/40 uppercase tracking-widest block mb-1">Confirm New Access Code</label>
            <input type="password" value={passForm.confirm} onChange={(e) => setPassForm(p => ({ ...p, confirm: e.target.value }))} required minLength={6}
              className="w-full bg-[#1c1912]/40 border border-primary/10 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors" />
          </div>
          <button type="submit"
            className="px-6 py-3 border border-primary/30 text-primary font-sans text-[10px] tracking-widest uppercase hover:bg-primary hover:text-background transition-all cursor-pointer">
            Update Access Code
          </button>
        </form>
      </div>
    </div>
  );
}
