// components/Slider.tsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types/types";

interface SliderProps {
  images: Product[];
}

const Slider: React.FC<SliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <button
          className="btn btn-circle btn-outline absolute left-2 z-10"
          onClick={prevSlide}
        >
          &#10094;
        </button>

        <div className="flex justify-start items-start gap-5">
          {images.map((image, index) => {
            const isActive = index === currentIndex;

            return (
              <div
                key={image.id}
                className={`transition-transform duration-300 ease-in-out `}
                style={{
                  opacity: isActive ? 1 : 0.5,
                  display:
                    index === currentIndex ||
                    (index === (currentIndex + 1) % images.length && !isMobile)
                      ? "block"
                      : "none",
                }}
              >
                <div
                  className={`card relative ${
                    isActive ? "w-80 h-96" : "w-80 h-72"
                  } `}
                  style={{
                    backgroundImage: `url('${image.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {index === currentIndex ? (
                    <div className="absolute bottom-5 left-5 w-2/3 flex items-end">
                      <div className="bg-slate-200 rounded-sm opacity-70 truncate p-2  card-body  h-auto  bg-transparent">
                        <h2>{image.name}</h2>
                        <h2 className="card-title">{image.description}</h2>
                      </div>
                      <button className="btn btn-sm btn-warning ">
                        <Image
                          src="/icon/Right.png"
                          alt="Next.js search"
                          width={20}
                          height={20}
                          priority
                        />
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
        <button
          className="btn btn-circle btn-outline absolute right-2 z-10"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Slider;
