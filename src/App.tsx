import React from 'react';
import './App.scss';
import Hero from './components/hero';
import Header from './components/header';
import ButtonHero from './components/button-hero';
import ARb from './dummies/a-rb';
import InfoSlider from './components/info-slider';

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
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if(scrollHeight > (screenHeight - 3*rem - 1)) {
      if(lefty.style.display!=='none') {
        lefty.style.display = 'none';
      }
    } else {
      if(lefty.style.display!=='block') {
        lefty.style.display = 'block';
      }
    }
  }

  render() {
    return (
      <div className="App" id="roseblue">
        {window.innerWidth > 6000 ? (
        <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'black', zIndex: 1000}}>
          <div style={{display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', alignContent: 'center'}}><h1>Hey! If you browse the internet at this width you don't deserve to do so at peace. Enjoy your hubris.</h1></div>
        </div>) : null}
        <div className="Hero-container">
          <Hero />
        </div>
        <div className="Roseblue Left">
          <div className="container">
            <div id="Lefty" className="buoy ogr">
              <div className="clip ogr"></div>
            </div>
            <ARb />
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
        <Header />
        <div className="bg-filler right white" style={{top: '100%'}}></div>
        <div id="who" className="Who-We-Are ogr">
          <div className="container">
            <div className="row align-items-center justify-content-center row-reverse">
              <h2>We're a design team focused on human-centered online experiences.<br/>We develop digital solutions to fulfill your practical needs and creative dreams.</h2>
              <img src="https://cdn.discordapp.com/attachments/404412894856347663/629465479014252564/paintingcoloredtiltthisactuallygoodwhothefuckknowsanymoreblue.svg" alt="nice" className="do-img" />
            </div>
          </div>
        </div>
        <div className="bg-filler left ogr" style={{top: 'calc(100% + 10rem)'}}></div>
        <div className="What-We-Do">
          <div className="bg-filler">what we do</div>
          <div className="container">
            <h2 className="title">What We Do</h2>
            <InfoSlider info={info} />
          </div>
        </div>
        <div className="Coming-Soon">
          <div className="container">
            <h2 className="title">Portfolio - Coming Soon</h2>
            <div className="row"></div>
          </div>
        </div>
        <div style={{height: 1000}}></div>
        <svg width="0" height="0">
          <defs>
            <clipPath id="right">
              <path d="M0,48c14.1,0,27.8-12.2,40-24S65.9,0,81,0V48Z"/>
            </clipPath>
            <clipPath id="left">
              <path d="M80,0C65.9,0,52.2,12.2,40,24S14.1,48,-1,48V0Z"/>
            </clipPath>
          </defs>
        </svg>
      </div>
    );
  }
}

const info = [
  {
    name: 'frontend',
    data: 'lorem ipsum dolor sit amet',
  }, {
    name: 'backend',
    data: 'lorem ipsum dolor sit amet'
  }, {
    name: 'ecommerce',
    data: 'lorem ipsum dolor sit amet'
  }
];

export default App;
