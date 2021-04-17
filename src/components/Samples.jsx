import React from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Sample from "./Sample"
import HeaderPanel from "./HeaderPanel"
import FooterPanel from "./FooterPanel"

function Samples() {
    let match = useRouteMatch();
    return (
        <Switch>
            <Route path={`${match.path}/:sampleId`}>
                <Sample />
            </Route>
            <Route path={match.path}>
                <div>
                    <HeaderPanel></HeaderPanel>
                    <h2>Samples</h2>
                    <FooterPanel></FooterPanel>
                </div>            
            </Route>
        </Switch>
    )
}

export default Samples;