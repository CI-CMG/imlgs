import{a as t,b as o,c as p}from"./index-7c5c2958.js";import a from"./FeatureLayerView2D-9bef7762.js";import"./Container-ff0b2574.js";import"./definitions-755c523c.js";import"./enums-b14466b3.js";import"./Texture-9c5a6516.js";import"./FeatureEffect-bbb27dbd.js";import"./LayerView-2acc97f5.js";import"./AttributeStoreView-75d53552.js";import"./TiledDisplayObject-f7054efd.js";import"./color-98b0ab65.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-7bc817ea.js";import"./VertexArrayObject-3bb13eff.js";import"./ProgramTemplate-4a73f72d.js";import"./GeometryUtils-41e3adfd.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-0a009fa1.js";import"./visualVariablesUtils-045b9381.js";import"./ExpandedCIM-afd6235d.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-6d646c65.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-8bfe6536.js";import"./floatRGBA-5c163667.js";import"./clusterUtils-99f1990e.js";import"./util-5cca836f.js";import"./BitmapTileContainer-ca407bc4.js";import"./Bitmap-1fcad555.js";import"./TileContainer-5e7d8033.js";import"./CircularArray-ef508845.js";import"./BufferPool-c1d152ec.js";import"./FeatureContainer-f641ec78.js";import"./popupUtils-5b610b91.js";import"./RefreshableLayerView-0ef43eaf.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
