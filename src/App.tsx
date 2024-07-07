import React from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import './App.css';

class App extends React.Component {
  state = {
    inputValue: localStorage.getItem('query') ?? '',
    query: localStorage.getItem('query') ?? '',
  };

  handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.currentTarget.value });
  };

  handleSearch = () => {
    const newQuery = this.state.inputValue.trimEnd();
    this.setState({ query: newQuery });
    localStorage.setItem('query', newQuery);
  };

  render(): React.ReactNode {
    return (
      <div>
        <header className="header">
          <Input
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <Button title="Search" onClick={this.handleSearch} />
        </header>
        <CardList query={this.state.query} />
      </div>
    );
  }
}

export default App;
