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

// TS non-null assertion operator since root element will always exist
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter basename="/viewers/beta/imlgs/"> */}
    {/* <BrowserRouter basename={"/imlgs/"}> */}
    <BrowserRouter basename={"/viewers/imlgs/"}>
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
        <Route path="/cruises/:cruiseId/:platformId" element={<Cruise />}/>        
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
