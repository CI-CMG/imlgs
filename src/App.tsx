import { useState } from 'react'
import { Outlet, Link, NavLink, useLocation, useMatch, useResolvedPath, renderMatches } from "react-router-dom";
// import useBreadcrumbs from 'use-react-router-breadcrumbs'
import {
  useQuery,
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from 'react-query'
import {ReactQueryDevtools} from "react-query/devtools"
import GlobalLoadingIndicator from './global-loading-indicator'
import BasicMenu from './components/imlgs-nav-menu';
import './App.css'

const queryClient = new QueryClient()


export default function App() {
  console.log('redrawing App...')
  const [renderCount, setRenderCount] = useState(0)
  
  // let location = useLocation();
  // console.log(location.pathname)
  let activeStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "larger"
  }

  let inactiveStyle = {
    textDecoration: "underline",
    color:"white"
  }


  console.log('render count: ', renderCount)
  return (
    <div>
      <header className="Header">
           <a href="https://www.ncei.noaa.gov/" title="National Centers for Environmental Information, National Oceanic and Atmospheric Administration">
              <img className="Header--nceiLogo" src="https://maps.ngdc.noaa.gov/images/imlgs/map-banner.png" alt="National Centers for Environmental Information, National Oceanic and Atmospheric Administration"/>
            </a>
            <div className="Header--titleDiv">
                <span className={"Header--title"}>Index to Marine and Lacustrine Geological Samples (IMLGS)</span>
            </div>
            <span>
                <a href="https://www.nsf.gov/div/index.jsp?div=OCE" title="external link to the National Science Foundation Ocean Sciences Division" target="_top">
                  <img className="Header--nsfLogo" src="https://maps.ngdc.noaa.gov/images/imlgs/NSFLogo.png" alt="US National Science Foundation Division of Ocean Sciences"/>
                </a>
            </span>
        </header>
      <nav
        style={{
          borderBottom: "solid 1px",
          // paddingBottom: "1rem",
          display: "flex",
          justifyContent: "space-between",
          verticalAlign: "top"
        }}
        className="Nav"
      >
        <div id="breadcrumbs">
          <NavLink to="/samples" style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Samples</NavLink> | {" "}
          <NavLink to="/cruises" style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Cruises</NavLink>  | {" "}
          <NavLink to="/repositories" style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Respositories</NavLink>
        </div>
        <BasicMenu/>
      </nav>
      <QueryClientProvider client={queryClient}>
        <Outlet/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      
    </div>
  );
}
