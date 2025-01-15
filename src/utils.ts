export function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date);
}

export function analyzeTicketActivity(tickets: Ticket[]): {
  activityByHour: { hour: number; count: number }[];
  predictedPeakHours: { hour: number; probability: number }[];
} {
  // Initialize hourly counts
  const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: 0
  }));

  // Count tickets by hour
  tickets.forEach(ticket => {
    const hour = new Date(ticket.createdAt).getHours();
    hourlyActivity[hour].count++;
  });

  // Simple prediction model based on historical patterns
  const predictedPeaks = hourlyActivity.map(({ hour, count }) => {
    const totalTickets = tickets.length;
    const probability = count / totalTickets;
    // Add some randomness and time-based weighting
    const timeWeight = 1 + Math.sin((hour / 24) * Math.PI * 2) * 0.2;
    return {
      hour,
      probability: Math.min(0.95, probability * timeWeight)
    };
  });

  return {
    activityByHour: hourlyActivity,
    predictedPeakHours: predictedPeaks.sort((a, b) => b.probability - a.probability)
  };
}

export function analyzeSolutions(tickets: Ticket[]): {
  problem: string;
  solutions: { description: string; successRate: number }[];
}[] {
  const solutionMap = new Map<string, { total: number; successful: number }>();

  tickets.forEach(ticket => {
    ticket.attemptedSolutions.forEach(solution => {
      const key = `${ticket.actualProblem}|||${solution.description}`;
      const stats = solutionMap.get(key) || { total: 0, successful: 0 };
      stats.total++;
      if (solution.successful) stats.successful++;
      solutionMap.set(key, stats);
    });
  });

  const problemSolutions = new Map<string, { description: string; successRate: number }[]>();

  for (const [key, stats] of solutionMap.entries()) {
    const [problem, solution] = key.split('|||');
    const solutions = problemSolutions.get(problem) || [];
    solutions.push({
      description: solution,
      successRate: stats.successful / stats.total
    });
    problemSolutions.set(problem, solutions);
  }

  return Array.from(problemSolutions.entries()).map(([problem, solutions]) => ({
    problem,
    solutions: solutions.sort((a, b) => b.successRate - a.successRate)
  }));
}