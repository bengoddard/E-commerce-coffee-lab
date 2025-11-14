import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

test("renders landing title and subtitle", () => {
  renderWithRouter(<Home />);

  expect(screen.getByText(/Coffee R Us/i)).toBeInTheDocument();
  expect(
    screen.getByText(/The go to store for your coffee needs/i)
  ).toBeInTheDocument();
});