import "./LandingPage.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
import { loadProductsThunk } from "../../redux/products";
import { Carousel } from "../Carousel/Carousel";



const LandingPage = () => {
  // fix for main

  let products = useSelector((state) => state.productReducer) // we grab all of the products from redux also known as our storage manager 
  products = Object.values(products) // we change the products to an array so we can iterate through the data to display
  console.log(products);
  // let navigate = useNavigate()
  


  const dispatch = useDispatch(); // we create a dispatch variable to dispatch our thunk at a later time to retrive the data we want
  const randProduct = Math.floor(Math.random() * 12) + 1; // random equation to get a random number of a product 
  
  useEffect(() => {
    dispatch((loadProductsThunk())); // dispatch our thunk to recieve all of our product data 
  
  
  }, [dispatch, randProduct]);
  
    return (
    <div className="fullpage-landing">
    <div className="image-con">
    <img src="/tatis3.jpeg" alt='Tatis picture' className="tatis"/>

        <div className="do-it-con">
        <img src="/NikeLogoOrange.png" className="do-it-logo"/>

        </div>
    </div>

    <div className="under-image-text-con">

        <h1 className="tatis-header"> A STAR ALWAYS SHINES </h1>
        <p className="tatis-text">San Diego Padres star Fernando Tatis Jr&apos;s style is built for the bright lights on and off the field</p>
        <NavLink to={`/products/${randProduct}`}>
        <button className="shop-tatis-button">Shop now</button>
        </NavLink>

    </div>
    
    
    <Carousel/>
    



    <h1 className="shop-favorite">Shop All Products</h1>
    
    <section className="products-con">
      {/* 
      Here we ieterate through all of the products and show the image, name, type, and the price to show on the homepage to the user
      */}
      {products?.map((product) => (
        <NavLink 
        className={'product-item-con'}
        key={product.id}
        to={`/products/${product.id}`}
        >
        
        <div className="product-card-con">
          <img 
          className="product-image"
          src={product?.product_image}
          />
          <div className="product-text-con">

          <h3 className="product-name">{product?.name}</h3>
          <p className="product-type">{product?.type}</p>
          <p className="product-price">${product?.price}</p>
          </div>


        </div>
        

        </NavLink>
      ))}



    </section>






    </div>

    
    
    
    
    
    
  )
}




export default LandingPage
