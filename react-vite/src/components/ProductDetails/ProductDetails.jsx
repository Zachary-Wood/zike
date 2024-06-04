import { useParams } from "react-router-dom"
import "./ProductDetails.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {loadProductByIdThunk, loadProductsThunk } from "../../redux/products"
import DeleteAProduct from "../ProductsForm/DeleteAProduct"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import { NavLink } from "react-router-dom"
import { FaStar } from "react-icons/fa6";
import CreateReview from "../Reviews/CreateReview"
import { UpdateAReview } from "../Reviews/UpdateAReview"
import DeleteReview from "../Reviews/DeleteReview"



const ProductDetails = () => {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.productReducer)

  const currentUser = useSelector((state) => state.session.user)
  console.log(currentUser)

  const selectedProduct = product[productId]

  console.log(selectedProduct);

  const sizesArray = selectedProduct?.size.split(', ')
  console.log('sizes', sizesArray)

  let hasReviewed = [];
  selectedProduct?.reviews?.forEach((review) => {
    hasReviewed.push(review.user_id);
  });


  
  const nikeSayings = ['Member Product', 'Just In', 'Going Fast', 'Available', 'Best Seller']
  
  useEffect(() => {
    dispatch(loadProductsThunk())
    dispatch(loadProductByIdThunk(productId))
    window.scrollTo(0, 0);
  
},[dispatch, productId])
  
  
  
  
  
  
    return (
    <div className="details-page-con">
    
    <div className="spot-details-con">
        <img className="product-image-details"src={selectedProduct?.product_image}/>
    

    <div className="products-details-text-con">
        <p className="nike-random">{nikeSayings && nikeSayings[(Math.floor(Math.random() * nikeSayings.length))]}</p>
        <h1 className="product-name-h1">{selectedProduct?.name}</h1>
        <p>{selectedProduct?.gender + ' ' + selectedProduct?.type}</p>
        <p className="product-det-price">${selectedProduct?.price}</p>
        <p>{selectedProduct?.description}</p>


        <div className="button-sizes-con">
      {sizesArray.map((size, index) => (
        <button key={index} className="shoe-size-button">{size}</button>
      ))}
    </div>

    <button className="add-to-cart" onClick={() => alert('Feature Coming Soon')}>Add to cart</button>
    </div>
    
    </div>


    <div className="reviews-container">
    <h3 style={{ cursor: "pointer" }}>Reviews and Ratings</h3>
          {selectedProduct && selectedProduct?.reviews?.map((review) => 
              <div className="review-text-con" key={review.id}>
                <div className="name-created">
                <p className="review-firstname">{review.user_firstname}</p>
                <div className="star-con">
                <FaStar className="review-star" /> {review.rating}
                <p className="review-date">{review.created_at}</p>
                </div>
                </div>
                <p className="review-text">{review.review}</p>

              <div className="review-btns-con">
                {currentUser && currentUser?.id === review?.user_id && (
                    <OpenModalMenuItem
                      itemText={<button className="update-review">Update this review</button>}
                      modalComponent={
                        <UpdateAReview
                          reviewId={review?.id}
                          productId={selectedProduct?.id}
                          review={review?.review}
                        />
                      }
                    />
                  )}

                {currentUser && currentUser?.id === review?.user_id && (
                    <OpenModalMenuItem
                      itemText={<button className="delete-review">Delete this review</button>}
                      modalComponent={
                        <DeleteReview
                          productIdId={selectedProduct?.id}
                          reviewId={review.id}
                        />
                      }
                    />
                  )}

                  </div>



              </div>
          )}

{currentUser &&
            currentUser?.id !== selectedProduct?.owner_id && !hasReviewed.includes(currentUser?.id) &&   (
              <OpenModalMenuItem
                itemText={
                  <div className="review-btn-con-for-details">
                  <button className="leave-a-review">Leave a review!</button>
                  </div>
                }
                modalComponent={<CreateReview />}
              ></OpenModalMenuItem>
            )}


    </div>

    <div className="buttons-con">
    {currentUser && currentUser?.id === selectedProduct?.owner_id && (
      <>
      <h1>Hi {currentUser?.firstname} you own this product</h1>
      <p>Please make any edits down below!</p>
      
      </>
    )}
    <div className="inner-buttons-con">
    {currentUser && currentUser?.id === selectedProduct?.owner_id && (
     
          
                    <OpenModalMenuItem
                      itemText={<button className="delete-btn">Delete this product</button>}
                      className={'delete-btn'}
                      modalComponent={
                        <DeleteAProduct
                          productId={selectedProduct?.id}
                          
                        />
                      }
                    />
                  )}


    {currentUser?.id === selectedProduct?.owner_id && (
           
           <NavLink
             to={`/products/${selectedProduct?.id}/update`}
             className={'update-product-link'}
           >
             Update Your Product
           </NavLink>

  )}
  </div>

  </div>
</div>
)
}







export default ProductDetails
