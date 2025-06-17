import React, { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";

interface Country {
  name: string;
  flag: string;
  region?: string;
  independent?: boolean;
}

interface CountryCarouselProps {
  countries: Country[];
}

const CarouselComponent: React.FC<CountryCarouselProps> = ({ countries }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const totalSlides = countries.length;
  const dotCount = 4;

  const goToPrev = () =>
    setActiveIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));

  const goToNext = () =>
    setActiveIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));

  const goToDot = (dotIndex: number) => {
    const targetIndex = Math.floor((dotIndex / dotCount) * totalSlides);
    setActiveIndex(targetIndex);
  };

  const first = countries[activeIndex];
  const second = countries[(activeIndex + 1) % totalSlides];

  const activeDot = Math.floor((activeIndex / totalSlides) * dotCount);

  return (
    <div className="carousel-wrapper position-relative mb-5">
      <Row className="g-3 justify-content-center align-items-stretch">
        {first && (
          <Col xs={12} md={9}>
            <Card className="h-100 border-0 rounded-0 shadow-sm overflow-hidden">
              <div className="carousel-card position-relative">
                <Card.Img
                  src={first?.flag}
                  alt={first?.name}
                  loading="lazy"
                  className="object-fit-cover border-0 rounded-0 w-100 h-100"
                />
                <div className="position-absolute bottom-0 w-100 text-center bg-secondary bg-opacity-60 text-white py-3">
                  <span className="fw-bold h6">{first?.name}</span>: {first?.region}
                </div>
              </div>
            </Card>
          </Col>
        )}
        {second && (
          <Col xs={12} md={3}>
            <Card className="h-100 border-0 rounded-0 overflow-hidden">
              <div className="carousel-card position-relative">
                <Card.Img
                  src={second?.flag}
                  alt={second?.name}
                  loading="lazy"
                  className="border-0 rounded-0 object-fit-cover w-100 h-100"
                />
                <div className="position-absolute bottom-0 w-100 text-center bg-secondary bg-opacity-60 text-white py-3">
                  <span className="fw-bold h6">{second?.name}</span>: {second?.region}
                </div>
              </div>
            </Card>
          </Col>
        )}
      </Row>

      <div className="carousel-overlay-controls">
        <div className="arrow" onClick={goToPrev}>
          <ArrowLeft size={26} />
        </div>
        <div className="dots">
          {Array.from({ length: dotCount }).map((_, index) => (
            <div
              key={index}
              className={`dot ${index === activeDot ? "active" : ""}`}
              onClick={() => goToDot(index)}
            />
          ))}
        </div>
        <div className="arrow" onClick={goToNext}>
          <ArrowRight size={26} />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
