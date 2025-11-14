import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import CoffeeForm from "../pages/CoffeeForm";
import { CoffeeContext } from "../pages/CoffeeContext";

const renderWithRouteAndContext = (
  initialEntry,
  contextValue
) =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <CoffeeContext.Provider value={contextValue}>
        <Routes>
          <Route path="/admin/coffees/new" element={<CoffeeForm />} />
          <Route path="/admin/coffees/:id/edit" element={<CoffeeForm />} />
          <Route path="/admin" element={<div>Admin Home</div>} />
        </Routes>
      </CoffeeContext.Provider>
    </MemoryRouter>
  );

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 99,
          name: "New Coffee",
          description: "Desc",
          price: 3.5,
        }),
    })
  );
});

afterEach(() => {
  vi.resetAllMocks();
});

test("add mode: renders empty form and calls addCoffee on submit", async () => {
  const addCoffee = vi.fn();

  renderWithRouteAndContext("/admin/coffees/new", {
    coffees: [],
    addCoffee,
    updateCoffee: vi.fn(),
    selectedCoffeeId: null,
    setSelectedCoffeeId: vi.fn(),
  });

  const nameInput = screen.getByPlaceholderText(/name/i);
  expect(nameInput.value).toBe("");

  fireEvent.change(nameInput, { target: { value: "House Blend" } });
  fireEvent.change(screen.getByPlaceholderText(/description/i), {
    target: { value: "Nice coffee" },
  });
  fireEvent.change(screen.getByPlaceholderText(/price/i), {
    target: { value: "4.20" },
  });

  fireEvent.click(screen.getByRole("button", { name: /create/i }));


  await screen.findByText(/Admin Home/i);

  expect(addCoffee).toHaveBeenCalled();
});

test("edit mode: pre-fills fields and calls updateCoffee on submit", async () => {
  const updateCoffee = vi.fn();
  const existingCoffee = {
    id: 1,
    name: "Latte",
    description: "Milk drink",
    price: 3,
  };

  renderWithRouteAndContext("/admin/coffees/1/edit", {
    coffees: [existingCoffee],
    addCoffee: vi.fn(),
    updateCoffee,
    selectedCoffeeId: 1,
    setSelectedCoffeeId: vi.fn(),
  });

  const nameInput = screen.getByPlaceholderText(/name/i);
  expect(nameInput.value).toBe("Latte");

  fireEvent.change(nameInput, { target: { value: "Updated Latte" } });

  fireEvent.click(
    screen.getByRole("button", { name: /update coffee|save changes/i })
  );

  await screen.findByText(/Admin Home/i);

  expect(updateCoffee).toHaveBeenCalled();
});
