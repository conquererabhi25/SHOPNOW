import React, { useState, useEffect } from "react";
import Mobile from "../../public/productCategories/smartphones.jpg";
import TvandAppliabces from "../../public/productCategories/tvandappliances.jpg";
import Fashion from "../../public/productCategories/fashion.jpg";
import Electronics from "../../public/productCategories/electronics.jpg";
import HomeandFurniture from "../../public/productCategories/furniture.jpg";
import BeautyAndFood from "../../public/productCategories/beautyandfood.jpg";
import AdBanner from "../../public/ihponebannerimage.png";
import AdBaner1 from "../../public/furniture.png";
import TrendingProducts from "../components/TrendingProducts";
import OfferProducts from "../components/productswithoffer";
import Adbaner3 from "../../public/familyshopping.png";
import Grocery from "../../public/Grocery.jpg";
import { useNavigate } from "react-router-dom";

const images = [AdBaner1, AdBanner, Adbaner3];

const HomePage = () => {
  const [current, setCurrent] = useState(0);
  const length = images.length;
  const navigate = useNavigate();

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, [length]);

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };
  return (
    <div className="flex flex-col items-center justify-center p-2 mt-2">
      {/* categories */}
      <div className="grid grid-cols-6 gap-2  md:grid-cols-6 md:gap-4 cursor-pointer bg-white p-2 rounded-md shadow-sm w-full">
        <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/mobileandtablets")}
        >
          <img
            src={Mobile}
            alt="Mobile and Tablets"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">
            Mobile & Tablets
          </p>
        </div>
       
        <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/furniture")}
        >
          <img
            src={HomeandFurniture}
            alt="HomeandFurniture"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">Furniture</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/grocery")}
        >
          <img
            src={Grocery}
            alt="Grocery"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">Grocery</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/beauty")}
        >
          <img
            src={BeautyAndFood}
            alt="BeautyAndFood"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">Beauty & Food</p>
        </div>
         <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/fashion")}
        >
          <img
            src={Fashion}
            alt="fashion"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">Fashion</p>
        </div>
        <div
          className="flex flex-col items-center justify-center p-1 rounded-md"
          onClick={() => navigate("/electronics")}
        >
          <img
            src={Electronics}
            alt="electonics"
            className="w-10 h-10 md:w-24 md:h-24 object-contain"
          />
          <p className="md:font-semibold text-xs md:text-md">Electronics</p>
        </div>
      </div>

      <div className="p-2 bg-white m-3 h-fit relative rounded-md shadow-sm w-full overflow-hidden">
        {/* Images */}
        <div className="overflow-hidden rounded-lg">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`slide-${idx}`}
              className={`w-[100vw] h-64 md:h-[40vh] lg:h-[93vh] object-contain md:object-cover transition-all duration-700 ${
                idx === current ? "block" : "hidden"
              }`}
            />
          ))}
        </div>
      </div>

      {/* trending products */}
      <div className="w-full mt-4">
        <TrendingProducts />
      </div>

      {/* Offer Products */}

      <div className="w-full mt-4">
        <OfferProducts />
      </div>
    </div>
  );
};

export default HomePage;
