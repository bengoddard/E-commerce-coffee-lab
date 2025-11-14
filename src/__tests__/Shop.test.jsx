import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { CoffeeContext } from "../pages/CoffeeContext";
import Shop from "../pages/Shop";
import { vi } from "vitest";

const mockCoffees = [
  {
    id: 1,
    name: "Latte",
    description: "Milk coffee",
    origin: "Brazil",
    price: 3.5,
  },
  {
    id: 2,
    name: "Mocha",
    description: "Chocolate coffee",
    origin: "Colombia",
    price: 4.0,
  },
];

function renderWithProviders(ui, { coffees = mockCoffees } = {}) {
  return render(
    <BrowserRouter>
      <CoffeeContext.Provider
        value={{
          coffees,
          addCoffee: vi.fn(),
          updateCoffee: vi.fn(),
          selectedCoffeeId: null,
          setSelectedCoffeeId: vi.fn(),
        }}
      >
        {ui}
      </CoffeeContext.Provider>
    </BrowserRouter>
  );
}

test("shows all coffees by default and filters by search term", () => {
  renderWithProviders(<Shop />);


  expect(screen.getByText(/Latte/i)).toBeInTheDocument();
  expect(screen.getByText(/Mocha/i)).toBeInTheDocument();


  const searchInput = screen.getByPlaceholderText(/search/i);


  fireEvent.change(searchInput, { target: { value: "latte" } });

  expect(screen.getByText(/Latte/i)).toBeInTheDocument();
  expect(screen.queryByText(/Mocha/i)).not.toBeInTheDocument();
});
