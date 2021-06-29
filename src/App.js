import './App.css';
import Weather from './components/Weather';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      favourites: []
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

  getWeatherIcon = (icons, rangeID) => {
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

  addToFav = (city, weatherIcon, temp) => {
    const newFav = this.state.favourites

    newFav.push({city:city, weatherIcon: weatherIcon, temp: temp})
    this.setState({
      favourites: newFav
    })
  }

  handleError = () => {
    return (
        <div className="alert alert-danger mx-5" role="alert">
            City Not Found
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
    
        this.getWeatherIcon(this.weatherIcon, response.weather[0].id)
      }
    } else {
      this.setState({
        error:true,
        cityFound:true
      })
    }
  }

  favourites = () => {
    if (this.state.favourites.length > 0) {
      return (<h2>Favourites</h2>)
    }
  }


  render() {
    const {favourites, city, country, temp_celsius, temp_max, temp_min, description, weather_icon, cityFound}  = this.state

    return(
      <div className="app">
          {!cityFound ? (
            this.handleError()
        ): null }
        <Form loadWeather={this.getWeather} error={this.state.error} />
        <div className="content">
          <div className="left-column">
            <Weather city={city} country={country} temp_celsius={temp_celsius} temp_max={temp_max} temp_min={temp_min} description={description} weather_icon={weather_icon} fav={this.addToFav}/>
          </div>
          
          <div className="right-column">
              {this.favourites()}
              {favourites.map((fav,index) => {

                return (
                  <div className="city" key={index}>
                    <i className={`wi ${fav.weatherIcon} display-1`} />
                    <h2>{fav.city}</h2>
                    <h2>{fav.temp}&deg;</h2>
                  </div>
                )
              })}
          </div>
        </div>
    

      </div>
    )
  }
}


export default App;
