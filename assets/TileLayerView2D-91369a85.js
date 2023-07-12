import{i as w,h as y,y as I,r as V,l as v,S as H,d as n,e as g,s as T,a as o,b as m,c as q}from"./index-d31d6bac.js";import"./MagnifierPrograms-36f6cdbd.js";import"./Container-2c5bc0c1.js";import"./BufferPool-f201a376.js";import"./color-69d9a02a.js";import"./WGLContainer-dd668d24.js";import"./enums-b14466b3.js";import"./Texture-c42e8204.js";import"./ProgramTemplate-e2a0b5aa.js";import"./definitions-1c24e27d.js";import"./GeometryUtils-fd063ca8.js";import"./VertexArrayObject-b191114c.js";import"./StyleDefinition-29c49b98.js";import"./enums-fb086c25.js";import"./OrderIndependentTransparency-309a1bc3.js";import"./floatRGBA-f5a7a002.js";import"./testSVGPremultipliedAlpha-5050a035.js";import{o as U}from"./GraphicsView2D-6678c571.js";import"./AttributeStoreView-f70865cf.js";import"./earcut-93432046.js";import"./vec3f32-ad1dc57f.js";import{t as S,o as f,n as d}from"./imageUtils-33582012.js";import{f as Q,d as b}from"./LayerView-90d610bf.js";import{n as C}from"./HighlightGraphicContainer-ce258186.js";import{a as k}from"./RefreshableLayerView-4acbe174.js";import{S as F,U as R,r as G}from"./drapedUtils-6b1dbb20.js";import"./ExpandedCIM-7afffedb.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./enums-f1a6a48a.js";import"./utils-8c734d27.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-1487c088.js";import"./rasterizingUtils-15067c9c.js";import"./imageutils-f52c5072.js";import"./Matcher-3ad1b2cf.js";import"./visualVariablesUtils-91b48270.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-1cb11193.js";import"./devEnvironmentUtils-5002a058.js";import"./webStyleSymbolUtils-8b62bf3c.js";import"./CircularArray-ef508845.js";import"./throttle-7bf02de9.js";import"./ComputedAttributeStorage-d24d53ef.js";import"./arcadeTimeUtils-a2eec944.js";import"./executionError-c92d3b85.js";import"./projectionSupport-c9ab591b.js";import"./json-48e3ea08.js";import"./VertexElementDescriptor-2925c6af.js";import"./config-1337d16e.js";import"./basicInterfaces-4ab7cc6a.js";import"./normalizeUtilsSync-9f8b27d8.js";import"./TiledDisplayObject-f26cb12c.js";import"./clusterUtils-d4f40056.js";import"./util-474bec23.js";import"./BitmapTileContainer-31774836.js";import"./Bitmap-5c8017e7.js";import"./TileContainer-6f31fc8c.js";import"./BaseGraphicContainer-487a5653.js";import"./FeatureContainer-257fa09a.js";import"./popupUtils-62ca9228.js";const L=[0,0];let s=class extends k(S(Q(b))){constructor(){super(...arguments),this._fetchQueue=null,this._highlightGraphics=new w,this._highlightView=null,this._popupHighlightHelper=null,this._tileStrategy=null,this.layer=null}get resampling(){return!("resampling"in this.layer)||this.layer.resampling!==!1}get tilemapCache(){return"tilemapCache"in this.layer?this.layer.tilemapCache:null}update(e){var t;this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),(t=this._highlightView)==null||t.processUpdate(e)}attach(){const e="tileServers"in this.layer?this.layer.tileServers:null,t=this.tilemapCache;if(this._tileInfoView=new y(this.layer.tileInfo,this.layer.fullExtent,t==null?void 0:t.effectiveMinLOD,t==null?void 0:t.effectiveMaxLOD),this._fetchQueue=new I({tileInfoView:this._tileInfoView,concurrency:e&&10*e.length||10,process:(i,r)=>this.fetchTile(i,r)}),this._tileStrategy=new V({cachePolicy:"keep",resampling:this.resampling,acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),tileInfoView:this._tileInfoView}),F(this,this.layer)){const i=this._highlightView=new U({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new C(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1});this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new R({createFetchPopupFeaturesQueryGeometry:(r,h)=>G(r,h,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(r,h)=>{i.graphicUpdateHandler({graphic:r,property:h})},layerView:this,updatingHandles:this.updatingHandles})}this.requestUpdate(),this.addAttachHandles(v(()=>this.resampling,()=>{this.doRefresh()})),super.attach()}detach(){var e;super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),(e=this._popupHighlightHelper)==null||e.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._popupHighlightHelper=null}async fetchPopupFeatures(e,t){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(e,t):[]}highlight(e){return this._popupHighlightHelper?this._popupHighlightHelper.highlight(e):{remove(){}}}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(e){var t;return H((t=this.layer.tileInfo)==null?void 0:t.spatialReference,e)}async doRefresh(){!this.attached||this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.refresh(e=>this._enqueueTileFetch(e)))}isUpdating(){var e;return((e=this._fetchQueue)==null?void 0:e.updating)??!1}acquireTile(e){const t=this._bitmapView.createTile(e),i=t.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(L,t.key),i.resolution=this._tileInfoView.getTileResolution(t.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(t),this._bitmapView.addChild(t),this.requestUpdate(),t}releaseTile(e){this._fetchQueue.abort(e.key.id),this._bitmapView.removeChild(e),e.once("detach",()=>e.destroy()),this.requestUpdate()}async fetchTile(e,t={}){const i=this.tilemapCache,{signal:r,resamplingLevel:h=0}=t;if(!i)try{return await this._fetchImage(e,r)}catch(a){if(!n(a)&&!this.resampling)return f(this._tileInfoView.tileInfo.size);if(h<3){const u=this._tileInfoView.getTileParentId(e.id);if(u){const c=new g(u),_=await this.fetchTile(c,{...t,resamplingLevel:h+1});return d(this._tileInfoView,_,c,e)}}throw a}const l=new g(0,0,0,0);let p;try{if(await i.fetchAvailabilityUpsample(e.level,e.row,e.col,l,{signal:r}),l.level!==e.level&&!this.resampling)return f(this._tileInfoView.tileInfo.size);p=await this._fetchImage(l,r)}catch(a){if(n(a))throw a;p=await this._fetchImage(e,r)}return this.resampling?d(this._tileInfoView,p,l,e):p}async _enqueueTileFetch(e){if(!this._fetchQueue.has(e.key.id)){try{const t=await this._fetchQueue.push(e.key);e.bitmap.source=t,e.bitmap.width=this._tileInfoView.tileInfo.size[0],e.bitmap.height=this._tileInfoView.tileInfo.size[1],e.requestRender(),e.once("attach",()=>this.requestUpdate())}catch(t){n(t)||T.getLogger(this).error(t)}this.requestUpdate()}}async _fetchImage(e,t){return this.layer.fetchImageBitmapTile(e.level,e.row,e.col,{signal:t})}};o([m()],s.prototype,"_fetchQueue",void 0),o([m()],s.prototype,"resampling",null),o([m()],s.prototype,"tilemapCache",null),s=o([q("esri.views.2d.layers.TileLayerView2D")],s);const Me=s;export{Me as default};