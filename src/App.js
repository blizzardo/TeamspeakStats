import React, { Component } from 'react';
import Header from './components/Header'
import Config from './config'
import TotalPaymentTable from './components/TotalPaymentTable'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      result: []
    }
  }

  hitThatApi() {
    const url = 'https://teamspeakgetstats.azurewebsites.net/api/stats?code=' + Config.secretKey
    fetch(url).then((data) => {
      data.json().then((body) => {
        this.setState({
          result: body
        })
      })
    })
  }

  componentDidMount() {
    this.hitThatApi()
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <div className="container">
          <div className="row">
            <div className="col">
              <TotalPaymentTable result={this.state.result}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
