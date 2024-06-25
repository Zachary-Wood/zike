import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useEffect } from "react";

import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();


  useEffect(() => {
    const errorsObj = {}

    if (!email.includes('@') || email.length < 10) errorsObj.email = 'Email must have an @ symbol and must be greater than 10 characters'
    if (username.length < 5 || username.length > 40) errorsObj.username = 'Please create a username that is between 5 and 40 characters'
    if (firstname.length < 3 || firstname.length > 25) errorsObj.firstname = 'Please input your firstname that is between 3 and 25 characters'
    if (lastname.length < 3 || lastname.length > 25) errorsObj.lastname = 'Please input your lastname that is between 3 and 25 characters'
    if (password.length < 8) errorsObj.password = 'Please provide a secure password that is greater than 8 characters'
    if (confirmPassword != password) errorsObj.confirmPassword = "Confirm Password field must be the same as the Password field"

    setErrors(errorsObj)
  }, [username, firstname, lastname, password, confirmPassword, email])

  const handleSubmit = async (e) => {
    e.preventDefault();


    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        firstname,
        lastname,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <>
    <div className='sign-up-modal-con'>
    <div className="signin-nike-signup">
      <h1 className='sign-up-h1'>Sign Up</h1>
      <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
      </div>
      {errors.server && <p className='form-errors-login'>{errors.server}</p>}
      <form onSubmit={handleSubmit}>
        <div className='sign-up-inputs'>
        <label>
          <div className='label-container-sign-up'>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='login-input-signup'
          />
          </div>
        </label>
        {errors.email && <p className='form-errors-login'>{errors.email}</p>}
        <label>
        <div className='label-container-sign-up'>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='login-input-signup'
          />
          </div>
        </label>
        {errors.username && <p className='form-errors-login'>{errors.username}</p>}
        


        <label>
        <div className='label-container-sign-up'>
          First Name{" "}
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className='login-input-signup'
          />{" "}
          </div>
        </label>
        {errors.firstname && <p className='form-errors-login'>{errors.firstname}</p>}
        <label>
        <div className='label-container-sign-up'>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className='login-input-signup'
          />
          </div>
        </label>
        {errors.lastname && <p className='form-errors-login'>{errors.lastname}</p>}

        <label>
        <div className='label-container-sign-up'>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-input-signup'
          />
          </div>
        </label>

        {errors.password && <p className='form-errors-login'>{errors.password}</p>}
        <label>
        <div className='label-container-sign-up'>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='login-input-signup'
          />
          </div>
        </label>
        {errors.confirmPassword && <p className='form-errors-login'>{errors.confirmPassword}</p>}
        <div className='button-on-signup'>
        <button disabled={Object.values(errors).length > 0} className='login-btn-main' type="submit">Sign Up</button>
        </div>
        </div>
      </form>
      </div>
    </>
  );
}

export default SignupFormModal;
