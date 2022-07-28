import React, { useEffect, useRef, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import AboutPage from "./components/AboutPage"
import SamplesPage from "./components/samples/SamplesPage"
import RepositoriesPage from "./components/repositories/RepositoriesPage"
import CruisesPage from "./components/cruises/CruisesPage"
import HomePage from './components/HomePage'
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import esriConfig from '@arcgis/core/config.js'
import Sandbox from "./components/Sandbox"
// import { defineConfig } from 'vite'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import './App.css'
import ShowTablePage from './components/ShowTablePage'
import {buildQueryUrl} from "./ApiUtils";

function App() {
  console.log('inside App...')
  console.log(__VERSION__)
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  // const getAllRepositories = async() => {
  //   const queryURL = buildQueryUrl('repositories')
  //   const response = await fetch(queryURL)
  //   if (response.status !== 200) {
  //     throw "failed to retrieve list of repositories"
  //   }
  //   const data = await response.json()
  //   return data.map((item) => {
  //     return ({value: item.facility_code, label: item.facility})
  //   })
  // }
  // function lazyLoad() {
  //   getAllRepositories().then((response)=>{
  //     console.log('response: ', response)
  //     return response
  //   })
  // }
  //
  // const [allRepositories, setAllRespositories] = useState(lazyLoad)
  // console.log('allRepositories:' , allRepositories)

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
  console.log('using Router with basename ', import.meta.env.VITE_ROUTER_BASENAME)
  return (
    <QueryClientProvider client={queryClient}>   
    <Router basename={import.meta.env.VITE_ROUTER_BASENAME}>
        <Switch>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/samples">
            <SamplesPage setCount={setCount} count={count} />
          </Route>
          <Route path="/cruises">
            <CruisesPage />
          </Route>
          <Route path="/repositories">
            <RepositoriesPage />
          </Route>
          <Route path="/samples_table">
            <ShowTablePage></ShowTablePage>
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
