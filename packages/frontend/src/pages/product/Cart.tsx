import React, { useState, useEffect } from "react";
import CartCard from "../../components/CartCart";
import { RootState, useAppSelector } from "../../store";
import { useGetProductsQuery } from "../../services/product/productSlice";
import { AuthState } from "../../services/auth/types";

export const Cart = ({
  isAuthenticated,
  authState,
}: {
  isAuthenticated: boolean;
  authState: AuthState;
}) => {
  // get items in cart (id, amount)
  const cart = useAppSelector((state: RootState) => state.cart.products);
  // select the ids in a list
  const productIds = [cart.map((cart) => cart.id)];
  const [amount , setAmount] = useState(0)

  // get only products of that id
  const { data, isLoading, isSuccess } = useGetProductsQuery({
    productIds: productIds,
  });

  if (!isAuthenticated) "not allowed";
  if (isLoading) "Loading ....";


  useEffect(() => {
    if(data){
      // calculate total amont based on product price and amount in cart
      var amount = cart.reduce((total, current) => {
        var product = data.find((p) => p.id == current.id);
    
        return total + current.amount * product.price;
      }, 0);
      setAmount(amount)
    }
  
    
  }, [data, cart])
  

  return (
    <div>
      {data && data.map((data) => <CartCard product={data} cart={cart} />)}

      {
        cart.length === 0? ( <p className="p-4 text-center font-bold text-gray-600">Cart is Empty</p>): 
        (
          <div className="container mt-10 flex justify-between">
          <p class=" text-lg font-bold">Total Amount: ${amount}</p>
  
          <button
            type="button"
            className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Checkout ${amount}
          </button>
        </div>
        )
      }
     

     
    </div>
  );
};
