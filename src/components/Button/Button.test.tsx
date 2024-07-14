import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from './Button';

describe('Button components', () => {
  const onClick = jest.fn();
  const props = { title: 'Search', onClick };

  it('Button renders', () => {
    render(<Button {...props} />);

    expect(screen.getByText(/Search/)).toBeInTheDocument();
  });
});
