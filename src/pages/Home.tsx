import React, { useEffect, useState } from "react";
import Hero from "../Components/Hero";
import LatestTrends from "../Components/LatestTrends";
import ProductSlider from "../Components/ProductCarousel";
import { boolean } from "yup";
import Loader from "../Components/Loader";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
    }, 800);
  });
  return (
    <>
      {!loading && <Loader />}
      <Hero />
      <ProductSlider />
      <LatestTrends />
    </>
  );
};

export default Home;
