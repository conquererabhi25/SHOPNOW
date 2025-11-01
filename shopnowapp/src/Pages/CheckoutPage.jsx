import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useCartStore } from "../store/cartStore";
import "react-toastify/dist/ReactToastify.css";

const CheckoutPage = () => {
  const [step, setStep] = useState(1); // 1 = Address, 2 = Payment
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Receive productId from navigation (if passed from Cart)
  const { productId } = location.state || {};

  // ✅ Function to remove one item from cart
  const removeFromCart = (productId) => {
    if (!productId) return;
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedCart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle address form submit
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      toast.error("Please fill all address fields");
      return;
    }
    setStep(2);
  };

  // Handle payment submit
  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    toast.success("Payment successful! Expect Order Within 3-5 days.");

    // ✅ Remove ordered item from cart after payment
    removeFromCart(productId);

    // Redirect to home after 2s
    setTimeout(() => navigate("/"), 2000);
  };

 const {clearCart} = useCartStore();


  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center p-6">
      <ToastContainer />
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Checkout</h1>

      {/* Step 1: Address Form */}
      {step === 1 && (
        <form
          onSubmit={handleAddressSubmit}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border"
        >
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            value={address.name}
            onChange={(e) => setAddress({ ...address, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            value={address.phone}
            onChange={(e) => setAddress({ ...address, phone: e.target.value })}
          />
          <textarea
            placeholder="Full Address"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            rows="3"
            value={address.address}
            onChange={(e) =>
              setAddress({ ...address, address: e.target.value })
            }
          ></textarea>
          <input
            type="text"
            placeholder="City"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <input
            type="text"
            placeholder="Pincode"
            className="w-full p-2 border rounded mb-3 text-gray-700"
            value={address.pincode}
            onChange={(e) =>
              setAddress({ ...address, pincode: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Continue to Payment
          </button>
        </form>
      )}

      {/* Step 2: Payment Form */}
      {step === 2 && (
        <form
          onSubmit={handlePaymentSubmit}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-6 border"
        >
          <h2 className="text-xl font-semibold mb-4">Select Payment Method</h2>

          <div className="flex flex-col space-y-3 text-gray-700">
            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="PhonePe"
                checked={paymentMethod === "PhonePe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              PhonePe / Paytm / Any UPI App
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="NetBanking"
                checked={paymentMethod === "NetBanking"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Net Banking
            </label>

            <label className="flex items-center">
              <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-2"
              />
              Cash on Delivery
            </label>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              onClick={()=>{clearCart()}}
            >
              Continue
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CheckoutPage;


