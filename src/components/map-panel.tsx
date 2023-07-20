import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from "react-router-dom";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import Point from "@arcgis/core/geometry/Point";
import Geometry from "@arcgis/core/geometry/Geometry";
import ExtentToolbar from "./extent-toolbar"
import * as identify from "@arcgis/core/rest/identify";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters";
import Search from "@arcgis/core/widgets/Search";
import Home from "@arcgis/core/widgets/Home";
import ScaleBar from "@arcgis/core/widgets/ScaleBar";
import CoordinateConversion from "@arcgis/core/widgets/CoordinateConversion";
// import IdentifyTask from "@arcgis/core/tasks/IdentifyTask"
// import IdentifyParameters from "@arcgis/core/tasks/support/IdentifyParameters"
import {webMercatorToGeographic} from "@arcgis/core/geometry/support/webMercatorUtils";
import "./map-panel.css";

// const mapserviceUrl = 'https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/sample_index_dynamic/MapServer'
const mapserviceUrl = import.meta.env.VITE_mapserviceUrl
const mapviewerUrl = import.meta.env.VITE_mapviewerUrl
// console.log({mapserviceUrl})
// console.log({mapviewerUrl})

/**
 * constructs a SQL-like expression for displaying subsets of the data in the mapservice.
 * WARNING: tight coupling with ArcGIS mapservice layer:
 *   https://gis.ngdc.noaa.gov/arcgis/rest/services/Sample_Index/MapServer/0
 */
 export function buildLayerDefinitionExpression(searchParams:URLSearchParams) {
    let defs = []

    if (searchParams.has('repository')) { defs.push(`FACILITY_CODE = '${searchParams.get('repository')}'`) }
    if (searchParams.has('platform')) { defs.push(`PLATFORM = '${searchParams.get('platform')}'`) }
    if (searchParams.has('lake')) { defs.push(`LAKE = '${searchParams.get('lake')}'`) }
    if (searchParams.has('device')) { defs.push(`DEVICE = '${searchParams.get('device')}'`) }
    if (searchParams.has('cruise')) { defs.push(`CRUISE = '${searchParams.get('cruise')}'`) }
    // TODO start_date or startDate? pattern match or ">=" on string?
    if (searchParams.has('date')) { defs.push(`BEGIN_DATE like '${searchParams.get('date')}%'`) }
    // empty string causes depth queries to fail
    if (searchParams.get('min_depth')) { defs.push(`WATER_DEPTH >= ${searchParams.get('min_depth')}`) }
    if (searchParams.get('max_depth')) { defs.push(`WATER_DEPTH <= ${searchParams.get('max_depth')}`) }
    if (searchParams.get('igsn')) { defs.push(`IGSN = '${searchParams.get('igsn')}'`) }
    if (searchParams.get('province')) { defs.push(`PROVINCE = '${searchParams.get('province')}'`) }
    if (searchParams.get('sampleid')) { defs.push(`SAMPLE = '${searchParams.get('sampleid')}'`) }

    if (defs.length) {
        return(defs.join(' and '))
    } else {
        return('')
    }
}


export default function MapPanel(
    {zoomToSelected}: {zoomToSelected:boolean}
) {
    const baseClass = 'MapPanel'
    // useRef to facilitiate access to values shared between useEffect blocks that shouldn't change w/ each 
    // render. Better to use variables outside component?
    const mapDiv = useRef<HTMLDivElement>(null);
    // const extentToolbar2 = useRef<HTMLDivElement|null>(null)
    const extentToolbarContainer = useRef<HTMLDivElement|null>(null)
    const samplesLayer = useRef<MapImageLayer>();
    const mapView = useRef<MapView>();
    
    const [layerView, setLayerView] = useState()
    const geoextent = useRef();
    const defaultCenter = [-98.5833, 39.8333]
    const defaultZoom = 4

    let [searchParams, setSearchParams] = useSearchParams();
    const layerDefinitionExpression = buildLayerDefinitionExpression(searchParams)
    console.log('Map is getting layer def of ', layerDefinitionExpression)

    let identifyParams = new IdentifyParameters();
    identifyParams.tolerance = 3;
    identifyParams.layerIds = [0];
    identifyParams.layerOption = "top";
    // causes all values to be returned as strings. default value of true can 
    // cause spurious preceision in float values
    // identifyParams.returnUnformattedValues=false;
    // causes field names (property keys) to be used instead of alias. For Oracle geodatabase usually means
    // all-caps rather than just leading capitalization 
    //identifyParams.returnFieldName=false

    
    // runs when component is mounted
    useEffect(() => {
        const map = new ArcGISMap({
            basemap: "oceans"
        });
        
        // wait until DOM node has been constructed
        if (mapDiv.current) {
            if (mapView.current) {
              console.warn('MapView already exists')
            } else {
              const view = new MapView({
                map: map,
                container: mapDiv.current,
                zoom: defaultZoom,
                //center: [-90, 27]
                center: defaultCenter
              });
              mapView.current = view

              const searchWidget = new Search({view: view});
              const homeWidget = new Home({view: view});
              const ccWidget = new CoordinateConversion({view: view});
              let scaleBar = new ScaleBar({view: view});
              scaleBar.style = 'ruler'
              

              view.when(function(){
                view.ui.add(extentToolbarContainer.current, "top-left");
                view.ui.add(searchWidget, {position: "top-right"});
                view.ui.add(homeWidget, {position: "top-left"});
                view.ui.add(ccWidget, {position: "bottom-left"});
                view.ui.add(scaleBar, {position: "bottom-right"});
                

                setLayerView(view)
                if (zoomToSelected && layerDefinitionExpression) {
                    zoomTo(layerDefinitionExpression)
                }
                view.on("click", executeIdentify);
              });
  
            }
           
            if (samplesLayer.current) {
              console.warn("MapImageLayer already exists")
            } else {
              // console.log('initial layer definition expression: ', layerDefinitionExpression)
              const layer = new MapImageLayer({
                url: mapserviceUrl,
                sublayers: [
                    {id: 0, visible: true, definitionExpression: layerDefinitionExpression}
                ]
              })
              samplesLayer.current = layer;
              map.add(layer)

            }
          
            function executeIdentify(event) {
                mapDiv.current.style.cursor = "wait"
        
                if (!mapView.current) {
                    console.warn('MapView not ready')
                    return
                }
                // Set the geometry to the location of the view click
                identifyParams.width = mapView.current.width;
                identifyParams.height = mapView.current.height;    
                identifyParams.geometry = event.mapPoint;
                identifyParams.mapExtent = mapView.current.extent;
                identifyParams.sublayers = samplesLayer.current.sublayers
                // identifyParams.layerOption = "visible";
                identifyParams.layerDefinitions = [layerDefinitionExpression]
                // console.log(identifyParams.layerDefinitions)
                // document.getElementById("viewDiv").style.cursor = "wait"
                identify
                    .identify(mapserviceUrl, identifyParams)
                    .then(function (response) {
                        const results = response.results
                        return results.map(function(result) {
                        const feature = result.feature
                        // console.log({feature})
                        // hack to work around JSAPI extraneous precision in some cases
                        feature.attributes.LAT = parseFloat(feature.attributes.LAT.toFixed(5))
                        feature.attributes.LON = parseFloat(feature.attributes.LON.toFixed(5))
                        feature.attributes.WATER_DEPTH = (feature.attributes.WATER_DEPTH) ? feature.attributes.WATER_DEPTH.toLocaleString() : 'N/A'
                        feature.popupTemplate = {
                        // autocasts as new PopupTemplate()
                        title: "Sample ID {SAMPLE}",
                        content: `<b>Repository:</b> {FACILITY_CODE}
                          <br><b>Location:</b> {LON}, {LAT}
                          <br><b>Year:</b> {YEAR}
                          <br><b>Water Depth:</b> {WATER_DEPTH}m
                          <br><b>Device:</b> {DEVICE}
                          <br><a href="${mapviewerUrl}/{IMLGS}">more detail</a>`
                        };
                    return feature
                  })
                }).then(showPopup)
        
                function showPopup(response) {
                  if(response.length > 0) {
                    mapView.current.popup.open({
                      features: response,
                      location: event.mapPoint
                    });
                  }
                  mapDiv.current.style.cursor = "auto";
                }
              }
            // view Promise doesn't have to be fulfilled to set up watch
            mapView.current.watch("extent", function(newValue){
                const extent = webMercatorToGeographic(newValue, false) as Extent
                const coords = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].map(x => parseFloat(x.toFixed(4)));
                // console.log('new extent: ', extent.xmin, extent.ymin, extent.xmax, extent.ymax)
                //TODO use the new extent. assign to selectedExtent if one not set?
            });
        } else {
            console.log("mapDiv not yet available");
        }

        return () => {
            // mapView.current = undefined
            // setLayerView(undefined)
            // geoextent.current = undefined
        }
    }, [])


    function zoomTo(layerDefinitionExpression:string) {
      if (! mapView.current) {
        console.warn('cannot zoomTo before MapView is ready')
        return
      }
      const queryURL = mapserviceUrl+'/0/query';
      const urlSearchParams = new URLSearchParams()
      urlSearchParams.append("where", layerDefinitionExpression);
      urlSearchParams.append("returnExtentOnly", 'true');
      // urlSearchParams.append("outSR", 4326)
      urlSearchParams.append("f", "json");
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
              });
      } catch (error) {
          console.error("failed to zoomTo ")
          console.error(error);
      } 
  
    }


    // useEffect blocks fire in order defined and this needs to be after map setup
    // re-defining layerdefinitionExpression in separate useEffect so ArcGIS setup not re-run with every
    // state change (i.e. URL search param change)
    useEffect(() => {
        // TODO why are MapImageLayer and MapView not available the first time this is run?
        if (! mapView.current || ! samplesLayer.current) {
            console.warn('MapView and/or MapImageLayer are not yet ready')
            return
        }

        // "All Samples"
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

    }, [layerDefinitionExpression])


    // // just for demonstration purposes
    // useEffect(() => {
    //     console.log('this should run only when component is mounted')

    //     return (() => {
    //         console.log('this should only run when component is unmounted')
    //     })
    // }, [])


    useEffect(() => {
        console.log('layerView has changed', layerView)
    }, [layerView])


    function updateAreaOfInterest(coords:Array<number>|undefined) {
      // console.log('inside updateAreaOfInterest with ', coords)
      // console.log(searchParams.has('bbox'))
      let newSearchParams = new URLSearchParams(searchParams)
      if (coords) {
        newSearchParams.set('bbox', coords.join(','))
      } else {
        newSearchParams.delete('bbox')
      }
      setSearchParams(newSearchParams);
    }


    return (
        <div className={baseClass} ref={mapDiv}>
            <div ref={extentToolbarContainer}>
            {layerView ? <ExtentToolbar mapView={layerView} setSelectedExtent={updateAreaOfInterest}/> : ''}
            </div>
      </div>  
    );
  }