// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Carousel } from "antd";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";

const ProductOverviewFakeapi = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Make GET request with Axios
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setProductImages(response.data.images);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>Error occurred: {error.message}</p>;
  console.log("Product Data:", product);

  const roundedRating = Math.round(product.rating.rate * 4) / 4;

  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(roundedRating)) {
      // Full star
      stars.push(<StarFilled key={i} style={{ color: "#faad14" }} />);
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      // Half star - using StarTwoTone icon with 2 colors to simulate half star
      stars.push(
        <StarTwoTone
          key={i}
          twoToneColor="#faad14"
          style={{ color: "#d9d9d9" }}
        />
      );
    } else {
      // Empty star
      stars.push(<StarOutlined key={i} style={{ color: "#d9d9d9" }} />);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-6 w-full  bg-white rounded-lg p-3 shadow-md">
      <img
        src={product.image}
        alt={product.title}
        className="w-fit h-fit object-cover rounded-lg lg:ml-30"
      />
      <div className="mt-14 w-fit lg:w-[30vw] md:w-fit  ">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-xl font-semibold mb-1">${product.price} </p>

        <div className="flex space-x-1 text-xl mt-3">{stars}</div>
        <div className="flex items-start justify-start mt-6">
          <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
            Add to Cart
          </button>
          <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ml-4">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductOverviewFakeapi;
