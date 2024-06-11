import "./LandingPage.css"
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect} from "react";
import { loadProductsThunk } from "../../redux/products";
import { Carousel } from "../Carousel/Carousel";
import nikevid from '../../../public/nikevid.mp4'



const LandingPage = () => {
  // fix for main

  let products = useSelector((state) => state.productReducer)
  products = Object.values(products)
  console.log(products);
  // let navigate = useNavigate()
  


  const dispatch = useDispatch();
  const randProduct = Math.floor(Math.random() * 12) + 1;
  
  useEffect(() => {
    dispatch((loadProductsThunk()));
  
  
  }, [dispatch, randProduct]);
  
    return (
    
    <div className="fullpage-landing">
    
    
    <video
                autoPlay
                loop
                muted
                className="tatis"
            >
                <source src={nikevid} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
    <div className="under-image-text-con">

        <h1 className="tatis-header"> A STAR ALWAYS SHINES </h1>
        <p className="tatis-text">Shine like a star with Nike on, where performance meets style. </p>
        <NavLink to={`/products/${randProduct}`}>
        <button className="shop-tatis-button">Shop now</button>
        </NavLink>

    </div>
    
    
    <Carousel/>
    



    <h1 className="shop-favorite">Shop All Products</h1>
   
    <section className="products-con">

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
