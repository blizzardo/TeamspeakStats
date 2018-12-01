import React from 'react'
import Moment from 'moment'

const TotalCard = props => {

    const getTotalConnectionTimeFromResponse = (raw_response, key) => {
        let totalConnection = 0
        for(const x in raw_response){
            const minuteConnectionTime = Moment.duration(raw_response[x].Value[key]).asMinutes()
            totalConnection += minuteConnectionTime
        }
        return ((totalConnection / 60).toFixed(2) + ' Hours')
    }

    return (
    <div className="TotalCard">

        <div className="row">
            <div className="col" align="center">
                <div className="card text-white bg-primary mb-3">
                <div className="card-header">Annual Server Cost</div>
                <div className="card-body">
                    <h4 className="card-title">£57.45</h4>
                </div>
                </div>
            </div>
            <div className="col" align="center">
                <div className="card text-white bg-primary mb-3">
                <div className="card-header">Total Connection Time</div>
                <div className="card-body">
                    <h4 className="card-title">{getTotalConnectionTimeFromResponse(props.user_api_response, 'ConnectionTime')}</h4>
                </div>
                </div>
            </div>
            <div className="col" align="center">
                <div className="card text-white bg-primary mb-3">
                <div className="card-header">Total Idle Time</div>
                <div className="card-body">
                    <h4 className="card-title">{getTotalConnectionTimeFromResponse(props.user_api_response, 'IdleTime')}</h4>
                </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default TotalCard