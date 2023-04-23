import React, { Component } from 'react';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export class SearchBar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.currentTarget.value });
  };

  handleSubmit = e => {
    const { search } = this.state;
    e.preventDefault();
    if (search.trim() === '') {
      return toast.error('Value cannot be an empty string');
    }
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <FcSearch size="24" />
          </button>

          <input
            onChange={this.handleChange}
            value={this.state.search}
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
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
