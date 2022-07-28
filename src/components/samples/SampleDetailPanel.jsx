import {LinkSharp} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import "./SampleDetailPanel.css"


function SampleDetailPanel() {
    // console.log('inside SampleDetailPanel...')
    const {imlgsId} = useParams();
    const [sample, setSample] = useState()
    const [intervals, setIntervals] = useState([])
    const [recordNotFound, setRecordNotFound] = useState()
    // console.log('intervals: ', intervals)

    useEffect(async () => {
        console.debug(`getting intervals for sample ${imlgsId}...`);
        const queryURL = `${apiBaseUrl}/intervals?imlgs=${imlgsId}`
        // console.debug(queryURL)

        const response = await fetch(queryURL)
        if (response.status == 404) {
            console.warn(`no intervals for IMLGS ${imlgsId}`)
        }
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve data")
            return
        }
        const json = await response.json()
        // console.debug(`${json.length} intervals retrieved`)
        // console.debug(json)
        // json.forEach(item => console.log(item.interval))
        setIntervals(json)
    }, []);


    useEffect(async () => {
        console.debug(`getting details for sample ${imlgsId}...`);
        const queryURL = `${apiBaseUrl}/samples/${imlgsId}`
        // console.debug(queryURL)

        const response = await fetch(queryURL)
        if (response.status == 404) {
            setRecordNotFound(true)
        }
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve data")
            return
        }
        const json = await response.json()
        // console.debug(`record retrieved`)
        // console.debug(json)
        // console.log('calling setSample with ', json)
        setSample(json)
    }, []);


    function formatInterval(interval) {
        const fieldsList = [
            // {label: 'Interval', field: 'interval' },
            {label: 'Primary Lithologic Composition', field: 'lith1' },
            {label: 'Primary Texture', field: 'text1' },
            {label: 'Secondary Lithologic Composition', field: 'lith2'},
            {label: 'Secondary Texture', field: 'text2' },
            {label: 'Other Component 1', field: 'comp1' },
            {label: 'Other Component 2', field: 'comp2' },
            {label: 'Other Component 3', field: 'comp3' },
            {label: 'Other Component 4', field: 'comp4' },
            {label: 'Other Component 5', field: 'comp5' },
            {label: 'Other Component 6', field: 'comp6' },
            {label: 'Rock Lithology', field: 'rock_lith' },
            {label: 'Rock Mineralogy', field: 'rock_min' },
            {label: 'Rock Weathering and Metamorphism', field: 'weath_meta' },
            {label: 'Rock Glass Remarks and MN/Fe Oxide Coating', field: 'remark'},
            {label: 'Geologic Age', field: 'age' },
            {label: 'Absolute Age Top', field: 'absolute_age_top' },
            {label: 'Absolute Age Bottom', field: 'absolute_age_bottom' },
            {label: 'Color (Munsell Code)', field: 'munsell_code' },
            {label: 'Description', field: 'description' },
            {label: 'Comments', field: 'int_comments' },
            {label: 'Exhausted - No Longer Available', field: 'exhaust_code' },
            {label: 'IGSN', field: 'igsn' },
            {label: 'Photo Link', field: 'photo_link' }
        ]

        let rows = []
        let title = interval.interval ? `Interval ${interval.interval}`: ''
        if (interval.depth_top != null && interval.depth_bot != null) {
            title += `: ${interval.depth_top} to ${interval.depth_bot} cm in core`
        }
        rows.push(title)
        fieldsList.filter(item => interval[item.field]).forEach(item => {
           rows.push(`${item.label}: ${interval[item.field]}`)
        })

        return (
            <table key={interval.interval}>
                <thead></thead>
                <tbody>
                {rows.map((row, idx) => <tr key={idx}>
                    <td>{row}</td>
                </tr>)}
                </tbody>
            </table>
        )
    }


    function formatLinks(links) {
        // console.log('inside formatLinks with ', links)
        return (
            <div>
                <ul>
                    {links.map((row, idx) => <li key={idx}><a
                        href={row.link}>{row.linklevel} {row.type} at {row.source}</a></li>)}
                </ul>
            </div>
        )
    }

    function formatCruiseLinks(links, cruise) {
        // console.log('inside formatCruiseLinks with ', links)
        return (
            <div>
                <ul>
                    {links.map((row, idx) => <li key={idx}><a href={row.link}>{cruise} {row.type} at {row.source}</a>
                    </li>)}
                </ul>
            </div>
        )
    }

    //format string of YYYYMMDD to YYYY-MM-DD
    function formatDate(dateString) {
        const chars = dateString.split('')
        return(`${chars.slice(0,4).join('')}-${chars.slice(4,6).join('')}-${chars.slice(6,8).join('')}`)
    }


    // WARNING: this is called twice with same Sample record
    function formatSampleDetail(sample) {
        // console.log('inside formatSampleDetail with ', sample)

        // shallow clone. Avoid modifying the state variable which is passed in
        let sampleClone = Object.assign({}, sample)

        // augment or reformat certain fields individually
        if (sampleClone.lon && sampleClone.lat) {
            sampleClone.location = `${sampleClone.lat}, ${sampleClone.lon}`
        }
        if (sampleClone.end_lon && sampleClone.end_lat) {
            sampleClone.end_location = `${sampleClone.end_lat}, ${sampleClone.end_lon}`
        }

        if (sampleClone.water_depth) {
            sampleClone.water_depth = sampleClone.water_depth.toLocaleString()
        }
        if (sampleClone.end_water_depth) {
            sampleClone.end_water_depth = sampleClone.end_water_depth.toLocaleString()
        }

        // Date fields seem to all be YYYYMMDD format
        let fieldList = ['last_update', 'begin_date', 'end_date']
        fieldList.filter(i => sampleClone[i]).forEach(i => {
                sampleClone[i] = formatDate(sampleClone[i])
        })
        //TODO why does array literal behave differently?
        //['water_depth', 'end_water_depth'].forEach(i => console.log(i))
        fieldList = ['water_depth', 'end_water_depth']
        fieldList.filter(i => sampleClone[i]).forEach((i) => {
            sampleClone[i] = sampleClone[i].toLocaleString()
        })

        //see https://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html
        const fieldsList = [
            // {label: 'Repository', field: 'facility' },
            {label: 'Ship/Platform', field: 'platform' },
            // {label: 'Cruise ID', field: 'cruise' },
            {label: 'Leg', field: 'leg' },
            {label: 'Sample ID', field: 'sample' },
            {label: 'Sampling Device', field: 'device' },
            {label: 'Latitude/Longitude', field: 'location'},
            {label: 'Ending Latitude/Longitude', field: 'end_location'},
            {label: 'Water Depth (m)', field: 'water_depth' },
            {label: 'Ending Water Depth (m)', field: 'end_water_depth' },
            {label: 'Date Sample Collected', field: 'begin_date' },
            {label: 'Date Sample Collection Ended', field: 'end_date' },
            {label: 'Principal Investigator', field: 'pi' },
            {label: 'Storage Method', field: 'storage_meth' },
            {label: 'Physiographic Province', field: 'province' },
            {label: 'Lake', field: 'lake' },
            {label: 'Core Length (cm)', field: 'cored_length' },
            {label: 'Core Diameter(cm)', field: 'cored_diam' },
            {label: 'Sample Comments', field: 'sample_comments' },
            {label: 'IGSN', field: 'igsn' },
            {label: 'Repository Overview', field: 'other_link' },
            {label: 'Last Updated', field: 'last_update' }
        ]

        let tableRowElements = fieldsList.filter(item => sampleClone[item.field]).map(item => {
            return (<tr key={item.field}><td>{item.label}</td><td>{sampleClone[item.field]}</td></tr>)
        })
        // splice in <a> elements
        tableRowElements.splice(0,0,
            <tr key="facility"><td>Repository</td><td><a href={`/repositories/${sampleClone.facility_code}`}>{sampleClone.facility}</a></td></tr>
        )
        tableRowElements.splice(2,0,
            <tr key="cruise"><td>Cruise ID</td><td><a href={`/cruises/${sampleClone.cruise}`}>{sampleClone.cruise}</a></td></tr>
        )
        if (sampleClone.other_link.startsWith('http')) {
            tableRowElements.splice(15,1,
                <tr key="other_link"><td>Other Link</td><td><a href={sampleClone.other_link}>{sampleClone.other_link}</a></td></tr>
            )
        }

        return tableRowElements
    }

    return (
        <div className="SampleDetailPanel">
            <h2>Geosample Detail</h2>
            {recordNotFound ? <h4>No record with IMLGS Id {imlgsId}</h4> : ''}
            {!recordNotFound && sample ?
                <div>
                    <table>
                        <caption></caption>
                        <thead></thead>
                        <tbody>
                        {formatSampleDetail(sample)}
                        </tbody>
                    </table>
                    <br/>
                    {formatLinks(sample.links)}
                    {formatCruiseLinks(sample.cruise_links, sample.cruise)}
                </div>
                : ''}
            {intervals.length ? intervals.map((interval) => formatInterval(interval)) : ''}
            {/* <ol>
                    {
                        intervals.map((item) => (
                            <li key={item.interval}>{formatInterval(item)}</li>
                        ))
                    }
                </ol> */}
            <div style={{padding:"25px"}}>
            <span>see <a href={'https://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html'}>field descriptions</a> for more information</span>
            </div>
        </div>
    )
}

export default SampleDetailPanel

/*
<table width="90%" border="0" align="center" summary="layout table">
      <tbody>
        <c:if test="${not empty sample.sample_comments}">
          <tr><td colspan="2"><br><c:out value="${sample.sample_comments}" /></td></tr>
            </c:if>
          </c:if>
      <tr>
        <td colspan="2" class="intervalinfo"><strong> <c:out value="${interval.interval}" /> :&nbsp;&nbsp;&nbsp;</strong>
          <c:if test="${not empty interval.dhcore_id}"><c:out value="${interval.dhcore_id}" />&nbsp;&nbsp;</c:if>
          <c:if test="${not empty interval.igsn}">IGSN <a href="http://app.geosamples.org/sample_display.php?igsn=<c:out value="${interval.igsn}" />" title="external link to System for Earth Sample Registration (SESAR)"><c:out value="${interval.igsn}" /></a>&nbsp;&nbsp;</c:if>
          <c:if test="${not empty interval.depth_top || not empty interval.depth_bot}"><c:out value="${interval.depth_top}" /> to <c:out value="${interval.depth_bot}" /></c:if>
          <c:choose>
            <c:when test="${not empty interval.dhcore_id}">
              <c:if test="${not empty interval.dtop_in_dhcore}"><c:out value="${interval.dtop_in_dhcore}" /> cm to <c:out value="${interval.dbot_in_dhcore}" /> cm downhole </c:if>
              <c:if test="${not empty interval.dhdevice}"> (device=<c:out value="${interval.dhdevice}" />) </c:if>
            </c:when>
            <c:otherwise>
              <c:if test="${not empty interval.depth_top || not empty interval.depth_bot}"> cm in core </c:if>
            </c:otherwise>
          </c:choose>
          <c:if test="${not empty interval.cmcd_top || not empty interval.cmcd_bot}">
            [compensated depth: <c:out value="${interval.cmcd_top}" /> to <c:out value="${interval.cmcd_bot}" /> cm]
          </c:if>
          <c:if test="${not empty interval.weight}"> bulk weight = <c:out value="${interval.weight}" /> kg </c:if>
          <c:if test="${not empty interval.unit_number}"> Unit: <c:out value="${interval.unit_number}" /> </c:if>
          <c:if test="${not empty interval.exhaust_code}"><span class="green"> [material from this subsample is not available]</span> </c:if>
          </td>
        </tr>
      <c:if test="${not empty interval.lith1}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#comp">Primary&nbsp;composition</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.lith1}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.text1}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#text">Primary&nbsp;texture</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.text1}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.lith2}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#comp">Secondary&nbsp;composition</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.lith2}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.text2}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#text">Secondary&nbsp;texture</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.text2}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.comp1}">
        <tr align="left">
          <td valign="top" align="left" width="10%">
            <a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#comp2">Components</a>:
          </td>
          <td valign="top" align="left" width="90%">
            <c:out value="${interval.comp1}" />
            <c:if test="${not empty interval.comp2}"><br><c:out value="${interval.comp2}" /></c:if>
            <c:if test="${not empty interval.comp3}"><br><c:out value="${interval.comp3}" /></c:if>
            <c:if test="${not empty interval.comp4}"><br><c:out value="${interval.comp4}" /></c:if>
            <c:if test="${not empty interval.comp5}"><br><c:out value="${interval.comp5}" /></c:if>
            <c:if test="${not empty interval.comp6}"><br><c:out value="${interval.comp6}" /></c:if>
            </td>
          </tr>
      </c:if>
      <c:if test="${not empty interval.photo_link}">
        <tr align="left"><td valign="top" align="left" width="10%">Data/Photo: </td><td valign="top" align="left" width="90%"><c:out value="${interval.photo_link}"  escapeXml="false"/></td></tr>
        </c:if>
        <c:if test="${not empty interval.age}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#age">Geologic&nbsp;Age</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.age}"/></td></tr>
        </c:if>
        <c:if test="${not empty interval.absolute_age_top}">
        <tr align="left"><td valign="top" align="left" width="10%">Absolute Age at top: </td><td valign="top" align="left" width="90%"><c:out value="${interval.absolute_age_top}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.absolute_age_bot}">
        <tr align="left"><td valign="top" align="left" width="10%">Absolute Age at bottom: </td><td valign="top" align="left" width="90%"><c:out value="${interval.absolute_age_bot}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.rock_lith}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#rocklithology">Lithology/Mineralogy</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.rock_lith}" /> <c:out value="${interval.rock_min}" /></td></tr>
      </c:if>
      <c:if test="${not empty interval.weath_meta}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#weathering">Weathering/Metamorphism</a>: </td><td valign="top" align="left" width="90%"><c:out value="${interval.weath_meta}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.remark}">
        <tr align="left"><td valign="top" align="left" width="10%"><a href="http://www.ngdc.noaa.gov/mgg/curator/curatorcoding.html#glassremarks">Glass/remarks</a>:</td><td valign="top" align="left" width="90%"><c:out value="${interval.remark}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.munsell_code || not empty interval.munsell}">
        <tr align="left"><td valign="top" align="left" width="10%">Munsell&nbsp;Code: </td><td valign="top" align="left" width="90%"><c:out value="${interval.munsell_code}" /> <c:out value="${interval.munsell}" /></td></tr>
      </c:if>
      <c:if test="${not empty interval.int_comments}">
        <tr align="left"><td valign="top" align="left" width="10%">Comments: </td><td valign="top" align="left" width="90%"><c:out value="${interval.int_comments}" /></td></tr>
        </c:if>
        <c:if test="${not empty interval.description}">
        <tr align="left"><td valign="top" align="left" width="10%">Description: </td><td valign="top" align="left" width="90%"><c:out value="${interval.description}" /></td></tr>
        </c:if>
      </c:forEach>
    <tr><td colspan="2" align="center"><img src="/mgg/image/blue1.gif" width="100%" height="1" alt="_"><br><br><br></td></tr>
      </c:forEach>
</tbody>
</table>
*/