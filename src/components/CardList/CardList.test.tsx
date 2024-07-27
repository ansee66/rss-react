import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CardList from './CardList';
import { DATA_URL } from '../../constants';
import {
  mockedEmptySpeciesResponse,
  mockedSpeciesResponse,
} from '../../utils/mockUtils';
import { SpeciesResponse } from '../../types/types';

if (!globalThis.fetch) {
  globalThis.fetch = jest.fn();
}

const setPage = jest.fn();
const triggerError = jest.fn();
const mockedProps = { query: '', page: 1, setPage, triggerError };

const mockFetchAndRender = async (
  mockedRespone: SpeciesResponse
): Promise<void> => {
  const mockedFetchResponse = {
    json: async () => mockedRespone,
  } as Response;

  jest.spyOn(globalThis, 'fetch').mockResolvedValueOnce(mockedFetchResponse);

  await act(() =>
    render(
      <MemoryRouter>
        <CardList {...mockedProps} />
      </MemoryRouter>
    )
  );
};

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
    await mockFetchAndRender(mockedSpeciesResponse);

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${DATA_URL}?search=${mockedProps.query}&page=${mockedProps.page}`
    );
  });

  it('should render the specified number of cards', async () => {
    await mockFetchAndRender(mockedSpeciesResponse);

    expect(screen.queryAllByRole('list').length).toBe(2);
    expect(screen.queryAllByRole('list')[0].children.length).toBe(2);
  });

  it('should display an appropriate message if no cards are present', async () => {
    await mockFetchAndRender(mockedEmptySpeciesResponse);

    expect(screen.queryByText(/Nothing was found/)).toBeInTheDocument();
  });
});
