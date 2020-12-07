import React from 'react';
import {
  Row
} from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

class BackTest extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    const { backtest } = this.props;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={backtest}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="date" domain={['dataMin', 'dataMax']} />
          <YAxis/>
          <Tooltip itemSorter={item => -item.value} formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Legend />
          <Line type="monotone" dataKey="portfolio" stroke="#2A67BD" strokeWidth={2} dot={false}/>
          <Line type="monotone" dataKey="benchmark" stroke="#666F77" strokeWidth={2} dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    )
  }
}




export default BackTest;
