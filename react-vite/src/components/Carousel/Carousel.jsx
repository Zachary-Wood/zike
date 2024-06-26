import { useRef } from "react";
import { useSelector } from "react-redux";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";

export function Carousel() {
  let products = useSelector((state) => state.productReducer)
  products = Object.values(products)
  
  
  const carouselRef = useRef(null);
  let navigate = useNavigate()
  const scrollLeft = () => {
    // if (carouselRef.current) {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
    // }
  };

  const scrollRight = () => {
    // if (carouselRef.current) {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
    // }
  };

  return (
    <div className="carousel-wrapper">
      <button className="carousel-button left" onClick={scrollLeft}>
        {"<"}
      </button>
      <button className="carousel-button right" onClick={scrollRight}>
        { ">"}
      </button>
      <section className="carousel-container" ref={carouselRef}>
        {products.reverse().map((product) => (
          <div
            onClick={() => {
              navigate(`/products/${product.id}`);
            }}
            className="carousel-item"
            key={product.id}
          >
            <div className="carousel-pic-container">
              <p className="carousel-title">{product.name}</p>
              <img
                className="carouselPic"
                src={product.product_image}
                alt=""
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}