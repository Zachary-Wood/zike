import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/Landing Page/LandingPage';
import ProductDetails from '../components/ProductDetails/ProductDetails';
import CreateNewProduct from '../components/ProductsForm/CreateNewProduct';
import UpdateAProduct from '../components/ProductsForm/UpdateAProduct';

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
      },
      {
        path: '/products/:productId/update',
        element: <UpdateAProduct/>
      }
    ],
  },
]);