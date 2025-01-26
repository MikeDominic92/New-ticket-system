import React from 'react';
import { CheckCircle2, Mail, Mic, Clock, Tag, ArrowRight, AlertCircle, Terminal, FileText, RefreshCw } from 'lucide-react';
import { Ticket } from '../types';
import { formatDate } from '../utils';
import { AISearch } from './AISearch';

interface TicketDetailProps {
  ticket: Ticket | null;
}

export function TicketDetail({ ticket }: TicketDetailProps) {
  if (!ticket) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a ticket to view details
      </div>
    );
  }

  const handleAISearch = async (query: string) => {
    // Simulate AI search results with more focused problem-solution pairs
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        title: `User reports: ${ticket.description}`,
        solution: `Based on analysis, likely solution: ${ticket.actualProblem}. Recommended action: ${ticket.steps[0]}`,
        confidence: 92
      },
      {
        title: 'Similar Past Issues',
        solution: `Previous successful resolution: ${ticket.attemptedSolutions.find(s => s.successful)?.description || 'Check system configurations and logs'}`,
        confidence: 85
      },
      {
        title: 'Quick Resolution Path',
        solution: 'Follow standard troubleshooting steps: verify configurations, check logs, test connectivity',
        confidence: 78
      }
    ];
  };

  // Enhanced step details based on the ticket category
  const getDetailedSteps = (step: string) => {
    if (step.toLowerCase().includes('check')) {
      return {
        icon: <Terminal className="w-5 h-5 text-blue-500" />,
        details: [
          'Open terminal or command prompt',
          'Run diagnostic commands',
          'Look for error codes or warnings',
          'Document findings for reference'
        ]
      };
    }
    if (step.toLowerCase().includes('verify')) {
      return {
        icon: <FileText className="w-5 h-5 text-green-500" />,
        details: [
          'Access configuration files',
          'Compare against known good settings',
          'Check for recent changes',
          'Validate all parameters'
        ]
      };
    }
    if (step.toLowerCase().includes('restart') || step.toLowerCase().includes('reset')) {
      return {
        icon: <RefreshCw className="w-5 h-5 text-orange-500" />,
        details: [
          'Save any unsaved work',
          'Stop related services',
          'Clear temporary files if needed',
          'Restart service or system',
          'Verify successful restart'
        ]
      };
    }
    return {
      icon: <ArrowRight className="w-5 h-5 text-gray-500" />,
      details: [
        'Document current state',
        'Follow standard procedure',
        'Test after each change',
        'Record results'
      ]
    };
  };

  return (
    <div className="space-y-6">
      {/* Support Engineer AI Search */}
      <div className="mb-6">
        <AISearch onSearch={handleAISearch} />
      </div>

      {/* Ticket Overview */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-medium text-gray-900">Ticket Overview</h3>
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
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Status:</span> {ticket.status}
            </p>
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Category:</span> {ticket.category}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              <span className="font-medium text-gray-700">Created:</span> {formatDate(ticket.createdAt)}
            </p>
            {ticket.resolvedAt && (
              <p className="text-gray-600">
                <span className="font-medium text-gray-700">Resolved:</span> {formatDate(ticket.resolvedAt)}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Original Message */}
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {ticket.originalMessage.type === 'email' ? (
              <Mail className="w-5 h-5 text-blue-500" />
            ) : (
              <Mic className="w-5 h-5 text-purple-500" />
            )}
            <h3 className="font-medium text-gray-900">Original Message</h3>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(ticket.originalMessage.timestamp)}
          </span>
        </div>
        <p className="text-gray-600 whitespace-pre-wrap">
          {ticket.originalMessage.content}
        </p>
      </div>

      {/* Problem Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Problem Analysis</h3>
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Reported Issue:</p>
                <p className="text-gray-600 mt-1">{ticket.description}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Root Cause:</p>
                <p className="text-gray-600 mt-1">{ticket.actualProblem}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Resolution Steps */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Resolution Steps</h3>
        <div className="space-y-4">
          {ticket.steps.map((step, index) => (
            <div key={index} className="bg-white rounded-xl p-4 border border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-2">{step}</h4>
                  <div className="space-y-3 mt-3">
                    {getDetailedSteps(step).details.map((detail, dIndex) => (
                      <div key={dIndex} className="flex items-center space-x-2 text-sm text-gray-600">
                        {getDetailedSteps(step).icon}
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  {ticket.attemptedSolutions[index] && (
                    <div className={`mt-4 p-3 rounded-lg ${
                      ticket.attemptedSolutions[index].successful
                        ? 'bg-green-50 border border-green-100'
                        : 'bg-red-50 border border-red-100'
                    }`}>
                      <div className="flex items-center space-x-2">
                        {ticket.attemptedSolutions[index].successful ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <span className={`text-sm ${
                          ticket.attemptedSolutions[index].successful
                            ? 'text-green-700'
                            : 'text-red-700'
                        }`}>
                          {ticket.attemptedSolutions[index].description}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}