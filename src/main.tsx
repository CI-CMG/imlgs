import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  HashRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import App from './App'
import Cruises from "./routes/cruises";
import Samples from "./routes/samples";
import Respositories from './routes/repositories';
import SampleDetail from './routes/sample-detail';
import CruiseDetail from './routes/cruise-detail';
import Cruise from './routes/cruise';
import RepositoryDetail from './routes/repository-detail';
import './index.css'
import SamplesTable from './routes/samples-table';
import {apiBaseUrl, routerBasename} from './envConfig'
import myConfig from './config.json'

// values from mode-specific vite.js config file
const devApiBaseUrl = import.meta.env.VITE_apiBaseUrl

// TS non-null assertion operator since root element will always exist
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="samples" element={<Samples />} />
        <Route path="samples/:sampleId" element={<SampleDetail/>} />
        <Route path="samples/table" element={<SamplesTable/>} />
        <Route path="cruises" element={<Cruises />}>
          <Route index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an Cruise to show details</p>
              </main>
            }
          />
          <Route path=":cruiseId" element={<CruiseDetail/>}/>
        </Route>
        <Route path="/cruise/:cruiseId" element={<CruiseDetail />}/>        
        <Route path="/repositories" element={<Respositories />}>
          <Route index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an Repository to show details</p>
              </main>
            }
          />
          <Route path=":repositoryId" element={<RepositoryDetail />} />
        </Route>
        {/* default to the samples endpoint */}
        <Route path="" element={<Navigate to="/samples" />} />
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
</React.StrictMode>
)
