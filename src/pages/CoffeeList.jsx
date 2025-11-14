function CoffeeList({ coffees }) {
  return (
    <>
      {coffees.map(c => (
        <div key={c.id} className="coffee-card">
          <h3>{c.name}</h3>
          <p>{c.description}</p>
          <p>{c.origin}</p>
          <p>${c.price}</p>
        </div>
      ))}
    </>
  );
}
export default CoffeeList;
