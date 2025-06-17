import React from "react";
import { Card, Col, Image, Row } from 'react-bootstrap';
import noFlag from '../assets/noflag.svg';

const CardComponent = React.memo<{ country: any; isCarousel?: boolean }>(({ country }) => {

    return (
        <Card className="h-100 country-card">
            <Row className="g-0 h-100">
                <Col xs={4} sm={5}>
                    <div className="position-relative h-100">
                        <Image
                            src={country.flag}
                            alt={`${country.name} flag`}
                            className="country-flag"
                            loading="lazy"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = noFlag;
                            }}
                        />
                    </div>
                </Col>
                <Col xs={8} sm={7}>
                    <Card.Body className={`p-1 pe-8 mt-2 p-sm-3 d-flex flex-column justify-content-center text-start`}>
                        <Card.Title className={`mb-1 mb-sm-2 'h6' fw-500`}>
                            {country.name}
                        </Card.Title>
                        <Card.Text className="small text-muted mb-1">
                           {country.region || 'N/A'}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
});

export default CardComponent;