import React from 'react';
import { Lightbulb, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface SolutionSuggestionsProps {
  commonSolutions: {
    problem: string;
    solutions: {
      description: string;
      successRate: number;
    }[];
  }[];
}

export function SolutionSuggestions({ commonSolutions }: SolutionSuggestionsProps) {
  // Helper function to break down solution into simple steps
  const getSimpleSteps = (solution: string): string[] => {
    // Convert technical solutions into simple steps
    if (solution.includes('database') || solution.includes('connection')) {
      return [
        'Check if the database service is running',
        'Look for any error messages in the logs',
        'Verify database connection settings',
        'Test the connection with basic queries',
        'Restart the database service if needed'
      ];
    }
    if (solution.includes('API') || solution.includes('authentication')) {
      return [
        'Check if the API key is valid',
        'Verify the API endpoint URL',
        'Test the API connection',
        'Look for authentication errors',
        'Update API credentials if expired'
      ];
    }
    // Default steps for general issues
    return [
      'Identify the exact error message',
      'Check system logs for details',
      'Test basic functionality',
      'Apply the suggested fix',
      'Verify the solution works'
    ];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
          Common Solutions
        </h2>
      </div>

      <div className="space-y-6">
        {commonSolutions.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3 flex items-center">
              <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2">
                {index + 1}
              </span>
              {item.problem}
            </h3>
            
            <div className="space-y-4">
              {item.solutions.map((solution, sIndex) => (
                <div
                  key={sIndex}
                  className="bg-white rounded-lg p-4 shadow-sm border border-gray-100"
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-1">
                      {solution.successRate >= 0.7 ? (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 mb-2">
                        {solution.description}
                      </p>
                      
                      <div className="space-y-2">
                        {getSimpleSteps(solution.description).map((step, stepIndex) => (
                          <div key={stepIndex} className="flex items-center text-sm text-gray-600">
                            <ArrowRight className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" />
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 flex items-center">
                        <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300"
                            style={{
                              width: `${Math.round(solution.successRate * 100)}%`,
                              backgroundColor: solution.successRate >= 0.7 ? '#22c55e' : '#ef4444'
                            }}
                          />
                        </div>
                        <span className="ml-2 text-xs text-gray-500">
                          {Math.round(solution.successRate * 100)}% success rate
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}