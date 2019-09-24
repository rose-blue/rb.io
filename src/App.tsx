import React from 'react';
import './App.scss';
import Hero from './components/hero';
import Button from './components/button';

import { scroll } from './utilities/scroll';

type AppProps = {

};

type AppState = {
  scroll: any
};

class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    const SCROLL = scroll('a[href*="#"]', {
      speed: 750,
      speedAsDuration: true,
      easing: 'easeInOutQuint'
    });
    this.state = {
      scroll: SCROLL
    };
  }

  render() {
    return (
      <div className="App">
        {window.innerWidth > 6000 ? (<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 1000}}>
          <div style={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}><h1>Hey! What the fuck is your problem.</h1></div>
        </div>) : null}
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
              <a data-scroll href="#testi">
                <Button style={{marginTop: '2rem'}}>learn how</Button>
              </a>
            </div>
          </div>
        </div>
        <div id="testi" className="Roseblue Right">
          <div className="buoy">
            <div className="clip"></div>
          </div>
          <div className="container">
            <div className="nav">
              nav
            </div>
          </div>
        </div>
        <div className="testi">
          <div className="container">
            <h2><span style={{fontWeight: 300}}>rose(blue)</span> is a design team focused on human-centered online experiences.<br/>We develop digital solutions to fulfill your practical needs and creative dreams.</h2>
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
