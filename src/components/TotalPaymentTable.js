import React, { Component } from 'react';
import Moment from 'moment'

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
            const idleTime = Moment.duration(raw_response[x].Value.IdleTime)
            const realTime = connectionTime.asMilliseconds() - idleTime.asMilliseconds()
            const minuteConnectionTime = connectionTime.asMinutes()

            items.push({
                id: x,
                nickname: raw_response[x].Value.NickName,
                real_time_sort: realTime,
                real_time_formatted: this.formatConnectionString(Moment.duration(realTime, 'milliseconds')),
                total_time: this.formatConnectionString(connectionTime),
                idle_time: this.formatConnectionString(idleTime),
                owed: ((minuteConnectionTime/totalConnection) * this.teamspeakCost).toFixed(2),
                platform: raw_response[x].Value.LatestPlatform
            })
        }

        return items.sort((a,b)=>{return b.real_time_sort - a.real_time_sort})
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
        return (
            <div className="table">
                <div className="table-header">
                    <div className="table-cell">Rank</div>
                    <div className="table-cell">User</div>
                    <div className="table-cell">🔥 Time</div>
                    <div className="table-cell">Time Connected</div>
                    <div className="table-cell">Idle Time</div>
                    <div className="table-cell">Money Owed</div>
                </div>
                    {rows.map((item, i) => {

                        let rank = (i < 3) ? this.awards[i] : i;
                        if(i === rows.length-1) rank = "🤷"

                        return (
                            <div key={'user-row-'+i} className="table-row">
                                <div className="table-cell">{rank}</div>
                                <div className="table-cell">{item.nickname}</div>
                                <div className="table-cell">{item.real_time_formatted}</div>
                                <div className="table-cell">{item.total_time}</div>
                                <div className="table-cell">{item.idle_time}</div>
                                <div className="table-cell">£{item.owed}</div>
                            </div>
                        )
                    })}
            </div>
        )
    }
}

export default TotalPaymentTable