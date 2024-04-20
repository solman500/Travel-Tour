import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
  {
    imgUrl: weatherImg,
    title: "Calculate Weather",
    desc: "Get the current weather of any city",
  },
  {
    imgUrl: guideImg,
    title: "Best Tour Guide",
    desc: "Get the travel guide of any city",
  },
  {
    imgUrl: customizationImg,
    title: "Customization",
    desc: "Customize your trip",
  },
];

const ServiceList = () => {
  return (
    <>
      {servicesData.map((item, index) => (
        <Col key={index} lg="3" md="6" sm="12" className="mb-4">
          <ServiceCard item={item} />
        </Col>
      ))}
    </>
  );
};

export default ServiceList;
