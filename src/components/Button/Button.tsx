import React from 'react';
import './Button.css';

interface ButtonProps {
  title: string;
  onClick: { (event: React.MouseEvent<HTMLElement>): void };
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button className="button" onClick={this.props.onClick}>
        {this.props.title}
      </button>
    );
  }
}

export default Button;
