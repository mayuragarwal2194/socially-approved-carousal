import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import VideoCard from "./VideoCard";

export default function VideoCarousel({ videos, onVideoClick }) {
  return (
    <section>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {videos.map((video, index) => (
          <SwiperSlide key={video.id}>
            <VideoCard video={video} onClick={() => onVideoClick(index)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}