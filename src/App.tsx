import React from 'react';
import Input from './components/Input/Input.tsx';
import Button from './components/Button/Button.tsx';
import CardList from './components/CardList/CardList.tsx';
import './App.css';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <div>
        <header className="header">
          <Input />
          <Button title="Search" />
        </header>
        <CardList query={null} />
      </div>
    );
  }
}

export default App;
