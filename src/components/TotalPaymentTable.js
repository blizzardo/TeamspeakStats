import React, { Component } from 'react';

class TotalPaymentTable extends Component {
    constructor(props){
        console.log(props.result)
        super(props)
        this.state = {
            items: props.result || []
        }
    }

    render() {
        console.log(this.state.items)
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
                        this.state.items.map((item, i) => (
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