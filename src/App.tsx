import React, { useState } from 'react';
import { TicketList } from './components/TicketList';
import { TicketDetail } from './components/TicketDetail';
import { TicketHistory } from './components/TicketHistory';
import { TicketStatsPanel } from './components/TicketStats';
import { ActivityAnalysis } from './components/ActivityAnalysis';
import { SolutionSuggestions } from './components/SolutionSuggestions';
import { AISupportAssistant } from './components/AISupportAssistant';
import { Ticket, TicketStats } from './types';
import { LayoutGrid, ListFilter } from 'lucide-react';
import { analyzeTicketActivity, analyzeSolutions } from './utils';

// Generate timestamps for the last 24 hours
const getRandomTimestamp = (hoursAgo: number) => {
  const date = new Date();
  date.setHours(date.getHours() - hoursAgo);
  return date;
};

// Sample tickets data
const sampleTickets: Ticket[] = [
  // Open Tickets (5)
  {
    id: '1',
    title: 'Critical Database Connection Failure',
    description: 'Production database is not responding to connection requests',
    originalMessage: {
      type: 'email',
      content: 'Urgent: Database connectivity issues affecting all users. Need immediate assistance.',
      timestamp: getRandomTimestamp(2),
      from: 'ops-team@company.com'
    },
    actualProblem: 'Connection pool exhaustion due to connection leaks',
    priority: 'Critical',
    status: 'In Progress',
    createdAt: getRandomTimestamp(2),
    estimatedTime: 60,
    category: 'Infrastructure',
    steps: [
      'Check database server status',
      'Review connection pool settings',
      'Analyze active connections'
    ],
    attemptedSolutions: [
      {
        description: 'Restarted database service',
        successful: false,
        timestamp: getRandomTimestamp(1.5)
      }
    ],
    finalSolution: ''
  },
  {
    id: '2',
    title: 'Payment Gateway Integration Error',
    description: 'Customers unable to complete purchases',
    originalMessage: {
      type: 'email',
      content: 'Payment processing is failing for all transactions. Error code: PG-501',
      timestamp: getRandomTimestamp(4),
      from: 'finance@company.com'
    },
    actualProblem: 'API key expiration',
    priority: 'High',
    status: 'Open',
    createdAt: getRandomTimestamp(4),
    estimatedTime: 45,
    category: 'Payment Systems',
    steps: [
      'Verify API credentials',
      'Check payment gateway status',
      'Review error logs'
    ],
    attemptedSolutions: [],
    finalSolution: ''
  },
  {
    id: '3',
    title: 'SSL Certificate Warning',
    description: 'Users reporting security warnings on checkout page',
    originalMessage: {
      type: 'email',
      content: 'Security certificate error appearing for some users during checkout',
      timestamp: getRandomTimestamp(6),
      from: 'security@company.com'
    },
    actualProblem: 'Certificate renewal needed',
    priority: 'High',
    status: 'Open',
    createdAt: getRandomTimestamp(6),
    estimatedTime: 30,
    category: 'Security',
    steps: [
      'Check certificate expiration',
      'Verify SSL configuration',
      'Test on different browsers'
    ],
    attemptedSolutions: [],
    finalSolution: ''
  },
  {
    id: '4',
    title: 'Mobile App Crash on Launch',
    description: 'iOS users reporting immediate app crash',
    originalMessage: {
      type: 'email',
      content: 'App crashes immediately after splash screen on iOS 15 devices',
      timestamp: getRandomTimestamp(3),
      from: 'mobile-team@company.com'
    },
    actualProblem: 'Incompatible iOS framework version',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: getRandomTimestamp(3),
    estimatedTime: 120,
    category: 'Mobile',
    steps: [
      'Analyze crash reports',
      'Check iOS compatibility',
      'Review recent deployments'
    ],
    attemptedSolutions: [
      {
        description: 'Rolled back to previous version',
        successful: false,
        timestamp: getRandomTimestamp(2)
      }
    ],
    finalSolution: ''
  },
  {
    id: '5',
    title: 'Report Generation Delay',
    description: 'Monthly reports taking longer than usual to generate',
    originalMessage: {
      type: 'email',
      content: 'Monthly sales reports are taking over 30 minutes to generate',
      timestamp: getRandomTimestamp(5),
      from: 'reports@company.com'
    },
    actualProblem: 'Inefficient query optimization',
    priority: 'Low',
    status: 'Open',
    createdAt: getRandomTimestamp(5),
    estimatedTime: 90,
    category: 'Reporting',
    steps: [
      'Profile query performance',
      'Check database indexes',
      'Monitor resource usage'
    ],
    attemptedSolutions: [],
    finalSolution: ''
  },
  // Closed Tickets (20)
  {
    id: '6',
    title: 'User Authentication Failure',
    description: 'Users unable to log in to the system',
    originalMessage: {
      type: 'email',
      content: 'Multiple users reporting login failures across all departments',
      timestamp: getRandomTimestamp(24),
      from: 'support@company.com'
    },
    actualProblem: 'LDAP service configuration issue',
    priority: 'Critical',
    status: 'Resolved',
    createdAt: getRandomTimestamp(24),
    resolvedAt: getRandomTimestamp(23),
    estimatedTime: 60,
    actualTime: 45,
    category: 'Authentication',
    steps: [
      'Verify LDAP service status',
      'Check configuration settings',
      'Test connection to LDAP server'
    ],
    attemptedSolutions: [
      {
        description: 'Restarted LDAP service',
        successful: false,
        timestamp: getRandomTimestamp(23.5)
      },
      {
        description: 'Updated LDAP configuration',
        successful: true,
        timestamp: getRandomTimestamp(23)
      }
    ],
    finalSolution: 'Corrected LDAP server configuration and restored service'
  }
];

// Add 19 more resolved tickets with varied timestamps
for (let i = 7; i <= 25; i++) {
  const hoursAgo = Math.floor(Math.random() * 72) + 24; // Random time between 24-96 hours ago
  const resolutionTime = Math.floor(Math.random() * 120) + 30; // 30-150 minutes
  const resolvedHoursAgo = hoursAgo - (resolutionTime / 60);
  
  sampleTickets.push({
    id: i.toString(),
    title: `Resolved Issue #${i}`,
    description: `Sample resolved ticket #${i}`,
    originalMessage: {
      type: Math.random() > 0.5 ? 'email' : 'voice',
      content: `This is a sample resolved ticket #${i}`,
      timestamp: getRandomTimestamp(hoursAgo),
      from: `user${i}@company.com`
    },
    actualProblem: `Sample problem for ticket #${i}`,
    priority: Math.random() > 0.7 ? 'Critical' : Math.random() > 0.5 ? 'High' : 'Medium',
    status: 'Resolved',
    createdAt: getRandomTimestamp(hoursAgo),
    resolvedAt: getRandomTimestamp(resolvedHoursAgo),
    estimatedTime: 60,
    actualTime: resolutionTime,
    category: ['Infrastructure', 'Security', 'Performance', 'UI/UX', 'Database'][Math.floor(Math.random() * 5)],
    steps: [
      'Step 1',
      'Step 2',
      'Step 3'
    ],
    attemptedSolutions: [
      {
        description: 'First attempt',
        successful: false,
        timestamp: getRandomTimestamp(hoursAgo - 1)
      },
      {
        description: 'Second attempt',
        successful: true,
        timestamp: getRandomTimestamp(resolvedHoursAgo)
      }
    ],
    finalSolution: `Resolution for ticket #${i}`
  });
}

// Calculate ticket statistics
const calculateStats = (tickets: Ticket[]): TicketStats => {
  const resolvedTickets = tickets.filter(t => t.status === 'Resolved' && t.actualTime);
  const totalTime = resolvedTickets.reduce((sum, t) => sum + (t.actualTime || 0), 0);
  
  const categories = tickets.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const { activityByHour, predictedPeakHours } = analyzeTicketActivity(tickets);
  const commonSolutions = analyzeSolutions(tickets);

  return {
    avgResolutionTime: resolvedTickets.length ? Math.round(totalTime / resolvedTickets.length) : 0,
    totalResolved: resolvedTickets.length,
    commonCategories: Object.entries(categories)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3),
    activityByHour,
    predictedPeakHours,
    commonSolutions
  };
};

function App() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [tickets] = useState<Ticket[]>(sampleTickets);
  const [activeTab, setActiveTab] = useState<'active' | 'history'>('active');

  const stats = calculateStats(tickets);
  const activeTickets = tickets.filter(t => t.status !== 'Resolved');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <LayoutGrid className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">
                Ticket Management System
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'active'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Active Tickets
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                  activeTab === 'history'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Ticket History
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'active' ? (
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: Ticket Details */}
            <div className="col-span-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <TicketDetail ticket={selectedTicket} />
              </div>
            </div>

            {/* Right Column: Active Ticket Queue */}
            <div className="col-span-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    <ListFilter className="w-6 h-6 mr-2 text-blue-600" />
                    Active Queue
                  </h2>
                </div>
                <TicketList
                  tickets={activeTickets}
                  onSelectTicket={setSelectedTicket}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Ticket Stats Panel */}
            <div className="mb-6">
              <TicketStatsPanel stats={stats} tickets={tickets} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: History */}
              <div className="lg:col-span-2">
                <TicketHistory
                  tickets={tickets}
                  onSelectTicket={setSelectedTicket}
                />
              </div>
              
              {/* Right Column: Activity Analysis */}
              <div className="space-y-6">
                <ActivityAnalysis
                  activityByHour={stats.activityByHour}
                  predictedPeakHours={stats.predictedPeakHours}
                />
                <SolutionSuggestions commonSolutions={stats.commonSolutions} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;