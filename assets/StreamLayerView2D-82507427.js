import{a as s,b as n,c as y,l as m,F as d,d_ as h,g as _}from"./index-c06df8eb.js";import f from"./FeatureLayerView2D-f6e2f504.js";import{e as S}from"./util-d93557c2.js";import{d as v}from"./FeatureEffect-eaf3a6e7.js";import"./Container-f5369c46.js";import"./definitions-2bd24c53.js";import"./enums-b14466b3.js";import"./Texture-569e1284.js";import"./LayerView-80842e4e.js";import"./AttributeStoreView-94000c71.js";import"./TiledDisplayObject-c8f523fa.js";import"./color-12203a14.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./WGLContainer-cdd5f6f7.js";import"./VertexArrayObject-13ad58c1.js";import"./ProgramTemplate-800b691d.js";import"./GeometryUtils-e8ad4b33.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-1905a026.js";import"./visualVariablesUtils-0403828f.js";import"./ExpandedCIM-004434d0.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-9d4568ba.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-61ebdfdf.js";import"./floatRGBA-fff6f0f7.js";import"./clusterUtils-019fba94.js";import"./BitmapTileContainer-e1426604.js";import"./Bitmap-8cf5ad5a.js";import"./TileContainer-28747011.js";import"./CircularArray-ef508845.js";import"./BufferPool-25c0135a.js";import"./FeatureContainer-576834f1.js";import"./popupUtils-9d2daf02.js";import"./RefreshableLayerView-3726ace4.js";const g=e=>{let t=class extends e{resume(){this._isUserPaused=!1,this.suspended||this._doResume()}pause(){this._isUserPaused=!0,this.suspended||this._doPause()}constructor(...r){super(...r),this._isUserPaused=!1,this.filter=null}get connectionStatus(){return this._isUserPaused?"paused":this._streamConnectionStatus}_onSuspendedChange(r){r?this._doPause():this._isUserPaused||this._doResume()}};return s([n()],t.prototype,"_isUserPaused",void 0),s([n({readOnly:!0})],t.prototype,"connectionStatus",null),s([n({type:v})],t.prototype,"filter",void 0),t=s([y("esri.layers.mixins.StreamLayerView")],t),t};function c(e,t){if(e==null&&t==null)return null;const r={};return t!=null&&(r.geometry=t.toJSON()),e!=null&&(r.where=e),r}let o=class extends g(f){constructor(){super(...arguments),this.pipelineConnectionStatus="disconnected",this.pipelineErrorString=null,this._enabledEventTypes=new Set}initialize(){this.addHandles([m(()=>this.layer.customParameters,e=>this._proxy.updateCustomParameters(e)),this.layer.on("send-message-to-socket",e=>this._proxy.sendMessageToSocket(e)),this.layer.on("send-message-to-client",e=>this._proxy.sendMessageToClient(e)),m(()=>this.layer.purgeOptions,()=>this._update()),m(()=>this.suspended,this._onSuspendedChange.bind(this))],"constructor")}get connectionError(){return this.pipelineErrorString?new d("stream-controller",this.pipelineErrorString):null}on(e,t){if(Array.isArray(e))return h(e.map(p=>this.on(p,t)));const r=["data-received","message-received"].includes(e);r&&(this._enabledEventTypes.add(e),this._proxy.enableEvent(e,!0));const a=super.on(e,t),i=this;return{remove(){a.remove(),r&&(i._proxy.closed||i.hasEventListener(e)||i._proxy.enableEvent(e,!1))}}}queryLatestObservations(e,t){var r,a,i;if(!((r=this.layer.timeInfo)!=null&&r.endField||(a=this.layer.timeInfo)!=null&&a.startField||(i=this.layer.timeInfo)!=null&&i.trackIdField))throw new d("streamlayer-no-timeField","queryLatestObservation can only be used with services that define a TrackIdField");return this._proxy.queryLatestObservations(this._cleanUpQuery(e),t).then(p=>{const l=_.fromJSON(p);return l.features.forEach(u=>{u.layer=this.layer,u.sourceLayer=this.layer}),l})}detach(){super.detach(),this.pipelineConnectionStatus="disconnected"}get _streamConnectionStatus(){return this.pipelineConnectionStatus}_doPause(){var e;(e=this._proxy)==null||e.pauseStream()}_doResume(){var e;(e=this._proxy)==null||e.resumeStream()}_createClientOptions(){return{...super._createClientOptions(),setProperty:e=>{this.set(e.propertyName,e.value)}}}_createTileRendererHash(e){const t=`${JSON.stringify(this.layer.purgeOptions)}.${JSON.stringify(c(this.layer.definitionExpression,this.layer.geometryDefinition))})`;return super._createTileRendererHash(e)+t}async _createServiceOptions(){const e=this.layer,{objectIdField:t}=e,r=e.fields.map(l=>l.toJSON()),a=S(e.geometryType),i=e.timeInfo&&e.timeInfo.toJSON()||null,p=e.spatialReference?e.spatialReference.toJSON():null;return{type:"stream",isPaused:this._isUserPaused,fields:r,geometryType:a,objectIdField:t,timeInfo:i,source:this.layer.parsedUrl,serviceFilter:c(this.layer.definitionExpression,this.layer.geometryDefinition),purgeOptions:this.layer.purgeOptions.toJSON(),enabledEventTypes:Array.from(this._enabledEventTypes.values()),spatialReference:p,maxReconnectionAttempts:this.layer.maxReconnectionAttempts,maxReconnectionInterval:this.layer.maxReconnectionInterval,updateInterval:this.layer.updateInterval,customParameters:e.customParameters}}};s([n()],o.prototype,"pipelineConnectionStatus",void 0),s([n()],o.prototype,"pipelineErrorString",void 0),s([n({readOnly:!0})],o.prototype,"connectionError",null),s([n({readOnly:!0})],o.prototype,"_streamConnectionStatus",null),o=s([y("esri.views.2d.layers.StreamLayerView2D")],o);const oe=o;export{oe as default};