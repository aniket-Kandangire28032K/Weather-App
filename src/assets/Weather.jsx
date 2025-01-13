import '../App.css'
import React, { useState } from 'react'
import API_key from './ApiKeys'
export default function WeatherBoard() {
  const [weather, setWeather] = useState([]);
  const [city,setCity]=useState();
  
  //set city
  const selectCity=(e)=>{
  setCity(e.target.value)
  }
  
  // Fetch Weather Data From API
  const check = async () => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_key}`);
    const data = await res.json();
    console.log(data);
    setWeather({
      CityName:data.name,
      temp:Math.floor(data.main.temp),
      shortDescription:data.weather[0].main,
      description:data.weather[0].description,
      humidity:data.main.humidity,
      wind:data.wind.speed,
      icon:data.weather[0].icon
    });
  } catch (error) {
    // console.log(error);
    alert('Wrong Input Please Retry')
  }  
}
const enterKey=(e)=>{
  if(e.key==='Enter'){
    check();
    
  }
}
  
  return (
    <div>
      <div id='weatherBox' className='w-4/5 p-4 mx-auto flex justify-around'>
        <input type="text" 
        placeholder='Enter The City' 
        onFocus={e => e.target.placeholder = " "}
        onKeyDown={enterKey}
        onBlur={e => !e.target.value ? e.target.placeholder = "Enter The City" : e.target.value} 
        autoComplete='on' 
        onChange={selectCity} 
        pattern='[A-Za-z ]{3,}'
        />
        <button 
        type='button' 
        id='btn' 
        className='outline-blue-950 bg-blue-800 text-white px-5 rounded-md' 
        onClick={check}>Check🌤️</button>
      </div>
            
      {/* weather Display */}
      { weather.temp ?
        <div className='w-3/5 px-4 max-md:w-4/5 p-3 my-0 mx-auto border-blue-950 rounded-3xl' id='weatherCard'>
        <h1>{weather.CityName}</h1>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={`${weather.description}`} />
        <h1>{weather.temp}℃</h1>
        <h1>Wind:{weather.wind} km/h</h1>
        <h1>Sky:{weather.description}</h1>
        <h1>Humidity:{weather.humidity} %</h1>
        </div>
        :  <div>

        </div>
      }
    </div>

  )
}
