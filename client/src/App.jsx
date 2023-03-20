import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [people, setPeople] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const inputRef = useRef();

  const fetchWeather = async (city) => {
      console.log('fetch weather');
      try {
        // const response = await fetch('/api/people');
        const response = await fetch(`/api/weather/${city}`);
        const data = await response.json();
        const weatherObj = data;
        setWeatherData(weatherObj);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

  const weatherHandler = () => {
    const city = inputRef.current.value;

    fetchWeather(city);
  }

  return (
    <div className="App">
      <input ref={inputRef} type='text' placeholder='CITY'/>
      <button onClick={weatherHandler} >GET WEATHER</button>
      {weatherData && 
        <table>
          <thead></thead>
          <tbody>
            <tr><td>REGION:</td><td>{weatherData.location.region}</td></tr>
            <tr><td>COUNTRY</td><td>{weatherData.location.country}</td></tr>
            <tr><td>TEMP (C)</td><td>{weatherData.current.temp_c}</td></tr>
            <tr><td>TEMP (F)</td><td>{weatherData.current.temp_f}</td></tr>
          </tbody>
        </table>}

    </div>
  );
}

export default App;
