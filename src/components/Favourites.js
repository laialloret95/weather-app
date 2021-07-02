import 'weather-icons/css/weather-icons.css';
import React, { Component} from 'react';

class Favourites extends Component {

    minmaxTemp = (min, max) => {
        if(min && max) {
            return (
                <h3 className="text-center text-gray-500 mt-2 text-sm">
                    <span className="px-4">{min}&deg;</span>
                    <span className="px-4">{max}&deg;</span>
                </h3>
                )
            }
        }

    render() {
        const {favourites} = this.props
        return (
            <div className="flex flex-col items-center text-white">
                <button className="bg-white p-8 bg-opacity-80 hover:bg-white-700 text-black py-2 px-4 rounded self-end m-8" onClick={() => this.props.showFav()}>Search For Another City</button>
                <div className="flex justify-between">
                    {favourites.map((fav,index) => {
                    return (
                        <>
                        {fav.city ? (
                            <div className="bg-white p-8 bg-opacity-80 rounded-3xl flex flex-col justify-evenly items-center shadow-md m-4" key={index}>
                                <h1 className="text-center text-gray-500 mb-6 text-xl">{fav.city}</h1>
                                <div className="flex flex-col items-center justify-between mb-2">
                                    <i className={`wi ${fav.weather_icon} text-black text-5xl`}/>
                                    <h4 className="text-center text-gray-500 mt-2 text-sm">{fav.description}</h4>
                                </div>
                
                                <div className="flex flex-col justify-between items-center">
                                    {fav.temp_celsius ? (
                                        <h1 className="text-5xl font-bold text-right text-gray-900">{fav.temp_celsius}&deg;</h1>
                                    ) : null }
                                    {this.minmaxTemp(fav.temp_min,fav.temp_max)}
                                </div>
                            </div>
                        ): null }
                        </>
                    )
                    })}
                </div>
                
            </div>
        )
    }
}

export default Favourites;