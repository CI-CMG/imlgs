import{a,b as o,dQ as g,c as m,dR as l,i as d,d as u,s as c,l as y}from"./index-c940dd0b.js";import{a as f}from"./BitmapContainer-d8ab5dc0.js";import{f as x,d as w}from"./LayerView-6ff9dc51.js";import{o as v}from"./GraphicsView2D-71fdd089.js";import{n as _}from"./HighlightGraphicContainer-2d15ae15.js";import{v as H}from"./ExportStrategy-3bc55375.js";import{a as I}from"./RefreshableLayerView-40bdfa6f.js";import{U,r as V}from"./drapedUtils-011d7948.js";import"./WGLContainer-2297151d.js";import"./definitions-a7bfca99.js";import"./VertexArrayObject-80e2f7d0.js";import"./Texture-fbc1ba31.js";import"./enums-b14466b3.js";import"./VertexElementDescriptor-2925c6af.js";import"./color-51f1e2e8.js";import"./enums-f1a6a48a.js";import"./ProgramTemplate-1ff07a8f.js";import"./GeometryUtils-46f35903.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./Container-bbe1c89e.js";import"./earcut-d319961a.js";import"./ExpandedCIM-781bb3d3.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-5f2627ee.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-b95d53db.js";import"./floatRGBA-3899e55b.js";import"./normalizeUtilsSync-8b1a88d8.js";import"./projectionSupport-988a9a68.js";import"./json-48e3ea08.js";import"./AttributeStoreView-0009db24.js";import"./TiledDisplayObject-145071c1.js";import"./visualVariablesUtils-bda19d19.js";import"./clusterUtils-df91db3f.js";import"./util-293ce627.js";import"./Matcher-3ee8af6c.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-e1b16364.js";import"./devEnvironmentUtils-5002a058.js";import"./webStyleSymbolUtils-d5f293c5.js";import"./ComputedAttributeStorage-44e1fd24.js";import"./arcadeTimeUtils-4b15650e.js";import"./executionError-c92d3b85.js";import"./BaseGraphicContainer-a1c43d46.js";import"./FeatureContainer-1582bd8f.js";import"./TileContainer-ae3d2a71.js";import"./vec3f32-ad1dc57f.js";import"./Bitmap-2bc89c88.js";import"./popupUtils-1a73a340.js";const P=t=>{let e=class extends t{initialize(){this.exportImageParameters=new l({layer:this.layer})}destroy(){this.exportImageParameters.destroy(),this.exportImageParameters=null}get floors(){var i;return((i=this.view)==null?void 0:i.floors)??null}get exportImageVersion(){var i;return(i=this.exportImageParameters)==null||i.commitProperty("version"),this.commitProperty("timeExtent"),this.commitProperty("floors"),(this._get("exportImageVersion")||0)+1}canResume(){var i;return!!super.canResume()&&!((i=this.timeExtent)!=null&&i.isEmpty)}};return a([o()],e.prototype,"exportImageParameters",void 0),a([o({readOnly:!0})],e.prototype,"floors",null),a([o({readOnly:!0})],e.prototype,"exportImageVersion",null),a([o()],e.prototype,"layer",void 0),a([o()],e.prototype,"suspended",void 0),a([o(g)],e.prototype,"timeExtent",void 0),e=a([m("esri.views.layers.MapImageLayerView")],e),e};let s=class extends P(I(x(w))){constructor(){super(...arguments),this._highlightGraphics=new d,this._updateHash=""}fetchPopupFeatures(t,e){return this._popupHighlightHelper.fetchPopupFeatures(t,e)}update(t){const e=`${this.exportImageVersion}/${t.state.id}/${t.pixelRatio}/${t.stationary}`;this._updateHash!==e&&(this._updateHash=e,this.strategy.update(t).catch(r=>{u(r)||c.getLogger(this).error(r)}),t.stationary&&this._popupHighlightHelper.updateHighlightedFeatures(t.state.resolution)),this._highlightView.processUpdate(t)}attach(){const{imageMaxWidth:t,imageMaxHeight:e,version:r}=this.layer,i=r>=10.3,n=r>=10;this._bitmapContainer=new f,this.container.addChild(this._bitmapContainer),this._highlightView=new v({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new _(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1}),this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new U({createFetchPopupFeaturesQueryGeometry:(p,h)=>V(p,h,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(p,h)=>{this._highlightView.graphicUpdateHandler({graphic:p,property:h})},layerView:this,updatingHandles:this.updatingHandles}),this.strategy=new H({container:this._bitmapContainer,fetchSource:this.fetchImageBitmap.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxWidth:t,imageMaxHeight:e,imageRotationSupported:i,imageNormalizationSupported:n,hidpi:!0}),this.addAttachHandles(y(()=>this.exportImageVersion,()=>this.requestUpdate())),this.requestUpdate()}detach(){this.strategy.destroy(),this.container.removeAllChildren(),this._bitmapContainer.removeAllChildren(),this._highlightView.destroy(),this._popupHighlightHelper.destroy()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}supportsSpatialReference(t){return this.layer.serviceSupportsSpatialReference(t)}async doRefresh(){this._updateHash="",this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(t,e,r,i){return this.layer.fetchImage(t,e,r,{timeExtent:this.timeExtent,floors:this.floors,...i})}fetchImageBitmap(t,e,r,i){return this.layer.fetchImageBitmap(t,e,r,{timeExtent:this.timeExtent,floors:this.floors,...i})}highlight(t){return this._popupHighlightHelper.highlight(t)}};a([o()],s.prototype,"strategy",void 0),a([o()],s.prototype,"updating",void 0),s=a([m("esri.views.2d.layers.MapImageLayerView2D")],s);const Vt=s;export{Vt as default};