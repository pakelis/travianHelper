import React, {PureComponent} from 'react'
import {PieChart, Pie, Sector, Cell} from 'recharts'

const COLORS = ['#CBB760', '#841C16', '#640B0A', '#9F3C2D']

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
    tribes: {
      teutons: this.props.teutons,
      romans: this.props.romans,
      gauls: this.props.gauls,
      natars: this.props.natars,
    },
  }

  componentDidMount() {
    console.log(this.state)
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.teutons !== nextProps.teutons ||
      this.props.gauls !== nextProps.gauls ||
      this.props.natars !== nextProps.natars ||
      this.props.romans !== nextProps.romans
    ) {
      this.setState(
        {
          tribes: {
            ...this.state.tribes,
            teutons: this.props.teutons,
            romans: this.props.romans,
            gauls: this.props.gauls,
            natars: this.props.natars,
          },
        },
        () => console.log(this.state),
      )
    }
  }

  render() {
    //Data to render pie chart
    const {romans, gauls, teutons, natars} = this.state.tribes
    const data = [
      {name: 'romans', value: romans},
      {name: 'gauls', value: gauls},
      {name: 'teutons', value: teutons},
      {name: 'natars', value: natars},
    ]

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
