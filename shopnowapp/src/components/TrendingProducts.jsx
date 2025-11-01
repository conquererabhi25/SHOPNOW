import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import {Link} from 'react-router-dom';


const TrendingProducts = () => {
     const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);
    
       useEffect(() => {
        // Make GET request with Axios
        axios.get("https://dummyjson.com/products/category/furniture")
          .then((response) => {
            
            setData(response.data);
    
            console.log("Fetched data:", response.data);
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

      
    return(
       <div className="bg-white rounded-md shadow-sm h-fit">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Top Deals</h2>

        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
          {data.products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} >
            <div key={product.id} className="group relative cursor-pointer">
              <img
                alt={product.imageAlt}
                src={product.images[1]}
                className="aspect-square w-full rounded-md bg-gray-200 object-contain group-hover:opacity-75 lg:aspect-auto lg:h-60"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    )
}

export default TrendingProducts