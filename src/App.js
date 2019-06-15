import React from 'react';
import './App.css';
import AddressForm from './address-form'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      storeDetails: {}
    }
  }

  addressSubmitted(address) {
    fetch(`/api/greeting`, {
        method: 'POST',
        body: JSON.stringify(address),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then(response => response.json())
      .then(state => {
        this.setState({storeDetails: state})
      });
  }
  render() {
    return (
      <div className="App">
        <AddressForm addressSubmitted={this.addressSubmitted.bind(this)}/>
        {this.state && this.state.storeDetails && this.state.storeDetails.name && <div>
          Your selected store is: {this.state.storeDetails.name}
          <br/> longitude: {this.state.storeDetails.longitude}
          <br/> latitude: {this.state.storeDetails.latitude}
        </div>}
      </div>
    );
  }
}

export default App;
