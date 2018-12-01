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
      user_api_response: [],
      channel_api_response: []
    }
  }

  makeRequestToApi(url) {
    return new Promise((resolve, reject)=>{
      fetch(url).then((data) => {
        data.json().then((body) => {
          resolve(body)
        })
      })
    })
  }

  componentDidMount() {
    const user_api_url = 'https://teamspeakgetstats.azurewebsites.net/api/stats/user?code=' + Config.secretKey
    const channel_api_url = 'https://teamspeakgetstats.azurewebsites.net/api/stats/channel?code=' + Config.secretKey

    this.makeRequestToApi(user_api_url).then((body)=>{
      this.setState({
        user_api_response: body
      })
    })

    this.makeRequestToApi(channel_api_url).then((body)=>{
      this.setState({
        channel_api_response: body
      })
    })
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <div className="mb-5 row">
            <div className="col">
              <TotalCard user_api_response={this.state.user_api_response}/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1 className="d-inline">Tax Collection</h1>
              <TotalPaymentTable
              user_api_response={this.state.user_api_response}
              channel_api_response={this.state.channel_api_response}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
