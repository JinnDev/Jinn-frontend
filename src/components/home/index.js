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
import BackTest from '../backtest'
import BacktestPerformance from '../backtestperformance';

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
    dataIndex: 'historical_vol',
    render: text => <p>{text} %</p>,
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
    title: 'Weight',
    key: 'weight',
    dataIndex: 'weight',
    render: text => <b>{text} %</b>,
    // render: (text, record) => (
    //   <Space size="middle">
    //     <a>Invite {record.name}</a>
    //     <a>Delete</a>
    //   </Space>
    // ),
  },
];

const gutters = {
  0: 1,
  1: 2,
  2: 3,
  3: 4,
  4: 5
}

const placeHolderPerformance = {
  benchmark : {
      return:  "-",
      vol: "-",
      name: "-"
    },
    portfolio: {
      return:  "-",
      vol: "-"
    }
}
class HomePage extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      gutterKey: 2,
      portfolio: [],
      backtest: [],
      backtestPerformance: placeHolderPerformance
    }
  }

  componentDidMount(){
    this.getPortfolio(2);
  }

  onGutterChange = gutterKey => {
    this.setState({gutterKey: gutterKey});
    this.getPortfolio(gutterKey);
  }

  getPortfolio = (riskLevel) => {

    const request = {
      params: {riskLevel: riskLevel}
    };

    axios.get('http://127.0.0.1:8080/get-portfolio', request)
      .then(response => {
        console.log(response.data)
        this.setState({
          portfolio: response.data.portfolio,
          backtest: response.data.backtest,
          backtestPerformance: response.data.backtestPerformance
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render(){
    const { gutterKey, portfolio, backtest, backtestPerformance } = this.state;

    return(
      <Row justify="center" type="flex" gutter={16}>
        {/* Left */}
        {/* Portfolio */}
        <Col span={12}>
          <Card size="small" title="Portfolio" headStyle={{backgroundColor: '#f5f5f5'}}>
            <Table size="small" columns={columns} dataSource={portfolio} pagination={false} />
          </Card>
        </Col>
        {/* Right Side */}
        <Col span={12}>
          {/* Restrictions */}
          <Card size="small" title="Risk" headStyle={{backgroundColor: '#f5f5f5'}}>
            <div className="icon-wrapper">
              <MinusOutlined />
              <Slider
                min={0}
                max={4}
                value={gutterKey}
                onChange={this.onGutterChange}
                marks={gutters}
                step={null}
                tipFormatter={value => gutters[value]}
              />
              <PlusOutlined />
            </div>
          </Card>
          <br />
          {/* Backtest */}
          <Card size="small" title="Backtest" headStyle={{backgroundColor: '#f5f5f5'}}>
            <BackTest backtest={backtest} />
          </Card>
          <br />
          {/* Backtest Performance*/}
          <BacktestPerformance backtestPerformance={backtestPerformance} />
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
  return arr;
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
