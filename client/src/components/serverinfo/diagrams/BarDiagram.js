import React, {PureComponent} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

class BarDiagram extends PureComponent {
  render() {
    // const {fifty,hundred,threehundred,fivehundred,onethousand,kplus} = this.props
    const data = [
      {name: '0-50', villages: this.props.fifty},
      {name: '50-100', villages: this.props.hundred},
      {name: '100-300', villages: this.props.threehundred},
      {name: '300-500', villages: this.props.fivehundred},
      {name: '500-800', villages: this.props.fivetoeight},
      {name: '800-1000', villages: this.props.onethousand},
      {name: '1000+', villages: this.props.kplus},
    ]
    return (
      <div className="mt-5">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            interval={0}
            angle={-45}
            textAnchor="end"
            width={80}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="villages" fill="#8884d8" background={{fill: '#eee'}} />
        </BarChart>
        {console.log(this.props)}
      </div>
    )
  }
}

export default BarDiagram
