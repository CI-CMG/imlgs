import React from "react"
import {Link, useParams} from "react-router-dom"
import HeaderPanel from "../LegacyHeaderPanel"
import FooterPanel from "../LegacyFooterPanel"


function Cruise() {
    console.log('rendering Cruise...')
    let { cruiseId } = useParams()
    const pageName = 'Cruise'
    return(
        <>
        <HeaderPanel pageName={pageName}></HeaderPanel>
        <h3>Requested cruise ID: {cruiseId}</h3>
            {(!cruiseList) ? <h4>no data</h4>: ''}
            {cruiseList ?
                <table className={`${baseClass}--datatable`}>
                    <thead>
                    <tr>
                        <th>Cruise</th>
                        <th>Alt Cruise/Leg</th>
                        <th>Ship/Platform</th>
                        <th>Repository</th>
                    </tr>
                    </thead>
                    <tbody>{
                        cruiseList.map(item => (
                            <tr key={item.objectid}>
                                <td>{item.cruise}</td>
                                <td>{item.leg}</td>
                                <td>{item.platform}</td>
                                <td><Link to={{pathname:`/repositories/${item.facility_code}`}}>{item.facility_code}</Link></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                : ''
            }

        <FooterPanel></FooterPanel>
        </>
    )
}

export default Cruise;