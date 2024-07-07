import React from 'react';
import Input from './components/Input/Input.tsx';
import Button from './components/Button/Button.tsx';
import './App.css';
import Card from './components/Card/Card.tsx';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <header className="header">
          <Input />
          <Button title="Search" />
        </header>
        <div className="cards">
          <Card
            name="Planet"
            classification="classification"
            designation="designation"
            average_height={180}
            average_lifespan={99}
            language="English"
          />
        </div>
      </div>
    );
  }
}

export default App;
