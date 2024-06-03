
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useNavigate, useParams} from "react-router-dom";
import "./DeleteReview.css";
import { loadProductsThunk } from "../../redux/products";
import { deleteAReviewThunk } from "../../redux/reviews";
  
export const DeleteReview = ({ reviewId }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { closeModal } = useModal();

    const { productId } = useParams()
    console.log(productId)

    const deleteReviewEvent = (e) => {
      e.preventDefault();

      dispatch(deleteAReviewThunk(productId, reviewId));
  
    
      dispatch(loadProductsThunk());
      navigate(`/products/${productId}`);
      closeModal();
     
    };
  
    return (
      <div className="delete-modal">
        <div className="modal-container">
          <h1 className="delete-confirm">Confirm Deletion</h1>
          <p>Would you like to delete this review?</p>
          <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
          <div className="button-group">
            <div className="delete-button">
              <button className="d-bttn" onClick={deleteReviewEvent}>
                Delete
              </button>
            </div>
            <div className="cancel-button">
              <button className="c-bttn" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
);
};


export default DeleteReview