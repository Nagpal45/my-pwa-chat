// In your component
import React, { useState, useEffect } from 'react';
import './chatHeader.css';
import { Back, Dots, EditIcon} from '../../images';
import { fetchChatHeader } from '../../services/chatService';
import { Chat } from 'types';

const ChatHeader: React.FC = () => {
  const [header, setHeader] = useState<Chat | null>(null); 

  useEffect(() => {
    const fetchInitialHeader = async () => {
      const initialHeader = await fetchChatHeader();
      setHeader(initialHeader);
    };
    fetchInitialHeader();
  }, []); 

  return (
    <div className="chatHeader">
      <div className="top">
        <Back width={24} height={24} />
        <div className='tripInfo'>
          <p>{header?.name}</p> 
        </div>
        <EditIcon width={20} height={20} />
      </div>
      <div className="bottom">
        <div className="text">
          <img src='/images/image.png' alt="" width={48} height={48}/>
          <div className="textInfo">
            <p>From <span>{header?.from}</span></p>
            <p>To <span>{header?.to}</span></p>
          </div>
        </div>
        <Dots width={24} height={24}/>
      </div>
    </div>
  );
};

export default ChatHeader;
