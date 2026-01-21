
import { Article, Category } from '../types';

export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'The Future of Autonomous Vehicle Insurance',
    excerpt: 'As self-driving technology evolves, the traditional model of driver-based liability is shifting towards manufacturer-focused policies.',
    content: 'Full detailed content about autonomous vehicle insurance... Driving will never be the same. Regulators are looking at how liability shifts from the individual to the software provider. This means your premium might be bundled with the car purchase. Statistics show that AI drivers could reduce accidents by 90%, but the remaining 10% raise complex legal questions about "algorithm negligence".',
    category: Category.MOTOR,
    author: 'Elena Vance',
    publishedDate: '2024-10-15',
    imageUrl: 'https://picsum.photos/seed/motor1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: true,
    isEvergreen: false,
    relatedIds: ['2', '3']
  },
  {
    id: '2',
    title: '5 Ways to Lower Your Health Insurance Premium',
    excerpt: 'Simple lifestyle adjustments and policy tweaks that can save you thousands annually without sacrificing coverage quality.',
    content: 'Detailed strategies for health insurance savings... From HSA contributions to preventative care networks. Did you know that some insurers offer discounts for syncing your fitness tracker data? This "pay-how-you-live" model is gaining traction among millennials who prefer personalized pricing.',
    category: Category.HEALTH,
    author: 'Dr. Marcus Thorne',
    publishedDate: '2024-10-12',
    imageUrl: 'https://picsum.photos/seed/health1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: false,
    isEvergreen: true,
    relatedIds: ['1', '5']
  },
  {
    id: '3',
    title: 'Climate Change and Property Insurance Risks',
    excerpt: 'How rising sea levels and extreme weather events are redefining the "insurable" landscape for coastal homeowners.',
    content: 'Deep dive into actuarial changes due to climate data... Insurance companies are using satellite imagery to predict flood zones with meter-level accuracy. For homeowners, this means some areas are becoming uninsurable through private markets, leading to a rise in state-backed catastrophe funds.',
    category: Category.HOME,
    author: 'Julian Reed',
    publishedDate: '2024-10-10',
    imageUrl: 'https://picsum.photos/seed/home1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: true,
    isEvergreen: true,
    relatedIds: ['1']
  },
  {
    id: '4',
    title: 'Digital Nomad Travel Insurance: A Modern Guide',
    excerpt: 'Working from Bali? Why your standard holiday travel insurance might leave you stranded if your tech gets stolen.',
    content: 'Content about digital nomad insurance... Traditional travel insurance covers 30-day trips. If you are abroad for 6 months, you need a specialized global health and asset protection policy that understands "work-from-anywhere" logistics.',
    category: Category.TRAVEL,
    author: 'Sarah Jenkins',
    publishedDate: '2024-10-08',
    imageUrl: 'https://picsum.photos/seed/travel1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: false,
    isEvergreen: false,
    relatedIds: ['2']
  },
  {
    id: '5',
    title: 'Term vs Whole Life Insurance: The Final Verdict',
    excerpt: 'Cutting through the noise to help you decide which life insurance model actually builds wealth for your family.',
    content: 'Comprehensive comparison of life insurance products... Most financial advisors suggest buy term and invest the difference. However, whole life can provide a tax-sheltered vehicle for high net worth individuals looking to transfer wealth efficiently.',
    category: Category.LIFE,
    author: 'Robert Sterling',
    publishedDate: '2024-10-05',
    imageUrl: 'https://picsum.photos/seed/life1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: true,
    isEvergreen: true,
    relatedIds: ['2']
  },
  {
    id: '6',
    title: 'How High Inflation Impacts Your Coverage Limits',
    excerpt: 'Your $300k home coverage might not be enough anymore. Why replacement cost is different from market value in 2024.',
    content: 'Inflation analysis for insurance... Lumber prices and labor shortages mean rebuilding your home today costs 20-30% more than it did three years ago. If your policy has not been updated, you might be under-insured in a total loss scenario.',
    category: Category.FINANCE,
    author: 'Mia Cho',
    publishedDate: '2024-10-01',
    imageUrl: 'https://picsum.photos/seed/finance1/800/600',
    sourceUrl: 'https://example.com/source',
    isTrending: false,
    isEvergreen: true,
    relatedIds: ['3']
  }
];
