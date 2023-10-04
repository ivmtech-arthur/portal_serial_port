import { Block } from '@mui/icons-material';
import { RadialBarChart, RadialBar, Legend, Tooltip, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import StyledStop from '/components/Common/Element/Stop'

// const data = [
//   {
//     "name": "Page A",
//     "uv": 4000,
//     "pv": 2400
//   },
//   {
//     "name": "Page B",
//     "uv": 3000,
//     "pv": 1398
//   },
//   {
//     "name": "Page C",
//     "uv": 2000,
//     "pv": 9800
//   },
//   {
//     "name": "Page D",
//     "uv": 2780,
//     "pv": 3908
//   },
//   {
//     "name": "Page E",
//     "uv": 1890,
//     "pv": 4800
//   },
//   {
//     "name": "Page F",
//     "uv": 2390,
//     "pv": 3800
//   },
//   {
//     "name": "Page G",
//     "uv": 3490,
//     "pv": 4300
//   }
// ]
const between = (x, min, max) => {
  return x >= min && x <= max;
}


const data = [
  { name: 'L2', value: 90 }
];



const circleSize = 300;

const RadialBarCharts = () => {

  const value = data[0].value
  const scoreMapping = {
    excellent: {
      startColor: '#4C9A3F',
      endColor: '#BBFFB0',
    },
    good: {
      startColor: '#006AFF',
      endColor: '#B3D2FF',
    },
    average: {
      startColor: '#FF6F00',
      endColor: '#FFDEBF',
    },
    fair: {
      startColor: '#E23123',
      endColor: '#FCC9C5',
    },
    improve: {
      startColor: '#33333',
      endColor: '#DFBAEF',
    }
  }

  let colorStyle = {}

  if (between(value, 80, 100)) {
    colorStyle = scoreMapping.excellent
  } else if (between(value, 60, 79)) {
    colorStyle = scoreMapping.good
  } else if (between(value, 40, 59)) {
    colorStyle = scoreMapping.average
  } else if (between(value, 20, 39)) {
    colorStyle = scoreMapping.fair
  } else {
    colorStyle = scoreMapping.improve
  }

  return (
    <ResponsiveContainer width='100%' height={circleSize}>
      <RadialBarChart
        // width={circleSize}
        width={circleSize}
        height={circleSize}
        cx={circleSize / 2}
        cy={circleSize / 2}
        innerRadius={120}
        outerRadius={180}
        barSize={20}
        data={data}
        startAngle={90}
        endAngle={-270}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <StyledStop offset="5%" stopColor="purple2" bg="purple2" cursor="test" stopOpacity={0.7} />
            <StyledStop offset="95%" stopColor="purple2" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="1" x2="0" y2="0">
            <StyledStop offset="0%" stopColor={colorStyle.startColor} stopOpacity={1} />
            <StyledStop offset="100%" stopColor={colorStyle.endColor} stopOpacity={1} />
          </linearGradient>
        </defs>
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          isAnimationActive
          background
          clockWise
          dataKey="value"
          cornerRadius={circleSize / 2}
          fill='url(#colorPv)'
        // fill="#006AFF"
        />
        <text
          x={circleSize / 2}
          y={circleSize / 2}
          color='#333333'
          fontSize={48}
          fontFamily={'Inter'}
          //     font-style: normal;
          // font-weight: 600;
          // fontSize=48px
          // line-height: 58px;
          // /* identical to box height */

          // letter-spacing: 0.08em;
          // text-transform: uppercase;
          textAnchor="middle"
          dominantBaseline="middle"
          className="progress-label"
        >
          {value + '%'}
        </text>
      </RadialBarChart>
    </ResponsiveContainer>

  )
}

export default RadialBarCharts