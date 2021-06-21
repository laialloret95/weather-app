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
            <div className="container-form">
            <div>
                {this.props.error ? this.handleError() : null}
            </div>
                <div className="form">
                    <div className="row-form">
                        <div className="col-md-2 input">
                            <input type="text" className="form-control" name="city" value={city} autoComplete="off" placeholder="City" onChange={this.handleChange}/>
                        </div>
                        <div className="col-md-2 button">
                            <button className="btn btn-warning" onClick={() => this.props.loadWeather(city)} >Get Weather</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Form