import React, { Component } from 'react';
import Header from './components/Header'
import Config from './config'
import TotalPaymentTable from './components/TotalPaymentTable'
import TotalCard from './components/TotalCard'
import Dropdown from './components/Dropdown'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      response: []
    }
  }

  makeRequestToUserApi() {
    const url = 'https://teamspeakgetstats.azurewebsites.net/api/stats/user?code=' + Config.secretKey
    fetch(url).then((data) => {
      data.json().then((body) => {
        this.setState({
          response: body
        })
      })
    })
  }

  componentDidMount() {
    this.makeRequestToUserApi()
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <div className="mb-5 row">
            <div className="col">
              <TotalCard response={this.state.response}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col">
                  <h1 className="d-inline">Tax Collection</h1>
                </div>
                <div className="col">
                  <Dropdown/>
                </div>
              </div>
              <TotalPaymentTable response={this.state.response}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
