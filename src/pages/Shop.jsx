import NavBar from "../components/NavBar";
import CoffeeList from "./CoffeeList";
import Search from "./Search";
import { useState, useContext } from "react"
import { useFilteredCoffees } from "../hooks/useFilteredCoffees";
import "./Shop.css"

function Shop() {
    const [search, setSearch] = useState("");
    const filteredCoffees = useFilteredCoffees(search);
    return (
        <>
            <NavBar />
      <div className="shop-layout">
        <aside className="shop-sidebar">
          <Search search={search} setSearch={setSearch} />
          <div className="filter-group">
            <label><input type="checkbox" /> Location 1</label>
            <label><input type="checkbox" /> Location 2</label>
            <label><input type="checkbox" /> Location 3</label>
            <label><input type="checkbox" /> Location 4</label>
          </div>
        </aside>
        <main className="shop-grid">
          <CoffeeList coffees={filteredCoffees} />
        </main>
      </div>
        </>
    )
  }

  export default Shop;
