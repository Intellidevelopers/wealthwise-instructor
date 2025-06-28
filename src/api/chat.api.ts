import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const token = localStorage.getItem('instructorToken');

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const getConversations = async () => {
  const res = await axios.get(`${API}/api/messages/conversations`, authHeader);
  return res.data;
};

export const getMessagesByConversationId = async (conversationId: string) => {
  const res = await axios.get(`${API}/api/chat/${conversationId}`, authHeader);
  return res.data;
};

export const sendMessage = async (conversationId: string, text: string) => {
  const res = await axios.post(
    `${API}/api/chat/${conversationId}`,
    { text },
    authHeader
  );
  return res.data;
};
