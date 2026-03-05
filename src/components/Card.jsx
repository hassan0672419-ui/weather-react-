import React, { useState } from "react";

function Card() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "e235d8ed559f862d0b05bcaf4c157ec3";

  const getWeather = async () => {
    if (!city) return;

    try {
      setError("");
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-gradient-x p-4">

      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 w-full max-w-md text-white transform transition duration-500 hover:scale-105 hover:shadow-indigo-500/50">

        <h1 className="text-3xl font-extrabold text-center mb-6 tracking-wide">
          🌤️ Weather App
        </h1>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            className="flex-1 px-4 py-3 rounded-xl text-black outline-none focus:ring-4 focus:ring-pink-300 transition duration-300"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="bg-white text-purple-600 px-5 py-3 rounded-xl font-semibold hover:bg-purple-600 hover:text-white hover:scale-110 transition duration-300"
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-300 text-center animate-pulse">{error}</p>
        )}

        {/* Weather Data */}
        {weather && (
          <div className="text-center space-y-4 animate-fadeIn">
            <h2 className="text-2xl font-semibold">
              {weather.name}, {weather.sys.country}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto animate-bounce"
            />

            <p className="text-5xl font-bold tracking-wide">
              {weather.main.temp}°C
            </p>

            <p className="capitalize text-lg opacity-90">
              {weather.weather[0].description}
            </p>

            <div className="flex justify-between mt-6 text-sm bg-white/20 rounded-xl p-3 backdrop-blur-md">
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>🌬️ Wind: {weather.wind.speed} km/h</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Card;