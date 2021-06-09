import React, { useRef, useEffect, useState } from "react"
import {apiBaseUrl} from '../ApiUtils'
import FooterPanel from "./FooterPanel";
import HeaderPanel from "./HeaderPanel";
// import 'bootstrap/dist/css/bootstrap.min.css'
import Nav from 'react-bootstrap/Nav'
import "./ShowTablePage.css";
import SamplesTable from "./SamplesTable";

function ShowTablePage() {
  const [samplesData, setSamplesData] = useState([])

  const url = new URL(location.href);
  const searchParams = new URLSearchParams(url.search);
  // searchParams.forEach((value, key) => console.log(`${key} => ${value}`))

  useEffect(async () => {
    console.debug("loading data...");
    const queryURL = `${apiBaseUrl}/samples?${searchParams.toString()}`
    // console.debug(queryURL)

    const response = await fetch(queryURL)
    if (response.status !== 200) {
        console.error("Error in API request: failed to retrieve data")
        return
    }
    const json = await response.json()
    console.debug(`${json.length} records retrieved`)
    // console.debug(json[0])
    setSamplesData(json)
  }, []);


  return (
    <div className="ShowTablePage">
      <HeaderPanel></HeaderPanel>
      <SamplesTable data={samplesData}></SamplesTable>
      <FooterPanel></FooterPanel>
    </div>
  );
}

export default ShowTablePage;
