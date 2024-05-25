
type Message = {
  message: string;
}

export type MessageId = string

export type Messages = Record<MessageId, Message>