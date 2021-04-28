import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useLocation
  } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import FooterPanel from "./FooterPanel"
import HeaderPanel from "./HeaderPanel"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./HomePage.css"
import HomePanel from "./HomePanel"

function HomePage() {
  console.log('inside Home...')

    let match = useRouteMatch()
    let location = useLocation();
    console.log(location)
    return(
        <div className="HomePage">
          <HeaderPanel></HeaderPanel>
          <HomePanel></HomePanel>
          <FooterPanel></FooterPanel>
        </div>
    );
}

export default HomePage