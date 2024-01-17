// Import necessary components and functions from external libraries and modules
import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProductDetails } from "./";
import { callAPI } from "../utils/CallApi";
import { INR_CURRENCY } from "../utils/constants";

// Define the SearchResults component
const SearchResults = () => {
  // Extract search parameters from the current URL
  const [searchParams] = useSearchParams();

  // State variable to store the search results
  const [products, setProducts] = useState(null);

  // Function to fetch search results based on search parameters
  const getSearchResults = () => {
    // Get search term and category from the URL search parameters
    const searchTerm = searchParams.get("searchTerm");
    const category = searchParams.get("category");

    // Call an API to get search results (for demonstration purposes, using a local JSON file)
    callAPI(`data/search.json`).then((searchResults) => {
      // Retrieve results for the specified category
      const categoryResults = searchResults[category];

      // Filter results based on the search term (case-insensitive)
      if (searchTerm) {
        const results = categoryResults.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setProducts(results);
      } else {
        // If no search term, display all products in the category
        setProducts(categoryResults);
      }
    });
  };

  // Fetch search results when the component mounts or when search parameters change
  useEffect(() => {
    getSearchResults();
  }, [searchParams]);

  // Render the SearchResults component
  return (
    <div className="min-w-[1200px] max-w-[1300px] m-auto pt-4">
      {products &&
        // Map through each product and render a link to its details page
        products.map((product, key) => {
          return (
            <Link key={key} to={`/product/${product.id}`}>
              <div className="h-[250px] grid grid-cols-12 rounded mt-1 mb-1 ">
                {/* Product image column */}
                <div className="col-span-2 p-4 bg-gray-200">
                  <img
                    className="m-auto"
                    src={product.image_small}
                    alt="Search result product"
                  />
                </div>
                {/* Product details column */}
                <div className="col-span-10 bg-gray-50 border border-gray-100 hover:bg-gray-100 ">
                  <div className="font-medium text-black p-2">
                    {/* Display product details and ratings */}
                    <ProductDetails product={product} ratings={true} />
                    <div className="text-xl xl:text-2xl pt-1">
                      {/* Display product price in INR currency format */}
                      {INR_CURRENCY.format(product.price)}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

// Export the SearchResults component for use in other parts of the application
export default SearchResults;

