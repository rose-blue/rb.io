import React from 'react';
import { InfoSliderProps } from './info-slider';
import './info-slider.scss';

export default function InfoSliderMobile(props: InfoSliderProps) {
  const { info } = props;
  const frontend = info[0];
  const backend = info[1];
  const ecommerce = info[2];
  return (
    <div className="Info-Slider Mobile">
      <div className="Info-Item">
        <h2>{ frontend.name }</h2>
        <p>{ frontend.data }</p>
      </div>
      <div className="Info-Item">
        <h2>{ backend.name }</h2>
        <p>{ backend.data }</p>
      </div>
      <div className="Info-Item">
        <h2>{ ecommerce.name }</h2>
        <p>{ ecommerce.data }</p>
      </div>
    </div>
  );
}
