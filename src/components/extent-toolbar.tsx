
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import MapView from "@arcgis/core/views/MapView";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import Graphic from "@arcgis/core/Graphic";
import Extent from "@arcgis/core/geometry/Extent";
import Geometry from "@arcgis/core/geometry/Geometry";
import Point from "@arcgis/core/geometry/Point";
import {webMercatorToGeographic} from "@arcgis/core/geometry/support/webMercatorUtils";

import "./extent-toolbar.css"

const fillSymbol = {
    type: "simple-fill",
    color: [227, 139, 79, 0.5],
    outline: {
        color: [255, 255, 255],
        width: 1
    }
};

//        {mapView}:{mapView:MapView|undefined}, 
//{setSelectedExtent}:{setSelectedExtent:unknown},
//ref={extentToolbar}
// const ExtentToolbar = forwardRef (({mapView, setSelectedExtent}, extentToolbar) => {

function ExtentToolbar({mapView, setSelectedExtent}) {
    console.log('rendering ExtentToolbar mapView: ', mapView )
    const drawExtentTool = useRef<HTMLDivElement|null>(null);
    const clearExtentTool = useRef<HTMLDivElement|null>(null);
    const extentToolbar = useRef<HTMLDivElement|null>(null);
    const geoextent = useRef<unknown>(null);

    let extentGraphic:Graphic|null = null
    let _dragHandler:unknown = null;


    function drawExtentToolHandler(e) {
        _dragEventHandler()
        // style overridden while pointer is over button area 
        e.target.classList.add("toolActive");
    }
    
    
    function clearExtentToolHandler(e) {
        mapView.graphics.removeAll()
        drawExtentTool.current?.classList.remove("toolActive");
    
        // user clicked delete, i.e. cancelled, before drawing rectangle
        if (_dragHandler) { 
          _dragHandler.remove();
          _dragHandler = undefined;
        }
        setSelectedExtent(undefined)
        geoextent.current = undefined
    }


    function _dragEventHandler() {
        var origin:Point|null = null;
        
        // Thanks to Thomas Solow (https://community.esri.com/thread/203242-draw-a-rectangle-in-jsapi-4x)
        _dragHandler = mapView.on('drag', function (e) {
            e.stopPropagation();
            if (e.action === 'start') {
                mapView.graphics.removeAll()
                origin = mapView.toMap(e);

            } else if (e.action === 'update') {
                //fires continuously during drag
                mapView.graphics.removeAll()
                var p = mapView.toMap(e);
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
                mapView.graphics.add(extentGraphic);

            } else if (e.action === 'end') {
                const extent = webMercatorToGeographic(extentGraphic.geometry, false) as Extent
                const coords = [extent.xmin, extent.ymin, extent.xmax, extent.ymax].map(x => parseFloat(x.toFixed(4)));
                setSelectedExtent(coords);
                geoextent.current = coords;

                // mapDiv.current.dispatchEvent(
                //   new CustomEvent("testme", { bubbles: true, detail: "mydata" })
                // );

                // remove the handler so map panning will work when not drawing
                _dragHandler.remove();
                _dragHandler = undefined;

                drawExtentTool.current?.classList.remove("toolActive");
            }
        });
      }  // end _dragEventHandler
    

    // useEffect(()=> {
    //     console.log('inside useEffect watching mapView...')
    //     if (mapView) {
    //         console.log('adding to MapView UI...')
    //         // mapView.ui.add(extentToolbar.current, "top-left");
    //     } else {
    //         console.warn('no MapView...')
    //     }

    //     return (()=>{
    //         if(mapView) {
    //             console.log('removing from MapView UI...')
    //             // mapView.ui.remove(extentToolbar.current)
    //         }
    //     })
    // }, [mapView])


    return (
        <div id="extentToolbar" className="extentToolbar" title="mange the area of interest">
            <span id="drawExtentTool" ref={drawExtentTool} onClick={drawExtentToolHandler}
                className="esri-widget esri-widget--button esri-interactive esri-icon-sketch-rectangle"
                title="Draw the area of interest">    
            </span>
            <span id="clearExtentTool" ref={clearExtentTool} onClick={clearExtentToolHandler}
                className="esri-widget esri-widget--button esri-interactive esri-icon-trash"
                title="Clear the area of interest">
            </span>
        </div>
    )
}
export default ExtentToolbar