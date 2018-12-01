import React, { Component } from 'react';
import Moment from 'moment'

class TableItem extends Component {

    onHoverStyle = {
        'cursor': 'pointer',
        'backgroundColor': 'rgb(209, 209, 209)'
    }

    constructor(props){
        super(props)
        this.state = {
            expanded: false,
            hovered: false
        }
    }

    toggleExpand = () => {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    hoverToggle = (hover_state) => {
        this.setState({
            hovered: hover_state
        })
    }

    render(){
        const rows = []

        rows.push(
            <tr key={'table-item-' + this.props.item.id}
            onClick={()=>this.toggleExpand()}
            onMouseEnter={()=>this.hoverToggle(true)}
            onMouseLeave={()=>this.hoverToggle(false)}
            style={(this.state.hovered) ? this.onHoverStyle : {}}>

                <td>{this.props.rank}</td>
                <td>{this.props.item.nickname}</td>
                <td>{this.props.item.total_time}</td>
                <td>£{this.props.item.owed}</td>
            </tr>
        )

        if(this.state.expanded){
            rows.push(
                <tr key={'table-item-detail-' + this.props.item.id}>
                    <td colSpan="4">
                        <div className="card">
                            <div className="card-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-sm">
                                        Platform: {this.props.item.platform}
                                        </div>
                                        <div className="col-sm">
                                        One of three columns
                                        </div>
                                        <div className="col-sm">
                                        One of three columns
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )
        }

        return rows
    }
}

export default TableItem