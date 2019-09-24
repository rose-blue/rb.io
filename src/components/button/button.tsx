import React from 'react';
import './button.scss';

export default function Button(props: any) {
  return (
    <button style={props.style} className="Button" onClick={props.click}>
      {props.children}
    </button>
  );
}