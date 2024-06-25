import { useDispatch } from "react-redux"
import { useModal } from "../../context/Modal"
import { useNavigate } from "react-router-dom"
// import { useEffect } from "react";
// import { useParams } from "react-router-dom"

import './DeleteAProduct.css'
import { deleteAProductThunk } from "../../redux/products"


export const DeleteAProduct = ({productId}) => {

    // console.log(productId)
   
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const deleteYourProduct = async(e) => {
        e.preventDefault()



            await dispatch(deleteAProductThunk(productId))
            navigate(`/`)
            closeModal()
        
    }


    

return (
    <div className="delete-your-menu-con">
        <form onSubmit={deleteYourProduct} className="delete-form-container">
        
        <h1 className="delete-warning">Are you sure you want to remove this product?</h1>

        <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />

        <div className="warning-message">
            <p className="last-warning">{'(DELETED PRODUCTS CANNOT BE UNDONE)'}</p>

        </div>

    <div className="button-delete-con">
        <button className="yes-btn-delete" type="submit">{`Yes(Delete Product)`}</button>
        <button onClick={() => closeModal()} className="no-btn-del">{`No(Keep Product)`}</button>
    </div>
        


        </form>
    </div>
  )
}



export default DeleteAProduct;