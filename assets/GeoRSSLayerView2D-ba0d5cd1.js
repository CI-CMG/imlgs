import{l,f as h,g,V as f,k as w,t as d,p as n,a as u,c as V}from"./index-c940dd0b.js";import{f as b,d as S}from"./LayerView-6ff9dc51.js";import{i as _}from"./GraphicContainer-1dbb684c.js";import{o as T}from"./GraphicsView2D-71fdd089.js";import"./Container-bbe1c89e.js";import"./definitions-a7bfca99.js";import"./enums-b14466b3.js";import"./Texture-fbc1ba31.js";import"./color-51f1e2e8.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./BaseGraphicContainer-a1c43d46.js";import"./FeatureContainer-1582bd8f.js";import"./AttributeStoreView-0009db24.js";import"./TiledDisplayObject-145071c1.js";import"./WGLContainer-2297151d.js";import"./VertexArrayObject-80e2f7d0.js";import"./ProgramTemplate-1ff07a8f.js";import"./GeometryUtils-46f35903.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-d319961a.js";import"./visualVariablesUtils-bda19d19.js";import"./ExpandedCIM-781bb3d3.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-5f2627ee.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-b95d53db.js";import"./floatRGBA-3899e55b.js";import"./clusterUtils-df91db3f.js";import"./util-293ce627.js";import"./TileContainer-ae3d2a71.js";import"./vec3f32-ad1dc57f.js";import"./normalizeUtilsSync-8b1a88d8.js";import"./projectionSupport-988a9a68.js";import"./json-48e3ea08.js";import"./Matcher-3ee8af6c.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-e1b16364.js";import"./devEnvironmentUtils-5002a058.js";import"./webStyleSymbolUtils-d5f293c5.js";import"./ComputedAttributeStorage-44e1fd24.js";import"./arcadeTimeUtils-4b15650e.js";import"./executionError-c92d3b85.js";let y=class extends b(S){constructor(){super(...arguments),this._graphicsViewMap={},this._popupTemplates=new Map,this.graphicsViews=[]}async hitTest(e,r){if(!this.graphicsViews.length)return null;const o=this.layer;return this.graphicsViews.reverse().map(t=>{const i=this._popupTemplates.get(t),s=t.hitTest(e);for(const p of s)p.layer=o,p.sourceLayer=o,p.popupTemplate=i;return s}).flat().map(t=>({type:"graphic",graphic:t,layer:o,mapPoint:e}))}update(e){if(this.graphicsViews)for(const r of this.graphicsViews)r.processUpdate(e)}attach(){this.addAttachHandles([l(()=>{var e;return(e=this.layer)==null?void 0:e.featureCollections},e=>{this._clear();for(const{popupInfo:r,featureSet:o,layerDefinition:t}of e){const i=g.fromJSON(o),s=new f(i.features),p=t.drawingInfo,c=r?w.fromJSON(r):null,a=d(p.renderer),m=new T({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:s,renderer:a,container:new _(this.view.featuresTilingScheme)});this._graphicsViewMap[i.geometryType]=m,this._popupTemplates.set(m,c),i.geometryType!=="polygon"||this.layer.polygonSymbol?i.geometryType!=="polyline"||this.layer.lineSymbol?i.geometryType!=="point"||this.layer.pointSymbol||(this.layer.pointSymbol=a.symbol):this.layer.lineSymbol=a.symbol:this.layer.polygonSymbol=a.symbol,this.graphicsViews.push(m),this.container.addChild(m.container)}},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.polygonSymbol},e=>{this._graphicsViewMap.polygon.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.lineSymbol},e=>{this._graphicsViewMap.polyline.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.pointSymbol},e=>{this._graphicsViewMap.point.renderer=new n({symbol:e})},h)])}detach(){this._clear()}moveStart(){}moveEnd(){}viewChange(){for(const e of this.graphicsViews)e.viewChange()}_clear(){this.container.removeAllChildren();for(const e of this.graphicsViews)e.destroy();this._graphicsViewMap={},this._popupTemplates.clear(),this.graphicsViews.length=0}};y=u([V("esri.views.2d.layers.GeoRSSLayerView2D")],y);const fe=y;export{fe as default};