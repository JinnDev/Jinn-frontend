
import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

class BacktestPerformance extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { backtestPerformance } = this.props;

    return (
      <Row gutter={16}>
        <Col span={12}>
          <Card title={"Portfolio Performance"} headStyle={{backgroundColor: '#f5f5f5'}}>
            <Statistic title="Average Return" value={backtestPerformance.portfolio.return} suffix="%" precision={2} />
            <Statistic title="Volatility" value={backtestPerformance.portfolio.vol} suffix="%" precision={2}/>
            <Statistic title="Sharpe Ratio" value={backtestPerformance.portfolio.sharpe} precision={2}/>
          </Card>
        </Col>
        <Col span={12}>
          <Card title={backtestPerformance.benchmark.name + " Performance"} headStyle={{backgroundColor: '#f5f5f5'}}>
            <Statistic title="Average Return" value={backtestPerformance.benchmark.return} suffix="%" precision={2} />
            <Statistic title="Volatility" value={backtestPerformance.benchmark.vol} suffix="%" precision={2}/>
            <Statistic title="Sharpe Ratio" value={backtestPerformance.benchmark.sharpe} precision={2}/>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default BacktestPerformance;
