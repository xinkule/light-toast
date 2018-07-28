import React from 'react';

const iconTypes = {
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
  ),
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
  loading: (
    <svg viewBox="0 -2 59.75 60.25" className="light-toast-loading">
      <path
        fill="#ccc"
        d="M29.69-.527C14.044-.527 1.36 12.158 1.36 27.806S14.043 56.14 29.69 56.14c15.65 0 28.334-12.686 28.334-28.334S45.34-.527 29.69-.527zm.185 53.75c-14.037 0-25.417-11.38-25.417-25.417S15.838 2.39 29.875 2.39s25.417 11.38 25.417 25.417-11.38 25.416-25.417 25.416z"
      />
      <path
        fill="none"
        stroke="#108ee9"
        strokeWidth="3"
        strokeLinecap="round"
        strokeMiterlimit="10"
        d="M56.587 29.766c.37-7.438-1.658-14.7-6.393-19.552"
      />
    </svg>
  )
};

export default function Icon({ type }) {
  return iconTypes[type];
}
