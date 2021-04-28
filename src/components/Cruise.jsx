import React from "react"
import { useParams } from "react-router-dom"
import HeaderPanel from "./LegacyHeaderPanel"
import FooterPanel from "./LegacyFooterPanel"


function Cruise() {
    let { cruiseId } = useParams()
    const pageName = 'Cruise'
    return(
        <>
        <HeaderPanel pageName={pageName}></HeaderPanel>
        <h3>Requested cruise ID: {cruiseId}</h3>
        <FooterPanel></FooterPanel>
        </>
    )
}

export default Cruise;