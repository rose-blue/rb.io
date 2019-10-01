import React from 'react';
import './App.scss';
import Hero from './components/hero';
import ButtonHero from './components/button-hero';

type AppProps = {

};

type AppState = {

};

class App extends React.Component<AppProps, AppState> {
  componentDidMount() {
    window.addEventListener('scroll', this.headerScrollEffect, true);
    this.headerScrollEffect();
  }

  headerScrollEffect = (event?) => {
    const screenHeight = window.innerHeight;
    const scrollHeight = window.scrollY;
    const lefty = document.getElementById("Lefty");
    const righty = document.getElementById("Righty");
    const extendy = document.getElementById("Extendy");
    if(scrollHeight > screenHeight) {
      if(lefty.style.display!=='none') {
        lefty.style.display = 'none';
      }
      if(righty.style.display!=='none') {
        righty.style.display = 'none';
      }
      if(extendy.style.width!=='100%') {
        extendy.style.width = '100%';
      }
    } else {
      if(lefty.style.display!=='block') {
        lefty.style.display = 'block';
      }
      if(righty.style.display!=='block') {
        righty.style.display = 'block';
      }
      if(extendy.style.width==='100%') {
        extendy.style.width = null;
      }
    }
  }

  render() {
    return (
      <div className="App">
        {window.innerWidth > 6000 ? (<div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 1000}}>
          <div style={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}><h1>Hey! What's your problem.</h1></div>
        </div>) : null}
        <div className="Hero-container">
          <Hero />
        </div>
        <div className="Roseblue Left">
          <div className="container">
            <div id="Lefty" className="buoy">
              <div className="clip"></div>
            </div>
            <h1><span className="Rose">rose</span>(blue)<span className="Rose"></span></h1>
          </div>
        </div>
        <div className="Mast-text">
          <div className="container">
            <div className="text-container">
              <h1>designed to communicate,<br/>engineered to perform</h1>
              <ButtonHero />
            </div>
          </div>
        </div>
        <header id="who" className="Roseblue Right">
          <div id="Extendy" className="buoy">
            <div id="Righty" className="clip"></div>
          </div>
          <div className="container">
            <div className="nav">
              <div className="nav-item"><a href="#goesAchoo">services</a></div>
              <div className="nav-item"><a href="#mowsTheView">about</a></div>
              <div className="nav-item"><a href="#showsAnew">blog</a></div>
              <div className="nav-item"><a href="#proseAskew">work</a></div>
              <div className="nav-item"><a href="#throwsAdieu">contact</a></div>
            </div>
          </div>
        </header>
        <div className="Who-We-Are">
          <div className="container">
            <h2>We're a design team focused on human-centered online experiences.<br/>We develop digital solutions to fulfill your practical needs and creative dreams.</h2>
          </div>
        </div>
        <div className="What-We-Do">
          <div className="container">
            <h2 className="title">What We Do</h2>
            <p>[literally nothing]</p>
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
