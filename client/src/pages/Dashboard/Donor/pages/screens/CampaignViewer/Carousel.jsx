import React from "react";
import { Carousel as Slider } from "react-responsive-carousel";

const Carousel = ({ images }) => {
  return (
    <div>
      <Slider
        infiniteLoop
        autoPlay
        swipeable={true}
        showStatus={false}
        showThumbs={false}
      >
        {images.map((image, index) => (
          <div className="" key={index}>
            <img
              className="w-full select-none object-cover object-center"
              src={image}
              alt=""
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
