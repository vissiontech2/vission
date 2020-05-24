import React from 'react';
import MaterialTable, { Column } from 'material-table';


export default function MaterialTableDemo() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Discount', field: 'discount' },
      { title: 'Count', field: 'count', type: 'numeric' },
      { title: 'Total', field: 'total', type: 'currency' },
    ],
    data: [
      {
        name: 'Bariis',
        discount: 10,
        count: 4,
        total: 34,
      },
    ],
  });

  return (
    <MaterialTable
      title="Products in the cart"
      columns={state.columns}
      data={state.data}
      style={{
        marginTop: 5,
        height: 500,
        overflow: 'scroll',
      }}
      options={
                {
                  paging: false,
                }
            }
      editable={{
        onRowUpdate: (newData, oldData) => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            if (oldData) {
              setState((prevState) => {
                const data = [...prevState.data];
                data[data.indexOf(oldData)] = newData;
                return { ...prevState, data };
              });
            }
          }, 600);
        }),
        onRowDelete: (oldData) => new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }, 600);
        }),
      }}
    />
  );
}
