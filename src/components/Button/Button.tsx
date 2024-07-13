import React from 'react';
import './Button.css';

interface ButtonProps {
  title: string;
  onClick: { (event: React.MouseEvent<HTMLElement>): void };
}

const Button = ({ title, onClick }: ButtonProps) => {
  return (
    <button className="button" onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
