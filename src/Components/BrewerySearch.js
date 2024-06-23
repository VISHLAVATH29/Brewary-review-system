import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BrewerySearch.css';
import { Link } from 'react-router-dom';

function BrewerySearch({route}) {
  const [breweries, setBreweries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    const fetchBreweries = async () => {
      const response = await axios.get(
        `https://api.openbrewerydb.org/v1/breweries?by_city=${searchTerm}`
        );
        setBreweries(response.data);
        };
        fetchBreweries();
        }, [searchTerm]);
        
  return (
    <div className="brewery-search">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by City"
      />
      <ul className="grid-container">
        {breweries.map((brewery) => (
          <li key={brewery.id} className="grid-item">
            <Link to={`/brewery/${brewery.id}`}>
            <h2><b>Name: </b>{brewery.name}</h2></Link>
            <p><b>Address: </b>{brewery.street}</p>
            <p><b>Phone: </b>{brewery.phone}</p>
            <a href={brewery.website_url} >{brewery.website_url} </a>
            <p><b>Rating: </b> 0</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BrewerySearch;

