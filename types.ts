
export enum Category {
  MOTOR = 'Motor',
  HEALTH = 'Health',
  TRAVEL = 'Travel',
  LIFE = 'Life',
  HOME = 'Home',
  FINANCE = 'Finance',
  GENERAL = 'General'
}

export enum Difficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  EXPERT = 'Expert'
}

export enum Intent {
  EDUCATIONAL = 'Educational',
  COMPARISON = 'Comparison',
  TRANSACTIONAL = 'Transactional'
}

export interface InsightSummary {
  takeaways: string[];
  readingTime: number;
  difficulty: Difficulty;
  intent: Intent;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: string;
  publishedDate: string;
  imageUrl: string;
  sourceUrl: string;
  isTrending: boolean;
  isEvergreen: boolean;
  insights?: InsightSummary;
  relatedIds: string[];
}

export interface AppState {
  articles: Article[];
  isLoading: boolean;
  error: string | null;
}
