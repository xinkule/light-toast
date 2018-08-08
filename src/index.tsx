import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Animation, Option, Type } from './PropsType';
import Toast from './Toast';

(function insertStyle() {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerHTML = `
    .light-toast-mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      background: transparent;
      z-index: 1999;
    }

    .light-toast-message {
      display: inline-block;
      max-width: 80%;
      min-width: 95px;
      line-height: 1.5;
      padding: 9px 15px;
      box-sizing: border-box;
      text-align: center;
      word-break: break-all;
      font-size: 14px;
      color: #fff;
      background-color: rgba(58, 58, 58, 0.9);
      border-radius: 3px;
      opacity: 0;
    }

    .light-toast-message.icon {
      padding: 15px;
      border-radius: 5px;
    }

    .light-toast-icon-wrapper {
      margin: 0 auto 10px;
      width: 36px;
      height: 36px;
    }

    .light-toast-loading {
      -webkit-animation: loading 1s linear infinite;
      animation: loading 1s linear infinite;
    }

    @-webkit-keyframes loading {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  
    @keyframes loading {
      100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }`;
  document.head.appendChild(styleSheet);
})();

let toastInstance: Toast | null = null;

function notice(type: Type, { content, duration, onClose }: Option) {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const component = (
    <Toast
      type={type}
      content={content}
      duration={duration}
      onClose={() => {
        ReactDOM.unmountComponentAtNode(container);
        document.body.removeChild(container);
        if (onClose) {
          onClose();
        }
      }}
      ref={ref => {
        toastInstance = ref;
      }}
    />
  );
  ReactDOM.render(component, container);
}

export default {
  info(content: string, duration?: number, onClose?: () => void) {
    notice(Type.Info, { content, duration, onClose });
  },
  success(content: string, duration?: number, onClose?: () => void) {
    notice(Type.Success, { content, duration, onClose });
  },
  fail(content: string, duration?: number, onClose?: () => void) {
    notice(Type.Fail, { content, duration, onClose });
  },
  loading(content: string, onClose?: () => void) {
    notice(Type.Loading, { content, onClose });
  },
  hide() {
    if (toastInstance) {
      toastInstance.fade(Animation.Out, toastInstance.props.onClose);
      toastInstance = null;
    }
  }
};
