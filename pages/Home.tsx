
import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Article } from '../types';

const Home: React.FC = () => {
  const { getTrendingArticles, getEvergreenArticles, articles, isLoading, refreshNews } = useApp();
  
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-[60vh] bg-slate-200 rounded-3xl mb-16"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            {[1, 2, 3].map(i => <div key={i} className="h-48 bg-slate-200 rounded-2xl"></div>)}
          </div>
          <div className="space-y-8">
            <div className="h-64 bg-slate-200 rounded-3xl"></div>
            <div className="h-48 bg-slate-200 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const trending = getTrendingArticles();
  const evergreen = getEvergreenArticles();
  const heroArticle = trending[0] || articles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dynamic Hero Section */}
      {heroArticle ? (
        <section className="mb-16">
          <Link to={`/article/${heroArticle.id}`} className="group">
            <div className="relative h-[60vh] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroArticle.imageUrl} 
                alt={heroArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl text-left">
                <span className="bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block">
                  {heroArticle.category} • Featured
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight group-hover:text-indigo-200 transition-colors">
                  {heroArticle.title}
                </h1>
                <p className="text-slate-200 text-lg line-clamp-2 mb-8">
                  {heroArticle.excerpt}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden ring-2 ring-white/20">
                    <img src={`https://i.pravatar.cc/150?u=${heroArticle.author}`} alt={heroArticle.author} />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{heroArticle.author}</p>
                    <p className="text-slate-400 text-xs">{heroArticle.publishedDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <div className="py-24 text-center bg-white rounded-3xl border border-dashed border-slate-300 mb-16">
          <h2 className="text-2xl font-bold text-slate-400">No Articles in Database</h2>
          <Link to="/write" className="text-indigo-600 font-bold mt-4 inline-block">Add your first blog &rarr;</Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Latest Insights</h2>
              <p className="text-sm text-slate-500 mt-1">Updates from your persistent storage hub.</p>
            </div>
            <button 
              onClick={refreshNews}
              className="flex items-center space-x-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-4 py-2 rounded-xl transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              <span>Sync APIs</span>
            </button>
          </div>

          <div className="space-y-8">
            {articles.filter(a => heroArticle ? a.id !== heroArticle.id : true).map((article) => (
              <ArticleListItem key={article.id} article={article} />
            ))}
          </div>
        </div>

        <aside className="space-y-12">
          {/* Database Status */}
          <div className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
            <h3 className="font-bold text-xl mb-4">Storage Monitor</h3>
            <div className="space-y-4">
               <div className="flex justify-between items-center text-sm border-b border-indigo-500 pb-2">
                 <span className="text-indigo-100">Persistence</span>
                 <span className="font-bold">ENABLED</span>
               </div>
               <div className="flex justify-between items-center text-sm border-b border-indigo-500 pb-2">
                 <span className="text-indigo-100">Total Entries</span>
                 <span className="font-bold">{articles.length}</span>
               </div>
            </div>
            <p className="text-[10px] mt-6 text-indigo-200 leading-relaxed italic">
              All articles are saved to local persistent storage. They will remain here even if you close the browser or refresh.
            </p>
          </div>

          {/* Evergreen Section */}
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-6">Evergreen Knowledge</h3>
            <div className="space-y-4">
              {evergreen.slice(0, 4).map(article => (
                <Link key={article.id} to={`/article/${article.id}`} className="flex items-center space-x-4 group">
                  <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden border border-slate-100">
                    <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 text-xs">
                      {article.title}
                    </h4>
                    <p className="text-[9px] text-slate-500 uppercase mt-1 tracking-widest">{article.category}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

const ArticleListItem: React.FC<{ article: Article }> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="group flex flex-col md:flex-row gap-8 items-start">
      <div className="w-full md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-slate-100 relative">
        <img 
          src={article.imageUrl} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={article.title}
        />
        {article.id.startsWith('blog_') && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-indigo-600 shadow-sm border border-indigo-100">
            MANUAL POST
          </span>
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 text-[10px] font-medium">{article.publishedDate}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors leading-snug">
          {article.title}
        </h3>
        <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed mb-4">
          {article.excerpt}
        </p>
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden ring-1 ring-slate-100">
             <img src={`https://i.pravatar.cc/150?u=${article.author}`} className="rounded-full" />
          </div>
          <span className="text-xs font-semibold text-slate-700">{article.author}</span>
        </div>
      </div>
    </Link>
  );
};

export default Home;
