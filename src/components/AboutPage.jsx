import React from "react"
import FooterPanel from "./FooterPanel"
import HeaderPanel from "./HeaderPanel"
// import 'bootstrap/dist/css/bootstrap.min.css'
import "./AboutPage.css"
import AboutPanel from "./AboutPanel"

function AboutPage() {
    return(
        <div className="AboutPage">
          <HeaderPanel></HeaderPanel>
          <AboutPanel></AboutPanel>
          <FooterPanel></FooterPanel>
        </div>
    );
}

export default AboutPage