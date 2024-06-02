
import './LoadingModal.css'; // Adjust the path as necessary

const LoadingModal = () => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="spinner"></div>
        <h1 className='h1-padding'>Loading...</h1>
      </div>
    </div>
  );
};

export default LoadingModal;