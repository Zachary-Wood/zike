import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../context/Modal";

import { MdStar, MdStarBorder } from "react-icons/md";
import "./CreateReview.css";
import { loadProductsThunk } from "../../redux/products";
import { createAReviewThunk, loadReviewsForProductThunk } from "../../redux/reviews";

export const CreateReview = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { closeModal } = useModal();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (review.length < 2 || review.length > 255) {
      errors.review = "Review is required and must be between 2 and 255.";
    }
    if (rating < 1) {
      errors.rating = "Rating needs at least 1 star.";
    }
    setValidationErrors(errors);
  }, [review, rating]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData();

    formData.append("review", review);
    formData.append("rating", rating);

   await dispatch(createAReviewThunk(productId, formData))
   await dispatch(loadReviewsForProductThunk(productId));
   await dispatch(loadProductsThunk())
   navigate(`/products/${productId}`)
   closeModal()
  };



  return (
    <div className="review-modal">
      <div className="container-review">
        <h1 className="review-h1">Leave your review!</h1>
        <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
        <label>
          <textarea
            className="review-text-area"
            value={review}
            type="text"
            placeholder="How did you enjoy this product..."
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
        </label>
        <div>
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
        <div>
        {validationErrors.rating && <p className='form-errors'>{validationErrors.rating}</p>}
        </div>
        <div className="create-button-container">
          <div className="submit-button">
            <button
              onClick={handleSubmit}
              className="created-review"
              disabled={Object.values(validationErrors).length > 0}
            >
              {" "}
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default CreateReview