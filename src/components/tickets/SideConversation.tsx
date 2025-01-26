import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatBubbleLeftRightIcon, PaperClipIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/Button';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  attachments?: { name: string; size: string }[];
}

interface SideConversationProps {
  ticketId: string;
}

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    content: 'I think we should check the server logs first before responding to the customer.',
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    sender: 'Jane Smith',
    content: 'Good idea. I\'ve attached the recent logs for review.',
    timestamp: '10:32 AM',
    attachments: [
      { name: 'server_logs.txt', size: '2.3 MB' },
    ],
  },
];

export function SideConversation({ ticketId }: SideConversationProps) {
  const [newMessage, setNewMessage] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Add logic to send message
    setNewMessage('');
  };

  return (
    <motion.div
      initial={{ width: 0, opacity: 0 }}
      animate={{ width: isExpanded ? 320 : 0, opacity: 1 }}
      className="border-l border-gray-200 bg-white h-full"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium text-gray-900">Side Conversation</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Minimize' : 'Expand'}
          </Button>
        </div>
      </div>

      <div className="flex flex-col h-[calc(100%-8rem)]">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {MOCK_MESSAGES.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-6 w-6 text-gray-400" />
                <span className="font-medium text-gray-900">{message.sender}</span>
                <span className="text-sm text-gray-500">{message.timestamp}</span>
              </div>
              <div className="ml-8">
                <p className="text-gray-600">{message.content}</p>
                {message.attachments?.map((attachment) => (
                  <div
                    key={attachment.name}
                    className="flex items-center space-x-2 mt-2 text-sm text-gray-500"
                  >
                    <PaperClipIcon className="h-4 w-4" />
                    <span>{attachment.name}</span>
                    <span>({attachment.size})</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              Send
            </Button>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-500">
            <PaperClipIcon className="h-4 w-4 mr-1" />
            <span>Attach files</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
