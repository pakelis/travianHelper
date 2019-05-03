import React, {PureComponent} from 'react'
import {ResponsiveContainer, PieChart, Pie, Legend, Line, Cell} from 'recharts'

const COLORS = ['#CBB760', '#841C16', '#640B0A', '#9F3C2D']

class Chart2 extends PureComponent {
  render() {
    const {romans, gauls, teutons, natars} = this.props
    const data = [
      {name: 'romans', value: romans},
      {name: 'gauls', value: gauls},
      {name: 'teutons', value: teutons},
      {name: 'natars', value: natars},
    ]

    return (
      <div className="mt-5" style={{width: '80%', height: 300}}>
        <ResponsiveContainer>
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend layout="vertical" verticalAlign="middle" align="right" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default Chart2
