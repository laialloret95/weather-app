import React, {Component} from 'react';

class Weather extends Component {
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
        const props = this.props
        return (
            <>
            {props.city ? (
                <div className="bg-white p-8 bg-opacity-80 rounded-3xl flex flex-col justify-evenly items-center shadow-md ">
                    <h1 className="text-center text-gray-500 mb-6 text-xl">{props.city}</h1>
                    <div className="flex flex-col items-center justify-between mb-2">
                        <i className={`wi ${props.weather_icon} text-black text-5xl`}/>
                        <h4 className="text-center text-gray-500 mt-2 text-sm">{props.description}</h4>
                    </div>
    
                    <div className="flex flex-col justify-between items-center">
                        {props.temp_celsius ? (
                            <h1 className="text-5xl font-bold text-right text-gray-900">{props.temp_celsius}&deg;</h1>
                        ) : null }
                        {this.minmaxTemp(props.temp_min,props.temp_max)}
                    </div>
    
                    <button className="mt-2" onClick={() => props.fav(props.city, props.weather_icon, props.temp_celsius, props.temp_min,props.temp_max, props.description)}>
                        <i className="fas fa-heart text-red-600"></i>
                    </button>
                    
                </div>
            ): null }
            </>
        )
    }

}
export default Weather