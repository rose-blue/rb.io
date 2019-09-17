import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

export default function rose(blue: any) {
  console.log(blue);
  
  ReactDOM.render(<App />, document.getElementById('root'));

  serviceWorker.unregister();
}

const blue = "Welcome to zombocom";

rose(blue);