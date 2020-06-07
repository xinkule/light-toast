# Light Toast

[![npm version](https://img.shields.io/npm/v/light-toast.svg?style=flat-square)](https://www.npmjs.com/package/light-toast)
[![Build Status](https://img.shields.io/travis/xinkule/light-toast.svg?style=flat-square)](https://travis-ci.org/xinkule/light-toast)

A light-weight React toast component with extremely easy API. [Online Demo](https://xinkule.github.io/light-toast/)

## Installation

```sh
yarn add light-toast
```

Version `0.2.0` and above require React hooks support, please use with caution.

## Usage

```js
import Toast from 'light-toast';

const Button = () => (
  <button
    onClick={() => {
      Toast.info('message...', 3000, () => {
        // do something after the toast disappears
      });
    }}
  >
    click me
  </button>
);
```

## API

```js
Toast.info(content, duration, onClose);
Toast.success(content, duration, onClose);
Toast.fail(content, duration, onClose);
Toast.loading(content, onClose);
Toast.hide();
```

| param    | detail                                    | type     | default |
| -------- | ----------------------------------------- | -------- | ------- |
| content  | toast message                             | string   |         |
| duration | milliseconds delay to close               | number   | 3000    |
| onClose  | callback function after closing the toast | function |         |

## Notice

If you use `Toast.loading()`, you should call `Toast.hide()` by yourself to close the toast,  
since this often happens when you make an asynchronous request.

When you are in loading state, you can call `Toast.info()`, `Toast.success()`, `Toast.fail()` directly to hide the loading message. This is useful when you want to hint something after waiting.
