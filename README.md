# Light Toast

[![npm version](https://badge.fury.io/js/light-toast.svg)](https://www.npmjs.com/package/light-toast)

A light-weight React toast component with extremely easy API. [Online Demo](https://xinkule.github.io/light-toast/)

## Installation

```sh
npm install light-toast --save
```

## Usage

```js
import Toast from 'light-toast';

class Button extends React.Component {
  handleClick = () => {
    Toast.info('message...', 3000, () => {
      // do something after the toast disappears
    });
  };

  render() {
    return <div onClick={this.handleClick}>btn</div>;
  }
}
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
