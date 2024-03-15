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
  // const [page, setPage] = useState(initialPage);
  // const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);


  // const loadMoreMessages = async () => {
  //   setLoading(true);
  //   const newMessages = await fetchChatMessages(page + 1);
  //   setMessages((prevMessages) => [...prevMessages, ...newMessages]);
  //   setPage((prevPage) => prevPage + 1);
  //   setLoading(false);
  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.scrollTop = 375;
  //   }
  // };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await fetchChatMessages(initialPage);
      setMessages(initialMessages.reverse()); 
      if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight ;
    }
    };
    fetchInitialMessages();
  }, [initialPage]);

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  // Function to format the date in the desired format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else {
      return date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    }
  }
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (
  //       chatContainerRef.current &&
  //       chatContainerRef.current.scrollTop <= 500 && 
  //       chatContainerRef.current.scrollTop !== 0 && 
  //       !loading
  //     ) {
  //       loadMoreMessages();
  //     }
  //   };

  //   if (chatContainerRef.current) {
  //     chatContainerRef.current.addEventListener('scroll', handleScroll);
  //   }

  //   return () => {
  //     if (chatContainerRef.current) {
  //       chatContainerRef.current.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [loading]);

  return (
    <Box className='chatScreen'>
      <Box
        ref={chatContainerRef}
        style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
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