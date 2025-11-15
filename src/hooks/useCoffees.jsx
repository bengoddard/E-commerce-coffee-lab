import { useContext } from "react";
import { CoffeeContext } from "../pages/CoffeeContext"; // adjust path if needed

function useCoffees() {
  const context = useContext(CoffeeContext);
  if (!context) {
    throw new Error("useCoffees must be used within a CoffeeProvider");
  }
  return context;
}
export default useCoffees;