import React from 'react';
import './HeaderPanel.css';


function HeaderPanel() {
    
    return (
        <header className="HeaderPanel">
            <table width="100%" align="center" border="0" cellPadding="0" cellSpacing="0" summary="layout table">
            <tbody>
                <tr>
                    <td>
                        <div className="header">
                            <div className="ngdcheader">
                                <a href="https://www.ngdc.noaa.gov/" target="_top"><img src="https://www.ngdc.noaa.gov/image/nesdisngdcleft.gif" alt="NOAA logo, National Centers for Environmental Information, National Oceanic and Atmospheric Administration" border="0"/></a>
                            </div>
                            <div className="imageright">
                                <a href="https://www.nsf.gov/div/index.jsp?div=OCE" title="external link to the National Science Foundation Ocean Sciences Division" target="_top"><img src="https://www.ngdc.noaa.gov/mgg/image/nsflogo.gif" width="50" height="50" border="0" alt="US National Science Foundation Division of Ocean Sciences"/></a>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
            <div className="imlgs" align="center">
                <a href="https://dx.doi.org/doi:10.7289/V5H41PB8" className="imlgs">Index to Marine and Lacustrine Geological Samples (IMLGS)</a>
            </div>
    </header>
    );
}

export default HeaderPanel;