import React from "react";
import FooterPanel from "./LegacyFooterPanel";
import HeaderPanel from "./LegacyHeaderPanel";


function About({updatePageName}) {
    const pageName = 'About'
    return(
        <>
        <HeaderPanel pageName={pageName}></HeaderPanel>
        TODO: describe the application. include credits, reference info, etc.
        <FooterPanel></FooterPanel>
        </>
    )
}

export default About;