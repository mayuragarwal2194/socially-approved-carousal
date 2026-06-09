import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ModalVideoCard from "./ModalVideoCard";

export default function VideoModal({ videos, selectedVideoIndex, onClose }) {
  // Stores Swiper instance so we can control slides programmatically
  const swiperRef = useRef(null);

  // Controls visibility of navigation arrows
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);

  // Tracks currently active slide
  const [activeIndex, setActiveIndex] = useState(selectedVideoIndex);

  // Close modal when user presses ESC key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup listener when modal unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 px-4"
    >
      <button
        onClick={onClose}
        className="absolute right-[10%] top-12 text-3xl text-white cursor-pointer"
        aria-label="Close modal"
      >
        <i className="ri-close-line"></i>
      </button>

      <button
        onClick={(event) => event.stopPropagation()}
        className={`modal-prev-btn absolute left-[16%] top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-black cursor-pointer transition-opacity duration-300 ${
          isBeginning ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <i className="ri-arrow-left-s-line"></i>
      </button>

      <button
        onClick={(event) => event.stopPropagation()}
        className={`modal-next-btn absolute right-[16%] top-1/2 z-50 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white text-2xl text-black cursor-pointer transition-opacity duration-300 ${
          isEnd ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <i className="ri-arrow-right-s-line"></i>
      </button>

      {/* Modal carousel */}
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-5xl"
      >
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".modal-prev-btn",
            nextEl: ".modal-next-btn",
          }}
          initialSlide={selectedVideoIndex}
          centeredSlides={true}
          slidesPerView={1.6}
          breakpoints={{
            768: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
          }}
          spaceBetween={0}
          onSwiper={(swiper) => {
            // Save swiper instance for external control
            swiperRef.current = swiper;

            // Initialize navigation states
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            // Update active video slide
            setActiveIndex(swiper.activeIndex);

            // Update navigation arrow visibility
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {videos.map((video, index) => (
            // Render each video as a swiper slide
            <SwiperSlide key={video.id}>
              <ModalVideoCard
                video={video}
                isActive={index === activeIndex}
                onCardClick={() => swiperRef.current?.slideTo(index)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
