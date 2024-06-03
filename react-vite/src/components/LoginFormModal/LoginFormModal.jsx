import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { useEffect } from "react";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  useEffect(() => {
    const errorsObj = {}

    if (!email && email.length < 7) errorsObj.email = "Email is required and be more than 7 characters"
    if (!password && password.length < 8) errorsObj.password = 'Password must be 8 or more characters'

    setErrors(errorsObj)
  }, [email, password]) 

  return (
    <>
    <div className="modal-container">
      <div className="signin-nike">
      <h1 className="login-in-h1" >Sign in</h1>
      <img 
              src="/NikeLogo.png" 
              alt="Nike Logo" 
              className="login-logo"
              />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-inputs-con">
        <label>
          <div className="label-container">
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
            className="login-input"
          />
          </div>
        </label>
        {errors.email && <span className="form-errors-login">{errors.email}</span>}
        <label>
        <div className="label-container">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login-input"
            placeholder="password"
          />
          </div>
        </label>
        </div>
        {errors.password && <span className="form-errors-login">{errors.password}</span>}
        <div className="login-btn-con-main">
        <button disabled={Object.values(errors).length > 0} className='login-btn-main' type="submit">Log In</button>

        <div className="separator">
        <span>or</span>
        </div>
        
        <button
          type="submit"
          className="login-btn-demo"
          onClick={() => {
            setEmail("demo@gmail.com"), setPassword("password");
          }}
        >
          Login as Demo User
        </button>
        </div>
      
      </form>
      </div>
    </>
  );
}

export default LoginFormModal;
