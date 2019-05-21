import React, {PureComponent} from 'react'
import {ResponsiveContainer, PieChart, Pie, Legend, Cell} from 'recharts'

const COLORS = ['#CBB760', '#841C16', '#640B0A', '#9F3C2D']

class PieDiagram extends PureComponent {
  state = {
    tribes: {
      teutons: this.props.teutons,
      romans: this.props.romans,
      gauls: this.props.gauls,
      natars: this.props.natars,
    },
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
        // () => console.log(this.state),
      )
    }
  }

  render() {
    const {romans, gauls, teutons, natars} = this.state.tribes
    const data = [
      {name: 'romans', value: romans},
      {name: 'gauls', value: gauls},
      {name: 'teutons', value: teutons},
      {name: 'natars', value: natars},
    ]

    return (
      <div className="row justify-content-center">
        <div className="mt-5" style={{width: '90%', height: 300}}>
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
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}

export default PieDiagram
