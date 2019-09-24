import React from 'react';
import './App.scss';
import Hero from './components/hero';

type AppProps = {

};

type AppState = {

};

class App extends React.Component<AppProps, AppState> {
  render() {
    return (
      <div className="App">
        <div className="Hero-container">
          <Hero />
        </div>
        <div className="Roseblue Left">
          <div className="container">
            <div className="buoy">
              <div className="clip"></div>
            </div>
            <h1>rose(blue)</h1>
          </div>
        </div>
        <div className="Mast-text">
          <div className="container">
            <div className="text-container">
              <h1>designed to communicate,<br/>engineered to perform</h1>
              <p>test</p>
              <p>arrow</p>
            </div>
          </div>
        </div>
        <div className="Roseblue Right">
          <div className="buoy">
            <div className="clip"></div>
          </div>
          <div className="container">
            <div className="nav">
              nav
            </div>
          </div>
        </div>
        <div style={{height: 3000}}></div>
        <svg width="0" height="0">
          <defs>
            <clipPath id="right">
              <path d="M0,48c14.1,0,27.8-12.2,40-24S65.9,0,80,0V48Z"/>
            </clipPath>
            <clipPath id="left">
              <path d="M80,0C65.9,0,52.2,12.2,40,24S14.1,48,0,48V0Z"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
}

export default App;
