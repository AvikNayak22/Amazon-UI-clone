// Import necessary components and functions from external libraries and modules
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useNavigate, createSearchParams } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// Define the CarouselCategory component
const CarouselCategory = () => {
  // Access the navigate function from react-router-dom for navigation
  const navigate = useNavigate();

  // Function to navigate to the search page with specified category
  const searchCategory = (category) => {
    navigate({
      pathname: "search",
      search: `${createSearchParams({
        category: `${category}`,
        searchTerm: ``,
      })}`,
    });
  };

  // Render the CarouselCategory component
  return (
    <div className="bg-white m-3 p-4">
      <div className="text-2xl font-semibold mb-2">Shop by Category</div>
      {/* Swiper component for category carousel */}
      <Swiper
        slidesPerView={5}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
      >
        {/* Individual slides for each category with a clickable image */}
        <SwiperSlide
          onClick={() => searchCategory("Deals")}
          className="cursor-pointer"
        >
          <img src={"../images/category_0.jpg"} alt="" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Amazon")}
          className="cursor-pointer"
        >
          <img src={"../images/category_1.jpg"} alt="" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Fashion")}
          className="cursor-pointer"
        >
          <img src={"../images/category_2.jpg"} alt="" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Computers")}
          className="cursor-pointer"
        >
          <img src={"../images/category_3.jpg"} alt="" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Home")}
          className="cursor-pointer"
        >
          <img src={"../images/category_4.jpg"} alt="" />
        </SwiperSlide>
        <SwiperSlide
          onClick={() => searchCategory("Mobiles")}
          className="cursor-pointer"
        >
          <img src={"../images/category_5.jpg"} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

// Export the CarouselCategory component for use in other parts of the application
export default CarouselCategory;

