import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchCitySuggestions = async (searchText) => {
    if (!searchText) return;

    try {
      const res = await axios.get("https://api.openweathermap.org/geo/1.0/direct", {
        params: {
          q: searchText,
          limit: 5,
          appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        },
      });

      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching location suggestions:", err);
    }
  };

  useEffect(() => {
    if (query.length >= 2) {
      fetchCitySuggestions(query);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSelect = (location) => {
    setQuery(`${location.name}, ${location.state || ""}, ${location.country}`);
    setSuggestions([]);
    onSearch({ lat: location.lat, lon: location.lon, name: location.name });
  };

  return (
    <div style={{ position: "relative", marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search village/town/city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          width: "300px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            position: "absolute",
            top: "45px",
            width: "100%",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            zIndex: 999,
          }}
        >
          {suggestions.map((loc, index) => (
            <li
              key={index}
              onClick={() => handleSelect(loc)}
              style={{
                padding: "10px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {loc.name}, {loc.state || ""}, {loc.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
