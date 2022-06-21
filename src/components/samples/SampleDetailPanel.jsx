import { LinkSharp } from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import { useParams } from "react-router-dom"
import {apiBaseUrl} from '../../ApiUtils'
import "./SampleDetailPanel.css"


function SampleDetailPanel() {
    console.log('inside SampleDetailPanel...')
    const {imlgsId} = useParams();
    const [sample, setSample] = useState()
    const [intervals, setIntervals] = useState([])
    const [recordNotFound, setRecordNotFound] = useState()
    console.log('intervals: ', intervals)

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
        console.debug(`${json.length} intervals retrieved`)
        console.debug(json)
        json.forEach(item => console.log(item.interval))
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
        console.debug(`record retrieved`)
        console.debug(json)
        setSample(json)
      }, []);

      
    function formatInterval(interval) {
          let rows = []
          if (interval.depth_top != null && interval.depth_bot != null) {
            rows.push(`${interval.depth_top} to ${interval.depth_bot} cm in core`)
          }
          if (interval.int_comments) { rows.push(`Comments: ${interval.int_comments}`)}
          if (interval.rock_lith) { rows.push(`Lithology: ${interval.rock_lith}`)}
          if (interval.rock_min) { rows.push(`Mineralogy: ${interval.rock_min}`)}
          if (interval.lith1) { rows.push(`Primary Composition: ${interval.lith1}`)}
          if (interval.text1) { rows.push(`Primary Texture: ${interval.text1}`)}
          if (interval.lith2) { rows.push(`Secondary Composition: ${interval.lith2}`)}
          if (interval.text2) { rows.push(`Secondary Texture: ${interval.text2}`)}
          // TODO add other information elements


        return (
            <table key={interval.interval}>
            <thead></thead>
            <tbody>
            { rows.map((row,idx) => <tr key={idx}><td>{row}</td></tr>) }
            </tbody>
            </table>
        )
      }
      

      function formatLinks(links) {
        console.log('inside formatLinks with ', links)
        return (
          <div>
          <ul>
            { links.map((row,idx) => <li key={idx}><a href={row.link}>{row.linklevel} {row.type} at {row.source}</a></li>) }
          </ul>
          </div>
        )
      }

      function formatCruiseLinks(links, cruise) {
        console.log('inside formatCruiseLinks with ', links)
        return (
          <div>
          <ul>
            { links.map((row,idx) => <li key={idx}><a href={row.link}>{cruise} {row.type} at {row.source}</a></li>) }
          </ul>
          </div>
        )
      }

    return (
        <div className="SampleDetailPanel">
            <h2>Geosample Detail</h2>
            {recordNotFound? <h4>No record with IMLGS Id {imlgsId}</h4>: ''}
            {!recordNotFound && sample?
                <div>
                <table>
                <caption></caption>
                <thead></thead>
                <tbody>
                    <tr><td>Repository:</td><td>{sample.facility}</td></tr>
                    <tr><td>Ship:</td><td>{sample.platform}</td></tr>
                    <tr><td>Cruise:</td><td>{sample.cruise}</td></tr>
                    <tr><td>Sample:</td><td>{sample.sample}</td></tr>
                    <tr><td>Device:</td><td>{sample.device}</td></tr>
                    <tr><td>Latitude:</td><td>{sample.lat}</td></tr>
                    <tr><td>Longitude:</td><td>{sample.lon}</td></tr>
                    <tr><td>Water Depth(m):</td><td>{sample.water_depth}</td></tr>
                    <tr><td>Date:</td><td>{sample.begin_date}</td></tr>
                    <tr><td>PI:</td><td>{sample.pi}</td></tr>
                    <tr><td>Storage:</td><td>{sample.storage_meth}</td></tr>
                    <tr><td>Province:</td><td>{sample.province}</td></tr>
                </tbody>
                </table>
                <br/>
                {formatLinks(sample.links)}
                {formatCruiseLinks(sample.cruise_links, sample.cruise)}
                </div>
            : ''}
            {intervals.length? intervals.map((interval) => formatInterval(interval)) : ''}
                {/* <ol>
                    {
                        intervals.map((item) => (
                            <li key={item.interval}>{formatInterval(item)}</li>
                        ))
                    }
                </ol> */}
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