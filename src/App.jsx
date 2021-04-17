import React, { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom"
import About from "./components/About"
import Samples from "./components/Samples"
import Repositories from "./components/Repositories"
import Cruises from "./components/Cruises"
import Home from './components/Home'
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import esriConfig from '@arcgis/core/config.js'
import './App.css'

function App() {
  /*
  // required if not in ./public/assets
  // esriConfig.assetsPath = './esri_assets'; 
  const mapDiv = useRef(null)

  useEffect(() => {
    if (mapDiv.current) {

      const map = new ArcGISMap({
        basemap: "oceans",
      });

      const view = new MapView({
        map,
        container: mapDiv.current,
        zoom: 5,
        center: [-90, 27]
      });
    } else {
      console.warn('no mapDiv')
    }
  }, [])

  return (
    <div className="App">
      <div className="mapDiv" ref={mapDiv}>
      </div>
    </div>
  )
}
*/
  return (
    <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/samples">
            <Samples />
          </Route>
          <Route path="/cruises">
            <Cruises />
          </Route>
          <Route path="/repositories">
            <Repositories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  )
}

export default App
