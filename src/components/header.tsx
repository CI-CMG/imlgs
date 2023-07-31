import './header.css'

export default function Header() {

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
    </div>
  )

}