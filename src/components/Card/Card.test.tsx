import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';
import { Species } from '../../types/types';
import { getIdFromUrl } from '../../utils/utils';

const pageNumber = '1';
const mockedSearchParams = new URLSearchParams(`search=&page=${pageNumber}`);
const mockedSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(() => [mockedSearchParams, mockedSetSearchParams]),
}));

const mockedProps: Species = {
  average_height: '180',
  average_lifespan: '120',
  classification: 'mammal',
  designation: 'sentient',
  language: 'Galactic Basic',
  name: 'Human',
  url: 'https://swapi.dev/api/species/1/',
};

describe('Card component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Card {...mockedProps} />
      </MemoryRouter>
    );

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText(mockedProps.average_height)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.average_lifespan)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.classification)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.designation)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.language)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.name)).toBeInTheDocument();
  });

  it('should send an additional API call to fetch detailed information after clicking', () => {
    render(
      <MemoryRouter>
        <Card {...mockedProps} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('listitem'));
    expect(mockedSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockedSearchParams.get('details')).toBe(
      getIdFromUrl(mockedProps.url)
    );
    expect(mockedSearchParams.get('details')).toBe(pageNumber);
  });
});
