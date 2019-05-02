import React, {PureComponent} from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'

const data = [
  {name: 'Group A', value: 400},
  {name: 'Group B', value: 300},
  {name: 'Group C', value: 300},
  {name: 'Group D', value: 200},
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

class Chart extends PureComponent {
  state = {
    data: this.props.data,
    tribes: {
      teutons: null,
      romans: null,
      gauls: null,
      natars: null,
    },
  }

  componentDidMount() {
    this.getTribes()
    console.log(this.state.tribes)
  }

  componentDidUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.getTribes()
    }
  }

  //Parsing data - teutons, romans, gauls , natars
  getTribes() {
    const {data} = this.state
    let teutons = 0
    let romans = 0
    let gauls = 0
    let natars = 0

    data.forEach(val => {
      if (val.tribeId === '1') {
        teutons += 1
      } else if (val.tribeId === '2') {
        romans += 1
      } else if (val.tribeId === '3') {
        gauls += 1
      } else if (val.tribeId === '5') {
        natars += 1
      }
    })

    this.setState({
      tribes: {
        teutons: teutons,
        romans: romans,
        gauls: gauls,
        natars: natars,
      },
    })
  }

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    )
  }
}

export default Chart
