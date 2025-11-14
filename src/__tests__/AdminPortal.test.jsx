import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminPortal from "../pages/AdminPortal";

const renderWithRouter = (ui) =>
  render(<BrowserRouter>{ui}</BrowserRouter>);

test("renders admin landing content", () => {
  renderWithRouter(<AdminPortal />);

  expect(screen.getByText(/Welcome Admin/i)).toBeInTheDocument();
  expect(
    screen.getByText(/manage your coffee products/i)
  ).toBeInTheDocument();
});
