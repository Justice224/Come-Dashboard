import React, { useState } from 'react';
import { Table, Divider,Button } from 'antd';
import axios from 'axios';
const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'address',
  },
  {
      title:"Delete User",
      dataIndex:"delete",
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

const deleteUser = (id)=>{
    axios.post(`http://192.168.128.169:8090/admin/deleteuser/${id}`,{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
    .then(res=>console.log(res))
    .catch(err=>err);
}


const AllUsers = (props) => {
    const data = props.allusers.map((data,key)=>({
        key:key,
        name:data.name,
        address:data.email,
        delete:<Button type="primary" danger onClick={()=>deleteUser(data)} >Delete</Button>
    }))

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

export default AllUsers;