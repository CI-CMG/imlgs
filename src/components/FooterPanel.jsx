import React from 'react'
import './FooterPanel.css'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

function FooterPanel() {
    
    return (
        <footer className="FooterPanel">
        <div className="FooterPanel--breadcrumbDiv">
            <Breadcrumb className="FooterPanel--breadcrumb">
                <Breadcrumb.Item href="https://www.ncei.noaa.gov/privacy" title="NOAA's Privacy Policy">Privacy Policy</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.noaa.gov/foia-freedom-of-information-act" title="Freedom of Information Act">Freedom Of Information Act</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.cio.noaa.gov/services_programs/info_quality.html" title="Information Quality">Information Quality</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.noaa.gov/disclaimer.html" title="Disclaimer">Disclaimer</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.ncdc.noaa.gov/survey" title="Take Our Site Survey">Take Our Survey</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.commerce.gov/" title="United States Department of Commerce">Department of Commerce</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.noaa.gov/" title="NOAA">NOAA</Breadcrumb.Item>
                <Breadcrumb.Item href="https://www.nesdis.noaa.gov/" title="NESDIS">NESDIS</Breadcrumb.Item>
                <Breadcrumb.Item href="mailto:ncei.info@noaa.gov" rel="nofollow">Contact Us</Breadcrumb.Item>
            </Breadcrumb>
        </div>
        </footer>
    )
}

export default FooterPanel