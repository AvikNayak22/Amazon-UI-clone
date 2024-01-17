// Import necessary components and functions from external libraries and modules
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ProductDetails } from "./";
import { INR_CURRENCY } from "../utils/constants";
import {
  removeFromCart,
  decrementInCart,
  incrementInCart,
} from "../redux/cartSlice";

// Define the Checkout component
const Checkout = () => {
  // Select relevant data from the Redux store using useSelector
  const products = useSelector((state) => state.cart.products);
  const itemsNumber = useSelector((state) => state.cart.productsNumber);
  const subtotal = useSelector((state) =>
    state.cart.products.reduce(
      (subtotal, product) => subtotal + product.price * product.quantity,
      0
    )
  );

  // Access the dispatch function from the Redux store
  const dispatch = useDispatch();

  // Render the Checkout component
  return (
    <div className="h-screen bg-amazonclone-background">
      <div className="min-w-[1000px] max-w-[1500px] m-auto pt-8">
        <div className="grid grid-cols-8 gap-10">
          {/* Products */}
          <div className="col-span-6 bg-white">
            <div className="text-2xl xl:text-3xl m-4">Shopping Cart</div>
            {/* Map through each product in the cart */}
            {products.map((product) => {
              return (
                <div key={product.id}>
                  <div className="grid grid-cols-12 divide-y divide-gray-400 mr-4">
                    <div className="col-span-10 grid grid-cols-8 divide-y divide-gray-400">
                      {/* Product image and details column */}
                      <div className="col-span-2">
                        {/* Link to the product details page */}
                        <Link to={`/product/${product.id}`}>
                          <img
                            className="p-4 m-auto"
                            src={product.image_small}
                            alt="Checkout product"
                          />
                        </Link>
                      </div>
                      <div className="col-span-6">
                        <div className="font-medium text-black mt-2">
                          {/* Link to the product details page */}
                          <Link to={`/product/${product.id}`}>
                            {/* Display product details without ratings */}
                            <ProductDetails product={product} ratings={false} />
                          </Link>
                        </div>
                        <div>
                          {/* Button to remove the product from the cart */}
                          <button
                            className="text-sm xl:text-base font-semibold rounded text-blue-500 mt-2 mb-1 cursor-pointer"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >
                            Delete
                          </button>
                        </div>
                        {/* Quantity control */}
                        <div className="grid grid-cols-3 w-20 text-center">
                          {/* Button to decrement product quantity */}
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(decrementInCart(product.id))
                            }
                          >
                            -
                          </div>
                          {/* Display the current quantity */}
                          <div className="text-lg xl:text-xl bg-gray-200">
                            {product.quantity}
                          </div>
                          {/* Button to increment product quantity */}
                          <div
                            className="text-xl xl:text-2xl bg-gray-400 rounded cursor-pointer"
                            onClick={() =>
                              dispatch(incrementInCart(product.id))
                            }
                          >
                            +
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Price column */}
                    <div className="col-span-2">
                      <div className="text-lg xl:text-xl mt-2 mr-4 font-semibold">
                        {/* Display product price in INR currency format */}
                        {INR_CURRENCY.format(product.price)}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* Display the subtotal of all products in the cart */}
            <div className="text-lg xl:text-xl text-right mb-4 mr-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {INR_CURRENCY.format(subtotal)}
              </span>
            </div>
          </div>
          {/* Checkout */}
          <div className="col-span-2 bg-white rounded h-[250px] p-7">
            <div className="text-xs xl:text-sm text-green-800 mb-2">
              Your order qualifies for{" "}
              <span className="font-bold">FREE DELIVERY</span>. Delivery Details
            </div>
            {/* Display the subtotal of all products in the cart */}
            <div className="text-base xl:text-lg mb-4">
              Subtotal ({itemsNumber} items):{" "}
              <span className="font-semibold">
                {INR_CURRENCY.format(subtotal)}
              </span>
            </div>
            {/* Button to proceed to checkout */}
            <button className="btn">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Checkout component for use in other parts of the application
export default Checkout;
