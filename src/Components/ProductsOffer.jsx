import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';
import video3 from '../assets/video3.mp4';
import video4 from '../assets/video4.mp4';
import video5 from '../assets/video5.mp4';
import video6 from '../assets/video6.mp4';
import video7 from '../assets/video7.mp4';
import video8 from '../assets/video8.mp4';
import video9 from '../assets/video9.mp4';


const ProductsOffer = () => {
  const sliderRef = useRef();
  const [currentSlidePlay, setCurrentSlidePlay] = useState(0)

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "grey", WebkitBorderRadius: "50%", height: '50px', width: '50px', alignItems: "center", display: 'flex', justifyContent: 'center' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, background: "grey", WebkitBorderRadius: "50%", height: '50px', width: '50px', alignItems: "center", display: 'flex', justifyContent: 'center', zIndex: "2" }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    //speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    //autoplay: true,
    afterChange: current => {
      sliderRef.current.slickPlay();
    },
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };

  const handleVideoEnded = () => {
    sliderRef.current.slickNext();
  };

  const videos = [video1, video2, video3, video4, video5, video6, video7, video8, video9]; 

  return (
    <div className="w-full bg-blue-300 min-h-screen h-auto">
      <h2 className="text-3xl font-bold text-center mb-6">TikTok Videos</h2>
      <Slider ref={sliderRef} {...settings} className="slick-slider">
        {videos.map((video, index) => (
          <div key={index} className={`relative mb-4 p-1 ${index !== 1 ? 'hidden md:block' : ''}`}>
            <div className="rounded-lg overflow-hidden shadow-lg flex justify-center">
              <video
                width="100%"
                height="auto" 
                className="w-full"
                style={{ maxWidth: '300px' }} 
                loop
                autoPlay={true}
                muted
                onEnded={handleVideoEnded}
              >
                <source src={video} type="video/mp4" />
              </video>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductsOffer;
