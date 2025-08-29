import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {underline} from "../../public/assets"
import { testimonials } from "../constants/index";
import Heading from "./Heading";

const TestimonialCarousel = () => {
 const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: () => (
        <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mx-2 my-6" />
    ),
    appendDots: dots => (
        <div className="justify-center py-2">
            <ul>{dots}</ul>
        </div>
    ),
    responsive: [
        {
            breakpoint: 1024,
            settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true }
        },
        {
            breakpoint: 640,
            settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true, dots: true }
        }
    ]
};

  return (
    <div className="w-full overflow-hidden p-5 mb-7 bg-[url('../../public/assets/carousel_bg.jpg')]">
       <div className="relative mt-9">
           <Heading title="What Our Clients Are Saying" img={underline} />
       </div>
      <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
              <div key={index} className="px-4 flex justify-center">
                  <div className="bg-black/70 backdrop-blur-md rounded-xl p-6 text-center min-h-[300px] text-white">
                    <div className="mx-auto mb-4 w-20 h-20 overflow-hidden rounded-full">
                      <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                    <h3 className="mt-4">{testimonial.name}</h3>
                    <h4 className="text-orange-500 mb-4">{testimonial.title}</h4>
                    <p>{testimonial.message}</p>
                    <div className="mt-4">
                          {Array(testimonial.rating).fill().map((_, i) => (
                              <span key={i}>⭐</span>
                          ))}
                    </div>
                  </div>
              </div>
          ))}
      </Slider>
    </div>
  );
};

export default TestimonialCarousel;
