import * as React from 'react';
import { hot } from 'react-hot-loader';
import Toast from '../../src';
import './index.css';

class App extends React.Component {
  handleClick = type => {
    Toast[type](type);
    if (type === 'loading') {
      setTimeout(() => {
        Toast.hide();
      }, 3000);
    }
  };

  render() {
    return (
      <div className="container">
        <h2>Light Toast</h2>
        <span className="button" onClick={this.handleClick.bind(this, 'info')}>
          info
        </span>
        <span
          className="button"
          onClick={this.handleClick.bind(this, 'success')}
        >
          success
        </span>
        <span className="button" onClick={this.handleClick.bind(this, 'fail')}>
          fail
        </span>
        <span
          className="button"
          onClick={this.handleClick.bind(this, 'loading')}
        >
          loading
        </span>
      </div>
    );
  }
}

export default hot(module)(App);
