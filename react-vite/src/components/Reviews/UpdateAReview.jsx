import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";
import { MdStar, MdStarBorder } from "react-icons/md";
import "./CreateReview.css";
import { updateAReviewThunk } from "../../redux/reviews";
import { loadProductsThunk } from "../../redux/products";

export const UpdateAReview = ({ productId, review, reviewId }) => {
  


  const indvReview = useSelector((state) => 
    state.productReducer[productId].reviews?.find(review => review.id === parseInt(reviewId))
  ); 



 
  

 
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Ensure review object is defined before accessing its properties
  const [reviewText, setReviewText] = useState(review?.review || "");
  const [rating, setRating] = useState(review?.rating || 0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if(review) {
      setReviewText(indvReview.review || '')
      setRating(indvReview.rating || '')
    }
  },[indvReview, review])

  useEffect(() => {
    const errors = {};

    if (reviewText.length < 2 || reviewText.length > 255) {
      errors.review = "Review is required and must be between 2 and 255.";
    }
    if (rating < 1) {
      errors.rating = "Rating needs at least 1 star.";
    }
    setValidationErrors(errors);
  }, [reviewText, rating]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData()
    formData.append('review', reviewText)
    formData.append('rating', rating)

    dispatch(
      updateAReviewThunk(productId, formData, reviewId)
    );
    dispatch(loadProductsThunk());
    navigate(`/products/${productId}`);
    closeModal();
  };

  return (
    <div className="review-modal">
      <div className="container-review">
      <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
        <label>
          <textarea
            className="review-text-area"
            value={reviewText}
            type="text"
            placeholder="Describe your WuberEats experience here..."
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
        </label>
        <div style={{ color: "red" }}>
        {validationErrors.review && <p className='form-errors'>{validationErrors.review}</p>}
        </div>
        <div className="new-rating">
          {[1, 2, 3, 4, 5].map((num) => (
            <span key={num} onClick={() => setRating(num)}>
              {num <= rating ? (
                <MdStar className="star selected" />
              ) : (
                <MdStarBorder className="star" />
              )}
            </span>
          ))}
        </div>
        <div style={{ color: "red" }}>
        {validationErrors.rating && <p className='form-errors'>{validationErrors.rating}</p>}
        </div>
        <div className="create-button-container">
          <div className="submit-button">
            <button
              onClick={handleSubmit}
              className="created-review"
              disabled={Object.values(validationErrors).length > 0}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UpdateAReview