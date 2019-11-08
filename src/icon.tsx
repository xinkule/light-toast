import React from 'react';
import { Type } from './types';
import { ReactComponent as Success } from './svg/check.svg';
import { ReactComponent as Loading } from './svg/loading.svg';
import { ReactComponent as Fail } from './svg/close.svg';
import styles from './style.css';

const icons = {
  fail: <Fail fill="#fff"></Fail>,
  loading: <Loading fill="#fff" className={styles.loading}></Loading>,
  success: <Success fill="#fff"></Success>,
};

export default function Icon({ type }: { type: Type }): React.ReactElement {
  return icons[type];
}
