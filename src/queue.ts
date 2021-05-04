import { Message } from './types';

/**
 * Message queue.
 * Save messages in a queue, only remove it when component lifecycle ends.
 */
class Queue {
  _messages: Message[];
  /** self increasing id */
  _uniqueId: number;

  constructor() {
    this._messages = [];
    this._uniqueId = 0;
  }

  push(message: Omit<Message, 'id'>): void {
    this._messages.push({ id: this._uniqueId++, ...message });
  }

  get length(): number {
    return this._messages.length;
  }

  getFirstMessage(): Message {
    return this._messages[0];
  }

  shift(): Message {
    return this._messages.shift() as Message;
  }
}

export default Queue;
