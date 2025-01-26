import React from 'react';
import { Clock, AlertTriangle, CheckCircle, Mail, Mic } from 'lucide-react';
import { Ticket } from '../types';
import { formatDistanceToNow } from '../utils';

interface TicketListProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

export function TicketList({ tickets, onSelectTicket }: TicketListProps) {
  const sortedTickets = [...tickets].sort((a, b) => {
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getPriorityColor = (priority: Ticket['priority']) => {
    const colors = {
      Critical: 'bg-red-100 text-red-800 border-red-200',
      High: 'bg-orange-100 text-orange-800 border-orange-200',
      Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      Low: 'bg-green-100 text-green-800 border-green-200'
    };
    return colors[priority];
  };

  return (
    <div className="space-y-4">
      {sortedTickets.map((ticket) => (
        <div
          key={ticket.id}
          onClick={() => onSelectTicket(ticket)}
          className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {ticket.originalMessage.type === 'email' ? (
                    <Mail className="w-4 h-4 text-blue-500" />
                  ) : (
                    <Mic className="w-4 h-4 text-purple-500" />
                  )}
                  <span className="text-sm text-gray-500">
                    From: {ticket.originalMessage.from}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{ticket.title}</h3>
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className="flex items-center text-gray-500 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDistanceToNow(ticket.createdAt)}
                  </span>
                  <span className={`flex items-center text-sm ${
                    ticket.status === 'Open' ? 'text-yellow-600' :
                    ticket.status === 'In Progress' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {ticket.status === 'Open' ? (
                      <AlertTriangle className="w-4 h-4 mr-1" />
                    ) : ticket.status === 'In Progress' ? (
                      <Clock className="w-4 h-4 mr-1" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-1" />
                    )}
                    {ticket.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}