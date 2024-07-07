import React from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: { (event: React.FormEvent<HTMLInputElement>): void };
}

class Input extends React.Component<InputProps> {
  render() {
    return (
      <input
        type="text"
        value={this.props.value}
        className="input"
        onChange={this.props.onChange}
      />
    );
  }
}

export default Input;
