import React from 'react';
import { BarChart, Clock, CheckCircle2, AlertCircle, History } from 'lucide-react';
import { TicketStats as ITicketStats, Ticket } from '../types';
import { formatDuration, formatDistanceToNow } from '../utils';

interface TicketStatsProps {
  stats: ITicketStats;
  tickets: Ticket[];
}

export function TicketStatsPanel({ stats, tickets }: TicketStatsProps) {
  const recentlyClosed = tickets
    .filter(t => t.status === 'Resolved' && t.resolvedAt)
    .sort((a, b) => b.resolvedAt!.getTime() - a.resolvedAt!.getTime())
    .slice(0, 3);

  const currentOpen = tickets
    .filter(t => t.status !== 'Resolved')
    .sort((a, b) => {
      if (a.priority === 'Critical') return -1;
      if (b.priority === 'Critical') return 1;
      if (a.priority === 'High') return -1;
      if (b.priority === 'High') return 1;
      return 0;
    })
    .slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <div className="p-2 bg-blue-50 rounded-lg">
          <BarChart className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Ticket Overview</h2>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600/90 font-medium">Resolution Time</p>
              <p className="text-xl font-bold text-blue-900 mt-1">
                {formatDuration(stats.avgResolutionTime)}
              </p>
              <p className="text-sm text-blue-600/75 mt-1">average</p>
            </div>
            <Clock className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600/90 font-medium">Resolved</p>
              <p className="text-xl font-bold text-green-900 mt-1">{stats.totalResolved}</p>
              <p className="text-sm text-green-600/75 mt-1">total</p>
            </div>
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
          <div>
            <p className="text-sm text-purple-600/90 font-medium mb-2">Top Categories</p>
            <div className="space-y-1">
              {stats.commonCategories.map((cat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-purple-800">{cat.category}</span>
                  <span className="text-sm font-medium text-purple-900">{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recently Closed Tickets */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-medium text-gray-700">Recently Closed</h3>
          </div>
          <div className="space-y-3">
            {recentlyClosed.map((ticket) => (
              <div key={ticket.id} className="bg-green-50/50 rounded-lg p-3 border border-green-100">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                  <span className="text-xs text-green-600">
                    {formatDistanceToNow(ticket.resolvedAt!)}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.finalSolution}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Resolution time: {formatDuration(ticket.actualTime || 0)}
                  </span>
                  <span className="text-green-600 font-medium flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Solved
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current Open Tickets */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-medium text-gray-700">Current Open</h3>
          </div>
          <div className="space-y-3">
            {currentOpen.map((ticket) => (
              <div key={ticket.id} className="bg-orange-50/50 rounded-lg p-3 border border-orange-100">
                <div className="flex items-start justify-between mb-1">
                  <h4 className="text-sm font-medium text-gray-900">{ticket.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    ticket.priority === 'Critical' 
                      ? 'bg-red-100 text-red-700'
                      : ticket.priority === 'High'
                      ? 'bg-orange-100 text-orange-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">{ticket.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500">
                    Opened: {formatDistanceToNow(ticket.createdAt)}
                  </span>
                  <span className="text-orange-600 font-medium">
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}