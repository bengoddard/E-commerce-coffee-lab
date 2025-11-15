function Search({ search, setSearch }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search coffees..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
export default Search;
