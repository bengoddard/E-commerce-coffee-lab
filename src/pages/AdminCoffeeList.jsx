import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CoffeeContext } from "./CoffeeContext";
import CoffeeList from "./CoffeeList";
import Search from "./Search";

function AdminCoffeeList() {
  const { coffees } = useContext(CoffeeContext);
  const [search, setSearch] = useState("");

  const filtered = coffees.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Coffees</h1>
      <Search search={search} setSearch={setSearch} />

      <Link to="/admin/coffees/new">
        <button style={{ margin: "10px 0" }}>+ Add New Coffee</button>
      </Link>

      <CoffeeList coffees={filtered} isAdmin />
    </div>
  );
}

export default AdminCoffeeList;
