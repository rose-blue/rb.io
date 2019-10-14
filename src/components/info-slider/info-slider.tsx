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
  onClick?: any,
  position?: number,
  isDirectionUp?: boolean
};

interface InfoSliderState {
  orientation: "MOBILE" | "SLIDER" | "EXPANDO",
  position: number,
  isDirectionUp: boolean
};

export default class InfoSlider extends React.Component<InfoSliderProps, InfoSliderState> {
  constructor(props) {
    super(props);
    this.state = { orientation: this.findOrientation(window.innerWidth), position: 0, isDirectionUp: false };
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
    } else if(width > 800 && width <= 1400) {
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

  onSliderChange = (id: string) => {
    let position = id==="bck" ? this.state.position - 1 : this.state.position + 1;
    let isDirectionUp = position > this.state.position;
    if(position < 0) {
      position = 2;
    } else if(position > 2) {
      position = 0;
    }
    this.setState({position, isDirectionUp});
  }

  render() {
    const { orientation, position, isDirectionUp } = this.state;

    if(orientation === "MOBILE") {
      return(
        <InfoSliderMobile info={this.props.info} />
      );
    } else if(orientation === "SLIDER") {
      return(
        <InfoSliderSlidey info={this.props.info} position={position} isDirectionUp={isDirectionUp} onClick={this.onSliderChange} />
      );
    } else {
      return(
        <InfoSliderExpando info={this.props.info} position={position} onClick={this.onSliderChange} />
      );
    }
  }
}
