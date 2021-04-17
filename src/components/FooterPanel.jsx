import React from 'react';
import './FooterPanel.css';


function FooterPanel() {
    
    return (
        <footer className="FooterPanel">
            <br />
            <div align="center" className="footltbg">
                <cite>When you refer to individual samples/data in the IMLGS, please cite each source repository whose data you use.
                <br />
                <br />
                More Information and how to cite the IMLGS: <a href="https://dx.doi.org/doi:10.7289/V5H41PB8" title="external link to local metadata">doi:10.7289/V5H41PB8</a>.</cite>
                <br />
                <br />
                <img src="https://www.ngdc.noaa.gov/mgg/image/arcimsitty.gif" alt="ESRI icon" width="29" height="26" border="0"/><a href="https://gis.ngdc.noaa.gov/viewers/sample_index/">Use the Interactive Map Interface</a>
                <br />
                <br />
                <script type="text/javascript" src="https://www.ngdc.noaa.gov/bin/ngdcmetafooter.js"></script>
                <noscript>
                    <div align="center">
                        <a href="https://www.ngdc.noaa.gov/">Home</a> | <a href="https://www.ngdc.noaa.gov/ngdcinfo/privacy.html">disclaimers</a> | <a href="mailto:geology.info@noaa.gov">questions</a>
                        <hr />
                        Website of the US Dept of Commerce/NOAA/NESDIS/NCEI
                        <br />
                    </div>
                </noscript>
            </div>
        </footer>
    );
}

export default FooterPanel;