import { MessageType } from "../types/Message";

export const MESSAGE_ICONS: Record<MessageType, string> = {
  [MessageType.ERROR]: "/assets/icons/error.png",
  [MessageType.SUCCESS]: "/assets/icons/success.png",
  [MessageType.INFO]: "/assets/icons/info.png",
  [MessageType.WARNING]: "/assets/icons/warning.png",
};
