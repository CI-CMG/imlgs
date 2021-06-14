import React from 'react';
import Nav from 'react-bootstrap/Nav'
import './HeaderPanel.css';


function HeaderPanel() {
    const baseClass = "HeaderPanel"
    const active=true;
    
    return (
        <header className={baseClass}>
           <a href="https://www.ncei.noaa.gov/" title="National Centers for Environmental Information, National Oceanic and Atmospheric Administration">
              <img className={`${baseClass}--nceiLogo`} src="https://maps.ngdc.noaa.gov/images/imlgs/map-banner.png" alt="National Centers for Environmental Information, National Oceanic and Atmospheric Administration"/>
            </a>
            <div className={`${baseClass}--titleDiv`}>
                <span className={`${baseClass}--title`}>Index to Marine and Lacustrine Geological Samples (IMLGS)</span>
            </div>
            <span href="https://www.nsf.gov/div/index.jsp?div=OCE" title="external link to the National Science Foundation Ocean Sciences Division" target="_top">
                <img className={`${baseClass}--nsfLogo`} src="https://maps.ngdc.noaa.gov/images/imlgs/NSFLogo.png" alt="US National Science Foundation Division of Ocean Sciences"/>
            </span>

            {/* <Nav style={{margin:"5px", marginLeft:"75px"}} variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/" eventKey="Home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/samples" active={active}>Samples</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/repositories" eventKey="Repositories">Repositories</Nav.Link>
                </Nav.Item>
            </Nav> */}
        </header>
    )
}

export default HeaderPanel