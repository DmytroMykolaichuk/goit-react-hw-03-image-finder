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
    images: [],
    query: '',
    status: 'idle',
    isLoading: false,
    isLoadMore: false,
  };

  handlaSubmit = async search => {
    if (search.trim() === '') return;

    this.setState({ isLoading: true });

    const response = await axios.get(`&per_page=12&page=1&q=${search}`);

    if (response.data.totalHits === 0) {
      this.setState({
        status: 'rejected',
        isLoading: false,
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
      isLoading: false,
    });

    if (response.data.hits.length === 12) {
      this.setState({ isLoadMore: true });
    } else {
      this.setState({ isLoadMore: false });
    }
  };

  page = 1;
  handleLoadMore = async query => {
    this.page += 1;

    this.setState({ isLoading: true });

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
      isLoading: false,
    }));

    if (response.data.hits.length === 12) {
      this.setState({ isLoadMore: true });
    } else {
      this.setState({ isLoadMore: false });
    }
  };

  render() {
    const { images, query, status, isLoading, isLoadMore } = this.state;
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
        {isLoading && (
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
        {isLoadMore && <Button onClick={this.handleLoadMore} search={query} />}
      </AppContainer>
    );
  }
}
