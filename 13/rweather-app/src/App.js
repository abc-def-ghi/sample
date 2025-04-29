import React, { useEffect, useState } from "react";
import { getCurrentWeather, getForecastWeather } from "./api/weatherService";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherChart from "./components/WeatherChart";
import SearchBar from "./components/SearchBar";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState([]);

  const fetchWeather = async ({ lat, lon, name }) => {
    try {
      const current = await getCurrentWeather(lat, lon);
      setCurrentWeather({ ...current, name });

      const forecast = await getForecastWeather(lat, lon);
      setForecastData(forecast.list.slice(0, 8));
    } catch (error) {
      console.error("Weather fetch failed", error);
      alert("Could not fetch weather data.");
    }
  };

  // Optionally, fetch default on mount (e.g., Delhi)
  useEffect(() => {
    fetchWeather({ lat: 28.6139, lon: 77.209, name: "Delhi" });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Weather App</h1>
      <SearchBar onSearch={fetchWeather} />
      {currentWeather && <WeatherDisplay data={currentWeather} />}
      {forecastData.length > 0 && <WeatherChart data={forecastData} />}
    </div>
  );
}

export default App;
