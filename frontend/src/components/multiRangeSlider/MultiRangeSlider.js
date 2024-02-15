import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./multiRangeSlider.css";

const MultiRangeSlider = ({
  minLimit,
  maxLimit,
  label,
  name,
  minVal,
  maxVal,
  handleChange,
}) => {
  const minValRef = useRef(minLimit);
  const maxValRef = useRef(maxLimit);
  const range = useRef(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - minLimit) / (maxLimit - minLimit)) * 100),
    [minLimit, maxLimit]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (minVal < minLimit) {
      handleChange({ target: { name: name + ".min", value: minLimit } });
    }
    if (maxVal > maxLimit) {
      handleChange({ target: { name: name + ".max", value: maxLimit } });
    }
    if (minVal > maxVal || maxVal < minVal) {
      handleChange({ target: { name: name + ".min", value: maxVal } });
      handleChange({ target: { name: name + ".max", value: minVal } });
    }

    const minPercent = getPercent(minVal < minLimit ? minLimit : minVal);
    const maxPercent = getPercent(maxVal > maxLimit ? maxLimit : maxVal);
    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, maxVal, getPercent, minLimit, maxLimit]);

  return (
    <div className="container flex flex-col gap-4">
      <div>{label}</div>
      <div>
        <div className="">
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            name={name + ".min"}
            value={minVal}
            onChange={handleChange}
            className="thumb thumb--left"
            style={{ zIndex: minVal > maxVal - 100 && "5" }}
          />
          <input
            type="range"
            min={minLimit}
            max={maxLimit}
            name={name + ".max"}
            value={maxVal}
            onChange={handleChange}
            className="thumb thumb--right"
          />
        </div>
        <div className="slider">
          <div className="slider__track" />
          <div ref={range} className="slider__range" />
          <div className="slider__left-value">{minVal}</div>
          <div className="slider__right-value">{maxVal}</div>
        </div>
      </div>
    </div>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default MultiRangeSlider;
