import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import "./dashboard.css";
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../redux/slice/weatherDataSlice.js';

export default function Dashboard() {
  const dispatch = useDispatch();
  const { weatherdata, loading, error } = useSelector((state) => state.weather);

  const [countryname, setCountryname] = useState('Mumbai');

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchWeather(countryname));
    }, 1000);

    return () => clearTimeout(timer);
  }, [countryname]);

  const handleChange = (event) => {
    setCountryname(event.target.value);
  };

  return (
    <div className='main-container'>
      <div className='search-bar'>
        <TextField
          label="Search city"
          variant="filled"
          type="search"
          value={countryname}
          onChange={handleChange}
          sx={{ mb: 2, width: 600, borderRadius: '50%' }}
        />
      </div>

      {
  loading ? (
    <div className='loading'>
      <h1>Searching...</h1>
    </div>
  ) : (!error && weatherdata) ? (
    <div className='hero-section'>
      <div className='output-section'>
        <div className='temp-section'>
          <h2>{weatherdata.name}</h2>
          <p>latitude {weatherdata.coord.lat} and longitude {weatherdata.coord.lon}</p>
          <h1>{weatherdata.main.temp}</h1>
          <p>{weatherdata.weather[0].main}</p>
          <span>Humidity: {weatherdata.main.humidity}</span><br />
          <p>Sunrise: {weatherdata.sys.sunrise}</p>
          <p>Sunset: {weatherdata.sys.sunset}</p>
        </div>
      </div>
      <div className='blur-block'></div>
    </div>
  ) : (
    <h1>{error}</h1>
  )
}

    </div>
  );
}
