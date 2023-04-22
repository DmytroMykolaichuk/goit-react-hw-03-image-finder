import React from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export const SearchBar = ({ onSubmit }) => {
  const detSearchResult = e => {
    e.preventDefault();
    onSubmit(e.currentTarget.elements.search.value);
    e.currentTarget.elements.search.value = '';
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={detSearchResult}>
        <button type="submit" className="SearchForm-button">
          <FcSearch size="24" />
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

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
