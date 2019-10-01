import React from 'react';
import lottie, { AnimationItem, AnimationConfigWithPath, AnimationDirection } from 'lottie-web';
import { doNothing } from '../../utilities/helpers';

type LottieProps = {
  styles?: React.CSSProperties | any,
  options?: any,
  width: string | number,
  height: string | number,
  speed: number,
  direction: AnimationDirection,
  isStopped: boolean,
  isPaused?: boolean,
  events?: any[]
};

export default class Lottie extends React.Component<LottieProps, {}> {
  animation: AnimationItem;
  options: AnimationConfigWithPath;
  el: HTMLButtonElement | HTMLDivElement;

  componentDidMount() {
    const {
      options,
      events
    } = this.props;

    const {
      loop,
      autoplay,
      path,
      rendererSettings,
    } = options;

    this.options = {
      path: path,
      container: this.el,
      renderer: 'svg',
      loop: loop !== false,
      autoplay: autoplay !== false,
      rendererSettings,
    };

    this.options = {...this.options, ...options};

    this.animation = lottie.loadAnimation(this.options);

    this.registerEvents(events);
  }

  componentDidUpdate() {
    this.setSpeed();
    this.setDirection();
    if(this.props.isStopped) {
      this.stop();
    } else {
      this.play();
    }
  }

  componentWillUnmount() {
    this.props.events ? this.unRegisterEvents(this.props.events) : doNothing();
    this.destroy();
    this.options = null;
    this.animation = null;
  }

  registerEvents(events: any[]) {
    events.forEach(event => {
      this.animation.addEventListener(event.name, event.callback);
    });
    this.animation.addEventListener('complete', this.pause.bind(this));
  }

  unRegisterEvents(events: any[]) {
    events.forEach(event => {
      this.animation.removeEventListener(event.name, event.callback);
    });
  }

  setSpeed() {
    this.animation.setSpeed(this.props.speed);
  }

  setDirection() {
    this.animation.setDirection(this.props.direction);
  }

  play = () => {
    this.animation.play();
  }

  playThrough = () => {
    this.animation.goToAndPlay(1, true);
  }

  stop = () => {
    this.animation.stop();
  }

  pause = () => {
    this.animation.pause();
    this.animation.play();
  }

  destroy() {
    this.animation.destroy();
  }

  render() {
    const {
      width,
      height,
      styles,
      children
    } = this.props;

    const getSize = (initial) => {
      let size;
      if(typeof initial==='number') {
        size = `${initial}px`;
      } else {
        size = initial || '100%'
      }
      return size;
    }
    const appliedStyles = {width: getSize(width), height: getSize(height), overflow: 'hidden', margin: '0', ...styles};

    return (
      <div ref={(c) => { this.el = c }} style={appliedStyles} tabIndex={0}>
        { children }
      </div>
    );
  }
}