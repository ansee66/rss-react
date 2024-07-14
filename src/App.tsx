import React, { Fragment, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Input from './components/Input/Input';
import Button from './components/Button/Button';
import CardList from './components/CardList/CardList';
import { ErrorBoundaryContext } from './components/ErrorBoundary/ErrorBoundary';
import useLocalStorage from './hooks/useLocalStorage';
import './App.css';

const App = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useLocalStorage('search', '');
  const [query, setQuery] = useLocalStorage(
    'query',
    searchParams.get('query') ?? ''
  );
  const [page, setPage] = useState(Number(searchParams.get('page') ?? 1));

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  const handleSearch = () => {
    setQuery(inputValue.trimEnd());
    setPage(1);
  };

  useEffect(() => {
    setSearchParams({ search: query, page: page.toString() });
  }, [query, page, setSearchParams]);

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
          <CardList
            query={query}
            page={page}
            setPage={setPage}
            triggerError={triggerError}
          />
        </Fragment>
      )}
    </ErrorBoundaryContext.Consumer>
  );
};

export default App;
