import React from 'react';
import lottie, { AnimationItem } from 'lottie-web';
import { scroll } from '../../utilities/scroll';
import './button-hero.scss';

type ButtonHeroProps = {

};

type ButtonHeroState = {
  scroll: any,
  stopped: boolean,
  direction: 1 | -1
};

export default class ButtonHero extends React.Component<ButtonHeroProps, ButtonHeroState> {
  animation: AnimationItem;

  componentDidMount() {
    const SCROLL = scroll('a[href*="#"]', {
      speed: 750,
      speedAsDuration: true,
      easing: 'easeInOutQuint',
      offset: 48
    });
    this.setState({
      scroll: SCROLL,
      stopped: true,
      direction: 1,
    });

    this.animation = lottie.loadAnimation({
      path: 'https://assets10.lottiefiles.com/packages/lf20_Jk6WJm.json',
      container: document.getElementById("Button-Hero-Svg"),
      renderer: 'svg',
      loop: false,
      autoplay: false,
    });
  }

  play = () => {
    this.animation.setDirection(1);
    this.animation.play();
  }

  playReverse = () => {
    this.animation.setDirection(-1);
    this.animation.play();
  }

  render() {
    return(
      <div className="Button-Hero">
        <div id="Button-Hero-Svg"></div>
        <a data-scroll href="#who" className="Button-link" onMouseEnter={this.play} onMouseLeave={this.playReverse}>
          <div>
            learn how
          </div>
        </a>
      </div>
    );
  }
}