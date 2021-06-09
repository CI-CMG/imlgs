import React from "react"
import { useParams } from "react-router-dom"
import "./CruisePanel.css"


function CruisePanel() {
    const {cruiseId} = useParams();
    return (
        <div className="CruisePanel">
            <h2>detail on cruise {cruiseId}</h2>
            <h4>Coming soon...</h4>
        </div>
    )
}

export default CruisePanel
