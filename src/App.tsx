import React, { Fragment, useState } from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import { ErrorBoundaryContext } from './components/ErrorBoundary/ErrorBoundary';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('query') ?? ''
  );
  const [query, setQuery] = useState(localStorage.getItem('query') ?? '');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    const newQuery = inputValue.trimEnd();
    setQuery(newQuery);
    localStorage.setItem('query', newQuery);
  };

  return (
    <ErrorBoundaryContext.Consumer>
      {(triggerError) => (
        <Fragment>
          <header className="header">
            <Input value={inputValue} onChange={handleInputChange} />
            <Button title="Search" onClick={handleSearch} />
            <Button
              title="Throw Error"
              onClick={() => {
                triggerError(new Error('For testing Error Boundary'));
              }}
            />
          </header>
          <CardList query={query} triggerError={triggerError} />
        </Fragment>
      )}
    </ErrorBoundaryContext.Consumer>
  );
};

export default App;
