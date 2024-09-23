import { useState, useEffect, useRef } from "react";

const HeaderSlider = () => {
  const data = [
    {
      city: "buenos aires",
      image: "../assets/cities/buenos-aires.jpg",
    },

    {
      city: "london",
      image: "../assets/cities/london.jpg",
    },

    {
      city: "berlin",
      image: "../assets/cities/berlin.jpg",
    },

    {
      city: "paris",
      image: "../assets/cities/paris.jpg",
    },
  ];

  const sliderListRef = useRef();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const timeOutIndex = setTimeout(() => {
    currentImgIndex < data.length - 1
      ? setCurrentImgIndex(currentImgIndex + 1)
      : setCurrentImgIndex(0);
  }, 6000);

  useEffect(() => {
    const nodesList = sliderListRef.current;

    const nodeImg = nodesList.querySelectorAll("li")[currentImgIndex];

    if (nodeImg) {
      nodeImg.classList.add("slider-item-active");
    }

    if (data.length) timeOutIndex;

    if (currentImgIndex > data.length - 1) {
      nodeImg.classList.contains("slider-item-active")
        ? nodeImg.classList.remove("slider-item-active")
        : nodeImg.classList.add("slider-item-active");
    }

    return () => {
      clearTimeout(timeOutIndex);
      nodeImg.classList.remove("slider-item-active");
    };
  }, [currentImgIndex]);

  return (
    <ul className='slider-list reset-list' ref={sliderListRef}>
      {/*   <img
        className='slide'
        style={{
          position: "absolute",
          top: "0",
          opacity: "0.5",
          height: "100%",
          width: "100%",
          objectFit: "cover",
          overflow: "hidden",
         mixBlendMode: "darken", 
        }}
        src={data[2].image}
        alt='Image'
      /> */}
      {data.map((item, index) => (
        <li key={index} className='slider-item'>
          <img src={item.image} alt='Image' />
        </li>
      ))}
    </ul>
  );
};

export default HeaderSlider;
