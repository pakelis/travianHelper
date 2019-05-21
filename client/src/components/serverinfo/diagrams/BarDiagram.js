import React, {PureComponent} from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

class BarDiagram extends PureComponent {
  state = {
    population: {
      fifty: this.props.fifty,
      hundred: this.props.hundred,
      threehundred: this.props.threehundred,
      fivehundred: this.props.fivehundred,
      fivetoeight: this.props.fivetoeight,
      onethousand: this.props.onethousand,
      kplus: this.props.kplus,
    },
  }

  componentDidUpdate(nextProps) {
    if (
      this.props.fifty !== nextProps.fifty ||
      this.props.threehundred !== nextProps.threehundred ||
      this.props.hundred !== nextProps.hundred ||
      this.props.fivehundred !== nextProps.fivehundred ||
      this.props.fivetoeight !== nextProps.fivetoeight ||
      this.props.onethousand !== nextProps.onethousand ||
      this.props.kplus !== nextProps.kplus
    ) {
      this.setState({
        population: {
          ...this.state.population,
          fifty: this.props.fifty,
          hundred: this.props.hundred,
          threehundred: this.props.threehundred,
          fivehundred: this.props.fivehundred,
          fivetoeight: this.props.fivetoeight,
          onethousand: this.props.onethousand,
          kplus: this.props.kplus,
        },
      })
    }
  }

  render() {
    const {
      fifty,
      hundred,
      threehundred,
      fivehundred,
      fivetoeight,
      onethousand,
      kplus,
    } = this.state.population
    const data = [
      {name: '0-50 pop', villages: fifty},
      {name: '50-100 pop', villages: hundred},
      {name: '100-300 pop', villages: threehundred},
      {name: '300-500 pop', villages: fivehundred},
      {name: '500-800 pop', villages: fivetoeight},
      {name: '800-1000 pop', villages: onethousand},
      {name: '1000+ pop', villages: kplus},
    ]
    return (
      <div className="row justify-content-center">
        <div className="barchart mt-5" style={{width: '60%', height: 400}}>
          <ResponsiveContainer>
            <BarChart
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
                hide={true}
                dataKey="name"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={120}
                tick={{fontWeight: 'bold'}}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="villages"
                fill="#9F3C2D"
                background={{fill: '#eee'}}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    )
  }
}

export default BarDiagram
