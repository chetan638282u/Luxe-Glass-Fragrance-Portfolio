import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle, Clock } from 'lucide-react';
import { login, checkSession } from './adminStore';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [lockout, setLockout] = useState(false);
  const [remaining, setRemaining] = useState(5);

  if (checkSession()) {
    return <Navigate to="dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(password);
    if (result.success) {
      navigate('dashboard');
    } else if (result.reason === 'LOCKOUT') {
      setLockout(true);
      setError('Too many attempts. Try again in 5 minutes.');
    } else {
      setError('Invalid credentials');
      setRemaining(result.remaining);
    }
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm glass-panel p-8 rounded-sm border-primary/20"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full border border-primary/30 flex items-center justify-center mx-auto mb-4">
            <Lock size={20} className="text-primary" />
          </div>
          <h1 className="font-serif text-2xl text-primary font-medium">AETHERIS</h1>
          <p className="font-sans text-[10px] text-on-surface/40 uppercase tracking-[0.2em] mt-2">Atelier Access</p>
        </div>

        {lockout ? (
          <div className="text-center space-y-4">
            <Clock size={32} className="text-red-400 mx-auto" />
            <p className="font-sans text-xs text-red-400">{error}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 text-red-400 border border-red-400/20 bg-red-400/5 p-3 rounded-sm">
                <AlertTriangle size={14} />
                <span className="font-sans text-xs">{error} {remaining < 5 && `(${remaining} attempts remaining)`}</span>
              </div>
            )}
            <div>
              <label className="font-sans text-[9px] text-primary uppercase tracking-widest block mb-1.5">Access Code</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1c1912]/40 border border-primary/20 focus:border-primary text-on-background py-2.5 px-3 text-sm focus:outline-none transition-colors"
                placeholder="Enter access code"
                autoFocus
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-background font-sans font-medium text-xs tracking-[0.2em] py-3.5 uppercase hover:bg-primary-container transition-all duration-300"
            >
              Authenticate
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
