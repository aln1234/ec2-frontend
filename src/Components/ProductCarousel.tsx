import React, { useCallback, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Box, Link, Typography } from "@mui/material";
import useAppSelector from "../hooks/useAppSelector";
import { categoriesFilter } from "../api/productFetch";
import useAppDispatch from "../hooks/useAppDispatch";

export default function ProductSlider() {
  const { products } = useAppSelector((state) => state.productReducer);
  const { priceRange } = useAppSelector((state) => state.productReducer);
  const dispatch = useAppDispatch();
  const categoriesFilterCallback = useCallback(() => {
    dispatch(
      categoriesFilter({
        offset: 0,
        limit: 20,
        priceRange,
        categoryId: "",
        searchText: "",
      })
    );
  }, [priceRange, dispatch]);

  useEffect(() => {
    categoriesFilterCallback();
  }, [categoriesFilterCallback]);

  const navigate = useNavigate();
  const handleNavigate = (id: number) => {
    return navigate(`/products/${id}`);
  };

  return (
    // Add the sx prop to the Box component
    <Box sx={{ maxWidth: "90%", margin: "auto" }}>
      <Typography variant="h4" sx={{ fontFamily: "roboto", marginTop: "4rem" }}>
        Newest Arrivals
      </Typography>
      <Box sx={{ marginTop: "4rem" }}>
        <Swiper
          slidesPerView={1}
          spaceBetween={4}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
        >
          {products.map((product) => (
            <SwiperSlide>
              <Box
                onClick={() => handleNavigate(product._id)}
                key={product._id}
                component="img"
                src={product.images[0]}
                alt="product image"
                sx={{
                  objectCover: "fit",
                  width: "20rem",
                  height: "50vh",
                  marginRight: "12rem",
                  cursor: "pointer",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
