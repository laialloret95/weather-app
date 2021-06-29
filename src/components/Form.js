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
            <div className="form-container">
                <div>
                    {this.props.error ? this.handleError() : null}
                </div>
                <div className="form">
                    <div className="text">
                        <input type="text" className="form-control" name="city" value={city} autoComplete="off" placeholder="City" onChange={this.handleChange}/>
                    </div>
                    <div className="button">
                        <button className="btn btn-warning" onClick={() => this.props.loadWeather(city)} >Get Weather</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form