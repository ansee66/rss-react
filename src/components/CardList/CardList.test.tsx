import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import { DATA_URL } from '../../constants';
import {
  mockedEmptySpeciesResponse,
  mockedSpeciesResponse,
  mockFetchAndRender,
} from '../../utils/mockUtils';

if (!globalThis.fetch) {
  globalThis.fetch = jest.fn();
}

const setPage = jest.fn();
const triggerError = jest.fn();
const mockedProps = { query: '', page: 1, setPage, triggerError };

describe('CardList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render message about loading', () => {
    render(<CardList {...mockedProps} />);
    expect(screen.queryByRole('list')).toBeNull();
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should send a request for data with the appropriate parameters', async () => {
    await mockFetchAndRender(
      mockedSpeciesResponse,
      <CardList {...mockedProps} />
    );

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${DATA_URL}?search=${mockedProps.query}&page=${mockedProps.page}`
    );
  });

  it('should render the specified number of cards', async () => {
    await mockFetchAndRender(
      mockedSpeciesResponse,
      <CardList {...mockedProps} />
    );

    expect(screen.queryAllByRole('list').length).toBe(2);
    expect(screen.queryAllByRole('list')[0].children.length).toBe(2);
  });

  it('should display an appropriate message if no cards are present', async () => {
    await mockFetchAndRender(
      mockedEmptySpeciesResponse,
      <CardList {...mockedProps} />
    );

    expect(screen.queryByText(/Nothing was found/)).toBeInTheDocument();
  });
});
