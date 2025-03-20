import React, { useState, ReactNode, useMemo } from "react";
import { Message } from "../../types/Message";
import { MessageContext } from "../../context/MessageContext";

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [message, setMessage] = useState<Message | null>(null);

  const showMessage = (message: Message) => {
    if (!message.id) {
      message.id = Date.now().toString();
    }
    setMessage(message);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  const contextValue = useMemo(
    () => ({ message, showMessage, clearMessage }),
    [message]
  );

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};
