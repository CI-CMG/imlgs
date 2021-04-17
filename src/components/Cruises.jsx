import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Cruise from "./Cruise"
import HeaderPanel from "./HeaderPanel"
import FooterPanel from "./FooterPanel"


function Cruises() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:cruiseId`}>
                <Cruise />
            </Route>
            <Route path={match.path}>
                <div>
                    <HeaderPanel></HeaderPanel>
                    <h2>Cruises</h2>
                    <FooterPanel></FooterPanel>
                </div>
            </Route>
        </Switch>
    )
}

export default Cruises;