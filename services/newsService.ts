
import { Article, Category } from '../types';

const RSS_FEEDS = [
  { url: 'https://www.insurancejournal.com/feeds/news/', category: Category.GENERAL },
  { url: 'https://www.reutersagency.com/feed/?best-sectors=business&post_type=best', category: Category.FINANCE },
];

// Helper to map keywords to categories
const categorizeTitle = (title: string, defaultCat: Category): Category => {
  const t = title.toLowerCase();
  if (t.includes('car') || t.includes('vehicle') || t.includes('auto') || t.includes('driver')) return Category.MOTOR;
  if (t.includes('health') || t.includes('medical') || t.includes('patient')) return Category.HEALTH;
  if (t.includes('travel') || t.includes('flight') || t.includes('nomad')) return Category.TRAVEL;
  if (t.includes('life') || t.includes('death') || t.includes('pension')) return Category.LIFE;
  if (t.includes('home') || t.includes('property') || t.includes('flood') || t.includes('fire')) return Category.HOME;
  return defaultCat;
};

export const fetchDynamicNews = async (): Promise<Article[]> => {
  try {
    const allArticles: Article[] = [];
    
    for (const feed of RSS_FEEDS) {
      const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}`);
      const data = await response.json();

      if (data.status === 'ok') {
        const normalized = data.items.map((item: any, index: number) => ({
          id: btoa(item.guid || item.link).substring(0, 12),
          title: item.title,
          excerpt: item.description.replace(/<[^>]*>?/gm, '').substring(0, 160) + '...',
          content: item.content || item.description,
          category: categorizeTitle(item.title, feed.category),
          author: item.author || 'News Desk',
          publishedDate: item.pubDate.split(' ')[0],
          imageUrl: item.thumbnail || item.enclosure?.link || `https://picsum.photos/seed/${index + feed.category}/800/600`,
          sourceUrl: item.link,
          isTrending: index < 3,
          isEvergreen: index > 5,
          relatedIds: []
        }));
        allArticles.push(...normalized);
      }
    }

    // Deduplicate by title
    const unique = Array.from(new Map(allArticles.map(item => [item.title, item])).values());
    
    // Shuffle and slice to keep it fresh
    return unique.sort(() => Math.random() - 0.5).slice(0, 15);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
};
