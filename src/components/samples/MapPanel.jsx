import React, { useRef, useEffect, useState } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import IdentifyTask from "@arcgis/core/tasks/IdentifyTask"
import IdentifyParameters from "@arcgis/core/tasks/support/IdentifyParameters"
import {webMercatorToGeographic} from "@arcgis/core/geometry/support/webMercatorUtils";
import "./MapPanel.css";

function MapPanel({layerDefinitionExpression, setSelectedExtent, zoomToSelected}) {
    console.log('inside MapPanel...')
    const mapDiv = useRef(null);
    const drawExtentTool = useRef(null);
    const clearExtentTool = useRef(null);
    const extentToolbar = useRef(null);
    const samplesLayer = useRef(null);
    const mapView = useRef();
    const identifyTask = useRef()
    
    // keep a local copy of the selected geoextent in addition to the one in 
    // the parent component
    const geoextent = useRef()
    const defaultCenter = [-98.5833, 39.8333]
    const defaultZoom = 4
    
  useEffect(() => {
    console.log("inside useEffect to set up map");
    const identifyParams = new IdentifyParameters()
    identifyParams.tolerance = 3
    identifyParams.layerIds = 0
    identifyParams.layerOption = "top";
    const identifyTask = new IdentifyTask("https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/sample_index_dynamic/MapServer")


    // wait until DOM node has been constructed
    if (mapDiv.current) {

      let extentGraphic = null;
      let _dragHandler = null;
    
      const fillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.5],
        outline: {
            color: [255, 255, 255],
            width: 1
        }
      };
  
      const map = new ArcGISMap({
        basemap: "oceans"
      });
      

      const view = new MapView({
        map: map,
        container: mapDiv.current,
        zoom: defaultZoom,
        //center: [-90, 27]
        center: defaultCenter
      });

      view.when(function(){
        // console.log('MapView is ready...');
        view.ui.add('extentToolbar', "top-left");
        mapView.current = view

        view.on('click', executeIdentifyTask)
        identifyParams.width = view.width;
        identifyParams.height = view.height;
      });

      function executeIdentifyTask(event) {
        mapDiv.current.style.cursor = "wait"

        // Set the geometry to the location of the view click
        identifyParams.geometry = event.mapPoint;
        identifyParams.mapExtent = view.extent;
        // document.getElementById("viewDiv").style.cursor = "wait"
        identifyTask.execute(identifyParams).then(function(response){
          const results = response.results
          return results.map(function(result) {
            const feature = result.feature;
            feature.popupTemplate = {
              // autocasts as new PopupTemplate()
              title: "Sample {IMLGS}",
              content:
                "<b>Repository:</b> {Repository}" +
                "<br><b>Location:</b> {Longitude}, {Latitude}" +
                "<br><b>Year:</b> {Year}" +
                "<br><b>Water Depth:</b> {Water Depth (m)}m"
            };
            return feature
          })
        }).then(showPopup)
        
        function showPopup(response) {
          if(response.length > 0) {
            view.popup.open({
              features: response,
              location: event.mapPoint
            });
          }
          mapDiv.current.style.cursor = "auto";
        }
      }


      view.watch("extent", function(newValue){
        const extent = webMercatorToGeographic(newValue)
        const coords = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].map(x => parseFloat(x.toFixed(4)));
        // console.log('new extent: ', extent.xmin, extent.ymin, extent.xmax, extent.ymax)
        //TODO use the new extent. assign to selectedExtent if one not set?
      });

      const layer = new MapImageLayer({
        url: "https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/sample_index_dynamic/MapServer"
      })
      samplesLayer.current = layer;
      map.add(layer)

      drawExtentTool.current.addEventListener("click", drawExtentToolHandler);
      clearExtentTool.current.addEventListener("click", clearExtentToolHandler);


      function drawExtentToolHandler(e) {
        _dragEventHandler()
        // style overridden while pointer is over button area 
        e.target.classList.add("toolActive");
      }


      function clearExtentToolHandler(e) {
        view.graphics.remove(extentGraphic);
        drawExtentTool.current.classList.remove("toolActive");

        // user clicked delete, i.e. cancelled, before drawing rectangle
        if (_dragHandler) { 
          _dragHandler.remove();
          _dragHandler = undefined;
        }
        setSelectedExtent(undefined)
        geoextent.current = undefined
      }


      function _dragEventHandler() {
        var origin = null;
        
        // Thanks to Thomas Solow (https://community.esri.com/thread/203242-draw-a-rectangle-in-jsapi-4x)
        _dragHandler = view.on('drag', function (e) {
            e.stopPropagation();
            if (e.action === 'start') {
                if (extentGraphic) {
                    view.graphics.remove(extentGraphic);
                };
                origin = view.toMap(e);

            } else if (e.action === 'update') {
                //fires continuously during drag
                if (extentGraphic) {
                    view.graphics.remove(extentGraphic);
                };
                var p = view.toMap(e);
                extentGraphic = new Graphic({
                    geometry: new Extent({
                        xmin: Math.min(p.x, origin.x),
                        xmax: Math.max(p.x, origin.x),
                        ymin: Math.min(p.y, origin.y),
                        ymax: Math.max(p.y, origin.y),
                        spatialReference: { wkid: 102100 }
                    }),
                    symbol: fillSymbol
                });
                view.graphics.add(extentGraphic);

            } else if (e.action === 'end') {
                const extent = webMercatorToGeographic(extentGraphic.geometry)
                const coords = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].map(x => parseFloat(x.toFixed(4)));
                setSelectedExtent(coords);
                geoextent.current = coords;

                // mapDiv.current.dispatchEvent(
                //   new CustomEvent("testme", { bubbles: true, detail: "mydata" })
                // );

                // remove the handler so map panning will work when not drawing
                _dragHandler.remove();
                _dragHandler = undefined;

                drawExtentTool.current.classList.remove("toolActive");
            }
        });
      }  // end _dragEventHandler

    } else {
      console.log("mapDiv not yet available");
    }
  },[setSelectedExtent]); // end useEffect hook


  // useEffect blocks fire in order defined and this needs to be after map setup
  useEffect(() => {
    console.log('update layerDefinition...')
    // console.log('LayerDefinitionExpression: ', layerDefinitionExpression)
    // "All Samples"
    const sublayer = samplesLayer.current.findSublayerById(0)
    if (sublayer) { sublayer.definitionExpression = layerDefinitionExpression }

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
  }), [layerDefinitionExpression]


  function zoomTo(layerDefinitionExpression) {
    console.log('inside zoomTo...', zoomToSelected)
    console.log(layerDefinitionExpression)
    if (! mapView.current) {
      console.warn('cannot zoomTo before MapView is ready')
      return
    }
    const queryURL = 'https://gis.ngdc.noaa.gov/arcgis/rest/services/web_mercator/sample_index_dynamic/MapServer/0/query';
    const urlSearchParams = new URLSearchParams()
    urlSearchParams.append("where", layerDefinitionExpression);
    urlSearchParams.append("returnExtentOnly", true);
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
              console.log('extent: ', data.extent)
              // mapView.current.goTo(data.extent)
              mapView.current.extent = data.extent
            });
    } catch (error) {
        console.error(error);
    } 
  }


    return(
        <div className="MapPanel" ref={mapDiv}>
        <div id="extentToolbar" ref={extentToolbar} className="extentToolbar" title="mange the area of interest">
          <span
            id="drawExtentTool"
            ref={drawExtentTool} className="esri-widget esri-widget--button esri-interactive esri-icon-sketch-rectangle"
            title="Draw the area of interest">    
          </span>
          <span id="clearExtentTool" ref={clearExtentTool} className="esri-widget esri-widget--button esri-interactive esri-icon-trash"
            title="Clear the area of interest">
          </span>
        </div>
      </div>  
    )
}

export default MapPanel