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
  const [offset, setOffset] = useState(0)
  const [pageSize, setPageSize] = useState(500)
  const [totalCount, setTotalCount] = useState()

  const url = new URL(location.href);
  const searchParams = new URLSearchParams(url.search)
  // normally shouldn't have offset and page_size passed in table URL
  if (searchParams.has('offset')) { setOffset(searchParams.get('offset')) }
  if (searchParams.has('page_size')) { setPageSize(searchParams.get('page_size')) }
  // searchParams.forEach((value, key) => console.log(`${key} => ${value}`))

  useEffect(async () => {
    // console.debug("getting count...");
    const queryURL = `${apiBaseUrl}/samples?count_only=true&${searchParams.toString()}`
    // console.debug(queryURL)

    const response = await fetch(queryURL)
    if (response.status !== 200) {
        console.error("Error in API request: failed to retrieve data")
        return
    }
    const json = await response.json()
    // console.debug(json)
    setTotalCount(json.count)
  }, [searchParams])


  useEffect(async () => {
    // console.debug("loading data...");
    searchParams.set('page_size', pageSize)
    searchParams.set('offset', offset)
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
  }, [offset, pageSize]);


  function incrementPage() {
    setOffset(offset + pageSize)
  }

  function decrementPage() {
    setOffset((offset < pageSize)? 0 : offset - pageSize)
  }

  return (
    <div className="ShowTablePage">
      <HeaderPanel></HeaderPanel>
      <SamplesTable totalCount={totalCount} searchParams={searchParams} data={samplesData} nextPage={incrementPage} previousPage={decrementPage} offset={offset} pageSize={pageSize}></SamplesTable>
      <FooterPanel></FooterPanel>
    </div>
  );
}

export default ShowTablePage;
