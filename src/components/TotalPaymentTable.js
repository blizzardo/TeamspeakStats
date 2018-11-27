import React, { Component } from 'react';
import Moment from 'moment'

class TotalPaymentTable extends Component {

    awards = ["🥇", "🥈", "🥉"]
    teamspeakCost = 50

    responseObjectToTableMapping(raw_response){
        console.log(raw_response)
        const items = []
        let totalConnection = 0
        for(const x in raw_response){
            const minuteConnectionTime = Moment.duration(raw_response[x].Value.ConnectionTime).asMinutes()
            totalConnection += minuteConnectionTime
        }

        for(const x in raw_response){
            const minuteConnectionTime = Moment.duration(raw_response[x].Value.ConnectionTime).asMinutes()
            items.push({
                id: x,
                nickname: raw_response[x].Value.NickName,
                owed: ((minuteConnectionTime/totalConnection) * this.teamspeakCost).toFixed(2)
            })
        }

        return items
    }

    render() {
        const formattedData = this.responseObjectToTableMapping(this.props.response)
        if(!formattedData){
            return (<div></div>)
        }
        if(formattedData.length > 0) {
            return (
                <div className="leaderBoard">
                    <table className="table bg-light">
                        <thead>
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">User</th>
                                <th scope="col">Owed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                formattedData.map((item, i) => {
                                    if(i < 3) {
                                        return (
                                            <tr key={'item-row-'+i}>
                                                <td>{this.awards[i]}</td>
                                                <td>{item.nickname}</td>
                                                <td>£{item.owed}</td>
                                            </tr>
                                        )
                                    } else {
                                        return (
                                            <tr key={'item-row-'+i}>
                                                <td>{'#' + (i + 1)}</td>
                                                <td>{item.nickname}</td>
                                                <td>£{item.owed}</td>
                                            </tr>
                                        )
                                    }
                                    
                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>
            )
        }

        return (<p>Loading</p>)
    }
}

export default TotalPaymentTable