import React, { Fragment } from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import { ErrorBoundaryContext } from './components/ErrorBoundary/ErrorBoundary';
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
      <ErrorBoundaryContext.Consumer>
        {(triggerError) => (
          <Fragment>
            <header className="header">
              <Input
                value={this.state.inputValue}
                onChange={this.handleInputChange}
              />
              <Button title="Search" onClick={this.handleSearch} />
              <Button
                title="Throw Error"
                onClick={() => {
                  triggerError(new Error('For testing Error Boundary'));
                }}
              />
            </header>
            <CardList query={this.state.query} triggerError={triggerError} />
          </Fragment>
        )}
      </ErrorBoundaryContext.Consumer>
    );
  }
}

export default App;
