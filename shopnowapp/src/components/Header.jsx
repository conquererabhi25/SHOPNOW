import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { HiShoppingBag } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { FaFilterCircleDollar } from "react-icons/fa6";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";


import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";


const Header = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState(1000);
  const [starRating, setStarRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Total cart items from store
  const { cart } = useCartStore();

  const { user } = useUser();

  // Calculate total items count
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navigate = useNavigate();
  const location = useLocation(); // ✅ For getting current URL

  const [lastVisitedPage, setLastVisitedPage] = useState("/");

  // ✅ Store last visited page whenever route changes
  useEffect(() => {
    setLastVisitedPage(location.pathname + location.search);
  }, [location]);

  // ✅ Fetch available categories and brands
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(
          "https://dummyjson.com/products/categories"
        );
        const productRes = await axios.get(
          "https://dummyjson.com/products?limit=100"
        );
        const brandList = [
          ...new Set(productRes.data.products.map((p) => p.brand)),
        ];
        setCategories(catRes.data);
        setBrands(brandList);
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchData();
  }, []);

  // ✅ Handle Search and Filter Submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      // if search box is empty, go to last visited page
      navigate(lastVisitedPage);
    } else {
      navigate(
        `/search?query=${searchQuery}&price=${priceRange}&rating=${starRating}&brand=${selectedBrand}&category=${selectedCategory}`
      );
    }
  };

  // ✅ Auto return to last visited page when search is cleared manually
  useEffect(() => {
    if (searchQuery === "") {
      const timeout = setTimeout(() => {
        navigate(lastVisitedPage);
      }, 300); // small delay to avoid multiple redirects
      return () => clearTimeout(timeout);
    }
  }, [searchQuery, lastVisitedPage, navigate]);

  return (
    <div className="flex p-2 justify-between items-center bg-white w-screen h-[20vh] md:h-[15vh] shadow-md sticky top-0 z-50">
      <div className="flex flex-col w-full pt-1 md:pt-0">
        <div className="flex p-2 pt-1 pb-2 mx-[2vw] md:mx-[4vw] justify-between items-center gap-5 w-[95vw]">
          {/* Logo */}
          <div
            className="flex flex-col p-1 justify-center items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="flex items-center justify-center p-1 pb-0">
              <HiShoppingBag className="text-blue-500 mr-1 size-6 md:size-8" />
              <h1 className="text-blue-600 roboto font-bold text-[30px] md:text-[30px]">
                QS
              </h1>
            </div>
            <p className="text-gray-500 text-center font-semibold text-xs md:text-sm italic">
              Quality Store
            </p>
          </div>

          {/* Search + Filters For Medium and Large screens */}
          <form
            onSubmit={handleSearch}
            className="flex justify-center items-center hidden md:flex"
          >
            <div className="flex justify-start items-center rounded-lg bg-gray-200 p-1 mx-2 w-[40vw] h-10 relative">
              <button type="submit">
                <IoMdSearch
                  size={20}
                  className="mx-2 text-gray-500 cursor-pointer"
                />
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for Products, Brands, and More"
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Filters Dropdown */}
            <div
              className="relative ml-3"
              onMouseEnter={() => setShowFilter(true)}
              onMouseLeave={() => setShowFilter(false)}
            >
              <button
                type="button"
                className="flex px-2 py-2 gap-1 bg-blue-600 text-white rounded-md text-xs md:text-sm cursor-pointer"
              >
                <FaFilterCircleDollar size={20} />
                <p>Filters</p>
              </button>

              {showFilter && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50">
                  {/* Price Filter */}
                  <div className="mb-3">
                    <label
                      htmlFor="priceRange"
                      className="block text-sm font-semibold mb-1"
                    >
                      Price: Up to ₹{priceRange}
                    </label>
                    <input
                      type="range"
                      id="priceRange"
                      min="0"
                      max="2000"
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full"
                    />
                  </div>

                  {/* Brand Filter */}
                  <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">
                      Brand
                    </label>
                    <select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                      className="border border-gray-300 rounded w-full text-sm p-1"
                    >
                      <option value="">All</option>
                      {brands.map((b, i) => (
                        <option key={i} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category */}
                  <div className="mb-3">
                    <label className="block text-sm font-semibold mb-1">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="border border-gray-300 rounded w-full text-sm p-1"
                    >
                      <option value="">All</option>
                      {categories.map((category, i) => (
                        <option key={i} value={category}>
                          <p>{category.name}</p>
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Star Rating Filter */}
                  <div>
                    <label className="block text-sm font-semibold mb-1">
                      Star Rating
                    </label>
                    <div className="flex gap-1 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={18}
                          className={
                            starRating >= star
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                          onClick={() => setStarRating(star)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>

          {/* Login Button */}
          <div className="flex items-center justify-center gap-1 p-2">
            <Link to="/cart" className="relative">
              <FaCartShopping
                size={30}
                className="text-blue-600 cursor-pointer mr-3 "
                onClick={() => navigate("/cart")}
              />
              {/* Badge */}
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                  {totalItems}
                </span>
              )}
            </Link>
             <SignedOut>
              <SignInButton mode="modal">
                <button className="text-xs mx-2 md:text-sm bg-blue-600 px-2 py-2 md:mx-5 cursor-pointer rounded-md text-white w-20">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            {/* ✅ If Signed In — show User info */}
            <SignedIn>
              <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-md cursor-pointer shadow-sm ">
                <UserButton signOutRedirectUrl="/"  />
                <p className="text-xs font-medium text-gray-700">
                  {user?.firstName || user?.username || "User"}
                </p>
              </div>
            </SignedIn>
          </div>
        </div>
        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center block md:hidden mb-3"
        >
          <div className="flex justify-start items-center rounded-lg bg-gray-200 p-1 mx-2 w-[60vw] h-8 relative">
            <button type="submit">
              <IoMdSearch
                size={20}
                className="mx-2 text-gray-500 cursor-pointer"
              />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="bg-transparent outline-none text-xs w-full"
            />
          </div>

          {/* Filters Dropdown */}
          <div
            className="relative ml-3 "
            onMouseEnter={() => setShowFilter(true)}
            onMouseLeave={() => setShowFilter(false)}
          >
            <button
              type="button"
              className="flex px-3 mr-3 h-8 py-2 gap-1 bg-blue-600 text-white rounded-md text-xs md:text-sm cursor-pointer"
            >
              <FaFilterCircleDollar size={20} />
              <p>Filters</p>
            </button>

            {showFilter && (
              <div className="absolute top-15 right-5 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg p-4 z-50">
                {/* Price Filter */}
                <div className="mb-3">
                  <label
                    htmlFor="priceRange"
                    className="block text-sm font-semibold mb-1"
                  >
                    Price: Up to ₹{priceRange}
                  </label>
                  <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="2000"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Brand Filter */}
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">
                    Brand
                  </label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="border border-gray-300 rounded w-full text-sm p-1"
                  >
                    <option value="">All</option>
                    {brands.map((b, i) => (
                      <option key={i} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div className="mb-3">
                  <label className="block text-sm font-semibold mb-1">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border border-gray-300 rounded w-full text-sm p-1"
                  >
                    <option value="">All</option>
                    {categories.map((category, i) => (
                      <option key={i} value={category}>
                        <p>{category.name}</p>
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    Star Rating
                  </label>
                  <div className="flex gap-1 cursor-pointer">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={18}
                        className={
                          starRating >= star
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        onClick={() => setStarRating(star)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Header;




