import React from "react"
import { useParams } from "react-router-dom"
import HeaderPanel from '../HeaderPanel'
import FooterPanel from '../FooterPanel'


function Sample() {
    let { sampleId } = useParams()
    const pageName = 'Sample'
    return (
        <>
        <HeaderPanel pageName={pageName}></HeaderPanel>
        <h3>Requested sample ID: {sampleId}</h3>
        <FooterPanel></FooterPanel>
        </>
    )
}

export default Sample;