import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./AdminPortal.css";

function AdminPortal() {
  return (
    <>
      <NavBar />
      <main className="admin-container">
        <h1>Welcome Admin!</h1>
        <p>
          This portal lets you manage your coffee products: add new coffees,
          update descriptions and prices, and keep your shop up to date.
        </p>

        <div className="admin-title">
          <Link to="/admin/coffees/new">
            <button>Add New Coffee</button>
          </Link>
          <Link to="/admin/coffees">
            <button>View / Edit Coffees</button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default AdminPortal;
