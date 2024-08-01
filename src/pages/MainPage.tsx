import React, { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';
import {
  ErrorBoundaryContext,
  TriggerErrorType,
} from '../components/ErrorBoundary/ErrorBoundary';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import CardList from '../components/CardList/CardList';
import '../App.css';

const MainPage = () => {
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
    searchParams.set('search', query);
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  }, [query, page, searchParams, setSearchParams]);

  return (
    <ErrorBoundaryContext.Consumer>
      {(triggerError: TriggerErrorType) => (
        <>
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
          <main className="main">
            <CardList
              query={query}
              page={page}
              setPage={setPage}
              triggerError={triggerError}
            />
            <Outlet />
          </main>
        </>
      )}
    </ErrorBoundaryContext.Consumer>
  );
};

export default MainPage;
