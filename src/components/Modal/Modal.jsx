import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseECC);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseECC);
  }

  handleCloseECC = e => {
    const { onClose } = this.props;

    if (e.key === 'Escape') {
      onClose();
    }
  };

  handleCloseBackdrop = e => {
    const { onClose } = this.props;

    if (e.currentTarget === e.target) {
      onClose();
      e.stopPropagation();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props;

    return createPortal(
      <div className="Overlay" onClick={this.handleCloseBackdrop}>
        <div className="Modal">
          <img src={largeImageURL} alt={tags} width="800" height="600" />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
