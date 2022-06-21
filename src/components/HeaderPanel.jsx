import React from 'react';
import {useHistory} from "react-router-dom";
import Nav from 'react-bootstrap/Nav'
import './HeaderPanel.css';
import Button from "react-bootstrap/Button";


function HeaderPanel() {
    const baseClass = "HeaderPanel"
    const active=true;
    const history = useHistory()

    function openSamplesPage(evt) {
        // history.push("/samples")
        history.push("/")
    }
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
            <Button className={`${baseClass}--openSamplesBtn`} style={{marginLeft: '15px'}} onClick={openSamplesPage} variant="primary" size="sm" >Home</Button>

            {/*<Nav style={{margin:"5px", marginLeft:"75px"}} variant="pills" defaultActiveKey="/home">*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/" eventKey="Home">Home</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/samples" active={active}>Samples</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*    <Nav.Item>*/}
            {/*        <Nav.Link href="/repositories" eventKey="Repositories">Repositories</Nav.Link>*/}
            {/*    </Nav.Item>*/}
            {/*</Nav>*/}
        </header>
    )
}

export default HeaderPanel