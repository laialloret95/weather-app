import Weather from './components/Weather';
import Form from './components/Form';
import Favourites from './components/Favourites';

import 'weather-icons/css/weather-icons.css';
import React, { Component} from 'react';

const API_KEY = "241b7bd81cddac247adb26ee5c599af7"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: undefined,
      country: undefined,
      weather_icon: undefined,
      main: undefined,
      temp_celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      description: "",
      error: false,
      cityFound:true,
      favourites: [],
      showFav: false,
    }

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Sunny: "wi-day-sunny",
      Clouds: "wi-day-fog"
    }
  }

  calculateCelsius(temp) {
    let cell = Math.floor(temp - 273.15)
    return cell;
  }

  getWeatherIcon = (rangeID) => {
    switch(true) {
      case rangeID >= 200 && rangeID <= 232:
        this.setState({weather_icon: this.weatherIcon.Thunderstorm})
        break;
      case rangeID >= 300 && rangeID <= 321:
        this.setState({weather_icon: this.weatherIcon.Drizzle})
        break;
      case rangeID >= 500 && rangeID <= 531:
        this.setState({weather_icon: this.weatherIcon.Rain})
        break;
      case rangeID >= 600 && rangeID <= 622:
        this.setState({weather_icon: this.weatherIcon.Snow})
        break;
      case rangeID >= 701 && rangeID <= 781:
        this.setState({weather_icon: this.weatherIcon.Atmosphere})
        break;
      case rangeID === 800:
          this.setState({weather_icon: this.weatherIcon.Sunny})
          break;
      case rangeID >= 801 && rangeID <= 804:
            this.setState({weather_icon: this.weatherIcon.Clouds})
            break;
      default:
        this.setState({
          weather_icon: this.weatherIcon.Sunny
        })
        break;
    }
  }

  handleError = () => {
    return (
      <div role="alert">
        <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
          <p>City not found, try another one</p>
        </div>
      </div>
    )
}
  getWeather = async (city) => {

    if(city) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);

      const response = await api_call.json();
  
      if(response.cod === "404") {
        this.setState({cityFound:false})
      } else {
        console.log(response)
        this.setState({
          cityFound:true,
          city: `${response.name}, ${response.sys.country}`,
          main: response.weather[0].main,
          temp_celsius: this.calculateCelsius(response.main.temp),
          temp_max: this.calculateCelsius(response.main.temp_max),
          temp_min: this.calculateCelsius(response.main.temp_min),
          description: response.weather[0].description,
          error:false
        })
    
        this.getWeatherIcon(response.weather[0].id)
        console.log(this.state.weather_icon)
      }
    } else {
      this.setState({
        error:true,
        cityFound:true
      })
    }
  }

  addToFav = (city,weather_icon,temp_celsius, temp_max, temp_min, description) => {
    const newFav = this.state.favourites
    newFav.push({city:city, weather_icon: weather_icon, temp_celsius:temp_celsius, description:description, temp_min:temp_min, temp_max:temp_max})

    this.setState({
      favourites: newFav
    })
  }

  showFav = () => {
      this.setState({
        showFav: !this.state.showFav
      })
  }

  handleContent = () => {
    const {showFav, city, country, temp_celsius, temp_max, temp_min, description, weather_icon, cityFound}  = this.state
    
    if (showFav) {
      return (
        <Favourites favourites={this.state.favourites} showFav={this.showFav}/>
      )
    } 
    else {
      return (
        <div className="flex flex-col items-center">
          {!cityFound ? this.handleError() : null }
          <button className="bg-white p-8 bg-opacity-80 hover:bg-white-700 text-black py-2 px-4 rounded self-end m-8" onClick={this.showFav}>Go To Favourites</button>
          <Form loadWeather={this.getWeather} error={this.state.error} />
          <div className="flex flex-col justify-center items-center text-white mt-8">
              <Weather city={city} country={country} temp_celsius={temp_celsius} temp_max={temp_max} temp_min={temp_min} description={description} weather_icon={weather_icon} fav={this.addToFav}/>
          </div>
        </div>
      )
    }
  }

  handleFav = () => {
    let result = this.state.favourites.find(fav => fav.city === this.state.city)
    console.log(result)
  }

  render() {
   

    return(
      <div className="bg-gradient-to-br from-yellow-400 to-pink-500 via-red-400 w-full h-screen">
        {this.handleFav()}
        {this.handleContent()}
      </div>
    )
  }
}

export default App;
