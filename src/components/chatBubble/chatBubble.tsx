import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { ChatMessage } from "types";
import "./chatBubble.css";

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  return (
    <Box className = {message.sender.self ? "myMess chatMess" : "chatMess"}>
      {!message.sender.self && (
        <img
          src={message.sender.image}
          alt=""
          className="senderImage"
        />
      )}
      <Text className={message.sender.self ? "bubble myBubble" : "bubble"}>{message.message}</Text>
    </Box>
  );
};

export default ChatBubble;
