import { Chat, ChatMessage } from '../types';

export const fetchChatMessages = async (page: number): Promise<ChatMessage[]> => {
  try {
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
    const data = await response.json();
    return data.chats || [];
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    return [];
  }
};

export const fetchChatHeader = async (): Promise<Chat | null> => { 
  try {
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=0`);
    const data = await response.json();
    return data || null; 
  } catch (error) {
    console.error('Error fetching chat header:', error);
    return null; 
  }
};
