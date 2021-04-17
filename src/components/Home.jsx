import React from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom"
import FooterPanel from "./FooterPanel"
import HeaderPanel from "./HeaderPanel"

function Home() {
    let match = useRouteMatch()

    return(
        <div>
          <HeaderPanel></HeaderPanel>
          <h2>Home</h2>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/samples">Samples</Link>
            </li>
            <li>
              <Link to="/cruises">Cruises</Link>
            </li>
            <li>
              <Link to="/repositories">Repositories</Link>
            </li>
          </ul>
          <FooterPanel></FooterPanel>
        </div>
    );
}

export default Home