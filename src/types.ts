export interface ChatMessage {
    id: string;
    message: string;
    sender: {
      image: string;
      is_kyc_verified: boolean;
      self: boolean;
      user_id: string;
    };
    time: string;
  }

  export interface Chat {
    chats: object,
    name: string,
    from: string,
    to: string
  }
