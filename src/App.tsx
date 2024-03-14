import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatScreen from './components/chatScreen/chatScreen';
import './App.css'

const App: React.FC = () => {
  return (
    <ChakraProvider>
      <ChatScreen initialPage={0}/>
    </ChakraProvider>
  );
};

export default App;
