import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { TicketCard } from './TicketCard';
import { Button } from '../ui/Button';

const MOCK_TICKETS = [
  {
    id: '1',
    title: 'Unable to access dashboard',
    status: 'open',
    priority: 'high',
    assignee: 'John Doe',
    createdAt: '2025-01-26T13:00:00',
    lastUpdated: '5 mins ago',
    messageCount: 3,
  },
  {
    id: '2',
    title: 'Feature request: Dark mode',
    status: 'in-progress',
    priority: 'medium',
    assignee: 'Jane Smith',
    createdAt: '2025-01-26T12:00:00',
    lastUpdated: '1 hour ago',
    messageCount: 5,
  },
] as const;

export function TicketList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const filteredTickets = MOCK_TICKETS.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !selectedStatus || ticket.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
        <Button variant="default">
          Create New Ticket
        </Button>
      </div>

      <div className="mb-6 flex space-x-4">
        <div className="flex-1 relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="flex items-center">
          <FunnelIcon className="h-5 w-5 mr-2" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {filteredTickets.map((ticket) => (
            <motion.div
              key={ticket.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <TicketCard
                ticket={ticket}
                onClick={() => console.log('View ticket:', ticket.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
