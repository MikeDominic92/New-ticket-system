import React, { useState } from 'react';
import { Bot, Send, Loader } from 'lucide-react';
import { Ticket } from '../types';

interface AISupportAssistantProps {
  ticket: Ticket;
}

export function AISupportAssistant({ ticket }: AISupportAssistantProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsLoading(true);
    // Simulate AI response
    setTimeout(() => {
      setSuggestions([
        "Have you tried clearing the DNS cache and restarting the DNS service?",
        "Check if there are any recent firewall rule changes that might be blocking the connections.",
        "Verify if the issue is reproducible across different network segments."
      ]);
      setIsLoading(false);
      setMessage('');
    }, 1500);
  };

  const hasExhaustedSolutions = ticket.attemptedSolutions.length >= 3 && 
    !ticket.attemptedSolutions.some(solution => solution.successful);

  if (!hasExhaustedSolutions) return null;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-6 border border-blue-100">
      <div className="flex items-center space-x-2 mb-4">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Bot className="w-5 h-5 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Support Assistant</h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">
        I notice that several solutions have been attempted without success. 
        I can help analyze the situation and suggest alternative approaches.
      </p>

      {suggestions.length > 0 && (
        <div className="space-y-2 mb-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="bg-white rounded-lg p-3 shadow-sm">
              <p className="text-sm text-gray-700">{suggestion}</p>
            </div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe any additional details about the issue..."
          className="w-full px-4 py-2 pr-10 rounded-lg border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700 disabled:text-blue-400"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
        </button>
      </form>
    </div>
  );
}