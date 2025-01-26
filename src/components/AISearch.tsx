import React, { useState } from 'react';
import { Search, Loader, Bot } from 'lucide-react';
import { SearchResult } from '../types';

interface AISearchProps {
  onSearch: (query: string) => Promise<SearchResult[]>;
}

export function AISearch({ onSearch }: AISearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-200">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Support Engineer AI</h2>
      </div>
      
      <form onSubmit={handleSearch} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe the issue or ask for a solution..."
            className="w-full px-4 py-3 pr-10 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-blue-400"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
              <div className="flex items-start space-x-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-blue-600">Problem Analysis:</span>
                    <span className="text-sm text-gray-600">{result.title}</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-green-600">Suggested Solution:</span>
                    <span className="text-sm text-gray-600">{result.solution}</span>
                  </div>
                  <div className="flex items-center mt-2">
                    <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-300"
                        style={{ width: `${result.confidence}%` }}
                      />
                    </div>
                    <span className="ml-2 text-xs text-gray-500">
                      {result.confidence}% match
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}