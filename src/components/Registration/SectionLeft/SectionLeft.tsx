import React, { useState } from "react";
import "../../../styles/Registration/SectionLeft/SectionLeft.scss";
import logo from "./images/logo.svg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderReact from "react-slick";

interface SliderImage {
  id: number;
  imageURL: string;
  descption: string;
}

const SectionLeft = () => {
  const items: SliderImage[] = [
    {
      id: 1,
      imageURL:
        "https://images.pexels.com/photos/127905/pexels-photo-127905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      descption:
        "At BTRS, we believe that travel is a bridge between cultures. Our meticulously planned trips immerse you in the rich tapestry of global heritage. Uncover the hidden gems of different societies, savor local flavors, and forge connections that transcend borders. Join us to explore the world's diversity and witness firsthand how travel can be a transformative cultural journey.",
    },
    {
      id: 2,
      imageURL:
        "https://images.pexels.com/photos/1392099/pexels-photo-1392099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      descption:
        "Embark on a journey of a lifetime with BTRS as we curate exhilarating trips that feed your sense of adventure. From scaling towering peaks to navigating uncharted waters, our expertly crafted expeditions promise heart-pounding excitement and breathtaking landscapes. Let us be your gateway to discovering the world's most captivating and adrenaline-fueled destinations.",
    },
    {
      id: 3,
      imageURL:
        "https://images.pexels.com/photos/4530040/pexels-photo-4530040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      descption:
        "Indulge in rejuvenating getaways with BTRS, where we specialize in crafting trips that provide a serene escape from the hustle and bustle of everyday life. Imagine relaxing on pristine beaches, exploring tranquil landscapes, and embracing the tranquility that only travel can bring. Let us guide you to destinations that soothe the soul and create lasting moments of peace.",
    },
    {
      id: 4,
      imageURL:
        "https://images.pexels.com/photos/1122411/pexels-photo-1122411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      descption:
        "Your travel dreams, our expertise. BTRS specializes in tailoring trips that cater to your unique wanderlust. Whether you're a solo traveler seeking self-discovery, a couple celebrating romance, or a family in search of bonding experiences, we curate journeys that align with your aspirations. Let us bring your travel fantasies to life, one personalized adventure at a time.",
    },
  ];
  const [wordIndex, setWordIndex] = useState(0);
  const [blurIndex, setBlurIndex] = useState(items.length - 1);
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    beforeChange: (current: any, next: any) => {
      setWordIndex(next);
      setBlurIndex(next);
    },
  };
  return (
    <div className="sectionLeft">
      <div className="contanerLeft">
        <SliderReact {...settings}>
          {items.map((item, index) => (
            <div className="sliderLeft" key={item.id}>
              <div className="logo">
                <img src={logo} alt="logo" />
                <span>BTRS</span>
              </div>
              <img
                src={item.imageURL}
                alt={`Slide ${item.id}`}
                className={index === blurIndex ? "blurred" : ""}
              />
              <p>{item.descption}</p>
            </div>
          ))}
        </SliderReact>
      </div>
    </div>
  );
};

export default SectionLeft;
