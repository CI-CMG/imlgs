import{a as t,b as o,c as p}from"./index-9bdf71eb.js";import a from"./FeatureLayerView2D-7c745b05.js";import"./Container-b5da9b96.js";import"./definitions-8ca61fd5.js";import"./enums-b14466b3.js";import"./Texture-23f6de11.js";import"./FeatureEffect-a5155312.js";import"./LayerView-2bf29b87.js";import"./AttributeStoreView-1b1df8e8.js";import"./TiledDisplayObject-f25b73fc.js";import"./color-60424d19.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-0e839057.js";import"./VertexArrayObject-5b13f3c7.js";import"./ProgramTemplate-7644127e.js";import"./GeometryUtils-31aec320.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-ca97a6b6.js";import"./visualVariablesUtils-68bf90b6.js";import"./ExpandedCIM-be7e60d6.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-fe1849f4.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-2690d995.js";import"./floatRGBA-5cb4d6dc.js";import"./clusterUtils-7b0277f8.js";import"./util-4a77a759.js";import"./BitmapTileContainer-73502513.js";import"./Bitmap-7b931ad9.js";import"./TileContainer-e78e2437.js";import"./CircularArray-ef508845.js";import"./BufferPool-68f8130c.js";import"./FeatureContainer-3a679e16.js";import"./popupUtils-5fab3c3f.js";import"./RefreshableLayerView-ac3b232a.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
