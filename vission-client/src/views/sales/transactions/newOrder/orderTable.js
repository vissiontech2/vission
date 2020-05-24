import React from 'react';
import MaterialTable from 'material-table';


class Table extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            data: []
        }
    }

    renderTitleMessage = () => {
        if (this.props.error.error) {
            return <span style={{ color: 'red' }}>
                {this.props.error.errorMessage}
            </span>
        } else {
            return <span>Products in the cart</span>
        }
    }

    render() {
        const title = this.renderTitleMessage()
        return (
            <div>
                <MaterialTable
                    title={title}
                    columns={this.props.columns}
                    data={this.props.ordersList}
                    style={{
                        padding: 10,
                        height: 500,
                        overflow: 'scroll'
                    }}
                    options={
                        {
                            paging: false
                        }
                    }
                    editable={{
                        onRowUpdate: this.props.editItem,
                        onRowDelete: this.props.deleteItem
                    }}
                />
            </div>
        );
    }
}

export default Table