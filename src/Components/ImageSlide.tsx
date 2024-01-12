import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

type PropTypes = {
  images: string[] | undefined;
};

export default function ImageSlide({ images }: PropTypes) {
  return (
    <div className="slide-container">
      <Fade>
        {images?.map((image) => (
          <div className="each-fade">
            <img
              src={image}
              width={600}
              height={500}
              style={{ objectFit: "contain" }}
              alt="product slider images"
            />
          </div>
        ))}
      </Fade>
    </div>
  );
}
