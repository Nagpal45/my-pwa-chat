import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import ChatScreen from './components/chatScreen/chatScreen';
import './App.css'
import ChatHeader from './components/chatHeader/chatHeader';
import ChatFooter from './components/chatFooter/chatFooter';


const App: React.FC = () => {
  return (
    <ChakraProvider>
      <div className="app">
      <ChatHeader />
      <ChatScreen initialPage={0}/>
      <ChatFooter/>
      </div>
    </ChakraProvider>
  );
};

export default App;
