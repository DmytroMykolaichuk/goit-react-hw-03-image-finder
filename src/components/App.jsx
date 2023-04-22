import { Component } from 'react';
import axios from 'axios';
import { SearchBar } from './Searchbar/SarchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppContainer, StartText, ErrorText } from './App.styled';
import { MagnifyingGlass } from 'react-loader-spinner';
import { ContainerLoader } from './Loader/Loader.styled';

axios.defaults.baseURL =
  'https://pixabay.com/api/?key=33483798-cfc94c7459e9d93c6a5457b44&image_type=photo&orientation=horizontal';

export class App extends Component {
  state = {
    images: null,
    query: '',
    status: 'idle',
  };

  handlaSubmit = async search => {
    if (search.trim() === '') return;

    this.setState({ status: 'pending' });
    const response = await axios.get(`&per_page=12&page=1&q=${search}`);

    if (!response.data.hits[0]) {
      this.setState({
        status: 'rejected',
      });
      return;
    }

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
      status: 'resolved',
    });
  };

  page = 1;
  handleLoadMore = async query => {
    this.page += 1;
    this.setState({ status: 'pending' });
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
      status: 'resolved',
    }));
  };

  render() {
    const { images, query, status } = this.state;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handlaSubmit} />
        {status === 'idle' && (
          <StartText>
            Enter a query on the topic you are interested in
          </StartText>
        )}
        {status === 'rejected' && (
          <ErrorText>
            We didn't find anything for this search :(
            <span>Try another option</span>
          </ErrorText>
        )}
        {status === 'resolved' && <ImageGallery gallery={images} />}
        {status === 'pending' && (
          <ContainerLoader>
            <MagnifyingGlass
              height="320"
              width="320"
              ariaLabel="MagnifyingGlass-loading"
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="transparent"
              color="#3f51b5"
              wrapperStyle={{
                position: 'absolute',
                top: '50%',
                left: ' 50%',
                transform: 'translate(-50%, -50%)',
              }}
              visible={true}
            />
          </ContainerLoader>
        )}
        {status === 'resolved' && (
          <Button onClick={this.handleLoadMore} search={query} />
        )}
      </AppContainer>
    );
  }
}
