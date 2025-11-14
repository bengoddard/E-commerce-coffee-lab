import { useContext } from "react";
import { CoffeeContext } from "../pages/CoffeeContext"; // adjust path if needed

export function useCoffees() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error("useCoffees must be used within a CoffeeProvider");
  }
  return context;
}