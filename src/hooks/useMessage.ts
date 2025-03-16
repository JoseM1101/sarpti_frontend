import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";
import { MessageContextType } from "../types/Message";

export const useMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
