import React, { useEffect, useState, useRef } from 'react';
import { Message, NoArgsReturnVoidFunction } from './types';
import Icon from './icon';
import eventManager from './event';
import styles from './style.css';

interface Props extends Message {
  onClose: NoArgsReturnVoidFunction;
}

const Toast: React.FC<Props> = ({
  id,
  type,
  content,
  duration = 3000,
  onClose,
}) => {
  const [classes, setClasses] = useState(styles.box);
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  function exit(): void {
    setClasses(() => `${styles.box} ${styles.exit}`);
  }

  useEffect(() => {
    // force a repaint
    // eslint-disable-next-line
    ref.current && ref.current.scrollTop;
    setClasses(prev => `${prev} ${styles.enter}`);
  }, []);

  useEffect(() => {
    let key = -1;
    let timerId = -1;

    if (entered) {
      // component mounting is async, there might be an exit command before a toast mounts
      // so we should make sure to trigger the published exit event
      key = eventManager.ensureTriggeredAndSubscribe(
        'lt#exit',
        (messageId: number) => {
          if (messageId === id) {
            exit();
          }
        }
      );
      if (duration !== 0) {
        timerId = window.setTimeout(exit, duration);
      }
    }

    return (): void => {
      eventManager.unSubscribe('lt#exit', key);
      window.clearTimeout(timerId);
    };
  }, [id, duration, entered]);

  return (
    <div className={styles.mask}>
      <div
        className={classes}
        style={type === 'info' ? undefined : { padding: 15, borderRadius: 5 }}
        onTransitionEnd={(): void => {
          // enter phase
          if (~classes.indexOf(styles.enter)) {
            setEntered(true);
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
