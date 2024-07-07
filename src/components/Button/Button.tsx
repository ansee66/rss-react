import React from 'react';
import './Button.css';

class Button extends React.Component<{ title: string }> {
  render() {
    return <button className="button">{this.props.title}</button>;
  }
}

export default Button;
