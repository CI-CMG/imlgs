import { useSearchParams } from "react-router-dom"
import { useState, useEffect, useRef } from 'react'
import ArcGISMap from "@arcgis/core/Map"
import MapView from "@arcgis/core/views/MapView"
import MapImageLayer from "@arcgis/core/layers/MapImageLayer"
import Graphic from "@arcgis/core/Graphic"
import IdentifyResult from "@arcgis/core/rest/support/IdentifyResult"
// import Extent from "@arcgis/core/geometry/Extent"
import PopupTemplate from "@arcgis/core/PopupTemplate"
import Point from "@arcgis/core/geometry/Point"
// import Geometry from "@arcgis/core/geometry/Geometry"
import ExtentToolbar from "./extent-toolbar"
import * as identify from "@arcgis/core/rest/identify"
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters"
import Search from "@arcgis/core/widgets/Search"
import Home from "@arcgis/core/widgets/Home"
import ScaleBar from "@arcgis/core/widgets/ScaleBar"
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion"
// import IdentifyTask from "@arcgis/core/tasks/IdentifyTask"
// import IdentifyParameters from "@arcgis/core/tasks/support/IdentifyParameters"
// import {webMercatorToGeographic} from "@arcgis/core/geometry/support/webMercatorUtils"
import "./map-panel.css"

const mapserviceUrl = import.meta.env.VITE_mapserviceUrl
const mapviewerUrl = import.meta.env.VITE_mapviewerUrl


/**
 * constructs a SQL-like expression for displaying subsets of the data in the mapservice.
 * WARNING: tight coupling with ArcGIS mapservice layer:
 *   https://gis.ngdc.noaa.gov/arcgis/rest/services/Sample_Index/MapServer/0
 */
export function buildLayerDefinitionExpression(searchParams:URLSearchParams) {
  const defs:string[] = []

  // IGSN and SampleId uniquely identify a single record
  if (searchParams.has('igsn') && searchParams.get('igsn')) {
    defs.push(`IGSN = '${searchParams.get('igsn')}'`)
  } else if (searchParams.has('sampleid') && searchParams.get('sampleid')) {
    defs.push(`SAMPLE = '${searchParams.get('sampleid')}'`)
  } else {
    // TODO: currently ignores parameters w/ empty string but not with whitespace-only
    if (searchParams.has('repository') && searchParams.get('repository')) {
      defs.push(`FACILITY_CODE = '${searchParams.get('repository')}'`)
    }
    if (searchParams.has('platform') && searchParams.get('platform')) { 
      defs.push(`PLATFORM = '${searchParams.get('platform')}'`)
    }
    if (searchParams.has('lake') && searchParams.get('lake')) {
      defs.push(`LAKE = '${searchParams.get('lake')}'`) 
    }
    if (searchParams.has('device') && searchParams.get('device')) { 
      defs.push(`DEVICE = '${searchParams.get('device')}'`) 
    }
    if (searchParams.has('cruise') && searchParams.get('cruise')) { 
      defs.push(`CRUISE = '${searchParams.get('cruise')}'`) 
    }
    // TODO start_date or startDate? pattern match or ">=" on string?
    if (searchParams.has('date') && searchParams.get('date')) { 
      defs.push(`BEGIN_DATE like '${searchParams.get('date')}%'`) 
    }
    if (searchParams.get('min_depth') && searchParams.get('min_depth')) { 
      defs.push(`WATER_DEPTH >= ${searchParams.get('min_depth')}`) 
    }
    if (searchParams.get('max_depth') && searchParams.get('max_depth')) { 
      defs.push(`WATER_DEPTH <= ${searchParams.get('max_depth')}`) 
    }
    if (searchParams.get('province') && searchParams.get('province')) { 
      defs.push(`PROVINCE = '${searchParams.get('province')}'`) 
    }
  }
  return defs.length ? defs.join(' and ') : ''
}


const defaultCenter = new Point({longitude: -98.5833, latitude: 39.8333})
const defaultZoom = 4

export default function MapPanel({zoomToSelected}: {zoomToSelected:boolean}) {
  console.log('rendering MapPanel...')
  
  const baseClass = 'MapPanel'
  const [searchParams, setSearchParams] = useSearchParams()
  const layerDefinitionExpression = buildLayerDefinitionExpression(searchParams)
  
  console.log('inside MapPanel with ', searchParams.toString())
  console.log('Map is getting layer def of ', layerDefinitionExpression)
  
  // useRef to access to values shared between useEffect blocks that shouldn't change w/ each render
  // TODO: Better to use variables outside component?
  const mapDiv = useRef<HTMLDivElement>(null)
  const samplesLayer = useRef<MapImageLayer>()
  const mapView = useRef<MapView>()
  const extentToolbarContainer = useRef<HTMLDivElement|null>(null)

  const [layerView, setLayerView] = useState<MapView>()

  const identifyParams = new IdentifyParameters()
  identifyParams.tolerance = 3
  identifyParams.layerIds = [0]
  identifyParams.layerOption = "top"

   // runs when component is mounted
   useEffect(() => {
    const map = new ArcGISMap({
        basemap: "oceans"
    })
    
    // wait until DOM node has been constructed
    if (mapDiv.current) {
        if (!mapView.current) {
          const view = new MapView({
            map: map,
            container: mapDiv.current,
            zoom: defaultZoom,
            center: defaultCenter
          })
          mapView.current = view

          const searchWidget = new Search({view: view})
          const homeWidget = new Home({view: view})
          const ccWidget = new CoordinateConversion({view: view})
          const scaleBar = new ScaleBar({view: view})
          scaleBar.style = 'ruler'
          

          view.when(function(){
            if (extentToolbarContainer.current) { view.ui.add(extentToolbarContainer.current, "top-left") }
            view.ui.add(searchWidget, {position: "top-right"})
            view.ui.add(homeWidget, {position: "top-left"})
            view.ui.add(ccWidget, {position: "bottom-left"})
            view.ui.add(scaleBar, {position: "bottom-right"})
            

            setLayerView(view)
            if (zoomToSelected && layerDefinitionExpression) {
              zoomTo(layerDefinitionExpression)
            }
            view.on("click", executeIdentify)
          })
        } // end setup MapView
       
        if (!samplesLayer.current) {
          // console.log('initial layer definition expression: ', layerDefinitionExpression)
          const layer = new MapImageLayer({
            url: mapserviceUrl,
            sublayers: [
                {id: 0, visible: true, definitionExpression: layerDefinitionExpression}
            ]
          })
          samplesLayer.current = layer
          map.add(layer)
        } // end setup MapImageLayer

      } else {
        console.log("mapDiv not yet available")
    }

    return () => {
      // run component cleanup
    }
}, []) // end one-time map setup


// sync the URL search params with the map layer definition
useEffect(() => {
  // MapImageLayer and MapView not necessarily available by the time this first runs
  if (! mapView.current || ! samplesLayer.current) {
      console.warn('MapView and/or MapImageLayer are not yet ready')
      return
  }

  // "All Samples" - WARNING: hardcoded to ArcGIS mapservice definition
  const sublayer = samplesLayer.current.findSublayerById(0)
  if (sublayer) {
      sublayer.definitionExpression = layerDefinitionExpression
  } else {
      console.error('sublayer not found')
  }

  // don't change the MapView extent
  if (! zoomToSelected) {
    return
  }

  if (layerDefinitionExpression) {
    zoomTo(layerDefinitionExpression)
  } else if (mapView.current) {
    mapView.current.center = defaultCenter
    mapView.current.zoom = defaultZoom
  }
}, [layerDefinitionExpression, zoomToSelected])


function executeIdentify(event:__esri.ViewClickEvent) {
  if (mapDiv.current) { mapDiv.current.style.cursor = "wait" }

  if (!mapView.current) {
      console.warn('MapView not ready')
      return
  }
  // Set the geometry to the location of the view click
  identifyParams.width = mapView.current.width
  identifyParams.height = mapView.current.height
  identifyParams.geometry = event.mapPoint
  identifyParams.mapExtent = mapView.current.extent
  if (samplesLayer.current) {
    identifyParams.sublayers = samplesLayer.current.sublayers.toArray()
    // only be one sublayer defined for MapImageLayer
    identifyParams.sublayers[0].definitionExpression = layerDefinitionExpression
  }
  // identifyParams.layerOption = "visible"
  // document.getElementById("viewDiv").style.cursor = "wait"
  identify
    .identify(mapserviceUrl, identifyParams)
    .then(function (response) {
      const results:IdentifyResult[] = response.results
      return results.map(function(result) {
      const feature = result.feature
      // console.log({feature})
      // hack to work around JSAPI extraneous precision in some cases
      feature.attributes.LAT = parseFloat(feature.attributes.LAT.toFixed(5))
      feature.attributes.LON = parseFloat(feature.attributes.LON.toFixed(5))
      feature.attributes.WATER_DEPTH = (feature.attributes.WATER_DEPTH) ? feature.attributes.WATER_DEPTH.toLocaleString() : 'N/A'
      // TODO can't get autocast to work w/ types
      const popupTemplate = new PopupTemplate({
      title: "Sample ID {SAMPLE}",
      content: `<b>Repository:</b> {FACILITY_CODE}
        <br><b>Location:</b> {LON}, {LAT}
        <br><b>Year:</b> {YEAR}
        <br><b>Water Depth:</b> {WATER_DEPTH}m
        <br><b>Device:</b> {DEVICE}
        <br><a href="${mapviewerUrl}/{IMLGS}">more detail</a>`
      })
      feature.popupTemplate = popupTemplate
      return feature
    })
  }).then(showPopup)

  function showPopup(response:Graphic[]) {
    console.log({response})
    if(response.length > 0 && mapView.current) {
      mapView.current.popup.open({
        features: response,
        location: event.mapPoint
      })
    }
    if (mapDiv.current) { mapDiv.current.style.cursor = "auto" }
  }
}


function zoomTo(layerDefinitionExpression:string) {
  if (! mapView.current) {
    // console.warn('cannot zoomTo before MapView is ready')
    return
  }
  const queryURL = mapserviceUrl+'/0/query'
  const urlSearchParams = new URLSearchParams()
  urlSearchParams.append("where", layerDefinitionExpression)
  urlSearchParams.append("returnExtentOnly", 'true')
  // urlSearchParams.append("outSR", 4326)
  urlSearchParams.append("f", "json")
  const myRequest = new Request(queryURL, { 
    method: "POST", 
    body: urlSearchParams
  })

  try {
    fetch(myRequest)
      .then(response => response.json())
      .then((data) => {
        if(isNaN(data.extent.xmin) || isNaN(data.extent.xmax)|| isNaN(data.extent.ymin) || isNaN(data.extent.ymax)) {
          console.warn('Cannot zoom to empty extent')
          return
        }
        // single point's bbox cannot be used for view extent
        if (data.extent.xmin == data.extent.xmax || data.extent.ymin == data.extent.ymax) {
          const centerPoint = new Point({
            x: data.extent.xmin,
            y: data.extent.ymin,
            spatialReference: data.extent.spatialReference
          })
          mapView.current?.goTo({
            center: centerPoint,
            zoom: 8
          })
        } else {
          if (mapView.current) { mapView.current.extent = data.extent }
        }
      })
  } catch (error) {
      console.error("failed to zoomTo ")
      console.error(error)
  } 
}


function updateAreaOfInterest(coords:Array<number>|undefined) {
  if (!coords) { return }
  console.log('inside updateAreaOfInterest with ', coords)
  const mySearchParams = new URLSearchParams(searchParams)
  mySearchParams.set('bbox', coords.join(','))
  setSearchParams(mySearchParams)
}


return (
    <div className={baseClass} ref={mapDiv}>
      <div ref={extentToolbarContainer}>
        {layerView ? <ExtentToolbar mapView={layerView} setSelectedExtent={updateAreaOfInterest}/> : ''}
      </div>

    </div>
  )
}

