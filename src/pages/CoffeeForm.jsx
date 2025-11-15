import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCoffees } from "../hooks/useCoffees";

function CoffeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const { coffees, addCoffee, updateCoffee } = useCoffees();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    if (!isEditMode) return;

    const coffee = coffees.find((c) => String(c.id) === String(id));
    if (coffee) {
      setName(coffee.name);
      setDescription(coffee.description);
      setPrice(String(coffee.price));
    }
  }, [isEditMode, id, coffees]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      description,
      price: parseFloat(price),
    };

    if (isEditMode) {
      fetch(`http://localhost:4000/coffees/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => {
          if (!r.ok) throw new Error("failed to edit coffee");
          return r.json();
        })
        .then((updated) => {
          updateCoffee(updated);
          navigate("/admin");
        })
        .catch(console.error);
    } else {
      fetch("http://localhost:4000/coffees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => {
          if (!r.ok) throw new Error("failed to add coffee");
          return r.json();
        })
        .then((created) => {
          addCoffee(created);
          navigate("/admin");
        })
        .catch(console.error);
    }
  };
  return (
    <div>
      <h2>{isEditMode ? "Edit Coffee" : "Add New Coffee"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          step="0.01"
          min="0"
          required
        />
        <button type="submit">
          {isEditMode ? "Update Coffee" : "Create Coffee"}
        </button>
      </form>
    </div>
  );
}
export default CoffeeForm;
