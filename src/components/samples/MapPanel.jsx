import React, { useRef, useEffect, useState } from "react";
import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import {webMercatorToGeographic} from "@arcgis/core/geometry/support/webMercatorUtils";
import "./MapPanel.css";

function MapPanel({repository, setSelectedExtent}) {
    console.log('inside MapPanel with ', setSelectedExtent)
    const mapDiv = useRef(null);
  const drawExtentTool = useRef(null);
  const clearExtentTool = useRef(null);
  const extentToolbar = useRef(null);
  const samplesLayer = useRef(null);

  if (repository) {
    updateLayerDefs(repository);
  }

  function updateLayerDefs(facility) {
    const sublayer = samplesLayer.current.findSublayerById(0)
    if (facility === 'ALL') {
      sublayer.definitionExpression = undefined;
    } else {
      sublayer.definitionExpression = `FACILITY_CODE = '${facility}'`;
    }
    // console.log(`FACILITY_CODE = '${facility}'`);
    console.log('updating facility to ', facility);
    
  }


  useEffect(() => {
    console.log("inside useEffect");

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
        zoom: 5,
        center: [-90, 27]
      });

      view.when(function(){
        console.log('MapView is ready...');
        view.ui.add('extentToolbar', "top-left");
      });
      view.watch("extent", function(newValue){
        const extent = webMercatorToGeographic(newValue)
        const coords = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].map(x => parseFloat(x.toFixed(4)));
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