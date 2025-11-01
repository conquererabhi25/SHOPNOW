// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import HomePage from "./Pages/HomePage";
// import CartPage from "./Pages/cart";
// import NotFoundPage from "./Pages/NotFoundPage";
// import Header from "./components/header";
// import Footer from "./components/footer";
// import Mobileandtablets from "./Pages/Mobileandtablets";
// import Fashion from "./Pages/Fashion";
// import Electonics from "./Pages/Electronics";
// import Furniture from "./Pages/Furniture";
// import Beauty from "./Pages/Beauty";
// import Grocery from "./Pages/Grocery";
// import ProductOverview from "./Pages/ProductOverview";
// import ProductOverview1 from "./Pages/ProductOverviewFakeapi";
// import SearchResults from "./pages/SearchResults";
// import Cart from "./Pages/Cart";
// import CheckoutPage from "./Pages/checkoutpage";
// import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

// const App = () => {
//   return (
//     <div
//       className="bg-gray-100 bg-no-repeat bg-cover overflow-x-hidden"
//       style={{
//         backgroundImage: `url('/backgroundimge.png')`,
//         height: "fit-content",
//         objectFit: "cover",
//       }}
//     >
//       <Router>
//         <Header />
//         <Routes>
//           <Route exact path="/" element={<HomePage />} />
//           <Route path="/mobileandtablets" element={<Mobileandtablets />} />
//           <Route path="/fashion" element={<Fashion />} />
//           <Route path="/electronics" element={<Electonics />} />
//           <Route path="/furniture" element={<Furniture />} />
//           <Route path="/grocery" element={<Grocery />} />
//           <Route path="/beauty" element={<Beauty />} />
//           <Route path="/cart" element={<CartPage />} />
//           <Route path="/product/:id" element={<ProductOverview />} />
//           <Route path="/productfakeapi/:id" element={<ProductOverview1 />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/search" element={<SearchResults />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="*" element={<NotFoundPage />} />
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// };

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CartPage from "./Pages/cart";
import NotFoundPage from "./Pages/NotFoundPage";
import Header from "./components/header";
import Footer from "./components/footer";
import Mobileandtablets from "./Pages/Mobileandtablets";
import Fashion from "./Pages/Fashion";
import Electonics from "./Pages/Electronics";
import Furniture from "./Pages/Furniture";
import Beauty from "./Pages/Beauty";
import Grocery from "./Pages/Grocery";
import ProductOverview from "./Pages/ProductOverview";
import ProductOverview1 from "./Pages/ProductOverviewFakeapi";
import SearchResults from "./Pages/SearchResults";
import Cart from "./Pages/Cart";
import CheckoutPage from "./Pages/CheckoutPage";
import { SignIn, SignUp, SignedIn, SignedOut, RedirectToSignIn, UserButton } from "@clerk/clerk-react";

// 👇 Optional: Simple SignIn and SignUp Pages
const SignInPage = () => (
  <div className="flex justify-center items-center h-screen">
    <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
  </div>
);

const SignUpPage = () => (
  <div className="flex justify-center items-center h-screen">
    <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
  </div>
);

const App = () => {
  return (
    <div
      className="bg-gray-100 bg-no-repeat bg-cover overflow-x-hidden"
      style={{
        backgroundImage: `url('/backgroundimge.png')`,
        height: "fit-content",
        objectFit: "cover",
      }}
    >
      <Router>
        {/* Header always visible */}
        <Header />

        {/* Main Routes */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/mobileandtablets" element={<Mobileandtablets />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/electronics" element={<Electonics />} />
          <Route path="/furniture" element={<Furniture />} />
          <Route path="/grocery" element={<Grocery />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/productfakeapi/:id" element={<ProductOverview1 />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchResults />} />

          {/* Protected Checkout Route */}
          <Route
            path="/checkout"
            element={
              <>
                <SignedIn>
                  <CheckoutPage />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />

          {/* Auth Pages */}
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Footer always visible */}
        <Footer />
      </Router>
    </div>
  );
};

export default App;
