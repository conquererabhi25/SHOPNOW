import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom"; // for home navigation
import Loader from "../components/Loader";

const MobileAndTablets = () => {
  const [category, setCategory] = useState("smartphones"); // default category
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // used to go to home page

  useEffect(() => {
    setLoading(true);
    setError(null);

    // API call based on selected category
    axios
      .get(`https://dummyjson.com/products/category/${category}`)
      .then((response) => {
        setData(response.data)
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false)
      });
  }, [category]); // refetch when category changes

  if (loading) return <Loader />;
  if (error) return <p className="p-6 text-red-500">Error: {error.message}</p>;

  return (
    <div className="bg-white rounded-md shadow-sm h-fit">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center rounded-md shadow-lg justify-start p-3 w-fit cursor-pointer text-gray-500 text-md mb-4">
          <h1 onClick={() => navigate("/")} className="hover:text-blue-600 text-xs md:text-sm">Home</h1>
          <IoIosArrowForward className="mx-1" />
          <h1
            onClick={() => setCategory("smartphones")}
            className={`hover:text-blue-600 text-xs md:text-sm ${category === "smartphones" ? "text-black font-semibold" : ""}`}
          >
            Mobile
          </h1>
          <IoIosArrowForward className="mx-1" />
          <h1
            onClick={() => setCategory("tablets")}
            className={`hover:text-blue-600  text-xs md:text-sm ${category === "tablets" ? "text-black font-semibold" : ""}`}
          >
            Tablets
          </h1>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {data?.products?.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} >
            <div key={product.id} className="group relative cursor-pointer">
              <img
                alt={product.title}
                src={product.images[0]}
                className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-60"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">{product.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileAndTablets;
