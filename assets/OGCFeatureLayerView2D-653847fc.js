import{a as t,b as o,c as p}from"./index-d8b5d06e.js";import a from"./FeatureLayerView2D-6f998bca.js";import"./Container-8255e325.js";import"./definitions-47627555.js";import"./enums-b14466b3.js";import"./Texture-43d09e0b.js";import"./FeatureEffect-1c02a3e7.js";import"./LayerView-13e34f40.js";import"./AttributeStoreView-9c9f30cd.js";import"./TiledDisplayObject-0ba939f0.js";import"./color-57507b70.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-04e9bda9.js";import"./VertexArrayObject-35891091.js";import"./ProgramTemplate-dc495d4f.js";import"./GeometryUtils-aef00d52.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-0ca2ebd9.js";import"./visualVariablesUtils-957afd48.js";import"./ExpandedCIM-2b3d9ede.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-e7782098.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-60f22ec2.js";import"./floatRGBA-c35cebc9.js";import"./clusterUtils-f7b739b1.js";import"./util-16429951.js";import"./BitmapTileContainer-0a898d2c.js";import"./Bitmap-49236ee3.js";import"./TileContainer-b1c31248.js";import"./CircularArray-ef508845.js";import"./BufferPool-3f7bc316.js";import"./FeatureContainer-fc4679aa.js";import"./popupUtils-009ab840.js";import"./RefreshableLayerView-fea19f4c.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
