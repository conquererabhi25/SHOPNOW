import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";
  const price = Number(queryParams.get("price")) || 0;
  const rating = Number(queryParams.get("rating")) || 0;
  const brand = queryParams.get("brand") || "";
  const category = queryParams.get("category") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `https://dummyjson.com/products/search?q=${query}`;
        const res = await axios.get(url);
        let filtered = res.data.products;

        // Apply filters
        if (price > 0) filtered = filtered.filter((item) => item.price <= price);
        if (rating > 0) filtered = filtered.filter((item) => item.rating >= rating);
        if (brand) filtered = filtered.filter((item) => item.brand.toLowerCase() === brand.toLowerCase());
        if (category) filtered = filtered.filter((item) => item.category.toLowerCase() === category.toLowerCase());

        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching search results:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query, price, rating, brand, category]);

  if (loading) return <Loader />;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for "{query || 'All Products'}"
      </h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} >
            <div
              key={product.id}
              className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-lg transition"
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-contain rounded-md"
              />
              <h3 className="font-semibold mt-2">{product.title}</h3>
              <p className="text-gray-500 text-sm">{product.brand}</p>
              <p className="text-blue-600 font-bold">₹{product.price}</p>
              <p className="text-yellow-500">⭐ {product.rating}</p>
            </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
