
import React,{Component} from 'react';
import { Layout, Menu } from 'antd';
import axios from 'axios';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import AllUsers from './layout/allUsers';
import AllOrders from './layout/allOrders';
import OpenOrders from './layout/openOrders';
import CloseOrders from './layout/closeOrders';
import CancelledOrders from './layout/cancelledOrders';
import Pane from './layout/pane';

const { Header, Sider, Content } = Layout;

class Dashboard extends Component {

componentDidMount(){

    axios.get("http://192.168.128.169:8090/admin/allorders",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
    .then(res=>this.setState({allOrders:res.data}))
    .catch(err=>err);

    axios.get("http://192.168.128.169:8090/admin/allusers",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
        .then(res=>this.setState({allUsers:res.data}))
        .catch(err=>err)

        axios.get("http://192.168.128.169:8090/admin/getopenorders",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
        .then(res=>this.setState({openOrders:res.data}))
        .catch(err=>err)

        axios.get("http://192.168.128.169:8090/admin/getclosedorders",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
        .then(res=>this.setState({closeOrders:res.data}))
        .catch(err=>err)

        axios.get("http://192.168.128.169:8090/admin/cancelledorders",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
        .then(res=>this.setState({cancelledOrders:res.data}))
        .catch(err=>err)


        axios.get("https://exchange.matraining.com/md",{
        headers: {
          'Access-Control-Allow-Origin': true,
        },
        })
        .then(res=>this.setState({md:res.data}))
        .catch(err=>err)
}

  state = {
    collapsed: false,
    allOrders:[],
    allUsers:[],
    openOrders:[],
    closeOrders:[],
    cancelledOrders:[],
    md:[],
    panel:()=><Pane MD={this.state.md} />
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


displayDashboard = () => this.setState({panel:()=><Pane MD={this.state.md}/>})
displayAllusers =()=>this.setState({panel:()=><AllUsers allusers={this.state.allUsers}/>})
displayAllorders =()=>this.setState({panel:()=><AllOrders allorders={this.state.allOrders} />})
displayOpenorders =()=>this.setState({panel:()=><OpenOrders openOrders={this.state.openOrders} />})
displayCloseorders =()=>this.setState({panel:()=><CloseOrders closeOrders={this.state.closeOrders}/>})
displayCancelledorders =()=>this.setState({panel:()=><CancelledOrders cancelledOrders={this.state.cancelledOrders}/>})

  render() {
    //   console.log(this.state.allOrders)
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          {/* <div className="logo"><h1>Comet</h1></div> */}

          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            <Menu.Item key="1" icon={<UserOutlined />} onClick={this.displayDashboard}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />} onClick={this.displayAllusers}>
              All USers
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />} onClick={this.displayAllorders}>
              All Orders
            </Menu.Item>
            <Menu.Item key="4" icon={<UploadOutlined />} onClick={this.displayOpenorders}>
              Open Orders
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />} onClick={this.displayCloseorders}>
              Closed Orders
            </Menu.Item>
            <Menu.Item key="6" icon={<UploadOutlined />} onClick={this.displayCancelledorders}>
              Cancelled Orders
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
              {this.state.panel()}
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Dashboard;