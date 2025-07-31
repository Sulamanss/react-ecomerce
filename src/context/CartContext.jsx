import {createContext, useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

 export const CartContext = createContext()
 


 const CartProvider = ({children}) => {
  const[loading, setLoading] = useState(true)
    const [fetchData, setFetchData] = useState([])
  const [total, setTotal] = useState(0)
    const [cart, setCart] = useState(()=> {
      const saved = localStorage.getItem("myCart")
      return saved ? JSON.parse(saved): []
    });


    useEffect(()=> {
      localStorage.setItem("myCart",JSON.stringify(cart))
    },[cart])
  
     useEffect(()=>{
      const newTotal = cart.reduce((Total, item)=> Total + item.unitPrice, 0)
    setTotal(newTotal)
 },[cart])

 useEffect(()=>{
    fetch('https://fakestoreapi.com/products')
   .then(response => response.json())
   .then(data => setFetchData(data)
   );

 },[])


 useEffect(()=> {
  const timer = setTimeout(()=> {
       setLoading(false)

  }, 1000)

  return ()=> clearTimeout(timer)
 },[])

  const handleAdd = (item) => {    
    const index = cart.findIndex((cartItem) => cartItem.title === item.title )
    if(index !== -1){
    const updatedList = [...cart]
    updatedList[index].qty += 1;
    updatedList[index].unitPrice = updatedList[index].price * updatedList[index].qty
    setCart(updatedList)
    }else
    setCart([...cart, {
      title: item.title,
      description: item.description,
      price: item.price,
      unitPrice: item.price,
      qty: 1,
      image: item.image,
      id: item.id
    }]);
  };
  
  const handleDelete = (index) => {
    const deleteList =  cart.filter((_,i)=> i !== index)
    setCart(deleteList)
  }

  const handleIncrease = (index) => {
    const updatedList = [...cart]
    updatedList[index].qty += 1;
    updatedList[index].unitPrice = updatedList[index].price * updatedList[index].qty
    setCart(updatedList)
    }

    const handleDecrease = (index) => {
    const updatedList = [...cart]
    if(updatedList[index].qty > 1){
    updatedList[index].qty -= 1;
    updatedList[index].unitPrice = updatedList[index].price * updatedList[index].qty
    setCart(updatedList)
    }
    }
    return(
        <CartContext.Provider
      value={{
        cart,
        total,
        handleAdd,
        handleDelete,
        handleIncrease,
        handleDecrease,
        fetchData,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider

