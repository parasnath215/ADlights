'use client';

import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@adlights' && password === 'adlights@2027') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      setError('');
    } else {
      setError('Invalid email or password');
    }
  };

  if (!mounted) return null;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl animate-fade-in relative overflow-hidden">
          {/* Decorative Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-amber-400/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 flex flex-col items-center mb-8">
            <div className="w-12 h-12 bg-amber-400/10 text-amber-400 rounded-full flex items-center justify-center mb-4 border border-amber-400/20">
              <Shield size={24} />
            </div>
            <h1 className="text-2xl font-display font-bold text-white uppercase tracking-widest text-center">Admin Portal</h1>
            <p className="text-zinc-400 text-xs mt-2 font-medium">Authorized Personnel Only</p>
          </div>
          
          <form onSubmit={handleLogin} className="relative z-10 space-y-5">
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Email Address</label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Enter admin email"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3.5 text-xs text-white focus:outline-none focus:border-amber-400 transition-colors"
                placeholder="Enter password"
              />
            </div>
            
            {error && (
              <div className="text-red-400 text-xs font-semibold p-3 bg-red-950/30 rounded-lg border border-red-900/50 text-center animate-fade-in">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-amber-400 text-zinc-950 font-extrabold text-xs uppercase tracking-widest py-4 rounded-lg hover:bg-amber-300 hover:scale-[1.02] transition-all mt-2 shadow-lg shadow-amber-400/20"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
