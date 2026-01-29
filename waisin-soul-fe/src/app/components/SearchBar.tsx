import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={handleSearch} className="w-full">
            <div className="flex items-center">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={query}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-[#1a1a1a] border border-gray-700 rounded-l-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button 
                    type="submit" 
                    className="bg-blue-600 text-white p-3 rounded-r-md hover:bg-blue-700 transition-colors duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
            </div>
        </form>
    );
};

export default SearchBar; 