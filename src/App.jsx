import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import  Cart  from "./Pages/cart";
import CartProvider from "./context/CartContext";
import  Ecomerce  from "./Pages/ecomerce";
import { Layout } from "./layout/layout";
import Detail from "./Pages/detail";
import { ToastContainer } from "react-toastify";
const App = () => {

  const router = createBrowserRouter([{
    path:"/",
    element:<Layout/>,
    children:[
    {path:"/",element:<Ecomerce/> },
    {path:"/cart", element:<Cart/>},
    {path:"/details/:id", element:<Detail/>}
    ]
  }
  ])
  return (
    <>
      <CartProvider>
      <RouterProvider router={router}/>
      </CartProvider>
      <ToastContainer position="top-right" autoClose={3000} />

    </>
  );
};

export default App;
