import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import PropTypes from 'prop-types';

export const ImageGallery = ({ gallery }) => {
  return (
    <ul className="ImageGallery ">
      {gallery.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <li key={id} className="ImageGalleryItem">
            <ImageGalleryItem
              largeImageURL={largeImageURL}
              webformatURL={webformatURL}
              tags={tags}
            />
          </li>
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  gallery: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
