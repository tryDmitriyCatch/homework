import { render, screen } from '@testing-library/react';
import SearchComponent from './components/SearchComponent';

test('Search Component loads successfully', () => {
  render(<SearchComponent />);
  const linkElement = screen.getByText(/Enter movie name/i);
  expect(linkElement).toBeInTheDocument();
});
