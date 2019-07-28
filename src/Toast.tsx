import * as raf from 'raf';
import * as React from 'react';
import Icon from './Icon';
import { Animation, Option, Type } from './PropsType';

export interface Props extends Option {
  type: Type;
  onClose: () => void;
}

interface FadeEvent {
  type: Animation;
  callback: () => void;
}

class Toast extends React.PureComponent<Props, {}> {
  public static defaultProps = {
    duration: 3000,
  };

  private ele: HTMLSpanElement;
  private isFadingIn = false;
  private eventStacks: FadeEvent[] = [];

  public componentDidMount() {
    this.isFadingIn = true;
    this.fade(Animation.In, () => {
      if (this.props.type !== Type.Loading) {
        this.startTimer();
      }
    });
  }

  public fade(type: Animation, callback: () => void) {
    let last = Date.now();
    const tick = () => {
      const opacity = Number(this.ele.style.opacity);
      this.ele.style.opacity =
        type === Animation.In
          ? (opacity + (Date.now() - last) / 400).toString()
          : (opacity - (Date.now() - last) / 400).toString();
      last = Date.now();

      if (
        (type === Animation.In && +this.ele.style.opacity < 1) ||
        (type === Animation.Out && +this.ele.style.opacity > 0)
      ) {
        raf(tick);
      } else {
        callback();
        this.isFadingIn = false;
        if (this.eventStacks.length > 0) {
          const event = this.eventStacks.pop() as FadeEvent;
          this.fade(event.type, event.callback);
        }
      }
    };
    if (type === Animation.Out && this.isFadingIn) {
      this.eventStacks.push({ type, callback });
    } else {
      raf(tick);
    }
  }

  public render() {
    const { type, content } = this.props;
    return (
      <div className="light-toast-mask">
        <span
          className={`light-toast-message${type === Type.Info ? '' : ' icon'}`}
          ref={ref => {
            this.ele = ref as HTMLSpanElement;
          }}
        >
          {type !== Type.Info && (
            <div className="light-toast-icon-wrapper">
              <Icon type={type} />
            </div>
          )}
          {content}
        </span>
      </div>
    );
  }

  private startTimer() {
    const { duration, onClose } = this.props;
    setTimeout(() => {
      this.fade(Animation.Out, onClose);
    }, duration);
  }
}

export default Toast;
