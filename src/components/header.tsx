import './header.css'
import { NavLink, useSearchParams } from "react-router-dom"
import { searchParamsToFilters } from "../utilities"
import BasicMenu from './imlgs-nav-menu'

export default function Header() {
  // console.log('rendering Header...')
  const url = new URL(window.location.href)
  const filters = searchParamsToFilters(url.searchParams)

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

  function constructNavLink(base:string) {
    const searchParamsString = filters.size ? `?${filters.toString()}` : ''
    return `/${base}${searchParamsString}`
  }

  return (
    <div className='Header'>
      <div className='Header--container'>
      <div className='Header--left'>
        <a href="https://www.ncei.noaa.gov/" title="National Centers for Environmental Information, National Oceanic and Atmospheric Administration">
          <img className="Header--nceiLogo" src="https://gis.ngdc.noaa.gov/images/imlgs/map-banner.png" alt="National Centers for Environmental Information, National Oceanic and Atmospheric Administration"/>
        </a>
        <div id="breadcrumbs">
          <NavLink to={constructNavLink('samples')} style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Samples</NavLink> | {" "}
          <NavLink to={constructNavLink('cruises')} style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Cruises</NavLink>  | {" "}
          <NavLink to={constructNavLink('repositories')} style={({isActive}) => isActive ? activeStyle : inactiveStyle}>Repositories</NavLink>
        </div>
      </div>
      <div className='Header--center' style={{paddingTop: '25px'}}>
      <span className='Header--title'>Index to Marine and Lacustrine Geological Samples (IMLGS)</span>
      </div>
      <div className='Header--right'>
        <a href="https://www.nsf.gov/div/index.jsp?div=OCE" title="external link to the National Science Foundation Ocean Sciences Division" target="_top">
          <img className="Header--nsfLogo" src="https://gis.ngdc.noaa.gov/images/imlgs/NSFLogo.png" alt="US National Science Foundation Division of Ocean Sciences"/>
        </a>
        <div style={{float: 'right'}}>
          <BasicMenu/>
        </div>
      </div>
      </div>
    </div>
  )

}