import { motion } from 'framer-motion';
import { ChatBubbleLeftIcon, ClockIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

interface TicketCardProps {
  ticket: {
    id: string;
    title: string;
    status: 'open' | 'in-progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    assignee?: string;
    createdAt: string;
    lastUpdated: string;
    messageCount: number;
  };
  onClick?: () => void;
}

const statusColors = {
  'open': 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  'resolved': 'bg-green-100 text-green-800',
};

const priorityColors = {
  'low': 'bg-gray-100 text-gray-800',
  'medium': 'bg-orange-100 text-orange-800',
  'high': 'bg-red-100 text-red-800',
};

export function TicketCard({ ticket, onClick }: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-200"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium text-gray-900">{ticket.title}</h3>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[ticket.status]}`}>
            {ticket.status}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${priorityColors[ticket.priority]}`}>
            {ticket.priority}
          </span>
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <UserCircleIcon className="h-4 w-4 mr-1" />
        <span>{ticket.assignee || 'Unassigned'}</span>
        <ClockIcon className="h-4 w-4 ml-4 mr-1" />
        <span>Updated {ticket.lastUpdated}</span>
        <ChatBubbleLeftIcon className="h-4 w-4 ml-4 mr-1" />
        <span>{ticket.messageCount} messages</span>
      </div>

      <div className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClick}
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
        >
          Take Action
        </Button>
      </div>
    </motion.div>
  );
}
