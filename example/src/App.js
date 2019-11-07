import React from 'react';
import Toast from 'light-toast';

export default function App() {
  return (
    <div className="container">
      <h2>Light Toast</h2>
      <span
        className="button"
        onClick={() => {
          Toast.info('info');
        }}
      >
        info
      </span>
      <span
        className="button"
        onClick={() => {
          Toast.success('success');
        }}
      >
        success
      </span>
      <span
        className="button"
        onClick={() => {
          Toast.fail('fail');
        }}
      >
        fail
      </span>
      <span
        className="button"
        onClick={() => {
          Toast.loading('loading');
          setTimeout(() => {
            Toast.hide();
          }, 3000);
        }}
      >
        loading
      </span>
    </div>
  );
}
