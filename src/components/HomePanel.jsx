import React from "react"
import { Link } from "react-router-dom"
import "./HomePanel.css"


function HomePanel() {
    // automated docs
    // const swaggerUrl = 'http://localhost/geosamples-api/swagger-ui.html'
    // customized docs
    // const swaggerUrl = 'http://localhost/geosamples-api/swagger-ui/index.html?configUrl=/geosamples-api/swagger-config.json'
    const swaggerUrl = 'https://www.ngdc.noaa.gov/geosamples-api/swagger-ui/index.html?configUrl=/geosamples-api/swagger-config.json'
    return(
        <div className="HomePanel">
            <div style={{width:"80%", background:"lightblue",textAlign: "center", margin: "auto", marginTop: "20px"}}>
                <span style={{fontSize: "large", fontWeight: "bold", }}>This new web application is a work in progress, and it will continue to be updated and improved in 
            the coming months.  For questions, please contact the NCEI Marine Geology data manager at geology.info@noaa.gov</span>
            </div>
            <div id="menuDiv" style={{marginTop: "20px"}}>
                <ul>
                    <li>
                        <a href="https://ngdc.noaa.gov/mgg/curator/">About</a>
                    </li>
                    <li>
                        <Link to="/samples">Samples</Link>
                    </li>
                    <li>
                        <Link to="/cruises">Cruises</Link>
                    </li>
                    <li>
                        <Link to="/repositories">Repositories</Link>
                    </li>
                    <li>
                        <a href={swaggerUrl}>Developer's documention (API)</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export default HomePanel
