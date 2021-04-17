import React from "react"
import { useParams } from "react-router-dom"


function Sample() {
    let { sampleId } = useParams()
    return <h3>Requested sample ID: {sampleId}</h3>
}

export default Sample;