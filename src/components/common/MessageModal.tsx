import React from "react";
import Modal from "./Modal";
import { useMessage } from "../../hooks/useMessage";
import { MessageType } from "../../types/Message";
import { MESSAGE_ICONS } from "../../constants/messageIcons";
import { twMerge } from "tailwind-merge";

const MessageModal: React.FC = () => {
  const { message, clearMessage } = useMessage();

  if (!message) return null;

  const getIcon = () => {
    return message.icon || MESSAGE_ICONS[message.type] || MESSAGE_ICONS[MessageType.INFO];
  };

  const getHeaderColor = () => {
    switch (message.type) {
      case MessageType.ERROR:
        return "bg-red";
      case MessageType.SUCCESS:
        return "bg-green";
      case MessageType.INFO:
        return "bg-lightblue";
      case MessageType.WARNING:
        return "bg-yellow";
      default:
        return "bg-lightblue";
    }
  };

  return (
    <Modal isOpen={!!message} closeModal={clearMessage}>
      <div className="flex flex-col">
        <div className={twMerge("p-4 rounded-t-lg flex items-center gap-3", getHeaderColor())}>
          <img src={getIcon()} alt={message.type} className="w-6 h-6" />
          <h2 className="text-white font-semibold text-xl">{message.title}</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-3">{message.content}</p>
        </div>
        <div className="flex justify-end p-4">
          <button
            onClick={clearMessage}
            className="px-4 py-2 bg-lightblue text-white rounded hover:bg-blue-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
