import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';
import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    onZoom: false,
  };

  handleCloseModal = () => {
    this.setState({
      onZoom: false,
    });
  };

  handleZoom = () => {
    this.setState({
      onZoom: true,
    });
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <div onClick={this.handleZoom}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        {this.state.onZoom && (
          <Modal
            onClose={this.handleCloseModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
