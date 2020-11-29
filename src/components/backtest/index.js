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
    this.state = {
      data: null
    }
  }

  componentDidMount(){
    // const request = {
    //
    // };
    //
    axios.get('http://127.0.0.1:8080/get-backtest')
      .then(response => {
        this.setState({data: response.data})
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  render(){
    const { data } = this.state;

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="date" domain={['dataMin', 'dataMax']} />
          <YAxis/>
          <Tooltip itemSorter={item => -item.value} formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#000000" strokeWidth={2}/>
        </LineChart>
      </ResponsiveContainer>
    )
  }
}




export default BackTest;
