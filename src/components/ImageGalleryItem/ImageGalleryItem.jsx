import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  onOpenModal,
}) => {
  return (
    <li className="ImageGalleryItem">
      <div onClick={() => onOpenModal(largeImageURL, tags)}>
        <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};
