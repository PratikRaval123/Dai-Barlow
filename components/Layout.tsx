
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Category } from '../types';
import { useApp } from '../context/AppContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { backendStatus } = useApp();
  const categories = Object.values(Category).filter(c => c !== Category.GENERAL);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="glass sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                A
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">Aegis Insight</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {categories.map(cat => (
                <Link 
                  key={cat} 
                  to={`/category/${cat.toLowerCase()}`}
                  className={`text-sm font-medium transition-all ${
                    location.pathname.includes(cat.toLowerCase()) 
                    ? 'text-indigo-600 underline underline-offset-8' 
                    : 'text-slate-600 hover:text-indigo-600'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <Link 
                to="/write" 
                className="hidden sm:flex items-center space-x-1 text-sm font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                <span>Write</span>
              </Link>
              <div className="hidden lg:flex items-center space-x-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Backend Live</span>
              </div>
              <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow bg-slate-50/50">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center text-white font-bold">A</div>
                <span className="text-xl font-bold text-white">Aegis Insight</span>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-slate-500">
                The smart insurance knowledge hub powered by Gemini AI. Real-time data, processed through deep analysis.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">Knowledge Base</h4>
              <ul className="space-y-3 text-sm">
                {categories.map(cat => (
                  <li key={cat}><Link to={`/category/${cat.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">{cat} Insurance</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-6">System Health</h4>
              <div className="space-y-4 text-[11px] font-mono">
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <span>Server Status</span>
                  <span className="text-emerald-500">OPERATIONAL</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-900 pb-2">
                  <span>Articles Indexed</span>
                  <span className="text-indigo-400">{backendStatus.articleCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Last AI Sync</span>
                  <span className="text-slate-500">{new Date(backendStatus.lastSync).toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-900 text-xs text-center flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p>&copy; {new Date().getFullYear()} Aegis Insight Platform. Built for professional guidance.</p>
            <div className="flex space-x-6 text-slate-600">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
