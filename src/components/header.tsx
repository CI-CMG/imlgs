import './header.css'
import { NavLink } from "react-router-dom"
import { searchParamsToFilters } from "../utilities"

export default function Header() {
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)
  console.log('inside headers: ', filters)
  const activeStyle = {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "larger"
  }

  const inactiveStyle = {
    textDecoration: "underline",
    color:"white"
  }

  return (
    <div className='Header'>
    <header>
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
          <NavLink to={`/cruises?${filters.toString()}`} style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Cruises</NavLink>  | {" "}
          <NavLink to="/repositories" style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Respositories</NavLink>
        </div>
        {/* <BasicMenu/> */}
      </nav>
    </div>
  )

}