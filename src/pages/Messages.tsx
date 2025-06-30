import React, { useEffect, useState, useRef } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  getConversations,
  getMessagesByConversationId,
  sendMessage,
} from '@/api/auth.api';
import io from 'socket.io-client';
import { jwtDecode } from 'jwt-decode';
import toast, { Toaster } from 'react-hot-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useParams } from 'react-router-dom';



const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play();
};

interface Message {
  _id?: string;
  sender: { _id: string; firstName?: string; lastName?: string };
  text: string;
  createdAt?: string;
}

interface Conversation {
  _id: string;
  participant: { _id: string; firstName: string; lastName: string; avatar?: string };
}

interface DecodedToken {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

const Messages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useParams(); // 🚀 get route param


  const token = localStorage.getItem('instructorToken');
  const currentUserId = token ? (jwtDecode(token) as DecodedToken).id : '';

  let typingTimeout: NodeJS.Timeout;

useEffect(() => {
  (async () => {
    const data = await getConversations();
    setConversations(data);

    // 👇 If userId exists in URL, auto-activate the correct conversation
    if (userId) {
      const match = data.find((conv) => conv.participant._id === userId);
      if (match) {
        setActiveConversation(match);
      }
    }
  })();
}, [userId]);


  useEffect(() => {
    if (activeConversation) {
      socket.emit('join', activeConversation._id);

      (async () => {
        const msgs = await getMessagesByConversationId(activeConversation._id);
        setMessages(msgs);
      })();
    }
  }, [activeConversation]);

useEffect(() => {
  socket.on('receiveMessage', (msg: Message) => {
    if (msg && activeConversation && msg.sender._id !== currentUserId) {
      setMessages((prev) => [...prev, msg]);
      toast(`📨 New message from ${msg.sender.firstName}`);
      playNotificationSound();
    }
  });

  return () => {
    socket.off('receiveMessage');
  };
}, [activeConversation, currentUserId]);


  const handleTyping = () => {
    if (!activeConversation) return;

    socket.emit('typing', {
      conversationId: activeConversation._id,
      userId: currentUserId,
    });

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('stopTyping', {
        conversationId: activeConversation._id,
        userId: currentUserId,
      });
    }, 1500);
  };

  const handleSend = async () => {
    if (!input || !activeConversation) return;

    const msg = await sendMessage(activeConversation._id, input);
    socket.emit('sendMessage', { conversationId: activeConversation._id, message: msg });
    socket.emit('stopTyping', {
      conversationId: activeConversation._id,
      userId: currentUserId,
    });
    setMessages((prev) => [...prev, msg]);
    setInput('');
  };

  const SentMessage = ({ text, createdAt }: { text: string; createdAt?: string }) => (
    <div className="w-full flex justify-end">
      <div className="p-3 rounded-lg max-w-xs shadow bg-wealthwise-700 text-white ml-auto">
        <p className="text-sm">{text}</p>
        <span className="text-xs mt-1 block text-right opacity-70 text-wealthwise-200">
          {new Date(createdAt || '').toLocaleTimeString()}
        </span>
      </div>
    </div>
  );

  const ReceivedMessage = ({ text, createdAt }: { text: string; createdAt?: string }) => (
    <div className="w-full flex justify-start">
      <div className="p-3 rounded-lg max-w-xs shadow bg-gray-100 text-gray-900 mr-auto">
        <p className="text-sm">{text}</p>
        <span className="text-xs mt-1 block text-right opacity-70 text-gray-500">
          {new Date(createdAt || '').toLocaleTimeString()}
        </span>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 overflow-y-auto max-h-[500px]">
              {conversations.map((conv) => (
                <div
                  key={conv._id}
                  onClick={() => setActiveConversation(conv)}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 flex items-center space-x-3 ${
                    activeConversation?._id === conv._id ? 'bg-gray-100' : ''
                  }`}
                >
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={conv.participant.avatar || '/default-avatar.png'}
                      alt="User avatar"
                    />
                    <AvatarFallback>
                      <img src="/user.png" alt="Fallback avatar" className="w-full h-full object-cover rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">
                        {conv.participant.firstName} {conv.participant.lastName}
                      </h4>
                      {onlineUsers.includes(conv.participant._id) && (
                        <span className="text-green-500 text-xs">● Online</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate">Click to view chat</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>{activeConversation?.participant?.firstName || 'Select a chat'}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col h-full">
              <div className="flex-1 space-y-4 mb-4 overflow-y-auto max-h-[450px] pr-2">
                  {messages.length === 0 ? (
                    <div style={{marginTop: 200, justifyContent: 'center'}} className="text-sm text-gray-400 text-center mt-10">
                      <img src="/go.gif" alt="" className='w-40' style={{alignSelf: 'center', marginLeft: 300}} />
                      No conversation 📨 yet. Start a conversation or select an existing one.
                    </div>
                  ) : (
                    messages.map((msg, idx) =>
                      String(msg.sender?._id) === String(currentUserId) ? (
                        <SentMessage key={idx} text={msg.text} createdAt={msg.createdAt} />
                      ) : (
                        <ReceivedMessage key={idx} text={msg.text} createdAt={msg.createdAt} />
                      )
                    )
                  )}

                  {isTyping && (
                    <div className="text-xs italic text-gray-500">Typing...</div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>


              {/* Input */}
              {activeConversation && (
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      handleTyping();
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-wealthwise-700 hover:bg-wealthwise-800"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
