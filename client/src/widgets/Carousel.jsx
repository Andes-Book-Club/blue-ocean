import React, { useState, useEffect, useRef } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

const Carousel = ({ children, className }) => {
  const containerRef = useRef();

  const [prevDisable, setPrevDisable] = useState(true);
  const [nextDisable, setNextDisable] = useState(
    (containerRef && containerRef.offsetWidth >= containerRef.scrollWidth),
  );
  const [offsetWidthValue, setOffsetWidthValue] = useState(0);
  const [scrollWidthValue, setScrollWidthValue] = useState(0);

  function checkButtons() {
    const disablePrev = containerRef.current.scrollLeft <= 0;
    const disableNext = (containerRef.current.scrollLeft + offsetWidthValue) >= scrollWidthValue;
    setPrevDisable(disablePrev);
    setNextDisable(disableNext);
  }

  useEffect(() => {
    setOffsetWidthValue(containerRef.current.offsetWidth);
    setScrollWidthValue(containerRef.current.scrollWidth);
    checkButtons(offsetWidthValue, scrollWidthValue);
  }, [offsetWidthValue, children]);

  const updateScrollLeft = (isPositive) => {
    if (isPositive) {
      containerRef.current.scrollLeft += offsetWidthValue / 2;
    } else {
      containerRef.current.scrollLeft -= offsetWidthValue / 2;
    }
    setTimeout(() => {
      checkButtons(offsetWidthValue, scrollWidthValue);
    }, 500);
  };

  return (
    <div className={`slider-container ${className}`} ref={containerRef}>
      <div
        className={`slider-arrow slider-arrow-prev ${prevDisable ? 'slider-arrow slider-arrow-disable' : ''}`}
        disabled={prevDisable}
        onClick={() => {
          updateScrollLeft(false);
        }}
      >
        {prevDisable ? null : <MdKeyboardArrowLeft />}
      </div>

      <div className="slider-wrapper">{children}</div>

      <div
        className={`slider-arrow slider-arrow-next ${nextDisable ? 'slider-arrow slider-arrow-disable' : ''}`}
        disabled={nextDisable}
        onClick={() => {
          updateScrollLeft(true);
        }}
      >
        {nextDisable ? null : <MdKeyboardArrowRight />}
      </div>
    </div>
  );
};

export default Carousel;
