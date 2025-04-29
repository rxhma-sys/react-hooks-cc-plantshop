function Search({ searchTerm, onSearchChange }) {
  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search plants..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default Search;
