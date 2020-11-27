import React, { useState } from 'react';
import { Table, Divider } from 'antd';

const columns = [
    {
      title: 'Order Id',
      dataIndex: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Side',
      dataIndex: 'side',
    },
    {
      title: 'Price',
      dataIndex: 'price',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User',
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  
  const closeOrders = (props) => {
  
      const data = props.closeOrders.map((data,key)=>({
          key:key,
          id:data.order_id,
          side:data.side,
          price:data.order_price,
          quantity:data.quantity
      }));
      
    const [selectionType, setSelectionType] = useState('checkbox');
    return (
      <div>
        <Divider />
  
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
        />
      </div>
    );
  };
  
  export default closeOrders;