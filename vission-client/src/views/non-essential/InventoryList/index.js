import React from 'react';
import MaterialTable, { Column } from 'material-table';
import {
    Card
} from '@material-ui/core';
import { getProducts, updateProduct, deleteProduct, addProduct } from './api'

class Inventory extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            columns: [],
            data: []
        }
    }

    async componentDidMount() {
        const response = await getProducts()
        this.setState({
            columns: response.data.columns,
            data: response.data.data
        })
    }

    onRowAdd = async (newData) => {
        const response = await addProduct(newData);
        this.setState({
            data: [
                ...this.state.data,
                {
                    itemId: this.state.data.length + 1,
                    ...newData
                }
            ]
        })
    }

    onRowUpdate = async (newData, oldData) => {
        const response = await updateProduct(newData, oldData)
    }

    onRowDelete = async (oldData) => {
        const response = await deleteProduct(oldData)
    }

    render() {
        return (
            <Card style={{
                margin: 20
            }}>
                <MaterialTable
                    title="Inventory"
                    columns={this.state.columns}
                    data={this.state.data}


                    style={{
                        height: 800,
                        overflow: 'scroll'
                    }}
                    options={
                        {
                            paging: false
                        }
                    }
                    editable={{
                        onRowAdd: this.onRowAdd,
                        onRowUpdate: this.onRowUpdate,
                        onRowDelete: this.onRowDelete,
                    }}
                />
            </Card>
        );
    }
}

export default Inventory 