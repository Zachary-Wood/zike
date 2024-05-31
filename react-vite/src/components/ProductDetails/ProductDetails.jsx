import { useParams } from "react-router-dom"
import "./ProductDetails.css"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadProductByIdThunk } from "../../redux/products"




const ProductDetails = () => {
  const {productId} = useParams()
  const dispatch = useDispatch()
  const product = useSelector((state) => state.productReducer)
  console.log(product);

  const selectedProduct = product[productId]

  console.log(selectedProduct);

  
  const nikeSayings = ['Member Product', 'Just In', 'Going Fast', 'Available', 'Best Seller']
  
  useEffect(() => {
    dispatch(loadProductByIdThunk())
  
},[dispatch])
  
  
  
  
  
  
    return (
    <div className="details-page-con">
    
    <div className="spot-details-con">
        <img className="product-image-details"src={selectedProduct?.product_image}/>
    

    <div className="products-details-text-con">
        <p className="nike-random">{nikeSayings && nikeSayings[(Math.floor(Math.random() * nikeSayings.length))]}</p>
        <h1 className="product-name-h1">{selectedProduct?.name}</h1>
        <p>{selectedProduct?.gender + ' ' + selectedProduct?.type}</p>
        <p className="product-det-price">${selectedProduct?.price}</p>


        <div className="product-size-con">
        <p className="product-select-size">Select Size</p>
        <div className="button-sizes-con">
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        <button className="shoe-size-button">{selectedProduct?.size}</button>
        </div>

        </div>

         
    </div>
    
    </div>



    </div>
  )
}







export default ProductDetails
