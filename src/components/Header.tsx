import React from 'react';
import FilterTabs from './FilterTabs';
import { logout } from '../auth/auth';
import { useNavigate } from 'react-router-dom';
import type { Country } from '../redux/countriesSlice';

interface HeaderProps {
    activeFilter: string;
    onFilterChange: (region: string) => void;
    countries: Country[];
}

const Header: React.FC<HeaderProps> = ({ activeFilter, onFilterChange, countries }) => {
    const navigate = useNavigate();

    const filterRegion = countries.filter((country, index, self) => {
        return self.findIndex(c => c.region === country.region) === index;
    }).map(country => country.region);

    const filterTabs = ['All', ...filterRegion]

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center text-center mb-3 mb-md-4">
                <h2 className="h2 mb-3">Countries</h2>
                <FilterTabs
                    activeFilter={activeFilter}
                    onFilterChange={onFilterChange}
                    availableRegions={filterTabs}
                    handleLogout={handleLogout}
                />
                <button className='btn btn-primary d-none d-md-block' onClick={handleLogout}>logout</button>
            </div>
        </>
    )
};

export default Header;
