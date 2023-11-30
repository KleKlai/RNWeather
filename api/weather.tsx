import axios from "axios";
import { apiKey } from "../constant";

const forecastEndpoint = (params: string) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=${params.days}`;
const locationsEndpoint = (params: string) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (err) {
    console.log(`~ weather.tsx:16 ~ apiCall ~ Error: ${err}`);
    return null;
  }
};

export const fetchWeatherForecast = (params: any) => {
  let forecastUrl = forecastEndpoint(params);

  return apiCall(forecastUrl);
};

export const fetchLocation = (params: any) => {
  let forecastUrl = locationsEndpoint(params);

  return apiCall(forecastUrl);
};
