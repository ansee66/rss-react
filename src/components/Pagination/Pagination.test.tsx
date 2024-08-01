import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pagination, { PaginationPropsType } from './Pagination';

const mockedProps: PaginationPropsType = {
  count: 20,
  currentPage: 1,
  setPage: jest.fn(),
};

describe('Pagination component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should update URL query parameter when page changes', () => {
    render(
      <MemoryRouter>
        <Pagination {...mockedProps} />
      </MemoryRouter>
    );

    const paginationList = screen.getByRole('list');
    expect(paginationList).toBeInTheDocument();
    expect(paginationList.children.length).toBe(2);
    const secondButton = screen.getAllByRole('button')[1];
    fireEvent.click(secondButton);
    expect(mockedProps.setPage).toHaveBeenCalledWith(2);
  });
});
