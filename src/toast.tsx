import React, { useEffect, useState, useRef } from 'react';
import { Type, NoArgsReturnVoidFunction } from './types';
import Icon from './icon';
import eventManager from './event-manager';
import styles from './style.css';

let timerId = -1;

function debounce(
  callback: NoArgsReturnVoidFunction
): NoArgsReturnVoidFunction {
  let count = 0;
  return (): void => {
    if (count === 0) {
      callback();
      count++;
    }
  };
}

type Props = {
  type: Type;
  content: string;
  duration?: number;
  onClose: NoArgsReturnVoidFunction;
};

const Toast = ({
  type,
  content,
  duration = 3000,
  onClose,
}: Props): React.ReactElement => {
  const [classes, setClasses] = useState(styles.box);
  const ref = useRef<HTMLDivElement>(null);

  function exit(): void {
    setClasses((): string => `${styles.box} ${styles.exit}`);
  }

  useEffect((): NoArgsReturnVoidFunction => {
    // force a repaint
    /* eslint-disable no-unused-expressions */
    ref.current && ref.current.scrollTop;
    /* eslint-disable no-unused-expressions */
    setClasses((prev): string => `${prev} ${styles.enter}`);
    const key = eventManager.subscribe('exit', exit);

    return (): void => {
      eventManager.unSubscribe('exit', key);
      window.clearTimeout(timerId); // in case toast unmount before reaching the timeout
    };
  }, []);

  const scheduleExit = debounce((): void => {
    timerId = window.setTimeout(exit, duration);
  });

  return (
    <div className={styles.mask}>
      <div
        className={classes}
        style={type === 'info' ? undefined : { padding: 15, borderRadius: 5 }}
        onTransitionEnd={(): void => {
          // enter phase
          if (~classes.indexOf(styles.enter) && duration !== 0) {
            scheduleExit();
          }

          // exit phase
          if (~classes.indexOf(styles.exit)) {
            onClose();
          }
        }}
        ref={ref}
      >
        {type !== 'info' && (
          <div
            className={styles.wrapper}
            style={type === 'loading' ? { marginBottom: 10 } : undefined}
          >
            <Icon type={type}></Icon>
          </div>
        )}
        <span className={styles.message}>{content}</span>
      </div>
    </div>
  );
};

export default Toast;
