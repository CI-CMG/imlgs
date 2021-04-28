import React from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";
import Cruise from "./Cruise"
import HeaderPanel from "./LegacyHeaderPanel"
import FooterPanel from "./LegacyFooterPanel"

function Cruises() {
    let match = useRouteMatch();
    const pageName = 'Cruises'
    return (
        <Switch>
            <Route path={`${match.path}/:cruiseId`}>
                <Cruise />
            </Route>
            <Route path={match.path}>
                <>
                    <HeaderPanel activePage={pageName}></HeaderPanel>
                    <h2>Cruises</h2>
                    <FooterPanel></FooterPanel>
                </>
            </Route>
        </Switch>
    )
}

export default Cruises;