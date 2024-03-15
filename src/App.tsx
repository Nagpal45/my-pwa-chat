import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatScreen from './components/chatScreen/chatScreen';
import './App.css'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ChatHeader />
      <ChatScreen initialPage={0}/>
      <ChatFooter/>
    </ChakraProvider>
  );
};

export default App;
