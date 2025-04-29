import axios from "axios";

const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;

export const getCurrentWeather = async (lat, lon) => {
  const res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: "metric",
    },
  });
  return res.data;
};

export const getForecastWeather = async (lat, lon) => {
  const res = await axios.get("https://api.openweathermap.org/data/2.5/forecast", {
    params: {
      lat,
      lon,
      appid: apiKey,
      units: "metric",
    },
  });
  return res.data;
};
