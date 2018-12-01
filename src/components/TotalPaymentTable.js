import React, { Component } from 'react';
import Moment from 'moment'
import TableItem from './TableItem'

class TotalPaymentTable extends Component {

    awards = ["🥇", "🥈", "🥉"]
    teamspeakCost = 50

    responseObjectToTableMapping(raw_response){
        const items = []
        let totalConnection = 0
        for(const x in raw_response){
            const connectionTime = Moment.duration(raw_response[x].Value.ConnectionTime)
            const minuteConnectionTime = connectionTime.asMinutes()
            totalConnection += minuteConnectionTime
        }

        for(const x in raw_response){
            const connectionTime = Moment.duration(raw_response[x].Value.ConnectionTime)
            const minuteConnectionTime = connectionTime.asMinutes()

            items.push({
                id: x,
                nickname: raw_response[x].Value.NickName,
                total_time: this.formatConnectionString(connectionTime),
                owed: ((minuteConnectionTime/totalConnection) * this.teamspeakCost).toFixed(2),
                platform: raw_response[x].Value.LatestPlatform
            })
        }

        return items
    }

    formatConnectionString(connectionTime) {
        const days = connectionTime.days()
        const hours = connectionTime.hours()
        const minutes = connectionTime.minutes()

        let connectionTimeDisplay = ''
        if(days !== 0) connectionTimeDisplay += days + ((days === 1) ? ' Day, ' : ' Days, ')
        if(hours !== 0) connectionTimeDisplay += hours + ((hours === 1) ? ' Hour, ' : ' Hours, ')
        if(minutes !== 0) connectionTimeDisplay += minutes + ((minutes === 1) ? ' Minute' : ' Minutes')

        return connectionTimeDisplay
    }

    render() {
        const rows = this.responseObjectToTableMapping(this.props.user_api_response)
        const render_rows = rows.map(item => <TableItem
            key={'TableItem-' + item.id}
            rank={this.awards[item.id] || '#' + item.id}
            item={item}/>)
        return (
            <table className="table">
                <thead><tr>
                    <th>Rank</th>
                    <th>Nickname</th>
                    <th>Connection Hours</th>
                    <th>Owed</th>
                </tr></thead>
                <tbody>
                    {render_rows}
                </tbody>
            </table>
        )
    }
}

export default TotalPaymentTable