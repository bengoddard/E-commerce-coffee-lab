import { render, screen } from "@testing-library/react";
import CoffeeList from "../pages/CoffeeList";

const coffees = [
  {
    id: 1,
    name: "Latte",
    description: "Milk coffee",
    origin: "Brazil",
    price: 3.5,
  },
  {
    id: 2,
    name: "Espresso",
    description: "Strong coffee",
    origin: "Italy",
    price: 2.5,
  },
];

test("renders a card for each coffee", () => {
  const { container } = render(<CoffeeList coffees={coffees} />);

  expect(screen.getByText(/Latte/i)).toBeInTheDocument();
  expect(screen.getByText(/Espresso/i)).toBeInTheDocument();

  const cards = container.getElementsByClassName("coffee-card");
  expect(cards.length).toBe(coffees.length);
});
