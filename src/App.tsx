import React, { Fragment } from 'react';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import { ErrorBoundaryContext } from './components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const [inputValue, setInputValue] = useLocalStorage('query', '');
  const [query, setQuery] = useLocalStorage('query', '');

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    setQuery(inputValue.trimEnd());
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
