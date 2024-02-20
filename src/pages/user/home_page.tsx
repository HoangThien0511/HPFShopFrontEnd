import { Outlet } from "react-router-dom"
import Footer_component from "./Components/Footer"
import Header_component from "./Components/Header"
type Props = {}

const Home_page = (props: Props) => {
  return (
    <div className='homePage_user'>
      <div className="header_component">
        <Header_component />
      </div>
      <div className="home_component">
        <Outlet />
      </div>
      <div className="footer_component">
        <Footer_component />
      </div>
    </div>
  )
}

export default Home_page