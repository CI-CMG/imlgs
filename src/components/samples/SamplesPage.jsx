import React, { useRef, useEffect, useState } from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Button from 'react-bootstrap/Button'  
import Sample from "./Sample"
import HeaderPanel from "../HeaderPanel"
import FooterPanel from "../FooterPanel"
import MapPanel from "./MapPanel"
import SamplesFilterPanel from "./SamplesControlPanel"
import GridPanel from "./GridPanel"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./SamplesPage.css"

function SamplesPage({setCount, count}) {
    let match = useRouteMatch();
    const pageName = 'Samples'
    const [geoextent, setGeoextent] = useState()

    return (
        <Switch>
            <Route path={`${match.path}/:sampleId`}>
                <Sample />
            </Route>
            <Route path={match.path}>
                <div className="Samples">
                {/* TODO: list of geosamples and filtering controls. Also includes map and table of results */}

                    <HeaderPanel pageName={pageName} count={count}></HeaderPanel>
                    <MapPanel
                        setSelectedExtent={setGeoextent}
                    />
                    <SamplesFilterPanel geoextent={geoextent} setCount={setCount} count={count}></SamplesFilterPanel>
                    <GridPanel></GridPanel>
                    <FooterPanel></FooterPanel>
                </div>            
            </Route>
        </Switch>
    )
}

export default SamplesPage