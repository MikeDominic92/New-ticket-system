import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, StarIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  rating: number;
  views: number;
  helpfulCount: number;
}

const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'How to Reset Your Password',
    category: 'Account Management',
    excerpt: 'Step-by-step guide to securely reset your password and regain access to your account.',
    rating: 4.8,
    views: 1200,
    helpfulCount: 856,
  },
  {
    id: '2',
    title: 'Understanding Ticket Priority Levels',
    category: 'Ticket Management',
    excerpt: 'Learn about different priority levels and how they affect ticket resolution time.',
    rating: 4.5,
    views: 980,
    helpfulCount: 723,
  },
];

export function KnowledgeBase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredArticles = MOCK_ARTICLES.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <BookOpenIcon className="h-6 w-6 text-blue-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-900">Knowledge Base</h2>
        </div>
        <Button variant="outline" size="sm">
          Create Article
        </Button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search knowledge base..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredArticles.map((article) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                  {article.title}
                </h3>
                <span className="text-sm text-gray-500">{article.category}</span>
              </div>
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 text-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">{article.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-3">{article.excerpt}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex space-x-4">
                <span>{article.views} views</span>
                <span>{article.helpfulCount} found this helpful</span>
              </div>
              <Button variant="ghost" size="sm" className="flex items-center">
                Read More
                <ChevronRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
