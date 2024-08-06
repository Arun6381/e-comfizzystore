/* eslint-disable react/prop-types */
import { useState } from "react";
import "./Search.css"; // Import the CSS file

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
      />
      <button className="search-bar-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
