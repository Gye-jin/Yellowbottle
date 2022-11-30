import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import "../App.css";
import "swiper/css";
// import "swiper/css/navigation";
import { useState } from "react";

const slides = [
  "https://picsum.photos/1920/1080",
  "https://picsum.photos/1920/1081",
  "https://picsum.photos/1920/1082",
  "https://picsum.photos/1920/1083",
  "https://picsum.photos/1920/1084"
];

export default function Scroll() {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  return (
    <div className="Scroll">
      <section className="slider">
        <div className="slider__flex">
          <div className="slider__col">
            <div className="slider__prev">Prev</div>

            <div className="slider__thumbs">
              <Swiper
                onSwiper={setImagesNavSlider}
                direction="vertical"
                spaceBetween={24}
                // slidesPerView={3}
                navigation={{
                  nextEl: ".slider__next",
                  prevEl: ".slider__prev"
                }}
                className="swiper-container1"
                breakpoints={{
                  0: {
                    direction: "vertical"
                  },
                  768: {
                    direction: "vertical"
                  }
                }}
                modules={[Navigation, Thumbs]}
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

            <div className="slider__next">Next</div>
          </div>

          <div className="slider__images">
            <Swiper
              thumbs={{ swiper: imagesNavSlider }}
              direction="vertical"
              slidesPerView={1}
              spaceBetween={32}
              mousewheel={true}
              navigation={{
                nextEl: ".slider__next",
                prevEl: ".slider__prev"
              }}
              breakpoints={{
                0: {
                  direction: "vertical"
                },
                768: {
                  direction: "vertical"
                }
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
