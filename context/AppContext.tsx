
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Article, Category } from '../types';
import { AegisBackend } from '../backend';

interface AppContextType {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
  backendStatus: any;
  getArticleById: (id: string) => Article | undefined;
  getArticlesByCategory: (category: Category) => Article[];
  getTrendingArticles: () => Article[];
  getEvergreenArticles: () => Article[];
  enrichArticle: (id: string) => Promise<void>;
  createArticle: (data: any) => Promise<string>;
  refreshNews: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [backendStatus, setBackendStatus] = useState(AegisBackend.getStatus());

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await AegisBackend.api.getArticles();
      setArticles(data);
      setBackendStatus(AegisBackend.getStatus());
      setError(null);
    } catch (err) {
      setError('Failed to reach Aegis Backend API.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    AegisBackend.init();
    loadData();
  }, []);

  const getArticleById = (id: string) => articles.find(a => a.id === id);
  const getArticlesByCategory = (category: Category) => articles.filter(a => a.category === category);
  const getTrendingArticles = () => articles.filter(a => a.isTrending);
  const getEvergreenArticles = () => articles.filter(a => a.isEvergreen);

  const enrichArticle = useCallback(async (id: string) => {
    try {
      const updatedArticle = await AegisBackend.api.enrich(id);
      if (updatedArticle) {
        setArticles(prev => prev.map(a => a.id === id ? updatedArticle : a));
      }
    } catch (err) {
      console.error("Context enrichment failure:", err);
    }
  }, []);

  const createArticle = async (data: any) => {
    const newArticle = await AegisBackend.api.createArticle(data);
    setArticles(prev => [newArticle, ...prev]);
    setBackendStatus(AegisBackend.getStatus());
    return newArticle.id;
  };

  const refreshNews = async () => {
    await loadData();
  };

  return (
    <AppContext.Provider value={{ 
      articles,
      isLoading,
      error,
      backendStatus,
      getArticleById, 
      getArticlesByCategory, 
      getTrendingArticles, 
      getEvergreenArticles,
      enrichArticle,
      createArticle,
      refreshNews
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
