import { FaLinkedin } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

import './Footer.css'
const Footer = () => {
  return (
    <>

    <div className="footer">
    <div className="footer-con">

        <img
        src='NikeLogoWhite.png'
        className='white-nike-logo'
        alt='white nike logo'
        />
       
        

        <div className="linked-in-con">
        <FaLinkedin className="linked-in"/>
        <NavLink to={'https://www.linkedin.com/in/zach-wood-82a80b28b/'} className={'linked-in-link'}>
        LinkedIn
        </NavLink>
        </div>

        <div className="linked-in-con">
        <FaGithub className="linked-in"/>
        <NavLink to={'https://github.com/Zachary-Wood'} className={'linked-in-link'}>
        GitHub
        </NavLink>
        </div>

        <h1 className='nike-h1-footer'>ZIKE</h1>



        



    </div>
    </div>
    </>
  )
}


export default Footer
