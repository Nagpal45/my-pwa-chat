import React, { useState, useEffect, useRef } from "react";
import { Box, Divider, Text, VStack } from "@chakra-ui/react";
import { fetchChatMessages } from "../../services/chatService";
import ChatBubble from "../chatBubble/chatBubble";
import { ChatMessage } from "types";
import "./chatScreen.css";

interface ChatScreenProps {
  initialPage: number;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ initialPage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await fetchChatMessages(initialPage);
      setMessages(initialMessages.reverse()); 
    };
    fetchInitialMessages();
    setTimeout(()=>{
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight ;
      }
    },500)
  }, [initialPage]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }

  const handleScroll = async (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = event.currentTarget;
    if (scrollTop <= 200 && !isLoading) {
      setIsLoading(true);
      const olderMessages = await fetchChatMessages(initialPage + 1); 
      setMessages([...olderMessages.reverse(), ...messages]);
      setIsLoading(false);
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =  200;
      }
    }
    
  };

  return (
    <Box className='chatScreen'>
      <Box
        ref={chatContainerRef}
        style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
        onScroll={handleScroll}
      >
        <VStack spacing={4} alignItems="flex-start" paddingBottom="16px">
          {messages.map((message, index) => (
            <React.Fragment key={message.id}>
              {index === 0 || formatDate(messages[index - 1].time) !== formatDate(message.time) ? (
                <React.Fragment>
                  <Divider width="100%" />
                  <Text fontSize="sm" fontWeight="bold" color="gray.500" alignSelf="center">
                    {formatDate(message.time)}
                  </Text>
                </React.Fragment>
              ) : null}
              
              <ChatBubble message={message} />
            </React.Fragment>
          ))}
        </VStack>
      </Box>
      
    </Box>
  );
};
export default ChatScreen;