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
import MaterialUIDataGrid from "./MaterialUIDataGrid"
import SampleDetailPanel from "./SampleDetailPanel"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./SamplesPage.css"
import {extractDefaultFiltersFromUrl, buildLayerDefinitionExpression} from "../../FilterUtils";


function SamplesPage({setCount, count}) {
    console.log('inside SamplesPage...')
    let match = useRouteMatch();

    // pull out any default (initial) filter settings from URL
    const url = new URL(location.href)
    const filterDefaults = extractDefaultFiltersFromUrl(url)

    //TODO read default extent from URL
    const [geoextent, setGeoextent] = useState()
    const [zoomToSelected, setZoomToSelected] = useState(true)
    const [layerDefinitionExpression, setLayerDefinitionExpression] = useState(buildLayerDefinitionExpression(filterDefaults))

    return (
        <Switch>
            <Route path={`${match.path}/:imlgsId`}>
                <div className="SamplesDetail">
                    <HeaderPanel></HeaderPanel>
                    <SampleDetailPanel></SampleDetailPanel>
                    <FooterPanel></FooterPanel>
                </div>
            </Route>
            <Route path={match.path}>
                <div className="Samples">
                    <HeaderPanel></HeaderPanel>
                    <MapPanel
                        setSelectedExtent={setGeoextent}
                        layerDefinitionExpression={layerDefinitionExpression}
                        zoomToSelected={zoomToSelected}
                    />
                    <SamplesFilterPanel 
                        zoomToSelected={zoomToSelected} 
                        setZoomToSelected={setZoomToSelected} 
                        setLayerDefinitionExpression={setLayerDefinitionExpression} 
                        geoextent={geoextent}
                        filterDefaults={filterDefaults}
                    />
                    {/* <MaterialUIDataGrid></MaterialUIDataGrid> */}
                    <FooterPanel></FooterPanel>
                </div>            
            </Route>
        </Switch>
    )
}

export default SamplesPage