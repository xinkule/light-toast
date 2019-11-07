import React from 'react';
import ReactDOM from 'react-dom';
import { Type, NoArgsReturnVoidFunction } from './types';
import eventManager from './event-manager';
import Toast from './toast';

interface Message {
  type: Type;
  content: string;
  duration?: number;
  onClose?: NoArgsReturnVoidFunction;
}

// save messages in a queue, only remove it when component lifecycle ends
const messages: Message[] = [];

eventManager.subscribe('popmessage', (): void => {
  const { type, content, duration, onClose } = messages[0];
  const container = document.createElement('div');
  document.body.appendChild(container);
  ReactDOM.render(
    <Toast
      type={type}
      content={content}
      duration={duration}
      onClose={(): void => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        onClose && onClose();
        messages.shift();
        if (messages.length > 0) {
          eventManager.publish('popmessage');
        }
      }}
    ></Toast>,
    container
  );
});

function notice(
  type: Type,
  content: string,
  duration?: number,
  onClose?: NoArgsReturnVoidFunction
): void {
  messages.push({ type, content, duration, onClose });
  if (messages.length === 1) {
    eventManager.publish('popmessage');
  }
  // if current message is loading, then we should unmount it to proceed
  if (messages.length > 1 && messages[0].type === 'loading') {
    eventManager.publish('exit');
  }
}

export default {
  info(
    content: string,
    duration?: number,
    onClose?: NoArgsReturnVoidFunction
  ): void {
    notice('info', content, duration, onClose);
  },
  success(
    content: string,
    duration?: number,
    onClose?: NoArgsReturnVoidFunction
  ): void {
    notice('success', content, duration, onClose);
  },
  fail(
    content: string,
    duration?: number,
    onClose?: NoArgsReturnVoidFunction
  ): void {
    notice('fail', content, duration, onClose);
  },
  loading(content: string, onClose?: NoArgsReturnVoidFunction): void {
    notice('loading', content, 0, onClose);
  },
  hide(): void {
    if (messages.length > 0) {
      eventManager.publish('exit');
    }
  },
};
