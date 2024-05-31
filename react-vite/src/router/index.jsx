import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/Landing Page/LandingPage';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import CreateNewProduct from '../components/CreateNewProduct/CreateNewProduct';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage/>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetails/>
      },
      {
        path: "/products/new",
        element: <CreateNewProduct/>
      }
    ],
  },
]);