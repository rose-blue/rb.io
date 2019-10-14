import React, { useLayoutEffect } from 'react';
import './info-slider.scss';
import { InfoSliderProps } from './info-slider';

export default function InfoSliderSlidey(props: InfoSliderProps) {
  const { position, info, isDirectionUp } = props;

  const primaryInfo = info[position];
  const secondaryInfoPrevious = info[(position+1)%3]
  const secondaryInfoNext = info[(position+2)%3];

  const handleClick = (event) => {
    const primary = document.getElementById("primary-anim");
    const secondaryTop = document.getElementById("secondary-anim-forward");
    const secondaryBot = document.getElementById("secondary-anim-back");

    if(event.target.id === "fwd") {
      primary.classList.add("to-top")
    } else {

    }
    if(props.onClick) {
      props.onClick(event.target.id);
    }
  }

  useLayoutEffect(() => {

    window.requestAnimationFrame(() => {
      const primary = document.getElementById("primary-anim");
      const secondaryTop = document.getElementById("secondary-anim-forward");
      const secondaryBot = document.getElementById("secondary-anim-back");
  
      primary.classList.remove("from-top");
      primary.classList.remove("from-bottom");
      if(isDirectionUp) {
        primary.classList.add("from-bottom");
      } else {
        primary.classList.add("from-top");
      }
    })
  });

  return (
    <div className="Info-Slider Slidey">
      <div className="Primary">
        <div className="AR">
          <div className="AR-Nested">
            <div className="Info-Item">
              <div id="primary-anim" className="animation-container">
                <h2>{ primaryInfo.name }</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Secondary">
        <div className="AR">
          <div className="AR-Nested">
            <div id="fwd" className="Info-Item" onClick={handleClick}>
              <div id="secondary-anim-forward" className="animation-container">
                <h2>{ secondaryInfoPrevious.name }</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="AR">
          <div className="AR-Nested">
            <div id="bck" className="Info-Item" onClick={handleClick}>
              <div id="secondary-anim-back" className="animation-container">
                <h2>{ secondaryInfoNext.name }</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
