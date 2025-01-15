export interface Ticket {
  id: string;
  title: string;
  description: string;
  originalMessage: {
    type: 'email' | 'voice';
    content: string;
    timestamp: Date;
    from: string;
  };
  actualProblem: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: Date;
  resolvedAt?: Date;
  estimatedTime: number; // in minutes
  actualTime?: number; // in minutes
  steps: string[];
  attemptedSolutions: {
    description: string;
    successful: boolean;
    timestamp: Date;
  }[];
  finalSolution: string;
  category: string;
  similarTickets?: string[]; // IDs of similar tickets
}

export interface TicketStats {
  avgResolutionTime: number;
  totalResolved: number;
  commonCategories: { category: string; count: number }[];
  activityByHour: { hour: number; count: number }[];
  predictedPeakHours: { hour: number; probability: number }[];
  commonSolutions: {
    problem: string;
    solutions: {
      description: string;
      successRate: number;
    }[];
  }[];
}

export interface SearchResult {
  title: string;
  solution: string;
  confidence: number;
}