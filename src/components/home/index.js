import React from 'react';
import { withAuthorization } from '../session';
import {
  Layout,
  Menu,
  Radio,
  Col,
  Row,
  Select,
  Button,
  Table,
  Tag,
  Space,
  Card,
  Slider
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import './index.css';

const columns = [
  {
    title: 'Ticker',
    dataIndex: 'ticker',
    key: 'ticker',
    render: text => <b>{text}</b>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Avg. Volatility',
    key: 'volatility',
    dataIndex: 'volatility',
    // render: tags => (
    //   <>
    //     {tags.map(tag => {
    //       let color = tag.length > 5 ? 'geekblue' : 'green';
    //       if (tag === 'loser') {
    //         color = 'volcano';
    //       }
    //       return (
    //         <Tag color={color} key={tag}>
    //           {tag.toUpperCase()}
    //         </Tag>
    //       );
    //     })}
    //   </>
    // ),
  },
  {
    title: 'Avg. Return',
    dataIndex: 'return',
    key: 'return',
  },
  {
    title: 'Weight',
    key: 'weight',
    dataIndex: 'weight'
    // render: (text, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </Space>
    // ),
  },
];

const data = [
  {
    key: '1',
    ticker: 'EQ',
    name: "Equity Index",
    type: 'EQUITY',
    volatility: 15,
    return: 30,
    weight: 25
  },
  {
    key: '2',
    ticker: 'FI',
    name: "Bond Index",
    type: 'FIXED INCOME',
    volatility: 5,
    return: 7,
    weight: 40
  },
  {
    key: '3',
    ticker: 'OI',
    name: "Oil",
    type: 'COMMODITY',
    volatility: 20,
    return: 35,
    weight: 35
  }
];

const gutters = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5
}

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      riskProfile: 2,
      portfolio: []
    }
  }

  componentDidMount(){
    this.getPortfolio();
  }

  onGutterChange = gutterKey => {
    this.setState({riskProfile: gutterKey});
    this.getPortfolio();
  }

  getPortfolio = () => {
    const { riskProfile } = this.state;

    const request = {
      params: {riskProfile: riskProfile}
    };

    axios.get('http://127.0.0.1:8080/get-portfolio', request)
      .then(response => {
        this.setState({portfolio: response.data})
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render(){
    const { riskProfile, portfolio } = this.state;

    return(
      <Row justify="center" type="flex" gutter={16}>

        {/* Portfolio */}
        <Col span={12}>
          <Card size="small" title="Portfolio" headStyle={{backgroundColor: '#f5f5f5'}}>
            <Table size="small" columns={columns} dataSource={portfolio} pagination={false} />
          </Card>
        </Col>

        {/* Restrictions */}
        <Col span={12}>
          <Card size="small" title="Risk" headStyle={{backgroundColor: '#f5f5f5'}}>
            <div className="icon-wrapper">
              <MinusOutlined />
              <Slider
                min={0}
                max={4}
                value={riskProfile}
                onChange={this.onGutterChange}
                marks={gutters}
                step={null}
                tipFormatter={value => gutters[value]}
              />
              <PlusOutlined />
            </div>
          </Card>
        </Col>

      </Row>
    )
  }
}

function removeIndicesFromHTTPResponse(response){
  var arr = [];
  Object.keys(response).forEach(function(item) {
    arr.push(response[item]);
  });
  //console.log(arr)
  return arr;
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
