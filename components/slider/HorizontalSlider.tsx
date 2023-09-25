import { DiscussionObject } from "@/utils/interface";
import React, { useRef, useState, useEffect } from "react";

interface HorizontalSliderProps {
  items: DiscussionObject[];
  slideWidth: number;
  slideHeight: number;
  backgroundImage: string;
  backgroundSize: string;
  backgroundRepeat: string;
  backgroundPosition: string;
  slideDuration?: number;
  slideInterval?: number;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  slideWidth,
  slideHeight,
  backgroundImage,
  backgroundSize,
  backgroundRepeat,
  backgroundPosition,
  slideDuration = 500,
  slideInterval = 2000,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState(1); // 1 for forward, -1 for reverse

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= slideWidth;
    }
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += slideWidth;
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    let intervalId: NodeJS.Timeout | null = null;

    const startSliding = () => {
      intervalId = setInterval(() => {
        setScrollPosition((prevPosition) => {
          const newPosition = prevPosition + scrollDirection * slideWidth;

          if (
            slider &&
            newPosition >= slider.scrollWidth - slider.offsetWidth
          ) {
            setScrollDirection(-1);
          } else if (slider && newPosition <= 0) {
            setScrollDirection(1);
          }

          return newPosition;
        });
      }, slideInterval);
    };

    const stopSliding = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const handleMouseEnter = () => {
      stopSliding();
    };

    const handleMouseLeave = () => {
      startSliding();
    };

    if (slider) {
      slider.addEventListener("mouseenter", handleMouseEnter);
      slider.addEventListener("mouseleave", handleMouseLeave);

      startSliding();
    }

    return () => {
      stopSliding();
      if (slider) {
        slider.removeEventListener("mouseenter", handleMouseEnter);
        slider.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [slideInterval, slideWidth, scrollDirection]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [scrollPosition]);

  return (
    <>
      <div className="flex items-center">
        {/* <button
            className="mr-2 p-1 bg-black rounded-md text-xs text-white font-bold"
            onClick={handlePrev}
          >
            Previous
          </button> */}
        <div
          className="flex overflow-x-auto space-x-4 rounded-lg border shadow-lg"
          ref={sliderRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[200px] h-[200px] bg-blue-200 flex items-center justify-center px-2 cursor-pointer"
              style={{
                minWidth: slideWidth,
                minHeight: slideHeight,
                backgroundImage: backgroundImage,
                backgroundSize: backgroundSize,
                backgroundRepeat: backgroundRepeat,
                backgroundPosition: backgroundPosition,
              }}
            >
              <div className="flex flex-col bg-gray-400 p-2 rounded-lg shadow-lg items-center justify-center space-y-1">
                <span className="text-black text-xs font-bold text-center">
                  {item.title}
                </span>
                <span className="text-black text-xs font-medium text-center">
                  {item.content}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* <button
            className="ml-2 p-1 bg-black rounded-md text-xs text-white font-bold"
            onClick={handleNext}
          >
            Next
          </button> */}
      </div>
    </>
  );
};

export default HorizontalSlider;
