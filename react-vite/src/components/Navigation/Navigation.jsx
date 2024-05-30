import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import { IoMdSearch } from "react-icons/io";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  return (
    <>
    <div className="nav-bar-con">
      <div className="left-navbar">
        <img 
          src="/NikeLogo.png" 
          alt="Nike Logo" 
          onClick={() => navigate("/")} 
          className="logo"
        />
      </div>

      <div className="search-box">
      <IoMdSearch className="search-logo"/>
        <input
          className="search-input"
          type="text"
          placeholder="Search for products"
        />

      </div>
      <p className="profile">
        <ProfileButton />
      </p>
      </div>
    </>
  );
}

export default Navigation;
