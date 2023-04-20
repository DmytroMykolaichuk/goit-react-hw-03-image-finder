export const ImageGallery = ({ gallery }) => {
  return (
    <ul className="ImageGallery ">
      {gallery.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <li key={id} className="ImageGalleryItem">
            <img
              className="ImageGalleryItem-image"
              src={webformatURL}
              alt={tags}
            />
          </li>
        );
      })}
    </ul>
  );
};
