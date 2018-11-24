import React, { Component } from 'react';
import Moment from 'moment'

class TotalPaymentTable extends Component {

    teamspeakCost = 50

    formatTrashData(the_sause){
        const items = []
        let totalConnection = 0
        for(const x in the_sause){
            const minuteConnectionTime = Moment.duration(the_sause[x].ConnectionTime).asMinutes()
            totalConnection += minuteConnectionTime
        }

        for(const x in the_sause){
            const minuteConnectionTime = Moment.duration(the_sause[x].ConnectionTime).asMinutes()
            items.push({
                id: x,
                nickname: the_sause[x].NickName,
                owed: ((minuteConnectionTime/totalConnection)*this.teamspeakCost).toFixed(2)
            })
        }

        return items.sort((a, b) => a.owed.localeCompare(b.owed)).reverse()
    }

    render() {
        console.log(this.props)
        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nickname</th>
                        <th scope="col">Monies Owed</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.formatTrashData(this.props.result).map((item, i) => (
                            <tr key={'item-row-'+i}>
                                <td>{i + 1}</td>
                                <td>{item.nickname}</td>
                                <td>£{item.owed}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )
    }
}

export default TotalPaymentTable