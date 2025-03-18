import{ct as y,cu as p,cv as c,cw as u,cx as d,cy as h,ba as S,cz as m,P as v,cA as f,b0 as g,a as o,b as s,an as b,av as C,cB as G,cC as w,cD as x,c as P,cE as n,cF as _,cG as R,cH as j,cI as k,K as F}from"./index-75aaf891.js";const $=["atom","xml"],E={base:n,key:"type",typeMap:{"simple-line":_},errorContext:"symbol"},M={base:n,key:"type",typeMap:{"picture-marker":R,"simple-marker":j},errorContext:"symbol"},L={base:n,key:"type",typeMap:{"simple-fill":k},errorContext:"symbol"};let t=class extends y(p(c(u(d(h(F)))))){constructor(...e){super(...e),this.description=null,this.fullExtent=null,this.legendEnabled=!0,this.lineSymbol=null,this.pointSymbol=null,this.polygonSymbol=null,this.operationalLayerType="GeoRSS",this.url=null,this.type="geo-rss"}normalizeCtorArgs(e,r){return typeof e=="string"?{url:e,...r}:e}readFeatureCollections(e,r){return r.featureCollection.layers.forEach(i=>{var a;const l=i.layerDefinition.drawingInfo.renderer.symbol;l&&l.type==="esriSFS"&&((a=l.outline)!=null&&a.style.includes("esriSFS"))&&(l.outline.style="esriSLSSolid")}),r.featureCollection.layers}get hasPoints(){return this._hasGeometry("esriGeometryPoint")}get hasPolylines(){return this._hasGeometry("esriGeometryPolyline")}get hasPolygons(){return this._hasGeometry("esriGeometryPolygon")}get title(){const e=this._get("title");return e&&this.originOf("title")!=="defaults"?e:this.url?S(this.url,$)||"GeoRSS":e||""}set title(e){this._set("title",e)}load(e){const r=e!=null?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service","Feature Service","Feature Collection","Scene Service"]},e).catch(m).then(()=>this._fetchService(r)).then(i=>{this.read(i,{origin:"service"})})),Promise.resolve(this)}async hasDataChanged(){const e=await this._fetchService();return this.read(e,{origin:"service",ignoreDefaults:!0}),!0}async _fetchService(e){const r=this.spatialReference,{data:i}=await v(g.geoRSSServiceUrl,{query:{url:this.url,refresh:!!this.loaded||void 0,outSR:f(r)?void 0:r.wkid??JSON.stringify(r)},signal:e});return i}_hasGeometry(e){var r;return((r=this.featureCollections)==null?void 0:r.some(i=>{var l,a;return((l=i.featureSet)==null?void 0:l.geometryType)===e&&((a=i.featureSet.features)==null?void 0:a.length)>0}))??!1}};o([s()],t.prototype,"description",void 0),o([s()],t.prototype,"featureCollections",void 0),o([b("service","featureCollections",["featureCollection.layers"])],t.prototype,"readFeatureCollections",null),o([s({type:C,json:{name:"lookAtExtent"}})],t.prototype,"fullExtent",void 0),o([s(G)],t.prototype,"id",void 0),o([s(w)],t.prototype,"legendEnabled",void 0),o([s({types:E,json:{write:!0}})],t.prototype,"lineSymbol",void 0),o([s({type:["show","hide"]})],t.prototype,"listMode",void 0),o([s({types:M,json:{write:!0}})],t.prototype,"pointSymbol",void 0),o([s({types:L,json:{write:!0}})],t.prototype,"polygonSymbol",void 0),o([s({type:["GeoRSS"]})],t.prototype,"operationalLayerType",void 0),o([s(x)],t.prototype,"url",void 0),o([s({json:{origins:{service:{read:{source:"name",reader:e=>e||void 0}}}}})],t.prototype,"title",null),o([s({readOnly:!0,json:{read:!1},value:"geo-rss"})],t.prototype,"type",void 0),t=o([P("esri.layers.GeoRSSLayer")],t);const O=t;export{O as default};
