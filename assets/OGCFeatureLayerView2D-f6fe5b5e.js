import{a as t,b as o,c as p}from"./index-869a56e9.js";import a from"./FeatureLayerView2D-6ddb5254.js";import"./Container-96ea5ac1.js";import"./definitions-d6567bd0.js";import"./enums-b14466b3.js";import"./Texture-6d363e03.js";import"./FeatureEffect-43cfdfef.js";import"./LayerView-d93dbc5c.js";import"./AttributeStoreView-ec62bd4a.js";import"./TiledDisplayObject-cd2afef4.js";import"./color-86f12699.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-c66fdc05.js";import"./VertexArrayObject-b0262a86.js";import"./ProgramTemplate-f4242a70.js";import"./GeometryUtils-3a763f83.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-058933d4.js";import"./visualVariablesUtils-065ff22f.js";import"./ExpandedCIM-4684f0b0.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-6887aec7.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-ade2d66d.js";import"./floatRGBA-ffdc3de5.js";import"./clusterUtils-bc5545b3.js";import"./util-0179046e.js";import"./BitmapTileContainer-ad042d16.js";import"./Bitmap-fdae91e3.js";import"./TileContainer-2506fac3.js";import"./CircularArray-ef508845.js";import"./BufferPool-c5806f84.js";import"./FeatureContainer-e8160653.js";import"./popupUtils-824e7ba1.js";import"./RefreshableLayerView-96ca4dcd.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
