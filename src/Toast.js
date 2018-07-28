import React, { PureComponent } from 'react';
import raf from 'raf';
import { oneOf, string, number, func } from 'prop-types';
import Icon from './Icon';

class Toast extends PureComponent {
  static propTypes = {
    type: oneOf(['info', 'success', 'fail', 'loading']),
    content: string,
    duration: number,
    onClose: func
  };

  static defaultProps = {
    duration: 3000
  };

  componentDidMount() {
    this.fade('in', () => {
      if (this.props.type !== 'loading') {
        this.startTimer();
      }
    });
  }

  startTimer = () => {
    const { duration, onClose } = this.props;
    setTimeout(() => {
      this.fade('out', onClose);
    }, duration);
  };

  fade(type, callback) {
    let last = Date.now();
    const tick = () => {
      this.ele.style.opacity =
        type === 'in'
          ? +this.ele.style.opacity + (Date.now() - last) / 400
          : +this.ele.style.opacity - (Date.now() - last) / 400;
      last = Date.now();

      if (
        (type === 'in' && +this.ele.style.opacity < 1) ||
        (type === 'out' && +this.ele.style.opacity > 0)
      ) {
        raf(tick);
      } else {
        callback();
      }
    };
    raf(tick);
  }

  render() {
    const { type, content } = this.props;
    return (
      <div className="light-toast-mask">
        <span
          className={`light-toast-message${type === 'info' ? '' : ' icon'}`}
          ref={ref => {
            this.ele = ref;
          }}
        >
          {type !== 'info' && (
            <div className="light-toast-icon-wrapper">
              <Icon type={type} />
            </div>
          )}
          {content}
        </span>
      </div>
    );
  }
}

export default Toast;
