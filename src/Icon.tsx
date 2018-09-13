import * as React from 'react';
import { Type } from './PropsType';

const iconTypes = {
  fail: (
    <svg viewBox="0 0 72 72">
      <g fill="none" fillRule="evenodd">
        <path
          d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z"
          fill="#FFF"
        />
        <path
          d="M22 22l28.304 28.304m-28.304 0L50.304 22"
          stroke="#FFF"
          strokeWidth="2"
        />
      </g>
    </svg>
  ),
  loading: <div className="light-toast-loading" />,
  success: (
    <svg viewBox="0 0 72 72">
      <g fill="none" fillRule="evenodd">
        <path
          d="M36 72c19.882 0 36-16.118 36-36S55.882 0 36 0 0 16.118 0 36s16.118 36 36 36zm0-2c18.778 0 34-15.222 34-34S54.778 2 36 2 2 17.222 2 36s15.222 34 34 34z"
          fill="#FFF"
        />
        <path
          stroke="#FFF"
          strokeWidth="2"
          d="M19 34.54l11.545 11.923L52.815 24"
        />
      </g>
    </svg>
  )
};

function Icon({ type }: { type: Type }): JSX.Element {
  return iconTypes[type];
}

export default Icon;
