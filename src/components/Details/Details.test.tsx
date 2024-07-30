import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Details, { DetailsPropsType } from './Details';
import { DATA_URL } from '../../constants';
import {
  mockedDetailsResponse,
  mockFetchAndRender,
} from '../../utils/mockUtils';

if (!globalThis.fetch) {
  globalThis.fetch = jest.fn();
}

const mockedSearchParams = new URLSearchParams(`search=&page=1&details=1`);
const mockedSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(() => [mockedSearchParams, mockedSetSearchParams]),
}));

const mockedProps: DetailsPropsType = {
  id: '1',
  triggerError: jest.fn(),
};

describe('Details component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 500));
  });

  it('should render loading indicator while fetching data', () => {
    render(
      <MemoryRouter>
        <Details {...mockedProps} />
      </MemoryRouter>
    );

    expect(screen.queryByText(/Details about/)).toBeNull();
    expect(screen.getByText(/Loading/)).toBeInTheDocument();
  });

  it('should correctly display the detailed card data', async () => {
    await mockFetchAndRender(
      mockedDetailsResponse,
      <Details {...mockedProps} />
    );

    expect(globalThis.fetch).toHaveBeenCalledWith(
      `${DATA_URL}/${mockedProps.id}`
    );

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent(mockedDetailsResponse.name);
    expect(
      screen.queryByText(mockedDetailsResponse.designation)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockedDetailsResponse.eye_colors)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockedDetailsResponse.hair_colors)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(mockedDetailsResponse.skin_colors)
    ).toBeInTheDocument();
  });

  it('should update search params after clicking the close button', async () => {
    await mockFetchAndRender(
      mockedDetailsResponse,
      <Details {...mockedProps} />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockedSetSearchParams).toHaveBeenCalledTimes(1);
    expect(mockedSearchParams.get('details')).toBeNull();
  });
});
