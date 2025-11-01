// // ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Carousel } from "antd";
import { StarFilled, StarOutlined, StarTwoTone } from "@ant-design/icons";
import { useCartStore } from "../store/cartStore";

// const ProductOverview = ({ product }) => {
//   const { id } = useParams(); // Get product ID from URL
//   const [product, setProduct] = useState(null);
//   const [productImages, setProductImages] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const addToCart = useCartStore((state) => state.addToCart);

//   useEffect(() => {
//     // Make GET request with Axios
//     axios
//       .get(`https://dummyjson.com/products/${id}`)
//       .then((response) => {
//         setProduct(response.data);
//         setProductImages(response.data.images);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setError(error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <Loader />;
//   if (error) return <p>Error occurred: {error.message}</p>;
//   console.log("Product Data:", product);

//   const roundedRating = Math.round(product.rating * 4) / 4;

//   const stars = [];

//   for (let i = 1; i <= 5; i++) {
//     if (i <= Math.floor(roundedRating)) {
//       // Full star
//       stars.push(<StarFilled key={i} style={{ color: "#faad14" }} />);
//     } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
//       // Half star - using StarTwoTone icon with 2 colors to simulate half star
//       stars.push(
//         <StarTwoTone
//           key={i}
//           twoToneColor="#faad14"
//           style={{ color: "#d9d9d9" }}
//         />
//       );
//     } else {
//       // Empty star
//       stars.push(<StarOutlined key={i} style={{ color: "#d9d9d9" }} />);
//     }
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 w-full  bg-white rounded-lg p-2 shadow-md">
//       <Carousel
//         autoplay
//         dotPosition="bottom"
//         effect="scrollx"
//         className="h-fit"
//       >
//         {productImages.map((image, index) => {
//           return (
//             <div key={index}>
//               <img
//                 key={index}
//                 src={image}
//                 alt={`${product.title} - ${index + 1}`}
//                 className="w-fit h-fit object-cover rounded-lg"
//               />
//             </div>
//           );
//         })}
//       </Carousel>
//       <div className="mt-14 w-fit md:w-[30vw]  ">
//         <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
//         <p className="text-gray-600 mb-2">
//           Available Status:{" "}
//           <span className="text-green-500"> {product.availabilityStatus}</span>
//         </p>
//         <p className="text-gray-700 mb-2">{product.description}</p>
//         <p className="text-xl font-semibold mb-1">${product.price} </p>
//         <span className="text-sm mr-15 mb-4">
//           Discount : {product.discountPercentage}%
//         </span>
//         <div className="flex space-x-1 text-xl mt-3">{stars}</div>
//         <div className="flex items-start justify-start mt-6">
//           <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"   onClick={() => addToCart(product)}>
//             Add to Cart
//           </button>
//           <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ml-4">
//             Buy Now
//           </button>
//         </div>
//         <p className="mt-4 text-sm">{product.shippingInformation}</p>
//         <p className="mt-1 text-sm">{product.returnPolicy}</p>
//       </div>
//     </div>
//   );
// };

// export default ProductOverview;

const ProductOverview = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`)
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
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error.message}</p>;

  const roundedRating = Math.round(product.rating * 4) / 4;

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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white rounded-lg shadow-md">
      {/* Product Carousel */}
      <Carousel autoplay dotPosition="bottom">
        {productImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`${product.title} - ${i + 1}`}
            className="w-full h-fit object-cover rounded-lg"
          />
        ))}
      </Carousel>

      {/* Product Info */}
      <div className="mt-14 w-fit md:w-[30vw]  ">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <p className="text-gray-600 mb-2">
          Available Status:{" "}
          <span className="text-green-500"> {product.availabilityStatus}</span>
        </p>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-xl font-semibold mb-1">${product.price} </p>
        <span className="text-sm mr-15 mb-4">
          Discount : {product.discountPercentage}%
        </span>
        <div className="flex space-x-1 text-xl mt-3">{stars}</div>
        <div className="flex items-start justify-start mt-6">
          <button
            className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <button className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ml-4">
            Buy Now
          </button>
        </div>
        <p className="mt-4 text-sm">{product.shippingInformation}</p>
        <p className="mt-1 text-sm">{product.returnPolicy}</p>
      </div>
    </div>
  );
};
export default ProductOverview;
