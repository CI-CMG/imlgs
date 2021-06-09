import React, { useRef, useEffect, useState } from "react";
import { DataGrid, GridRowsProp, GridColDef } from '@material-ui/data-grid';
import "./MaterialUIDataGrid.css"


function MaterialUIDataGrid() {
    const [rows, setRows] = useState([])
    // let rows = [
    //     {id: 1, facility_code:"USGSWH",ship_code:"661o","platform":"Marcus Hanna","cruise":"00002","sample":"2-1","device":"core, gravity","begin_date":"2000","end_date":null,"lat":42.38125,"latdeg":42,"latmin":"22.88","ns":"N","end_lat":null,"end_latdeg":null,"end_latmin":null,"end_ns":null,"lon":-70.815,"londeg":70,"lonmin":"48.90","ew":"W","end_lon":null,"end_londeg":null,"end_lonmin":null,"end_ew":null,"latlon_orig":"D","water_depth":29,"end_water_depth":null,"storage_meth":"room temperature, dry","cored_length":null,"cored_length_mm":null,"cored_diam":null,"cored_diam_mm":null,"pi":"M BOTHNER","province":null,"lake":null,"other_link":"http://dx.doi.org/doi:10.7289/V5X92887","last_update":"20040103","igsn":null,"leg":null,"sample_comments":null,"publish":"Y","previous_state":null,"objectid":177972,"show_sampl":"http://www.ngdc.noaa.gov/geosamples/showsample.jsp?imlgs=imlgs0177972",imlgs:"imlgs0177972"},
    //     {id: 2, facility_code:"USGSWH",ship_code:"661o","platform":"Marcus Hanna","cruise":"00002","sample":"2-2","device":"core, gravity","begin_date":"2000","end_date":null,"lat":42.38124,"latdeg":42,"latmin":"22.87","ns":"N","end_lat":null,"end_latdeg":null,"end_latmin":null,"end_ns":null,"lon":-70.81493,"londeg":70,"lonmin":"48.90","ew":"W","end_lon":null,"end_londeg":null,"end_lonmin":null,"end_ew":null,"latlon_orig":"D","water_depth":29,"end_water_depth":null,"storage_meth":"room temperature, dry","cored_length":null,"cored_length_mm":null,"cored_diam":null,"cored_diam_mm":null,"pi":"M BOTHNER","province":null,"lake":null,"other_link":"http://dx.doi.org/doi:10.7289/V5X92887","last_update":"20040103","igsn":null,"leg":null,"sample_comments":null,"publish":"Y","previous_state":null,"objectid":177973,"show_sampl":"http://www.ngdc.noaa.gov/geosamples/showsample.jsp?imlgs=imlgs0177973",imlgs:"imlgs0177973"},
    //     {id: 3, facility_code:"USGSWH",ship_code:"661o","platform":"Marcus Hanna","cruise":"00002","sample":"2-3","device":"core, gravity","begin_date":"2000","end_date":null,"lat":42.38144,"latdeg":42,"latmin":"22.89","ns":"N","end_lat":null,"end_latdeg":null,"end_latmin":null,"end_ns":null,"lon":-70.81507,"londeg":70,"lonmin":"48.90","ew":"W","end_lon":null,"end_londeg":null,"end_lonmin":null,"end_ew":null,"latlon_orig":"D","water_depth":30,"end_water_depth":null,"storage_meth":"room temperature, dry","cored_length":null,"cored_length_mm":null,"cored_diam":null,"cored_diam_mm":null,"pi":"M BOTHNER","province":null,"lake":null,"other_link":"http://dx.doi.org/doi:10.7289/V5X92887","last_update":"20040103","igsn":null,"leg":null,"sample_comments":null,"publish":"Y","previous_state":null,"objectid":177974,"show_sampl":"http://www.ngdc.noaa.gov/geosamples/showsample.jsp?imlgs=imlgs0177974",imlgs:"imlgs0177974"}
    // ]
    const columns = [
        { field: 'facility_code', headerName: 'Repository', width: 150 },
        { field: 'platform', headerName: 'Ship', width: 125 },
        { field: 'cruise', headerName: 'Cruise', width: 125 },
        { field: 'sample', headerName: 'Sample/Hole', width: 150 },
        { field: 'device', headerName: 'Device', width: 150 },
        { field: 'begin_date', headerName: 'Collection Date', width: 150 },
        { field: 'lat', headerName: 'Latitude', width: 150 },
        { field: 'lon', headerName: 'Longitude', width: 150 },
        { field: 'water_depth', headerName: 'Water Depth', width: 150 },
        { field: 'storage_meth', headerName: 'Storage Method', width: 150 },
        { field: 'cored_length', headerName: 'Core Length', width: 150 },
        { field: 'igsn', headerName: 'IGSN', width: 125 },
        { field: 'imlgs', headerName: 'IMLGS', width: 125 }
    ];

    useEffect(async () => {
        const response = await fetch(`http://localhost:8080/geosamples-api/samples`)
        if (response.status !== 200) {
            console.error("Error in API request: failed to retrieve samples")
            return
        }
        const json = await response.json()
        const data = json.map((item) => {
            return ({
                id: item.objectid, 
                facility_code: item.facility_code, 
                platform: item.platform, 
                cruise: item.cruise, 
                sample: item.sample, 
                device: item.device,
                begin_date: item.begin_date,
                lat: item.lat,
                lon: item.lon,
                water_depth: item.water_depth,
                storage_meth: item.storage_meth,
                cored_length: item.cored_length,
                igsn: item.igsn,
                imlgs: item.imlgs
            })
        })
        // console.log(data)
        setRows(data)
    },[setRows])

    return(
        <div className="GridPanel">
      <DataGrid rows={rows} columns={columns} />
        </div>
    )
}

export default MaterialUIDataGrid