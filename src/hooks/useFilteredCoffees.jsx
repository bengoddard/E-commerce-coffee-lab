// src/hooks/useFilteredCoffees.js
import { useMemo } from "react";
import { useCoffees } from "./useCoffees";

export function useFilteredCoffees(searchTerm) {
  const { coffees } = useCoffees();

  const filtered = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return coffees.filter((coffee) =>
      coffee.name.toLowerCase().includes(term)
    );
  }, [coffees, searchTerm]);

  return filtered;
}
