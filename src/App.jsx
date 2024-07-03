import React, { useEffect, useState } from 'react';
import './App.css'

function App() {
    const [data, setData] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '/Images/clouds.png'
    });
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=29e06f42479eeefa2df9735abd94ca80&units=metric`;
            fetch(apiUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.status === 404 ? 'Ubicación incorrecta!!!' : 'An error occurred');
                    }
                    return response.json();
                })
                .then(data => {
                    let imagePath = '';
                    if (data.weather[0].main === "Clouds") {
                        imagePath = "/Images/clouds.png";
                    } else if (data.weather[0].main === "Clear") {
                        imagePath = "/Images/clear.png";
                    } else if (data.weather[0].main === "Rain") {
                        imagePath = "/Images/rain.png";
                    } else if (data.weather[0].main === "Drizzle") {
                        imagePath = "/Images/drizzle.png";
                    } else if (data.weather[0].main === "Mist") {
                        imagePath = "/Images/mist.png";
                    } else {
                        imagePath = '/Images/clouds.png';
                    }

                    setData({
                        celcius: data.main.temp,
                        name: data.name,
                        humidity: data.main.humidity,
                        speed: data.wind.speed,
                        image: imagePath
                    });
                    setError('');
                })
                .catch(error => {
                    setError(error.message);
                    console.error('Error fetching data:', error);
                });
        }
    };

    return (
        <div className='container'>
            <div className='weather'>
                <div className='search'>
                    <input type='text' placeholder='Ciudad' onChange={e => setName(e.target.value)} />
                    <button onClick={handleClick}><img src="/Images/search.png" alt="Search" /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className='winfo'>
                    <img src={data.image} alt='Weather' className='icon' />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className='details'>
                        <div className='col'>
                            <img src="/Images/humidity.png" alt="Humidity" />
                            <div className='humidity'>
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humedad</p>
                            </div>
                        </div>
                        <div className='col'>
                            <img src="/Images/wind.png" alt="Wind" />
                            <div className='wind'>
                                <p>{Math.round(data.speed)} km/h</p>
                                <p>Viento</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;

