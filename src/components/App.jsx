import { Component } from 'react';
import { getImages } from 'services/appi';
import { SearchBar } from './Searchbar/SarchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { AppContainer, StartText, ErrorText } from './App.styled';
import { Loader } from './Loader/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    showModal: false,
    largeImage: '',
    tags: '',
    total: 0,
    error: null,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.fetchImages(query, page);
    }
  }

  fetchImages = async (query, page) => {
    try {
      this.setState({ isLoading: true });
      const data = await getImages(query, page);
      if (data.hits.length === 0) {
        return toast.error(
          "We didn't find anything for this search :(  Try another option"
        );
      }
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        total: data.totalHits,
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handlaSubmit = query => {
    this.setState({ query, page: 1, images: [] });
  };

  onLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  onOpenModal = (largeImage, tags) => {
    this.setState({ showModal: true, largeImage, tags });
  };

  onCloseModal = () => {
    this.setState({ showModal: false, largeImage: '', tags: '' });
  };

  render() {
    const { images, isLoading, total, error, showModal, largeImage, tags } =
      this.state;
    const totalPage = total / images.length;
    return (
      <AppContainer>
        <SearchBar onSubmit={this.handlaSubmit} />
        {images.length === 0 && (
          <StartText>
            {' '}
            Enter a query on the topic you are interested in
          </StartText>
        )}
        {isLoading && <Loader />}
        {images.length !== 0 && (
          <ImageGallery gallery={images} onOpenModal={this.onOpenModal} />
        )}
        {totalPage > 1 && !isLoading && images.length !== 0 && (
          <Button onClick={this.onLoadMore} />
        )}
        {showModal && (
          <Modal
            largeImage={largeImage}
            tags={tags}
            onCloseModal={this.onCloseModal}
          />
        )}
        {error && (
          <ErrorText>
            We didn't find anything for this search :(
            <span>Try another option</span>
          </ErrorText>
        )}
        <ToastContainer autoClose={2000} theme="dark" />
      </AppContainer>
    );
  }
}
