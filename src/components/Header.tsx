import React from 'react';
import FilterTabs from './FilterTabs';

interface HeaderProps {
    activeFilter: string;
    onFilterChange: (region: string) => void;
}

const filterTabs = ['All', 'Asia', 'Europe'];

const Header: React.FC<HeaderProps> = ({ activeFilter, onFilterChange }) => {
    return (
        <>
            <div className="d-flex justify-content-between align-items-center text-center mb-3 mb-md-4">
                <h2 className="h2 mb-3">Countries</h2>
                <FilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={onFilterChange}
                    availableRegions={filterTabs}
                />
            </div>
        </>
    )
};

export default Header;
