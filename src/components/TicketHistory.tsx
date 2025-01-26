import React from 'react';
import { Clock, CheckCircle2, AlertTriangle, History } from 'lucide-react';
import { Ticket } from '../types';
import { formatDuration, formatDate } from '../utils';

interface TicketHistoryProps {
  tickets: Ticket[];
  onSelectTicket: (ticket: Ticket) => void;
}

export function TicketHistory({ tickets, onSelectTicket }: TicketHistoryProps) {
  const resolvedTickets = tickets.filter(ticket => ticket.status === 'Resolved');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <History className="w-6 h-6 mr-2 text-blue-600" />
            Resolved Tickets History
          </h2>
        </div>

        <div className="space-y-6">
          {resolvedTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onSelectTicket(ticket)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                  <span className="flex items-center text-green-600">
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Resolved
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Reported Issue:</strong> {ticket.description}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Actual Problem:</strong> {ticket.actualProblem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Created:</strong> {formatDate(ticket.createdAt)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Resolved:</strong> {ticket.resolvedAt ? formatDate(ticket.resolvedAt) : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Resolution Time:</strong>{' '}
                      {ticket.actualTime ? formatDuration(ticket.actualTime) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Solution Journey:</h4>
                  <div className="space-y-2">
                    {ticket.attemptedSolutions.map((attempt, index) => (
                      <div
                        key={index}
                        className={`flex items-start space-x-2 text-sm ${
                          attempt.successful ? 'text-green-600' : 'text-gray-500'
                        }`}
                      >
                        {attempt.successful ? (
                          <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                        )}
                        <span>{attempt.description}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-gray-200 mt-4 pt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Final Solution:</h4>
                  <p className="text-sm text-gray-600">{ticket.finalSolution}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}