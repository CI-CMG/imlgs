import{a as t,b as o,c as p}from"./index-0caad8f4.js";import a from"./FeatureLayerView2D-488605ad.js";import"./Container-883f17e2.js";import"./definitions-8094b192.js";import"./enums-b14466b3.js";import"./Texture-17fb3cb7.js";import"./FeatureEffect-84fec3f5.js";import"./LayerView-88eb0050.js";import"./AttributeStoreView-440bff0e.js";import"./TiledDisplayObject-a1514792.js";import"./color-d610ffc6.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-3774d4d6.js";import"./VertexArrayObject-1dd56569.js";import"./ProgramTemplate-6cba5ebf.js";import"./GeometryUtils-48ac33b4.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-a21f397c.js";import"./visualVariablesUtils-fb5763b5.js";import"./ExpandedCIM-a40af61d.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-dbc06187.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-2180a4b8.js";import"./floatRGBA-5df0f2ab.js";import"./clusterUtils-04e92b44.js";import"./util-1b4782af.js";import"./BitmapTileContainer-c25dfbd8.js";import"./Bitmap-e674660d.js";import"./TileContainer-0364e7b2.js";import"./CircularArray-ef508845.js";import"./BufferPool-8f582a46.js";import"./FeatureContainer-44ebf0e8.js";import"./popupUtils-5f2e9d9b.js";import"./RefreshableLayerView-b4d572c9.js";const s=i=>{let r=class extends i{get availableFields(){return this.layer.fieldsIndex.fields.map(m=>m.name)}};return t([o()],r.prototype,"layer",void 0),t([o({readOnly:!0})],r.prototype,"availableFields",null),r=t([p("esri.views.layers.OGCFeatureLayerView")],r),r};let e=class extends s(a){supportsSpatialReference(i){return this.layer.serviceSupportsSpatialReference(i)}};e=t([p("esri.views.2d.layers.OGCFeatureLayerView2D")],e);const Q=e;export{Q as default};
