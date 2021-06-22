import React , {useState} from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavBar from './component/AppBarNav';

import {Link , Route , BrowserRouter as Router , Switch} from 'react-router-dom';
import Users from './component/Users';
import About from './component/About';
import Home from './component/Home';


 const  App = () => {
    const [query , setQuery]  = useState('');
    const [weather , setWeather] = useState({})

    const search = async (e) => {
        if(e.key == 'enter'){
             const data = await fetchWeather(query)

             setWeather(data) //setting retrieved weather data into the weather state using the setWeather of useState() hook
            console.log(data);
            setQuery('') //setting the query to an empty string
        }
    }

    return (
        <div className="main-continer">
            

            <Router>
      
            <Switch>            
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route exact path="/users" component={Users} />
            </Switch>
            </Router>



            {/* <input type="text"  className="search" placeholder="Search..."  value={query} onChange = { e => setQuery(e.target.value)} onKeyPress = {search} />
            {weather.main && (
                <div className="city">
                <h2 className="city-name">
                    <span>{weather.main}</span>
                    <sup>{weather.sys.country}</sup>
                </h2>

                <div className="city-temp">
                    {Math.round(weather.temp)}
                    <sup>&deg;</sup>
                </div>

                <div className="info">
                    <img className="city-icon" src={`https://api.openweathermap.org/wn/${weather.weather[0].icon}@2x.png`}  alt={weather.weather[0].description} />
                    </div>
            </div>
            )}

        <h1>React PWA</h1> */}
        </div> 
    );
}


export default App;