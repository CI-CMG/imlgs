import React from "react"
import FooterPanel from "./FooterPanel"
import HeaderPanel from "./HeaderPanel"
import "./HomePage.css"
import HomePanel from "./HomePanel"

function HomePage() {
  console.log('inside Home...')
  console.log(import.meta.env.TESTME)
  // let match = useRouteMatch()
  // let location = useLocation();
    // console.log(location)
    return(
        <div className="HomePage">
          <HeaderPanel></HeaderPanel>
          <HomePanel></HomePanel>
          <FooterPanel></FooterPanel>
        </div>
    );
}

export default HomePage