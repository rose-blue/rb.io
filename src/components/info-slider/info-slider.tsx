import React from 'react';
import InfoSliderMobile from './info-slider-mobile';
import InfoSliderSlidey from './info-slider-slidey';
import InfoSliderExpando from './info-slider-expando';

interface Info {
  name: string,
  data: string
}

export interface InfoSliderProps {
  info: Info[],
  position?: number
};

interface InfoSliderState {
  orientation: "MOBILE" | "SLIDER" | "EXPANDO"
};

export default class InfoSlider extends React.Component<InfoSliderProps, InfoSliderState> {
  constructor(props) {
    super(props);
    this.state = { orientation: this.findOrientation(window.innerWidth) };
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize.bind(this), true);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this), true);
  }

  findOrientation(width: number): "MOBILE" | "SLIDER" | "EXPANDO" {
    if(width <= 800) {
      return "MOBILE";
    } else if(width > 800 && width <= 1200) {
      return "SLIDER";
    } else {
      return "EXPANDO";
    }
  }

  onWindowResize() {
    if(this.findOrientation(window.innerWidth) !== this.state.orientation) {
      this.setState({orientation: this.findOrientation(window.innerWidth)});
    }
  }

  render() {
    const { orientation } = this.state;

    if(orientation === "MOBILE") {
      return(
        <InfoSliderMobile info={this.props.info} />
      );
    } else if(orientation === "SLIDER") {
      return(
        <InfoSliderSlidey info={this.props.info} position={0} />
      );
    } else {
      return(
        <InfoSliderExpando info={this.props.info} position={0} />
      );
    }
  }
}
