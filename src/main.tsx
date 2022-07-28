import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import App from './App'
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
import Cruises from "./routes/cruises";
import Samples from "./routes/samples";
import Respositories from './routes/repositories';
import SampleDetail from './routes/sample-detail';
import CruiseDetail from './routes/cruise-detail';
import Cruise from './routes/cruise';
import RepositoryDetail from './routes/repository-detail';
import './index.css'
import SamplesTable from './routes/samples-table';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route path="expenses" element={<Expenses />} />
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
        <Route path="cruises/:cruiseId/:platformId" element={<Cruise />}/>        
        <Route path="repositories" element={<Respositories />}>
          <Route index
            element={
              <main style={{ padding: "1rem" }}>
                <p>Select an Repository to show details</p>
              </main>
            }
          />
          <Route path=":repositoryId" element={<RepositoryDetail />} />
        </Route>
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
