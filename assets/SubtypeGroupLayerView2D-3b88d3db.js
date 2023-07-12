import{a as m,c as d,l as u,f as y,z as h}from"./index-c7ff1b65.js";import{d as c}from"./FeatureEffect-335d26ee.js";import b from"./FeatureLayerView2D-542a0924.js";import"./Container-a25db51f.js";import"./definitions-953e0186.js";import"./enums-b14466b3.js";import"./Texture-8ececbac.js";import"./LayerView-01f4fea4.js";import"./AttributeStoreView-50350e43.js";import"./TiledDisplayObject-030ca40e.js";import"./color-8ccfbfb8.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-d737e922.js";import"./VertexArrayObject-d6f94787.js";import"./ProgramTemplate-ad6b47f5.js";import"./GeometryUtils-b1438083.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-994046fe.js";import"./visualVariablesUtils-511bc2fe.js";import"./ExpandedCIM-61f541a3.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-aefa81e2.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-88412da3.js";import"./floatRGBA-3aa99d53.js";import"./clusterUtils-f91eea50.js";import"./util-c4503251.js";import"./BitmapTileContainer-29d6005b.js";import"./Bitmap-d0b25d45.js";import"./TileContainer-eb5140ba.js";import"./CircularArray-ef508845.js";import"./BufferPool-0bc1a71c.js";import"./FeatureContainer-f712ac24.js";import"./popupUtils-fdcb9128.js";import"./RefreshableLayerView-c767aacd.js";function g(i,e){return!i.visible||i.minScale!==0&&e>i.minScale||i.maxScale!==0&&e<i.maxScale}let n=class extends b{initialize(){this.addHandles([u(()=>this.view.scale,()=>this._update(),y)],"constructor")}isUpdating(){var l;const i=this.layer.sublayers.some(p=>p.renderer!=null),e=this._commandsQueue.updating,s=this._updatingRequiredFieldsPromise!=null,t=!this._proxy||!this._proxy.isReady,r=this._pipelineIsUpdating,o=this.tileRenderer==null||((l=this.tileRenderer)==null?void 0:l.updating),a=i&&(e||s||t||r||o);return h("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${a}
  -> hasRenderer ${i}
  -> hasPendingCommand ${e}
  -> updatingRequiredFields ${s}
  -> updatingProxy ${t}
  -> updatingPipeline ${r}
  -> updatingTileRenderer ${o}
`),a}_injectOverrides(i){let e=super._injectOverrides(i);const s=this.view.scale,t=this.layer.sublayers.filter(o=>g(o,s)).map(o=>o.subtypeCode);if(!t.length)return e;e=e??new c().toJSON();const r=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return e.where=e.where?`(${e.where}) AND (${r})`:r,e}_setLayersForFeature(i){const e=this.layer.fieldsIndex.get(this.layer.subtypeField),s=i.attributes[e.name],t=this.layer.sublayers.find(r=>r.subtypeCode===s);i.layer=i.sourceLayer=t}_createSchemaConfig(){const i={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(r=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:r.labelingInfo,labelsVisible:r.labelsVisible,renderer:r.renderer,subtypeCode:r.subtypeCode,orderBy:null}))},e=this.layer.sublayers.map(r=>r.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${e})`:"1=2";let t=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return t+=s,{...super._createSchemaConfig(),...i,definitionExpression:t}}};n=m([d("esri.views.2d.layers.SubtypeGroupLayerView2D")],n);const re=n;export{re as default};
