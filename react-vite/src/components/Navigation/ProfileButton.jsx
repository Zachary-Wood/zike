import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { IoPerson } from "react-icons/io5";
import {NavLink} from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <>
      <button  className="profile-button" onClick={toggleMenu}>
        <IoPerson className="user-circle"/> 
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            < div className='profile-dropdown-con'>
              <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
              <li className='username'>Hello {user.firstname}!</li>
              <li className='email'>{user.email}</li>
              <NavLink className='create-a-product' to='/products/new'
                onClick={toggleMenu}
              >
              Add new product
              </NavLink>
              <li className='btn-padding'>
                <button  className='logout-btn-signedin' onClick={logout}>Log Out</button>
              </li>
            </ div>
          ) : (
            <>
          <div className="login-logout-con">
            <img 
          src="/NikeLogo.png" 
          alt="Nike Logo" 
          className="login-logo"
        />
              <div className="login-btn">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              </div>
              <div className="logout-btn">
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
              </div>
              </div>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
