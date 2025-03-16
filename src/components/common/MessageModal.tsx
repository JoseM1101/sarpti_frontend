 import React from "react";
import Modal from "./Modal";
import { useMessage } from "../../hooks/useMessage";
import { MessageType } from "../../types/Message";
import { MESSAGE_ICONS } from "../../constants/messageIcons";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

const MessageModal: React.FC = () => {
  const { message, clearMessage } = useMessage();

  if (!message) return null;

  const getIcon = () =>
    message.icon || MESSAGE_ICONS[message.type] || MESSAGE_ICONS[MessageType.INFO];

  const getHeaderColor = () => {
    switch (message.type) {
      case MessageType.ERROR:
        return "bg-red-500";
      case MessageType.SUCCESS:
        return "bg-green-500";
      case MessageType.INFO:
        return "bg-blue-500";
      case MessageType.WARNING:
        return "bg-yellow-500";
      default:
        return "bg-blue-500";
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
          <p className="text-gray-700">{message.content}</p>
        </div>
        <div className="flex justify-end p-4 gap-2">
          {message.onConfirm ? (
            <>
              <Button
                onClick={() => {
                  message.onConfirm!();
                  clearMessage();
                }}
              >
                Confirmar
              </Button>
              <Button onClick={clearMessage}>Cancelar</Button>
            </>
          ) : (
            <Button onClick={clearMessage}>Cerrar</Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default MessageModal;
