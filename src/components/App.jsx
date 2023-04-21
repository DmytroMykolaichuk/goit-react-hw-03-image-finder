import { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/SarchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppContainer } from './App.styled';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=33483798-cfc94c7459e9d93c6a5457b44&image_type=photo&orientation=horizontal';

export class App extends Component {
  state = {
    images: [],
    query: '',
  };

  handlaSubmit = async search => {
    if (search.trim() === '') return;

    const response = await axios.get(`&per_page=12&page=1&q=${search}`);
    const imageResult = response.data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })
    );
    this.setState({
      images: [...imageResult],
      query: search,
    });
  };

  page = 1;
  handleLoadMore = async query => {
    this.page += 1;
    const response = await axios.get(
      `&per_page=12&page=${this.page}&q=${query}`
    );
    const imageResult = response.data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })
    );
    this.setState(prev => ({
      images: [...prev.images, ...imageResult],
    }));
  };

  render() {
    const { images, query } = this.state;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handlaSubmit} />
        <ImageGallery gallery={images} />
        {images.length > 0 && (
          <Button onClick={this.handleLoadMore} search={query} />
        )}
      </AppContainer>
    );
  }
}
