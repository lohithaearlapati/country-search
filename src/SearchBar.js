import React, { useState, useEffect } from 'react';
import './App.css'; // Import the CSS file

const SearchBar = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by country or capital..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {searchTerm && (
        <ul className="search-results">
          {filteredCountries.map((country) => (
            <li className="search-item" key={country.cca3}>
              <span className="country-name">{country.name.common}</span>
              <span className="country-capital">{country.capital?.[0] || 'No capital'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
