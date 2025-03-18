import{cs as de,a as t,b as s,an as F,ee as ce,jl as q,c as p,gg as he,s as x,eN as X,gu as ee,aM as ge,eS as fe,P as te,aF as me,gH as ve,D as I,m as be,av as Se,ao as re,fa as we,e_ as $e,eY as Oe,k as xe,be as se,B as Ie,V as b,I as Fe,jm as je,ay as f,az as d,jn as Le,cT as Te,cY as Be,cv as Ee,cw as Ae,cx as _e,cy as qe,cZ as Ne,x as Pe,N as Re,cz as Me,d1 as ke,jo as Ke,cC as Qe,eT as Ue,K as De}from"./index-75aaf891.js";import ie from"./FeatureLayer-cdb03c01.js";import{t as Ce,l as Ve,i as He}from"./FetchAssociatedFeatureLayer-e1209c99.js";import{s as Je}from"./fieldProperties-986ddc66.js";import{r as Ze,N as ze,K as H}from"./SceneService-195f41a6.js";import{s as Ge,l as Ye,u as We,m as Xe}from"./I3SLayerDefinitions-8efa94c9.js";import{n as et,p as tt}from"./popupUtils-a52302a6.js";import"./FeatureLayerBase-aa341cf2.js";import"./featureLayerUtils-be25d1cd.js";import"./RelationshipQuery-da341e2c.js";import"./editsZScale-0542562a.js";import"./EditBusLayer-496cffbb.js";import"./FeatureEffectLayer-f9651f07.js";import"./FeatureEffect-a0570074.js";import"./FeatureReductionLayer-10399f95.js";import"./clusterUtils-4f8d79d8.js";import"./OrderedLayer-d71096d4.js";import"./styleUtils-ef2f3a80.js";import"./TopFeaturesQuery-1a85112b.js";import"./mat3f64-221ce671.js";import"./mat4f64-1413b4a7.js";import"./quat-18134843.js";import"./quatf64-3363c48e.js";import"./I3SBinaryReader-bc434c4a.js";import"./VertexAttribute-9f2e53ec.js";import"./spatialReferenceEllipsoidUtils-34f39e00.js";import"./symbolColorUtils-3c5db2a1.js";import"./vec3f32-ad1dc57f.js";import"./plane-07c42998.js";import"./sphere-98df06ba.js";import"./ByteSizeUnit-d4757d40.js";import"./originUtils-1469eeaf.js";import"./multiOriginJSONSupportUtils-c978f4c3.js";import"./resourceUtils-b1af7b10.js";let y=class extends de(he){constructor(r){super(r),this.title="",this.id=-1,this.modelName=null,this.isEmpty=null,this.legendEnabled=!0,this.visible=!0,this.opacity=1}readTitle(r,i){return typeof i.alias=="string"?i.alias:typeof i.name=="string"?i.name:""}readIdOnlyOnce(r){return this.id!==-1?this.id:typeof r=="number"?r:-1}};t([s({type:String,json:{origins:{"web-scene":{write:!0},"portal-item":{write:!0}}}})],y.prototype,"title",void 0),t([F("service","title",["alias","name"])],y.prototype,"readTitle",null),t([s()],y.prototype,"layer",void 0),t([s({type:ce,readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],y.prototype,"id",void 0),t([F("service","id")],y.prototype,"readIdOnlyOnce",null),t([s(q(String))],y.prototype,"modelName",void 0),t([s(q(Boolean))],y.prototype,"isEmpty",void 0),t([s({type:Boolean,nonNullable:!0})],y.prototype,"legendEnabled",void 0),t([s({type:Boolean,json:{name:"visibility",write:!0}})],y.prototype,"visible",void 0),t([s({type:Number,json:{write:!0}})],y.prototype,"opacity",void 0),y=t([p("esri.layers.buildingSublayers.BuildingSublayer")],y);const oe=y,ae="esri.layers.buildingSublayers.BuildingComponentSublayer",rt=x.getLogger(ae),J=Je();let a=class extends X.LoadableMixin(ee(oe)){constructor(e){super(e),this.type="building-component",this.nodePages=null,this.materialDefinitions=[],this.textureSetDefinitions=[],this.geometryDefinitions=[],this.indexInfo=null,this.serviceUpdateTimeStamp=null,this.store=null,this.attributeStorageInfo=[],this.fields=[],this.associatedLayer=null,this.outFields=null,this.listMode="show",this.renderer=null,this.definitionExpression=null,this.popupEnabled=!0,this.popupTemplate=null,this.layerType="3d-object"}get parsedUrl(){var e,r;return this.layer?{path:`${(e=this.layer.parsedUrl)==null?void 0:e.path}/sublayers/${this.id}`,query:(r=this.layer.parsedUrl)==null?void 0:r.query}:{path:""}}get fieldsIndex(){return new ge(this.fields)}readAssociatedLayer(e,r){const i=this.layer.associatedFeatureServiceItem,o=r.associatedLayerID;return i!=null&&typeof o=="number"?new ie({portalItem:i,layerId:o}):null}get objectIdField(){if(this.fields!=null){for(const e of this.fields)if(e.type==="oid")return e.name}return null}get displayField(){return this.associatedLayer!=null?this.associatedLayer.displayField:void 0}get apiKey(){return this.layer.apiKey}get fullExtent(){return this.layer.fullExtent}get spatialReference(){return this.layer.spatialReference}get version(){return this.layer.version}get elevationInfo(){return this.layer.elevationInfo}get minScale(){return this.layer.minScale}get maxScale(){return this.layer.maxScale}get effectiveScaleRange(){return this.layer.effectiveScaleRange}get defaultPopupTemplate(){return this.createPopupTemplate()}load(e){const r=e!=null?e.signal:null,i=this._fetchService(r).then(()=>{this.indexInfo=Ze(this.parsedUrl.path,this.rootNode,this.nodePages,this.apiKey,rt,r)});return this.addResolvingPromise(i),Promise.resolve(this)}createPopupTemplate(e){return fe(this,e)}async _fetchService(e){const r=(await te(this.parsedUrl.path,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(r,{origin:"service",url:this.parsedUrl})}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e,r){var o,n,c;const i=(n=(o=this.getFeatureType(r==null?void 0:r.feature))==null?void 0:o.domains)==null?void 0:n[e];return i&&i.type!=="inherited"?i:((c=this.getField(e))==null?void 0:c.domain)??null}getFeatureType(e){return e&&this.associatedLayer!=null?this.associatedLayer.getFeatureType(e):null}get types(){return this.associatedLayer!=null?this.associatedLayer.types??[]:[]}get typeIdField(){return this.associatedLayer!=null?this.associatedLayer.typeIdField:null}get geometryType(){return this.layerType==="3d-object"?"mesh":"point"}get profile(){return this.layerType==="3d-object"?"mesh-pyramids":"points"}get capabilities(){const e=this.associatedLayer!=null&&this.associatedLayer.capabilities?this.associatedLayer.capabilities:Ce,{query:r,data:{supportsZ:i,supportsM:o,isVersioned:n}}=e;return{query:r,data:{supportsZ:i,supportsM:o,isVersioned:n}}}createQuery(){const e=new me;return this.geometryType!=="mesh"&&(e.returnGeometry=!0,e.returnZ=!0),e.where=this.definitionExpression||"1=1",e.sqlFormat="standard",e}queryExtent(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryExtent(e||this.createQuery(),r))}queryFeatureCount(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryFeatureCount(e||this.createQuery(),r))}queryFeatures(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryFeatures(e||this.createQuery(),r)).then(i=>{if(i!=null&&i.features)for(const o of i.features)o.layer=this.layer,o.sourceLayer=this;return i})}queryObjectIds(e,r){return this._getAssociatedLayerForQuery().then(i=>i.queryObjectIds(e||this.createQuery(),r))}async queryCachedAttributes(e,r){const i=ve(this.fieldsIndex,await et(this,tt(this)));return Ve(this.parsedUrl.path,this.attributeStorageInfo,e,r,i)}async queryCachedFeature(e,r){const i=await this.queryCachedAttributes(e,[r]);if(!i||i.length===0)throw new I("scenelayer:feature-not-in-cached-data","Feature not found in cached data");const o=new be;return o.attributes=i[0],o.layer=this,o.sourceLayer=this,o}getFieldUsageInfo(e){return this.fieldsIndex.has(e)?{supportsLabelingInfo:!1,supportsRenderer:!1,supportsPopupTemplate:!1,supportsLayerQuery:!1}:{supportsLabelingInfo:!1,supportsRenderer:!0,supportsPopupTemplate:!0,supportsLayerQuery:this.associatedLayer!=null}}_getAssociatedLayerForQuery(){const e=this.associatedLayer;return e!=null&&e.loaded?Promise.resolve(e):this._loadAssociatedLayerForQuery()}async _loadAssociatedLayerForQuery(){if(await this.load(),this.associatedLayer==null)throw new I("buildingscenelayer:query-not-available","BuildingSceneLayer component layer queries are not available without an associated feature layer",{layer:this});try{await this.associatedLayer.load()}catch(e){throw new I("buildingscenelayer:query-not-available","BuildingSceneLayer associated feature layer could not be loaded",{layer:this,error:e})}return this.associatedLayer}};t([s({readOnly:!0})],a.prototype,"parsedUrl",null),t([s({type:Ge,readOnly:!0})],a.prototype,"nodePages",void 0),t([s({type:[Ye],readOnly:!0})],a.prototype,"materialDefinitions",void 0),t([s({type:[We],readOnly:!0})],a.prototype,"textureSetDefinitions",void 0),t([s({type:[Xe],readOnly:!0})],a.prototype,"geometryDefinitions",void 0),t([s({readOnly:!0})],a.prototype,"serviceUpdateTimeStamp",void 0),t([s({readOnly:!0})],a.prototype,"store",void 0),t([s({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],a.prototype,"rootNode",void 0),t([s({readOnly:!0})],a.prototype,"attributeStorageInfo",void 0),t([s(J.fields)],a.prototype,"fields",void 0),t([s({readOnly:!0})],a.prototype,"fieldsIndex",null),t([s({readOnly:!0,type:ie})],a.prototype,"associatedLayer",void 0),t([F("service","associatedLayer",["associatedLayerID"])],a.prototype,"readAssociatedLayer",null),t([s(J.outFields)],a.prototype,"outFields",void 0),t([s({type:String,readOnly:!0})],a.prototype,"objectIdField",null),t([s({readOnly:!0,type:String,json:{read:!1}})],a.prototype,"displayField",null),t([s({readOnly:!0,type:String})],a.prototype,"apiKey",null),t([s({readOnly:!0,type:Se})],a.prototype,"fullExtent",null),t([s({readOnly:!0,type:re})],a.prototype,"spatialReference",null),t([s({readOnly:!0})],a.prototype,"version",null),t([s({readOnly:!0,type:we})],a.prototype,"elevationInfo",null),t([s({readOnly:!0,type:Number})],a.prototype,"minScale",null),t([s({readOnly:!0,type:Number})],a.prototype,"maxScale",null),t([s({readOnly:!0,type:Number})],a.prototype,"effectiveScaleRange",null),t([s({type:["hide","show"],json:{write:!0}})],a.prototype,"listMode",void 0),t([s({types:$e,json:{origins:{service:{read:{source:"drawingInfo.renderer"}}},name:"layerDefinition.drawingInfo.renderer",write:!0},value:null})],a.prototype,"renderer",void 0),t([s({type:String,json:{origins:{service:{read:!1,write:!1}},name:"layerDefinition.definitionExpression",write:{enabled:!0,allowNull:!0}}})],a.prototype,"definitionExpression",void 0),t([s(Oe)],a.prototype,"popupEnabled",void 0),t([s({type:xe,json:{read:{source:"popupInfo"},write:{target:"popupInfo"}}})],a.prototype,"popupTemplate",void 0),t([s({readOnly:!0,type:String,json:{origins:{service:{read:{source:"store.normalReferenceFrame"}}},read:!1}})],a.prototype,"normalReferenceFrame",void 0),t([s({readOnly:!0,json:{read:!1}})],a.prototype,"defaultPopupTemplate",null),t([s()],a.prototype,"types",null),t([s()],a.prototype,"typeIdField",null),t([s({json:{write:!1}}),se(new Ie({"3DObject":"3d-object",Point:"point"}))],a.prototype,"layerType",void 0),t([s()],a.prototype,"geometryType",null),t([s()],a.prototype,"profile",null),t([s({readOnly:!0,json:{read:!1}})],a.prototype,"capabilities",null),a=t([p(ae)],a);const N=a;var P;const Z={type:b,readOnly:!0,json:{origins:{service:{read:{source:"sublayers",reader:ne}}},read:!1}};function ne(e,r,i){if(e&&Array.isArray(e))return new b(e.map(o=>{const n=st(o);if(n){const c=new n;return c.read(o,i),c}return i&&i.messages&&o&&i.messages.push(new Fe("building-scene-layer:unsupported-sublayer-type","Building scene sublayer of type '"+(o.type||"unknown")+"' are not supported",{definition:o,context:i})),null}))}let g=P=class extends oe{constructor(e){super(e),this.type="building-group",this.listMode="show",this.sublayers=null}loadAll(){return je(this,e=>P.forEachSublayer(this.sublayers,r=>{r.type!=="building-group"&&e(r)}))}};function st(e){return e.layerType==="group"?g:N}t([s({type:["hide","show","hide-children"],json:{write:!0}})],g.prototype,"listMode",void 0),t([s(Z)],g.prototype,"sublayers",void 0),g=P=t([p("esri.layers.buildingSublayers.BuildingGroupSublayer")],g),function(e){function r(i,o){i.forEach(n=>{o(n),n.type==="building-group"&&r(n.sublayers,o)})}e.sublayersProperty=Z,e.readSublayers=ne,e.forEachSublayer=r}(g||(g={}));const m=g;let j=class extends f{constructor(){super(...arguments),this.type=null}};t([s({type:String,readOnly:!0,json:{write:!0}})],j.prototype,"type",void 0),j=t([p("esri.layers.support.BuildingFilterAuthoringInfo")],j);const le=j;var R;let S=R=class extends f{constructor(){super(...arguments),this.filterType=null,this.filterValues=null}clone(){return new R({filterType:this.filterType,filterValues:d(this.filterValues)})}};t([s({type:String,json:{write:!0}})],S.prototype,"filterType",void 0),t([s({type:[String],json:{write:!0}})],S.prototype,"filterValues",void 0),S=R=t([p("esri.layers.support.BuildingFilterAuthoringInfoType")],S);const it=S;var M;const ot=b.ofType(it);let L=M=class extends f{clone(){return new M({filterTypes:d(this.filterTypes)})}};t([s({type:ot,json:{write:!0}})],L.prototype,"filterTypes",void 0),L=M=t([p("esri.layers.support.BuildingFilterAuthoringInfoBlock")],L);const at=L;var k;const nt=b.ofType(at);let w=k=class extends le{constructor(){super(...arguments),this.type="checkbox"}clone(){return new k({filterBlocks:d(this.filterBlocks)})}};t([s({type:["checkbox"]})],w.prototype,"type",void 0),t([s({type:nt,json:{write:!0}})],w.prototype,"filterBlocks",void 0),w=k=t([p("esri.layers.support.BuildingFilterAuthoringInfoCheckbox")],w);const z=w;let T=class extends f{};t([s({readOnly:!0,json:{read:!1}})],T.prototype,"type",void 0),T=t([p("esri.layers.support.BuildingFilterMode")],T);const A=T;var K;let B=K=class extends A{constructor(){super(...arguments),this.type="solid"}clone(){return new K}};t([s({type:["solid"],readOnly:!0,json:{write:!0}})],B.prototype,"type",void 0),B=K=t([p("esri.layers.support.BuildingFilterModeSolid")],B);const Q=B;var U;let $=U=class extends A{constructor(){super(...arguments),this.type="wire-frame",this.edges=null}clone(){return new U({edges:d(this.edges)})}};t([se({wireFrame:"wire-frame"})],$.prototype,"type",void 0),t([s(Le)],$.prototype,"edges",void 0),$=U=t([p("esri.layers.support.BuildingFilterModeWireFrame")],$);const G=$;var D;let E=D=class extends A{constructor(){super(...arguments),this.type="x-ray"}clone(){return new D}};t([s({type:["x-ray"],readOnly:!0,json:{write:!0}})],E.prototype,"type",void 0),E=D=t([p("esri.layers.support.BuildingFilterModeXRay")],E);const Y=E;var C;const lt={nonNullable:!0,types:{key:"type",base:A,typeMap:{solid:Q,"wire-frame":G,"x-ray":Y}},json:{read:e=>{switch(e&&e.type){case"solid":return Q.fromJSON(e);case"wireFrame":return G.fromJSON(e);case"x-ray":return Y.fromJSON(e);default:return}},write:{enabled:!0,isRequired:!0}}};let v=C=class extends f{constructor(){super(...arguments),this.filterExpression=null,this.filterMode=new Q,this.title=""}clone(){return new C({filterExpression:this.filterExpression,filterMode:d(this.filterMode),title:this.title})}};t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],v.prototype,"filterExpression",void 0),t([s(lt)],v.prototype,"filterMode",void 0),t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],v.prototype,"title",void 0),v=C=t([p("esri.layers.support.BuildingFilterBlock")],v);const pt=v;var V;const yt=b.ofType(pt);let h=V=class extends f{constructor(){super(...arguments),this.description=null,this.filterBlocks=null,this.id=Te(),this.name=null}clone(){return new V({description:this.description,filterBlocks:d(this.filterBlocks),id:this.id,name:this.name,filterAuthoringInfo:d(this.filterAuthoringInfo)})}};t([s({type:String,json:{write:!0}})],h.prototype,"description",void 0),t([s({type:yt,json:{write:{enabled:!0,isRequired:!0}}})],h.prototype,"filterBlocks",void 0),t([s({types:{key:"type",base:le,typeMap:{checkbox:z}},json:{read:e=>(e&&e.type)==="checkbox"?z.fromJSON(e):null,write:!0}})],h.prototype,"filterAuthoringInfo",void 0),t([s({type:String,constructOnly:!0,json:{write:{enabled:!0,isRequired:!0}}})],h.prototype,"id",void 0),t([s({type:String,json:{write:{enabled:!0,isRequired:!0}}})],h.prototype,"name",void 0),h=V=t([p("esri.layers.support.BuildingFilter")],h);const ut=h;let u=class extends f{constructor(){super(...arguments),this.fieldName=null,this.modelName=null,this.label=null,this.min=null,this.max=null,this.mostFrequentValues=null,this.subLayerIds=null}};t([s({type:String})],u.prototype,"fieldName",void 0),t([s({type:String})],u.prototype,"modelName",void 0),t([s({type:String})],u.prototype,"label",void 0),t([s({type:Number})],u.prototype,"min",void 0),t([s({type:Number})],u.prototype,"max",void 0),t([s({json:{read:e=>Array.isArray(e)&&(e.every(r=>typeof r=="string")||e.every(r=>typeof r=="number"))?e.slice():null}})],u.prototype,"mostFrequentValues",void 0),t([s({type:[Number]})],u.prototype,"subLayerIds",void 0),u=t([p("esri.layers.support.BuildingFieldStatistics")],u);let O=class extends X.LoadableMixin(ee(f)){constructor(){super(...arguments),this.url=null}get fields(){return this.loaded||this.loadStatus==="loading"?this._get("fields"):(x.getLogger(this).error("building summary statistics are not loaded"),null)}load(e){const r=e!=null?e.signal:null;return this.addResolvingPromise(this._fetchService(r)),Promise.resolve(this)}async _fetchService(e){const r=(await te(this.url,{query:{f:"json"},responseType:"json",signal:e})).data;this.read(r,{origin:"service"})}};t([s({constructOnly:!0,type:String})],O.prototype,"url",void 0),t([s({readOnly:!0,type:[u],json:{read:{source:"summary"}}})],O.prototype,"fields",null),O=t([p("esri.layers.support.BuildingSummaryStatistics")],O);const pe=O,ye=b.ofType(ut),ue=d(m.sublayersProperty);var W;const _=(W=ue.json)==null?void 0:W.origins;_&&(_["web-scene"]={type:[N],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}},_["portal-item"]={type:[N],write:{enabled:!0,overridePolicy:()=>({enabled:!1})}});let l=class extends ze(Be(Ee(Ae(_e(qe(Ne(De))))))){constructor(e){super(e),this.operationalLayerType="BuildingSceneLayer",this.allSublayers=new Pe({getCollections:()=>[this.sublayers],getChildrenFunction:r=>r.type==="building-group"?r.sublayers:null}),this.sublayers=null,this._sublayerOverrides=null,this.filters=new ye,this.activeFilterId=null,this.summaryStatistics=null,this.outFields=null,this.legendEnabled=!0,this.type="building-scene"}normalizeCtorArgs(e){return typeof e=="string"?{url:e}:e??{}}destroy(){this.allSublayers.destroy()}readSublayers(e,r,i){const o=m.readSublayers(e,r,i);return m.forEachSublayer(o,n=>n.layer=this),this._sublayerOverrides&&(this.applySublayerOverrides(o,this._sublayerOverrides),this._sublayerOverrides=null),o}applySublayerOverrides(e,{overrides:r,context:i}){m.forEachSublayer(e,o=>o.read(r.get(o.id),i))}readSublayerOverrides(e,r){var o;const i=new Map;for(const n of e)n!=null&&typeof n=="object"&&typeof n.id=="number"?i.set(n.id,n):(o=r.messages)==null||o.push(new I("building-scene-layer:invalid-sublayer-override","Invalid value for sublayer override. Not an object or no id specified.",{value:n}));return{overrides:i,context:r}}writeSublayerOverrides(e,r,i){const o=[];m.forEachSublayer(this.sublayers,n=>{const c=n.write({},i);Object.keys(c).length>1&&o.push(c)}),o.length>0&&(r.sublayers=o)}writeUnappliedOverrides(e,r){r.sublayers=[],e.overrides.forEach(i=>{r.sublayers.push(d(i))})}write(e,r){return e=super.write(e,r),!r||r.origin!=="web-scene"&&r.origin!=="portal-item"||(this.sublayers?this.writeSublayerOverrides(this.sublayers,e,r):this._sublayerOverrides&&this.writeUnappliedOverrides(this._sublayerOverrides,e)),e}read(e,r){if(super.read(e,r),r&&(r.origin==="web-scene"||r.origin==="portal-item")&&e!=null&&Array.isArray(e.sublayers)){const i=this.readSublayerOverrides(e.sublayers,r);this.sublayers?this.applySublayerOverrides(this.sublayers,i):this._sublayerOverrides=i}}readSummaryStatistics(e,r){var i;if(typeof r.statisticsHRef=="string"){const o=Re((i=this.parsedUrl)==null?void 0:i.path,r.statisticsHRef);return new pe({url:o})}return null}set elevationInfo(e){this._set("elevationInfo",e),this._validateElevationInfo()}load(e){const r=e!=null?e.signal:null,i=this.loadFromPortal({supportedTypes:["Scene Service"]},e).catch(Me).then(()=>this._fetchService(r)).then(()=>this._fetchAssociatedFeatureService(r));return this.addResolvingPromise(i),Promise.resolve(this)}loadAll(){return ke(this,e=>{m.forEachSublayer(this.sublayers,r=>{r.type!=="building-group"&&e(r)}),this.summaryStatistics&&e(this.summaryStatistics)})}async saveAs(e,r){return this._debouncedSaveOperations(H.SAVE_AS,{...r,getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"},e)}async save(){const e={getTypeKeywords:()=>this._getTypeKeywords(),portalItemLayerType:"building-scene"};return this._debouncedSaveOperations(H.SAVE,e)}validateLayer(e){if(!e.layerType||e.layerType!=="Building")throw new I("buildingscenelayer:layer-type-not-supported","BuildingSceneLayer does not support this layer type",{layerType:e.layerType})}_getTypeKeywords(){return["Building"]}_validateElevationInfo(){const e=this.elevationInfo;e&&(e.mode!=="absolute-height"&&x.getLogger(this).warn(".elevationInfo=","Building scene layers only support absolute-height elevation mode"),e.featureExpressionInfo&&e.featureExpressionInfo.expression!=="0"&&x.getLogger(this).warn(".elevationInfo=","Building scene layers do not support featureExpressionInfo"))}async _fetchAssociatedFeatureService(e){const r=new He(this.parsedUrl,this.portalItem,this.apiKey,e);try{this.associatedFeatureServiceItem=await r.fetchPortalItem()}catch(i){x.getLogger(this).warn("Associated feature service item could not be loaded",i)}}};t([s({type:["BuildingSceneLayer"]})],l.prototype,"operationalLayerType",void 0),t([s({readOnly:!0})],l.prototype,"allSublayers",void 0),t([s(ue)],l.prototype,"sublayers",void 0),t([F("service","sublayers")],l.prototype,"readSublayers",null),t([s({type:ye,nonNullable:!0,json:{write:!0}})],l.prototype,"filters",void 0),t([s({type:String,json:{write:!0}})],l.prototype,"activeFilterId",void 0),t([s({readOnly:!0,type:pe})],l.prototype,"summaryStatistics",void 0),t([F("summaryStatistics",["statisticsHRef"])],l.prototype,"readSummaryStatistics",null),t([s({type:[String],json:{read:!1}})],l.prototype,"outFields",void 0),t([s(Ke)],l.prototype,"fullExtent",void 0),t([s(Qe)],l.prototype,"legendEnabled",void 0),t([s({type:["show","hide","hide-children"]})],l.prototype,"listMode",void 0),t([s(q(re))],l.prototype,"spatialReference",void 0),t([s(Ue)],l.prototype,"elevationInfo",null),t([s({json:{read:!1},readOnly:!0})],l.prototype,"type",void 0),t([s()],l.prototype,"associatedFeatureServiceItem",void 0),l=t([p("esri.layers.BuildingSceneLayer")],l);const Zt=l;export{Zt as default};
