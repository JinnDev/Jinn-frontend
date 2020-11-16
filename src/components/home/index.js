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
    weight: 0.25
  },
  {
    key: '2',
    ticker: 'FI',
    name: "Bond Index",
    type: 'FIXED INCOME',
    volatility: 5,
    return: 7,
    weight: 0.4
  },
  {
    key: '3',
    ticker: 'OI',
    name: "Oil",
    type: 'COMMODITY',
    volatility: 20,
    return: 35,
    weight: 0.35
  }
];

const gutters = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
}

class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {gutterKey: 3}
  }

  onGutterChange = gutterKey => {
    this.setState({gutterKey: gutterKey});
  }

  render(){
    const { gutterKey } = this.state;

    return(
      <Row justify="center" type="flex" gutter={16}>
        {/* Portfolio */}
        <Col span={12}>
          <Card size="small" title="Portfolio" headStyle={{backgroundColor: '#f5f5f5'}}>
            <Table size="small" columns={columns} dataSource={data} pagination={false} />
          </Card>
        </Col>
        {/* Restrictions */}
        <Col span={12}>
          <Card size="small" title="Risk Profile" headStyle={{backgroundColor: '#f5f5f5'}}>
            <div className="icon-wrapper">
              <MinusOutlined />
              <Slider
                min={0}
                max={5}
                value={gutterKey}
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

const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
