import{a as t,b as o,c as p}from"./index-730769f1.js";import a from"./FeatureLayerView2D-b9076a35.js";import"./Container-ba9a268c.js";import"./definitions-38dba142.js";import"./enums-b14466b3.js";import"./Texture-0b1a0c6e.js";import"./FeatureEffect-f443c423.js";import"./LayerView-3f4b9671.js";import"./AttributeStoreView-180cc708.js";import"./TiledDisplayObject-7d147784.js";import"./color-58c47be4.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-97a36af9.js";import"./VertexArrayObject-49567c62.js";import"./ProgramTemplate-2a734998.js";import"./GeometryUtils-fdbcf620.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-731cc103.js";import"./visualVariablesUtils-80ea2c38.js";import"./ExpandedCIM-95c0dcd4.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-f038db1b.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-b4ad0298.js";import"./floatRGBA-f57a3e4f.js";import"./clusterUtils-c635f0f2.js";import"./util-1bf10fb3.js";import"./BitmapTileContainer-08187996.js";import"./Bitmap-9996d4c6.js";import"./TileContainer-e749ae71.js";import"./CircularArray-ef508845.js";import"./BufferPool-3769d764.js";import"./FeatureContainer-15c7211d.js";import"./popupUtils-00d2537b.js";import"./RefreshableLayerView-0737bb10.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
