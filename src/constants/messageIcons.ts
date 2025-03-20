import errorIcon from "../assets/icons/error.png";
import successIcon from "../assets/icons/success.png";
import infoIcon from "../assets/icons/info.png";
import warningIcon from "../assets/icons/warning.png";
import { MessageType } from "../types/Message";

export const MESSAGE_ICONS: Record<MessageType, string> = {
  [MessageType.ERROR]: errorIcon,
  [MessageType.SUCCESS]: successIcon,
  [MessageType.INFO]: infoIcon,
  [MessageType.WARNING]: warningIcon,
};
