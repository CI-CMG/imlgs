import React from "react"
import { useParams } from "react-router-dom"

function Cruise() {
    let { cruiseId } = useParams()
    return <h3>Requested cruise ID: {cruiseId}</h3>
}

export default Cruise;