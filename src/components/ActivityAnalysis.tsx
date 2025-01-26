import React, { useMemo } from 'react';
import { TrendingUp, Clock, AlertCircle, ArrowUp, ArrowDown, Activity } from 'lucide-react';

interface ActivityAnalysisProps {
  activityByHour: { hour: number; count: number }[];
  predictedPeakHours: { hour: number; probability: number }[];
}

export function ActivityAnalysis({ activityByHour, predictedPeakHours }: ActivityAnalysisProps) {
  const maxCount = Math.max(...activityByHour.map(h => h.count));
  const currentHour = new Date().getHours();
  
  const formatHour = (hour: number): string => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}${period}`;
  };

  const stats = useMemo(() => {
    const total = activityByHour.reduce((sum, { count }) => sum + count, 0);
    const avg = total / 24;
    const peak = activityByHour.reduce((max, curr) => curr.count > max.count ? curr : max);
    const quiet = activityByHour.reduce((min, curr) => curr.count < min.count ? curr : min);
    
    return {
      total,
      avg,
      peak,
      quiet
    };
  }, [activityByHour]);

  const upcomingPeaks = predictedPeakHours
    .filter(p => p.hour > currentHour)
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 3);

  // Group hours into 4 six-hour periods
  const periods = [
    { name: 'Night', hours: activityByHour.slice(0, 6) },
    { name: 'Morning', hours: activityByHour.slice(6, 12) },
    { name: 'Afternoon', hours: activityByHour.slice(12, 18) },
    { name: 'Evening', hours: activityByHour.slice(18, 24) }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-8">
        <div className="p-2 bg-blue-50 rounded-lg">
          <TrendingUp className="w-5 h-5 text-blue-600" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">Activity Analysis</h2>
      </div>

      <div className="space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600/90 font-medium">Peak Time</p>
                <p className="text-xl font-bold text-blue-900 mt-1">
                  {formatHour(stats.peak.hour)}
                </p>
                <p className="text-sm text-blue-600/75 mt-1">
                  {stats.peak.count} tickets
                </p>
              </div>
              <ArrowUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600/90 font-medium">Average</p>
                <p className="text-xl font-bold text-purple-900 mt-1">
                  {Math.round(stats.avg * 10) / 10}
                </p>
                <p className="text-sm text-purple-600/75 mt-1">per hour</p>
              </div>
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600/90 font-medium">Quiet Time</p>
                <p className="text-xl font-bold text-green-900 mt-1">
                  {formatHour(stats.quiet.hour)}
                </p>
                <p className="text-sm text-green-600/75 mt-1">
                  {stats.quiet.count} tickets
                </p>
              </div>
              <ArrowDown className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </div>

        {/* Activity Heatmap */}
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">Daily Activity Pattern</h3>
          <div className="space-y-6">
            {periods.map((period, periodIndex) => (
              <div key={period.name} className="relative">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">{period.name}</span>
                  <div className="flex-1 h-px bg-gray-100 mx-3"></div>
                  <span className="text-xs text-gray-400">
                    {formatHour(periodIndex * 6)} - {formatHour((periodIndex + 1) * 6 - 1)}
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {period.hours.map(({ hour, count }) => (
                    <div key={hour} className="group relative">
                      <div className="flex items-end h-16 bg-gray-50 rounded-lg overflow-hidden">
                        <div
                          className="w-full bg-blue-100 transition-all duration-200 hover:opacity-80"
                          style={{
                            height: `${(count / maxCount) * 100}%`,
                            backgroundColor: `rgba(59, 130, 246, ${Math.max(0.15, count / maxCount)})`,
                          }}
                        >
                          <div className="opacity-0 group-hover:opacity-100 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                            {count} tickets at {formatHour(hour)}
                          </div>
                        </div>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-gray-500">{formatHour(hour)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Predictions */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1.5 text-orange-500" />
            Predicted Peak Hours
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {upcomingPeaks.map(({ hour, probability }) => (
              <div
                key={hour}
                className="bg-gradient-to-br from-orange-50 to-orange-100/30 rounded-xl p-3"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-orange-500 mr-1.5" />
                    <span className="text-sm font-medium text-gray-700">
                      {formatHour(hour)}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-orange-600">
                    {Math.round(probability * 100)}%
                  </span>
                </div>
                <div className="h-1.5 bg-orange-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full transition-all duration-300"
                    style={{ width: `${probability * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}