export type ChatSender = "user" | "ai";

export interface ChatMessage {
  id: string;
  text: string;
  attachedDoc?: string;
  timestamp: string;
  sender: ChatSender;
}
