
import React, { useState } from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { List } from "react-bootstrap-icons";

const filterTabs = ['All', 'Asia', 'Europe'];

interface FilterTabsProps {
    activeFilter: string;
    onFilterChange: (region: string) => void;
    availableRegions: string[];
}

const FilterTabs = React.memo<FilterTabsProps>(
    ({ activeFilter, onFilterChange, availableRegions }) => {
        const [showDrawer, setShowDrawer] = useState(false);

        const filters = [...availableRegions];

        return (
            <>
                <div className="d-none d-md-flex justify-content-center mb-2">
                    <Nav variant="underline" activeKey={activeFilter}>
                        {filterTabs.map((tab) => (
                            <Nav.Item key={tab}>
                                <Nav.Link
                                    eventKey={tab}
                                    onClick={() => onFilterChange(tab)}
                                    className={'tab'}
                                >
                                    {tab}
                                </Nav.Link>
                            </Nav.Item>))}
                    </Nav>
                </div>
                <div className="d-flex d-md-none justify-content-center mb-3">
                    <List className="mt-1" fontSize={32} onClick={() => setShowDrawer(true)} />
                </div>
                <Offcanvas show={showDrawer} onHide={() => setShowDrawer(false)} placement="top" className="h-75">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Select Region</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="d-flex flex-wrap justify-content-center gap-2">
                        <Nav className="flex-column text-center w-100">
                            {filters.map((region) => (
                                <Nav.Item key={region}>
                                    <Nav.Link
                                        active={activeFilter === region}
                                        onClick={() => {
                                            onFilterChange(region);
                                            setShowDrawer(false);
                                        }}
                                        className={(activeFilter === region) ? 'active-nav' : 'nav-link'}
                                    >
                                        {region}
                                    </Nav.Link>
                                </Nav.Item>
                            ))}
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }
);

export default FilterTabs;
