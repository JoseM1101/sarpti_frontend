import { createContext } from "react";
import { MessageContextType } from "../types/Message";

export const MessageContext = createContext<MessageContextType>({
  message: null,
  showMessage: () => {},
  clearMessage: () => {},
});
