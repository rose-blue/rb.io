import React from 'react';
import './header.scss';

export default class Header extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.headerScroll, true);
    this.headerScroll();
  }

  headerScroll = (event?) => {
    const screenWidth = window.innerWidth;
    if(screenWidth > 800) {
      const screenHeight = window.innerHeight;
      const scrollHeight = window.scrollY;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
      const anchor = document.getElementById("header-bg");
      const anchorClip = document.getElementById("right-curve");
      const nav = document.getElementById("nav");
      const navItems = document.getElementById("nav-items");
      const rb = document.getElementById("rb");
  
      if(scrollHeight > (screenHeight - 3*rem - 1)) {
        if(anchor.style.width!=='100%') {
          anchor.style.width = '100%';
        }
        if(anchorClip.style.display!=='none') {
          anchorClip.style.display = 'none';
        }
        if(nav.style.width!=='100%') {
          nav.style.width = '100%';
        }
        if(navItems.style.width!=='calc(65% - 5rem)') {
          navItems.style.width = 'calc(65% - 5rem)';
        }
        if(!rb.style.display) {
          rb.style.display = 'flex';
        }
      } else {
        if(anchor.style.width==='100%') {
          anchor.style.width = null;
        }
        if(anchorClip.style.display!=='block') {
          anchorClip.style.display = 'block';
        }
        if(nav.style.width==='100%') {
          nav.style.width = 'calc(65% - 5rem)';
        }
        if(navItems.style.width==='calc(65% - 5rem)') {
          navItems.style.width = '100%';
        }
        if(rb.style.display==='flex') {
          rb.style.display = null;
        }
      }
  
      if(scrollHeight > screenHeight - 3*rem) {
        anchor.style.boxShadow = '0 0 3rem -1rem rgba(24, 24, 24, 0.2)';
      } else {
        anchor.style.boxShadow = null;
      }
    }
  }

  render() {
    return (
      <header id="who" className="Header">
        <div id="header-bg" className="anchor ogr">
          <div id="right-curve" className="anchor-clip ogr"></div>
        </div>
        <div className="container">
          <div className="nav" id="nav">
            <div className="rb" id="rb">
              <a href="/" className="title">rose(blue)</a>
            </div>
            <div className="nav-items" id="nav-items">
              <div className="nav-item"><a href="#showsAnew">about</a></div>
              <div className="nav-item"><a href="#proseAskew">blog</a></div>
              <div className="nav-item"><a href="#goesAchoo">test</a></div>
              <div className="nav-item"><a href="#brosAShoe">test</a></div>
              <div className="nav-item"><a href="#hoesForYou">test</a></div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}