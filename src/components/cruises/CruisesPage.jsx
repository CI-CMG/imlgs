import React from "react"
import { Switch, Route, Link, useRouteMatch, useParams } from "react-router-dom"
import FooterPanel from "../FooterPanel"
import HeaderPanel from "../HeaderPanel"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./CruisesPage.css"
import CruisesPanel from "./CruisesPanel"
import CruisePanel from "./CruisePanel"

function CruisesPage() {
  let match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:cruiseId`}>
        <div className="CruisesPage">
          <HeaderPanel></HeaderPanel>
          <CruisePanel></CruisePanel>
          <FooterPanel></FooterPanel>
        </div>
      </Route>
      <Route path={match.path}>
        <div className="CruisesPage">
          <HeaderPanel></HeaderPanel>
          <CruisesPanel></CruisesPanel>
          <FooterPanel></FooterPanel>
        </div>
      </Route>
    </Switch>
  );
}

export default CruisesPage;
