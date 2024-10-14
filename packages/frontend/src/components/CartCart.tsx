import React from "react";
import { ProductModel ,Cart} from "../services/product/types";
import { useAppDispatch } from "../store";
import { addProductToCart,removeProductFromCart } from "../services/product/productSlice";


// Cart product ui Card  that displays card and dispatch addToCart
const CartCard = ({ product,cart }: { product: ProductModel, cart:Cart[] }) => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="rounded-lg flex border gap-4 border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="h-40 w-[120px]">
          <a href="#">
            <img className=" h-full dark:hidden" src={product.img} alt="" />
            <img
              className=" hidden h-full dark:block"
              src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
              alt=""
            />
          </a>
        </div>
        <div className="pt-6 flex-1">
          <a
            href="#"
            className="text-sm font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
          >
            {product.name}
          </a>

          <div className="mt-2 flex items-center gap-2">
            <p className="text-xs font-medium text-gray-900 dark:text-white">
              In stock
            </p>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              ({product.quantity})
            </p>
          </div>

          <div className="mt-4 flex items-center justify-between gap-4">
            <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">
              ${product.price}
            </p>
            <p className="text-xl font-semibold leading-tight text-gray-900 dark:text-white">
              amount {cart.find((x)=> x.id === product.id)?.amount}
            </p>

            <button
              type="button"
              onClick={() =>
                dispatch(removeProductFromCart({ id: product.id, amount: 1 }))
              }
              className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
