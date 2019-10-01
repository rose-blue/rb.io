import React from 'react';
import './App.scss';
import Hero from './components/hero';
import ButtonHero from './components/button-hero';

type AppProps = {

};

type AppState = {
  theme: boolean,
  theme2: boolean
};

class App extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);

    this.state = {theme: false, theme2: false}
  }
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
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    if(scrollHeight > (screenHeight - 3*rem - 1)) {
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

    if(scrollHeight > (screenHeight - 3*rem) && !this.state.theme) {
      extendy.style.boxShadow = "0 0.1rem 0.2rem rgba(96, 91, 222, 0.4)";
    } else {
      extendy.style.boxShadow = null;
    }
  }

  render() {
    const { theme, theme2 } = this.state;
    const themeColorOne = theme ? 'rgba(0,0,0,0.9)' : 'rgba(97, 101, 226, 0.9)';
    const themeColorTwo = theme2 ? '#fff' : '#B2E1FF';
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
            <div id="Lefty" className="buoy" style={{background: themeColorOne}}>
              <div className="clip" style={{background: themeColorOne}}></div>
            </div>
            <a href="/" className="title">rose(blue)</a>
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
          <div id="Extendy" className="buoy" style={{background: themeColorOne}}>
            <div id="Righty" className="clip" style={{background: themeColorOne}}></div>
          </div>
          <div className="container">
            <div className="nav">
              <div className="nav-item"><a onClick={() => {this.setState({theme: !this.state.theme})}} href="#goesAchoo">theme change</a></div>
              <div className="nav-item"><a onClick={() => {this.setState({theme2: !this.state.theme2})}} href="#mowsTheView">other theme change</a></div>
              {/* <div className="nav-item"><a href="#showsAnew">blog</a></div> */}
              {/* <div className="nav-item"><a href="#proseAskew">work</a></div>
              <div className="nav-item"><a href="#throwsAdieu">contact</a></div> */}
            </div>
          </div>
        </header>
        <div className="Who-We-Are" style={{background: themeColorOne}}>
          <div className="container">
            <h2>We're a design team focused on human-centered online experiences.<br/>We develop digital solutions to fulfill your practical needs and creative dreams.</h2>
          </div>
        </div>
        <div className="What-We-Do" style={{background: themeColorTwo}}>
          <div className="container">
            <h2 className="title">What We Do</h2>
            <div className="row">
              <div className="column" style={{width: '50%'}}>
                <div className="item">
                  <h3>front end</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
  
                </div>
              </div>
              <div className="column" style={{width: '25%'}}>
                <div className="item">
                  <h3>back end</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna liqua.</p>
                </div>
              </div>
              <div className="column" style={{width: '25%'}}>
                <div className="item">
                  <h3>e commerce</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna liqua.</p>
                </div>
              </div>
            </div>
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

export default App;
