// SearchInput.tsx

import React, { useState } from 'react';
import './SearchInput.scss';

const SearchInput: React.FC = () => {
    const [isActive, setIsActive] = useState(false);

    const handleFocus = () => {
        setIsActive(true);
    };

    const handleBlur = () => {
        // Optionally, you can check if the input is empty before deactivating:
        // if (event.target.value === '') setIsActive(false);
        setIsActive(false);
    };

    return (
        <div className="search-wrapper">
            <input
                type="text"
                className={`search-input ${isActive ? 'active' : ''}`}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search..."
            />
        </div>
    );
};

export default SearchInput;
