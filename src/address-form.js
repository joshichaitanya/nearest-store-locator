import React from 'react';
import './address-form.css';

class AddressForm extends React.Component {
    constructor(props) {
        super(props)
        this.addressSubmitted = this.addressSubmitted.bind(this)
        this.handleChange = this.handleChange.bind(this)

        this.state = {
            street: '',
            city: '',
            state: '',
            zip: '',
            country: ''
        };
    }

    addressSubmitted(e) {
        e.preventDefault()
        this.props.addressSubmitted(this.state)
    }
    handleChange(e) {
        this.setState({[e.target.id]: e.target.value})
    }
    render() {
        return (
            <div className="row">
                <h1>Please enter your address</h1>
                <form className="form-group" onSubmit={this.addressSubmitted} >
                    <input type="street"
                            value={this.state.street}
                            className="form-control"
                            onChange={this.handleChange}
                            id="street" 
                            placeholder="Street"/>
                    
                    <input type="city" 
                            value={this.state.city}
                            className="form-control"
                            onChange={this.handleChange}
                            id="city" 
                            placeholder="City"/>
                    
                    <input type="state"
                            value={this.state.state}
                            className="form-control"
                            onChange={this.handleChange}
                            id="state" 
                            placeholder="State"/>
                    
                    <input type="zip"
                            value={this.state.zip}
                            onChange={this.handleChange}
                            className="form-control" 
                            id="zip" 
                            placeholder="Zip"/>
                    
                    <input type="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            className="form-control" 
                            id="country" 
                            placeholder="County"/>
                    <button className='submit-button' type='submit'>submit</button>
                </form>
            </div>
        );
    }
}

export default AddressForm;
