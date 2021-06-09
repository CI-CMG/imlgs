import React from "react"
import { Link } from "react-router-dom"
import "./HomePanel.css"


function HomePanel() {
    // automated docs
    // const swaggerUrl = 'http://localhost/geosamples-api/swagger-ui.html'
    // customized docs
    const swaggerUrl = 'http://localhost/geosamples-api/swagger-ui/index.html?configUrl=/geosamples-api/swagger-config.json'
    return(
        <div className="HomePanel">
            <h2>Landing Page</h2>
            <ul>
                <li>
                    <Link to="/about">About</Link>
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
    )
}


export default HomePanel
