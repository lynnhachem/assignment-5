import { useState } from "react";

export default function SearchBar({ onSearch, disabled }) {
  const [query, setQuery] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSearch(query.trim());
  }

  return (
    <form className="search" onSubmit={handleSubmit} noValidate>
      <label htmlFor="city-input" className="sr-only">City name</label>
      <input
        id="city-input"
        type="text"
        placeholder="Search for a city…"
        autoComplete="off"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled}>Search</button>
    </form>
  );
}
