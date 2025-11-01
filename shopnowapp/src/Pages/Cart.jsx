import React from "react";
import { useCartStore } from "../store/cartStore";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, increment, decrement, removeFromCart } = useCartStore();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

   const cart1 = useCartStore((state) => state.cart);

   const totalAmount = cart1.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log("Cart Items:", cart);

  return (
    <div className="min-h-screen bg-white p-6 md:p-12">
      <h1 className="text-2xl font-semibold text-black mb-6 text-start">
        Shopping Cart
      </h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col justify-center items-center gap-4 md:flex-row md:items-start">
          <div className="flex flex-col md:hidden p-12 rounded-lg justify-between items-start gap-3 md:gap-5 mx-3 border w-full md:w-[30vw] p-2 shadow-md pt-4">
            <h1 className="font-semibold text-md text-start">Order Summary</h1>
            <li className="flex items-center justify-between p-1 w-full border-b">
              <h3 className="text-sm text-gray-600">Subtotal</h3>
              <h3 className="text-sm text-gray-600">
                ${totalPrice.toFixed(2)}
              </h3>
            </li>
            <li className="flex items-center justify-between p-1 w-full  border-b">
              <h3 className="text-sm text-gray-600">Shipping estimate</h3>
              <h3 className="text-sm text-gray-600">$5.00</h3>
            </li>
            <li className="flex items-center justify-between p-1 w-full  border-b">
              <h3 className="text-sm text-gray-600">Tax estimate</h3>
              <h3 className="text-sm text-gray-600">$8.32</h3>
            </li>
            <li className="flex items-center justify-between p-1 w-full">
              <h3 className="text-md font-semibold text-black">Order Total</h3>
              <h3 className="text-md font-semibold text-black">
                ${(totalPrice + 5.0 + 8.32).toFixed(2)}
              </h3>
            </li>
            <div className="w-full mt-2 p-1 w-[20vw] flex justify-center items-center">
               <Link to="/checkout" state={{ amount: totalAmount }}>
              <button className="bg-blue-500 py-2 px-3 text-center text-white text-sm rounded-full cursor-pointer">Proceed to Buy</button>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between w-full md:w-fit mx-auto border rounded-lg p-6 shadow-md">
            {cart?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col w-full justify-between  shadow-md p-4 items-start border py-4"
              >
                <div className="flex flex-col items-start justify-between gap-4 w-full md:w-[50vw]">
                  <div className="flex p-1 gap-5 items-start">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="h-20 w-20 md:w-40 md:h-40 object-cover rounded-md"
                    />
                    <div>
                      <h2 className="text-black font-medium">{item.title}</h2>
                      <p className="text-gray-500 text-sm">
                        ${item.price.toFixed(2)} each
                      </p>
                      <button className="text-xs px-2 text-red-300 border border-2 border-red-300 cursor-pointer mt-3 rounded-full hover:text-red-500 hover:border-red-500"  onClick={() => removeFromCart(item.id)}>
                        remove
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between w-full items-start gap-3 mt-3 mx-3 sm:mt-0 w-fit">
                    <div className="flex items-start w-fit gap-3">
                      <button
                        onClick={() => decrement(item.id)}
                        className="p-2 border rounded-lg cursor-pointer hover:border-red-500"
                      >
                        <AiOutlineMinus className="size-2" />
                      </button>
                      <span className="text-black font-medium text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increment(item.id)}
                        className="p-2 border rounded-lg cursor-pointer hover:border-blue-500"
                      >
                        <AiOutlinePlus className="size-2 " />
                      </button>
                    </div>
                    <p className="text-black sm:mt-0 font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col hidden md:block  p-12 rounded-lg justify-between items-center  gap-8 mx-3 border w-[30vw] p-2 shadow-md pt-4">
            <h1 className="font-semibold text-md text-start">Order Summary</h1>
            <li className="flex items-center justify-between mt-2 p-1 w-full border-b">
              <h3 className="text-sm text-gray-600">Subtotal</h3>
              <h3 className="text-sm text-gray-600">
                ${totalPrice.toFixed(2)}
              </h3>
            </li>
            <li className="flex items-center justify-between mt-2 p-1 w-full  border-b">
              <h3 className="text-sm text-gray-600">Shipping estimate</h3>
              <h3 className="text-sm text-gray-600">$5.00</h3>
            </li>
            <li className="flex items-center justify-between mt-2 p-1 w-full  border-b">
              <h3 className="text-sm text-gray-600">Tax estimate</h3>
              <h3 className="text-sm text-gray-600">$8.32</h3>
            </li>
            <li className="flex items-center justify-between mt-2 p-1 w-full">
              <h3 className="text-md font-semibold text-black">Order Total</h3>
              <h3 className="text-md font-semibold text-black">
                ${(totalPrice + 5.0 + 8.32).toFixed(2)}
              </h3>
            </li>
            <div className="w-full mt-2 p-1 w-[20vw] flex justify-center items-center">
              <Link to="/checkout" state={{ amount: totalAmount }}>
              <button className="bg-blue-500 py-1 px-3 text-center text-white text-sm rounded-full cursor-pointer hover:bg-blue-800">Proceed to Buy</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
