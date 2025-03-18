import{a as i,b as s,an as I,aw as V,c as L,ay as K,g4 as W,aD as X,b6 as N,cy as k,cs as ee,az as S,eh as te,s as re,eQ as ie,p as x,D as b,eS as se,g5 as P,g6 as M,aF as U,eU as ne,eV as oe,eW as ae,cC as le,fn as ue,fm as pe,eY as de,k as ye,f0 as Q,g7 as ce,aI as he,g8 as be,g9 as fe,ga as ge,gb as me,eN as ve,ct as we,eP as Fe,cx as Se,cu as Ie,cY as Oe,cv as $e,cw as je,c_ as Ee,cZ as Ce,V as _,l as Te,dN as _e,cz as Le,M as xe,N as Pe,gc as Ae,gd as De,_ as Ge,d1 as qe,ge as Re,eR as Ve,cB as Ne,cO as A,gf as ke,K as Me}from"./index-75aaf891.js";import{c as Ue}from"./EditBusLayer-496cffbb.js";import{y as Qe,w as He}from"./FeatureLayerBase-aa341cf2.js";import{E as H,M as Be,Q as ze,y as Je,m as Ye,h as Ze,b as Ke,g as We,j as Xe,q as et,F as tt,I as rt,P as it,A as st,O as nt}from"./featureLayerUtils-be25d1cd.js";import{s as B}from"./fieldProperties-986ddc66.js";import"./RelationshipQuery-da341e2c.js";let g=class extends K{constructor(){super(...arguments),this.code=null,this.defaultValues={},this.domains=null,this.name=null}readDomains(e){if(!e)return null;const t={};for(const r of Object.keys(e))t[r]=W(e[r]);return t}writeDomains(e,t){var n;if(!e)return;const r={};for(const o of Object.keys(e))e[o]&&(r[o]=(n=e[o])==null?void 0:n.toJSON());t.domains=r}};i([s({type:Number,json:{write:!0}})],g.prototype,"code",void 0),i([s({type:Object,json:{write:!0}})],g.prototype,"defaultValues",void 0),i([s({json:{write:!0}})],g.prototype,"domains",void 0),i([I("domains")],g.prototype,"readDomains",null),i([V("domains")],g.prototype,"writeDomains",null),i([s({type:String,json:{write:!0}})],g.prototype,"name",void 0),g=i([L("esri.layers.support.Subtype")],g);const ot=g,at=["charts","editingEnabled","formTemplate","labelsVisible","labelingInfo","legendEnabled","minScale","maxScale","opacity","popupEnabled","popupTemplate","renderer","subtypeCode","templates","title","visible"],z={key:"type",base:ce,errorContext:"renderer",typeMap:{simple:x,"unique-value":he,"class-breaks":be}},D=B(),G=X({types:z});let lt=0;function $(e){const t=e.json.write;return typeof t=="object"?t.ignoreOrigin=!0:e.json.write={ignoreOrigin:!0},e}function ut(e){return new x({symbol:pt(e)})}function pt(e){switch(e){case"point":case"multipoint":return me.clone();case"polyline":return ge.clone();case"polygon":case"multipatch":return fe.clone();default:return null}}function dt(e,t){return!!t&&(e==null?void 0:e.type)==="unique-value"&&typeof e.field=="string"&&e.field.toLowerCase()===t.toLowerCase()&&!e.field2&&!e.field3&&!e.valueExpression}function J(e,t){var r;return e==null?null:(r=t.subtypes)==null?void 0:r.find(n=>n.code===e)}function yt(e,t){let r=null;switch(t.geometryType){case"esriGeometryPoint":case"esriGeometryMultipoint":r="point";break;case"esriGeometryPolyline":r="line";break;case"esriGeometryPolygon":case"esriGeometryMultiPatch":r="polygon";break;default:t.type,r=null}const n={},o=J(e,t);if(o!=null){const{defaultValues:l}=o;for(const u in l)n[u]=l[u]}return n[t.subtypeField]=e,new Q({name:"New Feature",drawingTool:r,prototype:{attributes:n}})}const Y="esri.layers.support.SubtypeSublayer";let a=class extends N(k(ee(ve))){constructor(e){super(e),this.charts=null,this.editingEnabled=!0,this.fieldOverrides=null,this.fieldsIndex=null,this.formTemplate=null,this.id=`${Date.now().toString(16)}-subtype-sublayer-${lt++}`,this.type="subtype-sublayer",this.labelsVisible=!0,this.labelingInfo=null,this.layerType="ArcGISFeatureLayer",this.legendEnabled=!0,this.listMode="show",this.minScale=0,this.maxScale=0,this.opacity=1,this.parent=null,this.popupEnabled=!0,this.popupTemplate=null,this.subtypeCode=null,this.templates=null,this.title=null,this.visible=!0}get capabilities(){var e;return(e=this.parent)==null?void 0:e.capabilities}get effectiveCapabilities(){var e;return(e=this.parent)==null?void 0:e.effectiveCapabilities}get effectiveEditingEnabled(){const{parent:e}=this;return e?e.effectiveEditingEnabled&&this.editingEnabled:this.editingEnabled}get elevationInfo(){var e;return(e=this.parent)==null?void 0:e.elevationInfo}writeFieldOverrides(e,t,r){const{fields:n,parent:o}=this;let l;if(n){l=[];let u=0;n.forEach(({name:y,alias:c,editable:m,visible:v})=>{var j;if(!v)return;const d=(j=o==null?void 0:o.fields)==null?void 0:j.find(O=>O.name===y);if(!d)return;const f={name:y};let F=!1;c!==d.alias&&(f.alias=c,F=!0),m!==d.editable&&(f.editable=m,F=!0),l.push(f),F&&u++}),u===0&&l.length===n.length&&(l=null)}else l=S(e);l!=null&&l.length&&te(r,l,t)}get fields(){const{parent:e,fieldOverrides:t,subtypeCode:r}=this,n=e==null?void 0:e.fields;if(!e||!(n!=null&&n.length))return null;const{subtypes:o,subtypeField:l}=e,u=o==null?void 0:o.find(v=>v.code===r),y=u==null?void 0:u.defaultValues,c=u==null?void 0:u.domains,m=[];for(const v of n){const d=v.clone(),{name:f}=d,F=t==null?void 0:t.find(E=>E.name===f);if(d.visible=!t||!!F,F){const{alias:E,editable:Z}=F;E&&(d.alias=E),Z===!1&&(d.editable=!1)}const j=(y==null?void 0:y[f])??null;d.defaultValue=f===l?r:j;const O=(c==null?void 0:c[f])??null;d.domain=f===l?null:O?O.type==="inherited"?d.domain:O.clone():null,m.push(d)}return m}get floorInfo(){var e;return(e=this.parent)==null?void 0:e.floorInfo}get geometryType(){var e;return(e=this.parent)==null?void 0:e.geometryType}get effectiveScaleRange(){const{minScale:e,maxScale:t}=this;return{minScale:e,maxScale:t}}get objectIdField(){var e;return this.parent||re.getLogger(Y).error(w("objectIdField")),(e=this.parent)==null?void 0:e.objectIdField}get defaultPopupTemplate(){return this.createPopupTemplate()}set renderer(e){ie(e,this.fieldsIndex),this._override("renderer",e)}get renderer(){if(this._isOverridden("renderer"))return this._get("renderer");const{parent:e}=this;return e&&!e.isTable&&e.geometryType!=="mesh"?ut(e.geometryType):null}readRendererFromService(e,t,r){var y,c,m;if(t.type==="Table")return null;const n=(y=t.drawingInfo)==null?void 0:y.renderer,o=G(n,t,r);let l;const{subtypeCode:u}=this;if(u!=null&&dt(o,t.subtypeField)){const v=(c=o.uniqueValueInfos)==null?void 0:c.find(({value:d})=>(d=typeof d=="number"?String(d):d)===String(u));v&&(l=new x({symbol:v.symbol}))}else(o==null?void 0:o.type)!=="simple"||(m=o.visualVariables)!=null&&m.length||(l=o);return l}readRenderer(e,t,r){var l,u,y;const n=(u=(l=t==null?void 0:t.layerDefinition)==null?void 0:l.drawingInfo)==null?void 0:u.renderer;return n?((y=n.visualVariables)==null?void 0:y.some(c=>c.type!=="rotationInfo"))?void 0:G(n,t,r)||void 0:void 0}get spatialReference(){var e;return(e=this.parent)==null?void 0:e.spatialReference}readTemplatesFromService(e,t){return[yt(this.subtypeCode,t)]}readTitleFromService(e,t){const r=J(this.subtypeCode,t);return r!=null?r.name:null}get url(){var e;return(e=this.parent)==null?void 0:e.url}get userHasUpdateItemPrivileges(){var e;return!!((e=this.parent)!=null&&e.userHasUpdateItemPrivileges)}async addAttachment(e,t){const{parent:r}=this;if(!r)throw w("addAttachment");if(e.getAttribute(r.subtypeField)!==this.subtypeCode)throw new b("subtype-sublayer:addAttachment","The feature provided does not belong to this SubtypeSublayer");return r.addAttachment(e,t)}async updateAttachment(e,t,r){const{parent:n}=this;if(!n)throw w("updateAttachment");if(e.getAttribute(n.subtypeField)!==this.subtypeCode)throw new b("subtype-sublayer:updateAttachment","The feature provided does not belong to this SubtypeSublayer");return n.updateAttachment(e,t,r)}async deleteAttachments(e,t){const{parent:r}=this;if(!r)throw w("deleteAttachments");if(e.getAttribute(r.subtypeField)!==this.subtypeCode)throw new b("subtype-sublayer:deleteAttachments","The feature provided does not belong to this SubtypeSublayer");return r.deleteAttachments(e,t)}async applyEdits(e,t){if(!this.parent)throw w("applyEdits");return this.parent.applyEdits(e,t)}createPopupTemplate(e){let t=this;const{parent:r,fields:n,title:o}=this;if(r){const{displayField:l,editFieldsInfo:u,objectIdField:y}=r;t={displayField:l,editFieldsInfo:u,fields:n,objectIdField:y,title:o}}return se(t,e)}createQuery(){if(!this.parent)throw w("createQuery");const e=H(this.parent),t=`${this.parent.subtypeField}=${this.subtypeCode}`;return e.where=P(t,this.parent.definitionExpression),e}getField(e){return this.fieldsIndex.get(e)}getFieldDomain(e){return this._getLayerDomain(e)}hasUserOverrides(){return at.some(e=>this.originIdOf(e)===M.USER)}async queryAttachments(e,t){const r=await this.load();if(!r.parent)throw w("queryAttachments");const n=e.clone();return n.where=q(n.where,r.parent.subtypeField,r.subtypeCode),r.parent.queryAttachments(e,t)}async queryFeatures(e,t){const r=await this.load();if(!r.parent)throw w("queryFeatures");const n=U.from(e)??r.createQuery();return e!=null&&(n.where=q(n.where,r.parent.subtypeField,r.subtypeCode)),r.parent.queryFeatures(n,t)}_getLayerDomain(e){const t=this.fieldsIndex.get(e);return t?t.domain:null}};i([s({readOnly:!0,json:{read:!1}})],a.prototype,"capabilities",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"effectiveCapabilities",null),i([s({json:{write:{ignoreOrigin:!0}}})],a.prototype,"charts",void 0),i([s({type:Boolean,nonNullable:!0,json:{name:"enableEditing",write:{ignoreOrigin:!0}}})],a.prototype,"editingEnabled",void 0),i([s({type:Boolean,readOnly:!0})],a.prototype,"effectiveEditingEnabled",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"elevationInfo",null),i([s({readOnly:!0,json:{name:"layerDefinition.fieldOverrides",origins:{service:{read:!1}},write:{ignoreOrigin:!0,allowNull:!0}}})],a.prototype,"fieldOverrides",void 0),i([V("fieldOverrides")],a.prototype,"writeFieldOverrides",null),i([s({...D.fields,readOnly:!0,json:{read:!1}})],a.prototype,"fields",null),i([s(D.fieldsIndex)],a.prototype,"fieldsIndex",void 0),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"floorInfo",null),i([s({type:Qe,json:{name:"formInfo",write:{ignoreOrigin:!0}}})],a.prototype,"formTemplate",void 0),i([s({type:String,readOnly:!0,json:{origins:{service:{read:!1}},write:{ignoreOrigin:!0}}})],a.prototype,"id",void 0),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"geometryType",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"type",void 0),i([s($(S(ne)))],a.prototype,"labelsVisible",void 0),i([s({type:[oe],json:{name:"layerDefinition.drawingInfo.labelingInfo",origins:{service:{read:!1}},read:{reader:ae},write:{ignoreOrigin:!0}}})],a.prototype,"labelingInfo",void 0),i([s({type:["ArcGISFeatureLayer"],readOnly:!0,json:{read:!1,write:{ignoreOrigin:!0}}})],a.prototype,"layerType",void 0),i([s($(S(le)))],a.prototype,"legendEnabled",void 0),i([s({type:["show","hide"]})],a.prototype,"listMode",void 0),i([s((()=>{const e=S(ue);return e.json.origins.service.read=!1,$(e)})())],a.prototype,"minScale",void 0),i([s((()=>{const e=S(pe);return e.json.origins.service.read=!1,$(e)})())],a.prototype,"maxScale",void 0),i([s({readOnly:!0})],a.prototype,"effectiveScaleRange",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"objectIdField",null),i([s({type:Number,range:{min:0,max:1},nonNullable:!0,json:{write:{ignoreOrigin:!0}}})],a.prototype,"opacity",void 0),i([s()],a.prototype,"parent",void 0),i([s($(S(de)))],a.prototype,"popupEnabled",void 0),i([s({type:ye,json:{name:"popupInfo",write:{ignoreOrigin:!0}}})],a.prototype,"popupTemplate",void 0),i([s({readOnly:!0})],a.prototype,"defaultPopupTemplate",null),i([s({types:z,json:{write:{target:"layerDefinition.drawingInfo.renderer",ignoreOrigin:!0}}})],a.prototype,"renderer",null),i([I("service","renderer",["drawingInfo.renderer","subtypeField","type"])],a.prototype,"readRendererFromService",null),i([I("renderer",["layerDefinition.drawingInfo.renderer"])],a.prototype,"readRenderer",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"spatialReference",null),i([s({type:Number,json:{origins:{service:{read:!1}},write:{ignoreOrigin:!0}}})],a.prototype,"subtypeCode",void 0),i([s({type:[Q],json:{name:"layerDefinition.templates",write:{ignoreOrigin:!0}}})],a.prototype,"templates",void 0),i([I("service","templates",["geometryType","subtypeField","subtypes","type"])],a.prototype,"readTemplatesFromService",null),i([s({type:String,json:{write:{ignoreOrigin:!0}}})],a.prototype,"title",void 0),i([I("service","title",["subtypes"])],a.prototype,"readTitleFromService",null),i([s({readOnly:!0,json:{read:!1}})],a.prototype,"url",null),i([s({readOnly:!0})],a.prototype,"userHasUpdateItemPrivileges",null),i([s({type:Boolean,nonNullable:!0,json:{name:"visibility",write:{ignoreOrigin:!0}}})],a.prototype,"visible",void 0),a=i([L(Y)],a);const q=(e,t,r)=>{const n=new RegExp(`${t}\\s*=\\s*\\d+`),o=`${t}=${r}`,l=e??"";return n.test(l)?l.replace(n,o):P(o,l)},w=e=>new b(`This sublayer must have a parent SubtypeGroupLayer in order to use ${e}`),C=a,h="SubtypeGroupLayer",ct="esri.layers.SubtypeGroupLayer";function R(e,t){return new b("layer:unsupported",`Layer (${e.title}, ${e.id}) of type '${e.declaredClass}' ${t}`,{layer:e})}const T=B();let p=class extends He(Ue(we(Fe(Se(Ie(Oe($e(je(k(Ee(Ce(N(Me))))))))))))){constructor(...e){super(...e),this._sublayersCollectionChanged=!1,this._sublayerLookup=new Map,this.fields=null,this.fieldsIndex=null,this.outFields=null,this.subtypes=null,this.sublayers=new(_.ofType(C)),this.timeInfo=null,this.title="Layer",this.type="subtype-group",this.addHandles(Te(()=>this.sublayers,(t,r)=>this._handleSublayersChange(t,r),_e))}destroy(){var e;(e=this.source)==null||e.destroy()}normalizeCtorArgs(e,t){return typeof e=="string"?{url:e,...t}:e}load(e){const t=e!=null?e.signal:null,r=this.loadFromPortal({supportedTypes:["Feature Service"]},e).catch(Le).then(async()=>{if(!this.url)throw new b("subtype-grouplayer:missing-url-or-source","SubtypeGroupLayer must be created with either a url or a portal item");if(this.layerId==null)throw new b("subtype-grouplayer:missing-layerid","layerId is required for a SubtypeGroupLayer created with url");return this._initLayerProperties(await this.createGraphicsSource(t))}).then(()=>this._setUserPrivileges(this.serviceItemId,e)).then(()=>Be(this,e));return this.addResolvingPromise(r),Promise.resolve(this)}get createQueryVersion(){return this.commitProperty("definitionExpression"),this.commitProperty("timeExtent"),this.commitProperty("timeOffset"),this.commitProperty("geometryType"),this.commitProperty("gdbVersion"),this.commitProperty("historicMoment"),this.commitProperty("returnZ"),this.commitProperty("capabilities"),this.commitProperty("returnM"),(this._get("createQueryVersion")??0)+1}get editingEnabled(){return this.loaded&&this.capabilities!=null&&this.capabilities.operations.supportsEditing&&this.userHasEditingPrivileges}get effectiveEditingEnabled(){return ze(this)}get parsedUrl(){const e=xe(this.url);return e!=null&&this.layerId!=null&&(e.path=Pe(e.path,this.layerId.toString())),e}set source(e){this._get("source")!==e&&this._set("source",e)}readTitleFromService(e,{name:t}){return this.url?Ae(this.url,t):t}async addAttachment(e,t){return Je(this,e,t,h)}async updateAttachment(e,t,r){return Ye(this,e,t,r,h)}async applyEdits(e,t){return Ze(this,e,t)}on(e,t){return super.on(e,t)}async createGraphicsSource(e){const{default:t}=await De(Ge(()=>import("./FeatureLayerSource-3a3ce05f.js"),["assets/FeatureLayerSource-3a3ce05f.js","assets/index-75aaf891.js","assets/index-14398690.css","assets/mat4f64-1413b4a7.js","assets/MeshGeoreferencedRelativeVertexSpace-c29399ae.js","assets/vec32-422fe563.js","assets/External-e3fdeef9.js","assets/editingSupport-ac97f7d8.js","assets/EditBusLayer-496cffbb.js","assets/clientSideDefaults-83b0c34b.js","assets/QueryEngineCapabilities-42e44ded.js","assets/editsZScale-0542562a.js"]),e);return new t({layer:this}).load({signal:e})}createQuery(){const e=H(this),t=this.sublayers.map(r=>r.subtypeCode);return e.where=P(`${this.subtypeField} IN (${t.join(",")})`,this.definitionExpression),e}async deleteAttachments(e,t){return Ke(this,e,t,h)}async fetchRecomputedExtents(e){return We(this,e,h)}findSublayerForFeature(e){const t=this.fieldsIndex.get(this.subtypeField),r=e.attributes[t.name];return this.findSublayerForSubtypeCode(r)}findSublayerForSubtypeCode(e){return this._sublayerLookup.get(e)}getFieldDomain(e,t){return this._getLayerDomain(e)}getField(e){return this.fieldsIndex.get(e)}loadAll(){return qe(this,e=>{e(this.sublayers)})}async queryAttachments(e,t){return Xe(this,e,t,h)}async queryFeatures(e,t){const r=await this.load(),n=U.from(e)??r.createQuery(),o=n.outFields??[];o.includes(this.subtypeField)||(o.push(this.subtypeField),n.outFields=o);const l=await r.source.queryFeatures(n,t);if(l!=null&&l.features)for(const u of l.features)u.layer=u.sourceLayer=this.findSublayerForFeature(u);return l}async queryObjectIds(e,t){return et(this,e,t,h)}async queryFeatureCount(e,t){return tt(this,e,t,h)}async queryExtent(e,t){return rt(this,e,t,h)}async queryRelatedFeatures(e,t){return it(this,e,t,h)}async queryRelatedFeaturesCount(e,t){return st(this,e,t,h)}write(e,t){var l;const{origin:r,layerContainerType:n,messages:o}=t;if(this.isTable){if(r==="web-scene"||r==="web-map"&&n!=="tables")return o==null||o.push(R(this,"using a table source cannot be written to web scenes and web maps")),null}else if(this.loaded&&r==="web-map"&&n==="tables")return o==null||o.push(R(this,"using a non-table source cannot be written to tables in web maps")),null;return(l=this.sublayers)!=null&&l.length?super.write(e,t):(o==null||o.push(new b("web-document-write:invalid-property",`Layer (${this.title}, ${this.id}) of type '${this.declaredClass}' has invalid value for 'sublayers' property. 'sublayers' collection should contain at least one sublayer`,{layer:this})),null)}serviceSupportsSpatialReference(e){return!!this.loaded&&Re(this,e)}_getLayerDomain(e){const t=this.fieldsIndex.get(e);return t?t.domain:null}async _initLayerProperties(e){var r;this._set("source",e);const{sourceJSON:t}=e;if(t&&(this.sourceJSON=t,this.read(t,{origin:"service",url:this.parsedUrl})),this.isTable)throw new b("subtype-grouplayer:unsupported-source","SubtypeGroupLayer cannot be created using a layer with table source");if(!((r=this.subtypes)!=null&&r.length))throw new b("subtype-grouplayer:missing-subtypes","SubtypeGroupLayer must be created using a layer with subtypes");this._verifyFields(),Ve(this.timeInfo,this.fieldsIndex)}async hasDataChanged(){return nt(this)}_verifyFields(){var t,r;const e=((t=this.parsedUrl)==null?void 0:t.path)??"undefined";this.objectIdField||console.log("SubtypeGroupLayer: 'objectIdField' property is not defined (url: "+e+")"),this.isTable||e.search(/\/FeatureServer\//i)!==-1||(r=this.fields)!=null&&r.some(n=>n.type==="geometry")||console.log("SubtypeGroupLayer: unable to find field of type 'geometry' in the layer 'fields' list. If you are using a map service layer, features will not have geometry (url: "+e+")")}_handleSublayersChange(e,t){t&&(t.forEach(r=>{r.parent=null}),this.handles.remove("sublayers-owner"),this._sublayerLookup.clear()),e&&(e.forEach(r=>{r.parent=this,this._sublayerLookup.set(r.subtypeCode,r)}),this._sublayersCollectionChanged=!1,this.handles.add([e.on("after-add",({item:r})=>{r.parent=this,this._sublayerLookup.set(r.subtypeCode,r)}),e.on("after-remove",({item:r})=>{r.parent=null,this._sublayerLookup.delete(r.subtypeCode)}),e.on("after-changes",()=>{this._sublayersCollectionChanged=!0})],"sublayers-owner"))}};i([s({readOnly:!0})],p.prototype,"createQueryVersion",null),i([s({readOnly:!0})],p.prototype,"editingEnabled",null),i([s({readOnly:!0})],p.prototype,"effectiveEditingEnabled",null),i([s({...T.fields,readOnly:!0,json:{origins:{service:{read:!0}},read:!1}})],p.prototype,"fields",void 0),i([s(T.fieldsIndex)],p.prototype,"fieldsIndex",void 0),i([s(Ne)],p.prototype,"id",void 0),i([s({type:["show","hide","hide-children"]})],p.prototype,"listMode",void 0),i([s({value:"SubtypeGroupLayer",type:["SubtypeGroupLayer"]})],p.prototype,"operationalLayerType",void 0),i([s(T.outFields)],p.prototype,"outFields",void 0),i([s({readOnly:!0})],p.prototype,"parsedUrl",null),i([s()],p.prototype,"source",null),i([s({type:[ot],readOnly:!0,json:{read:!1,origins:{service:{read:!0}}}})],p.prototype,"subtypes",void 0),i([s({type:_.ofType(C),json:{origins:{service:{read:{source:"subtypes",reader:(e,t,r)=>{const n=e.map(({code:o})=>{const l=new C({subtypeCode:o});return l.read(t,r),l});return new(_.ofType(C))(n)}}}},name:"layers",write:{overridePolicy(e,t,r){const n=this.originOf("sublayers"),o=M.PORTAL_ITEM;let l=!0;if(A(n)===o&&A(r.origin)>o){const u=e.some(y=>y.hasUserOverrides());l=this._sublayersCollectionChanged||u}return{enabled:l,ignoreOrigin:!0}}}}})],p.prototype,"sublayers",void 0),i([s({type:ke})],p.prototype,"timeInfo",void 0),i([s({json:{origins:{"portal-item":{write:{ignoreOrigin:!0,writerEnsuresNonNull:!0}}}}})],p.prototype,"title",void 0),i([I("service","title",["name"])],p.prototype,"readTitleFromService",null),i([s({json:{read:!1}})],p.prototype,"type",void 0),p=i([L(ct)],p);const wt=p;export{wt as default};
