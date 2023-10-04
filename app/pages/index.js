import Block from '/components/Common/Element/Block'
import BarCharts from '/components/Recharts/BarChart'
import LineChart from '/components/Recharts/LineChart'
import PieCharts from '/components/Recharts/PieChart'
import RadialBarCharts from '/components/Recharts/RadialBarChart'
import StyledH1 from '/components/Common/Element/H1'
import Calendar from '../components/test/test'
// import { useStore } from '/store'

export default function Home() {
  return (
    <div>
      <StyledH1>test</StyledH1>
      <BarCharts />
      <LineChart />
      <PieCharts />
      <RadialBarCharts/>
      <Calendar/>
    </div>

    // <StyledH1>Home</StyledH1>
  )
}
