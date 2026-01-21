
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Difficulty, Intent } from '../types';

const Article: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { getArticleById, enrichArticle, getArticleById: findRelated } = useApp();
  const article = getArticleById(articleId || '');
  const [isSummarizing, setIsSummarizing] = useState(false);

  useEffect(() => {
    if (article && !article.insights && !isSummarizing) {
      setIsSummarizing(true);
      enrichArticle(article.id).finally(() => setIsSummarizing(false));
    }
    window.scrollTo(0, 0);
  }, [article, enrichArticle, isSummarizing]);

  if (!article) return <div className="py-24 text-center">Article not found</div>;

  return (
    <div className="bg-white">
      {/* Article Header */}
      <header className="relative h-[50vh] min-h-[400px]">
        <img src={article.imageUrl} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center p-8">
          <div className="max-w-4xl text-center">
            <Link to={`/category/${article.category.toLowerCase()}`} className="bg-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              {article.category}
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
              {article.title}
            </h1>
            <div className="flex items-center justify-center space-x-6 text-slate-200">
               <span className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>{article.author}</span>
               <span className="flex items-center"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>{article.publishedDate}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Content Area */}
          <article className="lg:col-span-8 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100">
            {/* AI Summary Section */}
            <div className="mb-12 bg-indigo-50 border border-indigo-100 rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z"/></svg>
              </div>
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-indigo-600 p-2 rounded-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">The Bottom Line</h2>
              </div>

              {isSummarizing ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-indigo-200 rounded w-3/4"></div>
                  <div className="h-4 bg-indigo-200 rounded w-5/6"></div>
                  <div className="h-4 bg-indigo-200 rounded w-2/3"></div>
                </div>
              ) : article.insights ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ul className="space-y-4">
                    {article.insights.takeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start space-x-3 text-slate-700">
                        <span className="text-indigo-500 font-bold mt-1">0{idx + 1}</span>
                        <span className="font-medium">{point}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white rounded-2xl p-6 shadow-sm flex flex-col justify-center space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Reading Time</span>
                      <span className="font-bold text-slate-900">{article.insights.readingTime} min</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">Difficulty</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase ${
                        article.insights.difficulty === Difficulty.BEGINNER ? 'bg-emerald-100 text-emerald-700' :
                        article.insights.difficulty === Difficulty.INTERMEDIATE ? 'bg-amber-100 text-amber-700' :
                        'bg-rose-100 text-rose-700'
                      }`}>
                        {article.insights.difficulty}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">User Intent</span>
                      <span className="font-bold text-slate-900">{article.insights.intent}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 italic">Generate insights based on your unique profile...</p>
              )}
            </div>

            {/* Content Body */}
            <div className="prose prose-lg prose-slate max-w-none">
              <p className="text-2xl text-slate-600 font-light leading-relaxed mb-8 border-l-4 border-indigo-200 pl-6 py-2">
                {article.excerpt}
              </p>
              <div className="text-slate-800 space-y-6 text-lg leading-relaxed">
                {article.content.split('...').map((chunk, i) => (
                  <p key={i}>{chunk}</p>
                ))}
              </div>
            </div>

            {/* Interactive Section */}
            <div className="mt-16 pt-12 border-t border-slate-100">
              <h3 className="text-xl font-bold mb-6">Expert Verification</h3>
              <div className="flex items-center p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-full bg-slate-300 mr-4 flex-shrink-0">
                  <img src={`https://i.pravatar.cc/150?u=expert`} className="rounded-full" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Verified by James Patterson, CPCU</p>
                  <p className="text-sm text-slate-500">Certified Property Casualty Underwriter with 15+ years experience in the {article.category} sector.</p>
                </div>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-12">
            {/* Related Insights */}
            <div className="glass rounded-3xl p-8 border border-slate-200 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Connect the Dots</h3>
              <div className="space-y-6">
                {article.relatedIds.map(id => {
                  const related = findRelated(id);
                  if (!related) return null;
                  return (
                    <Link key={id} to={`/article/${id}`} className="block group">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 mb-1 block">Related {related.category}</span>
                      <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {related.title}
                      </h4>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-12">
                 <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg hover:shadow-indigo-500/20">
                   Get Personalized Quote
                 </button>
                 <p className="text-center text-[10px] text-slate-400 mt-4 px-4 uppercase tracking-tighter">
                   Transparent. No Spam. AI-Powered Comparison.
                 </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default Article;
