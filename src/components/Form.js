import React, { Component } from 'react'
import "./Form.css"

class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            city: ''
        }
    }

    handleChange = (e) => {
        const name = e.target.name
        this.setState({
            [name] : e.target.value
        })
    }

    handleError = () => {
        return (
            <div className="alert alert-danger mx-5" role="alert">
                Please Enter City
            </div>
        )
    }

    render() {
        const {city} = this.state
        return(
            <div className="flex flex-column">
                <div>
                    {this.props.error ? this.handleError() : null}
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="text">
                        <input type="text" className="w-full rounded py-2 px-4" name="city" value={city} autoComplete="off" placeholder="City" onChange={this.handleChange}/>
                    </div>
                    <div className="mx-2">
                        <button className="bg-white p-8 bg-opacity-80 hover:bg-white-700 text-black py-2 px-4 rounded self-end" onClick={() => this.props.loadWeather(city)} >Get Weather</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form