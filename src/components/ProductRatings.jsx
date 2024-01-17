// Import necessary components from the Heroicons library
import { StarIcon } from "@heroicons/react/24/outline";

// Define the ProductRatings component
const ProductRatings = (props) => {
  // Extract average rating and total number of ratings from props
  const starNumber = props.avgRating;
  const ratingNumber = props.ratings;

  // Render the ProductRatings component
  return (
    <div className="flex">
      {/* Display filled star icons based on the average rating */}
      {Array.from({ length: starNumber }, (_, i) => (
        <StarIcon
          key={i}
          className="stroke-[#F1B61F] fill-[#F1B61F] h-[20px]"
        />
      ))}
      {/* Display empty star icons for the remaining stars */}
      {Array.from({ length: 5 - starNumber }, (_, i) => (
        <StarIcon key={i} className="stroke-[#F1B61F] h-[20px]" />
      ))}
      {/* Display the total number of ratings */}
      <span className="ml-3 text-blue-500">{ratingNumber} ratings</span>
    </div>
  );
};

// Export the ProductRatings component for use in other parts of the application
export default ProductRatings;

