import React, { useRef, useEffect, useState } from "react";
import {
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
import Button from 'react-bootstrap/Button'  
import Sample from "./Sample"
import HeaderPanel from "./HeaderPanel"
import FooterPanel from "./FooterPanel"
import MapPanel from "./MapPanel"
import SamplesFilterPanel from "./SamplesFilterPanel"
import GridPanel from "./GridPanel"
import MaterialUIDataGrid from "./MaterialUIDataGrid"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./Samples.css"

function Samples({setCount, count}) {
    console.log('inside Samples...')
    let match = useRouteMatch();
    const pageName = 'Samples'
   
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
                        setSelectedExtent={setSelectedExtent}
                        repository={repository}
                    />
                    <SamplesFilterPanel setCount={setCount} count={count}></SamplesFilterPanel>
                    <MaterialUIDataGrid></MaterialUIDataGrid>
                    <FooterPanel></FooterPanel>
                </div>            
            </Route>
        </Switch>
    )
}

export default Samples