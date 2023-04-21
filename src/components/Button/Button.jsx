import PropTypes from 'prop-types';

export const Button = ({ onClick, search }) => {
  return (
    <button type="button" onClick={() => onClick(search)} className="Button">
      Load more
    </button>
  );
};

Button.propTypes = {
  search: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
