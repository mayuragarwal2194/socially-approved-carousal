import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import VideoCard from "./VideoCard";
import "./VideoCarousal.css";

export default function VideoCarousel({ videos, onVideoClick }) {
  return (
    <section className="video_carousal_section">
      {/* Outer Video carousel with responsive breakpoints */}
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        centeredSlides={true}
        slidesPerView={1.4}
        // Adjust visible cards based on screen size
        breakpoints={{
          480: {
            slidesPerView: 2,
            spaceBetween: 16,
            centeredSlides: false,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 18,
            centeredSlides: false,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
            centeredSlides: false,
          },
        }}
      >
        {/* Render each video as a carousel slide */}
        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <VideoCard video={video} onClick={() => onVideoClick(index)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
