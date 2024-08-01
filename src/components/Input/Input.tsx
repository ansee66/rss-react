import React from 'react';
import './Input.css';

interface InputProps {
  value: string;
  onChange: { (event: React.FormEvent<HTMLInputElement>): void };
}

const Input = ({ value, onChange }: InputProps) => {
  return (
    <input type="text" value={value} className="input" onChange={onChange} />
  );
};

export default Input;
