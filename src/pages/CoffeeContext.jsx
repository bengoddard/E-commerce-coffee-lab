import { createContext, useState, useEffect } from "react";

export const CoffeeContext = createContext();

export function CoffeeProvider({ children }) {
  const [coffees, setCoffees] = useState([]);
  const [selectedCoffeeId, setSelectedCoffeeId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/coffees")
      .then((r) => r.json())
      .then(setCoffees)
      .catch(console.error);
  }, []);

  function addCoffee(newCoffee) {
    setCoffees((prev) => [...prev, newCoffee]);
  }
  function updateCoffee(updatedCoffee) {
    setCoffees((prev) =>
      prev.map((c) => (c.id === updatedCoffee.id ? updatedCoffee : c))
    );
  }
  return (
    <CoffeeContext.Provider value={{ coffees, addCoffee, updateCoffee, selectedCoffeeId, setSelectedCoffeeId }}>
      {children}
    </CoffeeContext.Provider>
  );
}
