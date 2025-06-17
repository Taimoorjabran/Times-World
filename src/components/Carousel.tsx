import React, { useState } from "react";
import { Row, Col, Card, Carousel } from "react-bootstrap";
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

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  const goToDot = (dotIndex: number) => {
    const targetIndex = Math.floor((dotIndex / dotCount) * totalSlides);
    setActiveIndex(targetIndex);
  };

  const activeDot = Math.floor((activeIndex / totalSlides) * dotCount);

  return (
    <div className="carousel-wrapper position-relative mb-5">
      <Carousel
        activeIndex={activeIndex}
        onSelect={handleSelect}
        controls={false}
        indicators={false}
        interval={2000}
        fade={false}
      >
        {countries.map((country, index) => {
          const nextCountry = countries[(index + 1) % totalSlides];
          return (
            <Carousel.Item key={index}>
              <Row className="g-3 justify-content-center align-items-stretch">
                <Col xs={12} md={9}>
                  <Card className="h-100 border-0 rounded-0 shadow-sm overflow-hidden">
                    <div className="carousel-card position-relative">
                      <Card.Img
                        src={country?.flag}
                        alt={country?.name}
                        loading="lazy"
                        className="object-fit-cover border-0 rounded-0 w-100 h-100"
                      />
                      <div className="position-absolute bottom-0 w-100 text-center bg-secondary bg-opacity-60 text-white pt-3 pb-2">
                        <span className="fw-bold h6">{country?.name}</span>: {country?.region}
                      </div>
                    </div>
                  </Card>
                </Col>
                {nextCountry && (
                  <Col xs={12} md={3}>
                    <Card className="h-100 border-0 rounded-0 overflow-hidden">
                      <div className="carousel-card position-relative">
                        <Card.Img
                          src={nextCountry?.flag}
                          alt={nextCountry?.name}
                          loading="lazy"
                          className="border-0 rounded-0 object-fit-cover w-100 h-100"
                        />
                        <div className="position-absolute bottom-0 w-100 text-center bg-secondary bg-opacity-60 text-white pt-3 pb-2">
                          <span className="fw-bold h6">{nextCountry?.name}</span>: {nextCountry?.region}
                        </div>
                      </div>
                    </Card>
                  </Col>
                )}
              </Row>
            </Carousel.Item>
          );
        })}
      </Carousel>

      <div className="carousel-overlay-controls">
        <div 
          className="arrow" 
          onClick={() => setActiveIndex(activeIndex === 0 ? totalSlides - 1 : activeIndex - 1)}
        >
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
        <div 
          className="arrow" 
          onClick={() => setActiveIndex(activeIndex === totalSlides - 1 ? 0 : activeIndex + 1)}
        >
          <ArrowRight size={26} />
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;