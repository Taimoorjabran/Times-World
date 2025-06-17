import React, { useEffect, useRef, useMemo, useCallback } from 'react'
import type { RootState, AppDispatch } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries, setCurrentPage, setRegionFilter } from '../redux/countriesSlice';
import {
    Container,
    Row,
    Col,
    Button,
    Spinner,
    Alert,
} from 'react-bootstrap';
import CountryCard from '../components/CardComponent';
import CarouselComponent from '../components/Carousel';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loadMoreRef = useRef<HTMLDivElement>(null);

    const {
        countries,
        status,
        error,
        selectedRegion,
        currentPage,
        itemsPerPage
    } = useSelector((state: RootState) => state.countries);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCountries());
        }
    }, [status, dispatch]);

    const filteredCountries = useMemo(() => {
        if (selectedRegion === 'All') return countries;
        return countries.filter(country => country.region === selectedRegion);
    }, [countries, selectedRegion]);

    const displayedCountries = useMemo(() => {
        return filteredCountries.slice(0, currentPage * itemsPerPage);
    }, [filteredCountries, currentPage, itemsPerPage]);


    const handleFilterChange = useCallback((region: string) => {
        dispatch(setRegionFilter(region));
    }, [dispatch]);

    const handleLoadMore = useCallback(() => {
        dispatch(setCurrentPage(currentPage + 1));
        setTimeout(() => {
            loadMoreRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
    }, [dispatch, currentPage]);

    const hasMoreCountries = (currentPage * itemsPerPage) < filteredCountries.length;

    if (status === 'loading') {
        return (
            <Container className="text-center py-5">
                <Spinner animation="border" role="status" variant="dark">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <p className="mt-3 text-muted">Loading countries...</p>
            </Container>
        );
    }

    if (status === 'failed') {
        return (
            <Container className="py-3 py-md-5">
                <Alert variant="danger" className="text-center">
                    <Alert.Heading>Oops! Something went wrong</Alert.Heading>
                    <p className="mb-0">{error || 'Failed to load countries'}</p>
                </Alert>
            </Container>
        );
    }

    return (
        <>
            <Container fluid className="px-4 px-sm-3 py-3 py-md-4">
                <Row>
                    <Col>
                        <Header activeFilter={selectedRegion} onFilterChange={handleFilterChange} />
                        <div className="d-none d-md-flex align-items-center mb-5">
                            <div className="custom-hr flex-grow-1 mb-5" />
                            <h1 className="px-3 h1 fw-bold">Welcome</h1>
                            <div className="custom-hr flex-grow-1 mt-5" />
                        </div>
                        <div className="d-flex d-md-none flex-column align-items-center justify-content-cente mb-4">
                            <div className="custom-hr w-100 mb-2" />
                            <span className="px-3 h2 h1-md">Welcome</span>
                            <div className="custom-hr w-100 mt-2" />
                        </div>
                        <CarouselComponent countries={filteredCountries} />
                        <div className="mb-4">
                            {displayedCountries.length > 0 ? (
                                <>
                                    <Row className="g-2 g-md-3">
                                        {displayedCountries.map((country, index) => (
                                            <Col
                                                xs={12}
                                                md={6}
                                                key={country.name || index}
                                            >
                                                <CountryCard country={country} />
                                            </Col>
                                        ))}
                                    </Row>
                                    {hasMoreCountries && (
                                        <div className="text-center mt-4" ref={loadMoreRef}>
                                            <Button
                                                variant="primary"
                                                size="lg"
                                                onClick={handleLoadMore}
                                                className="custom-button"
                                            >
                                                Load More
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center py-5">
                                    <Alert variant="info" className="d-inline-block">
                                        <h5 className="alert-heading">No countries found</h5>
                                        <p className="mb-0">Try selecting a different region filter.</p>
                                    </Alert>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
                <Footer />
            </Container>
        </>
    );
};

export default Home;