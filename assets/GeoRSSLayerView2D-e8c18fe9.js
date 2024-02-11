import{l,f as h,g,V as f,k as w,t as d,p as n,a as u,c as V}from"./index-04785765.js";import{f as b,d as S}from"./LayerView-0c11791e.js";import{i as _}from"./GraphicContainer-beff4ab0.js";import{o as T}from"./GraphicsView2D-2e1c1b53.js";import"./Container-193b44d1.js";import"./definitions-53992730.js";import"./enums-b14466b3.js";import"./Texture-4b40f511.js";import"./color-206a9e24.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./BaseGraphicContainer-8ae49fe6.js";import"./FeatureContainer-70f3d47d.js";import"./AttributeStoreView-d1fd4203.js";import"./TiledDisplayObject-dc24ff80.js";import"./WGLContainer-c47e3ca9.js";import"./VertexArrayObject-3e2e45f9.js";import"./ProgramTemplate-01e74261.js";import"./GeometryUtils-a3555653.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-e58d9b2f.js";import"./visualVariablesUtils-8200e462.js";import"./ExpandedCIM-51f37562.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-ff4b3c8c.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-9e945171.js";import"./floatRGBA-f2e12baa.js";import"./clusterUtils-83d2f535.js";import"./util-d24e1694.js";import"./TileContainer-6054ee24.js";import"./vec3f32-ad1dc57f.js";import"./normalizeUtilsSync-4e0c7b67.js";import"./projectionSupport-2d581b85.js";import"./json-48e3ea08.js";import"./Matcher-861d0685.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-e078fd19.js";import"./devEnvironmentUtils-5002a058.js";import"./webStyleSymbolUtils-ab706c20.js";import"./ComputedAttributeStorage-6c454c51.js";import"./arcadeTimeUtils-236cebc3.js";import"./executionError-c92d3b85.js";let y=class extends b(S){constructor(){super(...arguments),this._graphicsViewMap={},this._popupTemplates=new Map,this.graphicsViews=[]}async hitTest(e,r){if(!this.graphicsViews.length)return null;const o=this.layer;return this.graphicsViews.reverse().map(t=>{const i=this._popupTemplates.get(t),s=t.hitTest(e);for(const p of s)p.layer=o,p.sourceLayer=o,p.popupTemplate=i;return s}).flat().map(t=>({type:"graphic",graphic:t,layer:o,mapPoint:e}))}update(e){if(this.graphicsViews)for(const r of this.graphicsViews)r.processUpdate(e)}attach(){this.addAttachHandles([l(()=>{var e;return(e=this.layer)==null?void 0:e.featureCollections},e=>{this._clear();for(const{popupInfo:r,featureSet:o,layerDefinition:t}of e){const i=g.fromJSON(o),s=new f(i.features),p=t.drawingInfo,c=r?w.fromJSON(r):null,a=d(p.renderer),m=new T({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:s,renderer:a,container:new _(this.view.featuresTilingScheme)});this._graphicsViewMap[i.geometryType]=m,this._popupTemplates.set(m,c),i.geometryType!=="polygon"||this.layer.polygonSymbol?i.geometryType!=="polyline"||this.layer.lineSymbol?i.geometryType!=="point"||this.layer.pointSymbol||(this.layer.pointSymbol=a.symbol):this.layer.lineSymbol=a.symbol:this.layer.polygonSymbol=a.symbol,this.graphicsViews.push(m),this.container.addChild(m.container)}},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.polygonSymbol},e=>{this._graphicsViewMap.polygon.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.lineSymbol},e=>{this._graphicsViewMap.polyline.renderer=new n({symbol:e})},h),l(()=>{var e;return(e=this.layer)==null?void 0:e.pointSymbol},e=>{this._graphicsViewMap.point.renderer=new n({symbol:e})},h)])}detach(){this._clear()}moveStart(){}moveEnd(){}viewChange(){for(const e of this.graphicsViews)e.viewChange()}_clear(){this.container.removeAllChildren();for(const e of this.graphicsViews)e.destroy();this._graphicsViewMap={},this._popupTemplates.clear(),this.graphicsViews.length=0}};y=u([V("esri.views.2d.layers.GeoRSSLayerView2D")],y);const fe=y;export{fe as default};