export enum MessageType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
}

export interface Message {
  type: MessageType;
  title: string;
  content: string;
  id?: string;
  icon?: string; // Path to icon image
}

export interface MessageContextType {
  message: Message | null;
  showMessage: (message: Message) => void;
  clearMessage: () => void;
}

export interface ApiErrorResponse {
  message: string;
  success: boolean;
  error?: string;
  statusCode?: number;
}
