// Import necessary components and functions from external libraries and modules
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { ProductDetails } from "./";
import { INR_CURRENCY } from "../utils/constants";
import { callAPI } from "../utils/CallApi";
import { addToCart } from "../redux/cartSlice";

// Define the ProductPage component
const ProductPage = () => {
  // Extract the 'id' parameter from the URL using useParams hook
  const { id } = useParams();

  // State variables to store product details, selected quantity, and access the Redux dispatch function
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const dispatch = useDispatch();

  // Function to fetch product details from the API
  const getProduct = () => {
    callAPI(`data/products.json`).then((productResults) => {
      setProduct(productResults[id]);
    });
  };

  // Function to update the product quantity based on user selection
  const addQuantityToProduct = () => {
    setProduct((product) => ({ ...product, quantity: quantity }));
    return product;
  };

  // Fetch product details when the component mounts
  useEffect(() => {
    getProduct();
  }, []);

  // Display a loading message while product details are being fetched
  if (!product?.title) return <h1>Loading Product ...</h1>;

  // Render the ProductPage component
  return (
    product && (
      <div className="h-screen bg-amazonclone-background">
        <div className="min-w-[1000px] max-w-[1500px] m-auto p-4">
          <div className="grid grid-cols-10 gap-2">
            {/* Left column: Product image */}
            <div className="col-span-3 p-8 rounded bg-white m-auto">
              <img src={`${product.image}`} alt="Main product" />
            </div>
            {/* Middle column: Product details */}
            <div className="col-span-5 p-4 rounded bg-white divide-y divide-gray-400">
              <div className="mb-3">
                {/* Display product details and ratings */}
                <ProductDetails product={product} ratings={true} />
              </div>
              <div className="text-base xl:text-lg mt-3">
                {/* Display product description */}
                {product.description}
              </div>
            </div>
            {/* Right column: Price, Quantity, and Add to Cart */}
            <div className="col-span-2 p-4 rounded bg-white">
              {/* Display product price in INR currency format */}
              <div className="text-xl xl:text-2xl text-red-700 text-right font-semibold">
                {INR_CURRENCY.format(product.price)}
              </div>
              {/* Display discounted price with a strikethrough */}
              <div className="text-base xl:text-lg text-gray-500 text-right font-semibold">
                INR:{" "}
                <span className="line-through">
                  {INR_CURRENCY.format(product.oldPrice)}
                </span>
              </div>
              {/* Additional product information */}
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-3">
                FREE Returns
              </div>
              <div className="text-sm xl:text-base text-blue-500 font-semibold mt-1">
                FREE Delivery
              </div>
              <div className="text-base xl:text-lg text-green-700 font-semibold mt-1">
                In Stock
              </div>
              {/* Quantity selection dropdown */}
              <div className="text-base xl:text-lg mt-1">
                Quantity:
                <select
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 bg-white border rounded-md focus:border-indigo-600"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>
              {/* Button to add the product to the cart */}
              <Link to={"/checkout"}>
                <button
                  onClick={() => dispatch(addToCart(addQuantityToProduct()))}
                  className="btn"
                >
                  Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

// Export the ProductPage component for use in other parts of the application
export default ProductPage;

