import React from 'react';

export const SearchBar = ({ onSubmit }) => {
  const detSearchResult = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.search.value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={detSearchResult}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          name="search"
          className="SearchForm-input "
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
