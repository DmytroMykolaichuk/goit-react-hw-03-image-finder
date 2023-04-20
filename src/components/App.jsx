import { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/SarchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=33483798-cfc94c7459e9d93c6a5457b44&image_type=photo&orientation=horizontal';

export class App extends Component {
  state = {
    images: [],
    search: '',
  };

  page = 1;

  handlaSubmit = async search => {
    this.page = 1;
    const response = await axios.get(`&per_page=12&page=1&q=${search}`);
    console.log(response.data.hits);
    const imageResult = response.data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })
    );
    this.setState({ images: imageResult, search });
  };

  handleLoadMore = async () => {
    this.page += 1;
    const response = await axios.get(
      `&per_page=12&page=${this.page}&q=${this.state.search}`
    );
    const imageResult = response.data.hits.map(
      ({ id, webformatURL, largeImageURL, tags }) => ({
        id,
        webformatURL,
        largeImageURL,
        tags,
      })
    );
    this.setState(prev => ({ images: [...prev.images, ...imageResult] }));
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <SearchBar onSubmit={this.handlaSubmit} />
        <ImageGallery gallery={this.state.images} />
        {this.state.images.length > 0 && (
          <Button onClick={this.handleLoadMore} />
        )}
      </div>
    );
  }
}
