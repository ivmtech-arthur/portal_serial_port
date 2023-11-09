import Block from 'components/Common/Element/Block'
import BarCharts from 'components/Recharts/BarChart'
import LineChart from 'components/Recharts/LineChart'
import PieCharts from 'components/Recharts/PieChart'
import RadialBarCharts from 'components/Recharts/RadialBarChart'
import StyledH1 from 'components/Common/Element/H1'
import Calendar from 'components/test/test'
// import { useStore } from '/store'



import withLogin from "/lib/with-login"

const Home = () => {

 

  return (<></>)
}
export const getServerSideProps = withLogin(
  async (ctx) => {
    if (ctx?.props?.profile) {
      return {
        redirect: {
          permanent: false,
          destination: '/en/machine-list',
        },
        props: {},
      }
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/en/login',
        },
        props: {},
      }
    }
  },
  {
    // type: 'authenticated',
    tokenKey: 'refreshToken',
  }
)


export default Home