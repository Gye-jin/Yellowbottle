import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import "../App.css";
import "swiper/css";
import { useState } from "react";

const slides = ["img/eco.png", "img/title2.png", "img/title3.png"];

export default function ScrollMain() {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  return (
    <div className="ScrollMain">
      <section className="slider">
        <div className="slider__flex">
          <div className="slider__images">
            <Swiper
              thumbs={{ swiper: imagesNavSlider }}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={32}
              mousewheel={true}
              navigation={{
                nextEl: ".slider__next",
                prevEl: ".slider__prev",
              }}
              breakpoints={{
                0: {
                  direction: "vertical",
                },
                700: {
                  direction: "vertical",
                },
              }}
              className="swiper-container2"
              modules={[Navigation, Thumbs, Mousewheel]}
            >
              {slides.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <img src={slide} alt="" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
