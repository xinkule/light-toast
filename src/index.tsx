import React from 'react';
import ReactDOM from 'react-dom/client';
import { Type, NoArgsReturnVoidFunction, Message } from './types';
import Toast from './toast';
import Queue from './queue';
import eventManager from './event';

const queue = new Queue();

eventManager.subscribe(
  'lt#popmessage',
  ({ id, type, content, duration, onClose }: Message) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    let root = ReactDOM.createRoot(container);
    root.render(
      <Toast
        id={id}
        type={type}
        content={content}
        duration={duration}
        onClose={(): void => {
          root.unmount();
          document.body.removeChild(container);
          onClose && onClose();
          queue.shift();
          if (queue.length > 0) {
            eventManager.publish('lt#popmessage', queue.getFirstMessage());
          }
        }}
      />
    );
  }
);

function notice(
  type: Type,
  content: string,
  duration?: number,
  onClose?: NoArgsReturnVoidFunction
): void {
  queue.push({ type, content, duration, onClose });
  // toast right now if there is only one message in queue
  if (queue.length === 1) {
    eventManager.publish('lt#popmessage', queue.getFirstMessage());
    return;
  }
  // if current message is loading, then we should unmount it to proceed
  if (queue.length > 1) {
    const message = queue.getFirstMessage();
    if (message.type === 'loading') {
      eventManager.publish('lt#exit', message.id);
    }
  }
}

const index = {
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
    // hide the first toast in the queue when executing the command
    if (queue.length > 0) {
      eventManager.publish('lt#exit', queue.getFirstMessage().id);
    }
  },
};

export default index;
