
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Category as CategoryType } from '../types';

const Category: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getArticlesByCategory } = useApp();
  
  const categoryEnum = Object.values(CategoryType).find(
    c => c.toLowerCase() === categoryId?.toLowerCase()
  );

  const filteredArticles = categoryEnum ? getArticlesByCategory(categoryEnum) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 capitalize">
          {categoryId} Insurance Hub
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl">
          Deep dives, regulatory updates, and saving strategies for {categoryId} coverage.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map(article => (
          <div key={article.id} className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
            <Link to={`/article/${article.id}`}>
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={article.imageUrl} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={article.title}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 text-[10px] font-medium">{article.publishedDate}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 mb-6">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                  <span className="text-xs font-semibold text-slate-400">By {article.author}</span>
                  <span className="text-indigo-600 font-bold text-xs flex items-center">
                    Read Insights
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {filteredArticles.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-slate-500 italic">No articles found in this category yet. Check back soon for fresh updates.</p>
        </div>
      )}
    </div>
  );
};

export default Category;
