import React, { Component } from 'react';
import Moment from 'moment'

class TotalPaymentTable extends Component {

    formatTrashData(the_sause){
        const items = []
        for(const x in the_sause){
            items.push({
                id: x,
                nickname: the_sause[x].NickName,
                owed: Moment.duration(the_sause[x].ConnectionTime).asMinutes()
            })
        }
        return items
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