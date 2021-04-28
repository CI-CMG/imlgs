import React, { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import About from "./components/About"
import SamplesPage from "./components/samples/SamplesPage"
import RepositoriesPage from "./components/RepositoriesPage"
import Cruises from "./components/Cruises"
import HomePage from './components/HomePage'
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import esriConfig from '@arcgis/core/config.js'
import Sandbox from "./components/Sandbox"
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'

function App() {
  console.log('inside App...')
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

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
  console.log('inside App...')
  return (
    <QueryClientProvider client={queryClient}>   
    <Router>
        <Switch>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/samples">
            <SamplesPage setCount={setCount} count={count} />
          </Route>
          <Route path="/cruises">
            <Cruises />
          </Route>
          <Route path="/repositories">
            <RepositoriesPage />
          </Route>
          <Route path="/sandbox">
            <Sandbox></Sandbox>
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
    </QueryClientProvider>
  )
}

export default App
