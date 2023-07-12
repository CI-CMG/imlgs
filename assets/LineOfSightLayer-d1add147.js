import{cr as I,bb as A,id as y,a as n,b as i,ao as j,fa as x,c as d,b5 as T,hK as N,V as v,v as P,l as w,f7 as O,u as L,dy as c,ie as C,eq as H,ig as K,ih as M,cv as V,cy as Z,am as k}from"./index-c7ff1b65.js";import{c as B}from"./Analysis-9281b331.js";import{g as f}from"./persistable-c22f20e0.js";import"./multiOriginJSONSupportUtils-c978f4c3.js";import"./resourceExtension-d498aec2.js";function R(t,e){return m(t)===m(e)}function m(t){if(t==null)return null;const e=t.layer!=null?t.layer.id:"";let s=null;return s=t.objectId!=null?t.objectId:t.layer!=null&&"objectIdField"in t.layer&&t.layer.objectIdField!=null&&t.attributes!=null?t.attributes[t.layer.objectIdField]:t.uid,s==null?null:`o-${e}-${s}`}const E={json:{write:{writer:D,target:{"feature.layerId":{type:[Number,String]},"feature.objectId":{type:[Number,String]}}},origins:{"web-scene":{read:G}}}};function D(t,e){var s;t!=null&&((s=t.layer)==null?void 0:s.objectIdField)!=null&&t.attributes!=null&&(e.feature={layerId:t.layer.id,objectId:t.attributes[t.layer.objectIdField]})}function G(t){if(t.layerId!=null&&t.objectId!=null)return{uid:null,layer:{id:t.layerId,objectIdField:"ObjectId"},attributes:{ObjectId:t.objectId}}}let o=class extends I(A(T)){constructor(e){super(e),this.position=null,this.elevationInfo=null,this.feature=null}equals(e){return y(this.position,e.position)&&y(this.elevationInfo,e.elevationInfo)&&R(this.feature,e.feature)}};n([i({type:j,json:{write:{isRequired:!0}}})],o.prototype,"position",void 0),n([i({type:x}),f()],o.prototype,"elevationInfo",void 0),n([i(E)],o.prototype,"feature",void 0),o=n([d("esri.analysis.LineOfSightAnalysisObserver")],o);const F=o;let a=class extends I(N){constructor(t){super(t),this.position=null,this.elevationInfo=null,this.feature=null}equals(t){return y(this.position,t.position)&&y(this.elevationInfo,t.elevationInfo)&&R(this.feature,t.feature)}};n([i({type:j}),f()],a.prototype,"position",void 0),n([i({type:x}),f()],a.prototype,"elevationInfo",void 0),n([i(E)],a.prototype,"feature",void 0),a=n([d("esri.analysis.LineOfSightAnalysisTarget")],a);const S=a;function J(t){return t?W:X}function Q(t,e){return e!=null&&e.mode?e.mode:J(t).mode}function U(t,e){return Q(t!=null&&t.hasZ,e)}const W={mode:"absolute-height",offset:0},X={mode:"on-the-ground",offset:null},g=v.ofType(S);let l=class extends B{constructor(t){super(t),this.type="line-of-sight",this.observer=null,this.extent=null}initialize(){this.addHandles(w(()=>this._computeExtent(),t=>{t!=null&&t.pending!=null||this._set("extent",t!=null?t.extent:null)},O))}get targets(){return this._get("targets")||new g}set targets(t){this._set("targets",L(t,this.targets,g))}get spatialReference(){return this.observer!=null&&this.observer.position!=null?this.observer.position.spatialReference:null}get requiredPropertiesForEditing(){return[c(this.observer,t=>t.position)]}async waitComputeExtent(){const t=this._computeExtent();return t!=null?t.pending:Promise.resolve()}_computeExtent(){const t=this.spatialReference;if(this.observer==null||this.observer.position==null||t==null)return null;const e=u=>U(u.position,u.elevationInfo)==="absolute-height",s=this.observer.position,b=C(s.x,s.y,s.z,s.x,s.y,s.z);for(const u of this.targets)if(u.position!=null){const p=H(u.position,t);if(p.pending!=null)return{pending:p.pending,extent:null};if(p.geometry!=null){const{x:q,y:z,z:_}=p.geometry;K(b,[q,z,_])}}const h=M(b,t);return e(this.observer)&&this.targets.every(e)||(h.zmin=void 0,h.zmax=void 0),{pending:null,extent:h}}clear(){this.observer=null,this.targets.removeAll()}};n([i({type:["line-of-sight"]})],l.prototype,"type",void 0),n([i({type:F,json:{read:!0,write:!0}})],l.prototype,"observer",void 0),n([i({cast:P,type:g,nonNullable:!0,json:{read:!0,write:!0}})],l.prototype,"targets",null),n([i({value:null,readOnly:!0})],l.prototype,"extent",void 0),n([i({readOnly:!0})],l.prototype,"spatialReference",null),n([i({readOnly:!0})],l.prototype,"requiredPropertiesForEditing",null),l=n([d("esri.analysis.LineOfSightAnalysis")],l);const $=l,Y=v.ofType(S);let r=class extends V(Z(k)){constructor(t){super(t),this.type="line-of-sight",this.operationalLayerType="LineOfSightLayer",this.analysis=new $,this.opacity=1}initialize(){this.addHandles(w(()=>this.analysis,(t,e)=>{e!=null&&e.parent===this&&(e.parent=null),t!=null&&(t.parent=this)},O))}async load(){return this.analysis!=null&&this.addResolvingPromise(this.analysis.waitComputeExtent()),this}get observer(){return c(this.analysis,t=>t.observer)}set observer(t){c(this.analysis,e=>e.observer=t)}get targets(){return this.analysis!=null?this.analysis.targets:new v}set targets(t){var e;L(t,(e=this.analysis)==null?void 0:e.targets)}get fullExtent(){return this.analysis!=null?this.analysis.extent:null}get spatialReference(){return this.analysis!=null?this.analysis.spatialReference:null}releaseAnalysis(t){this.analysis===t&&(this.analysis=new $)}};n([i({json:{read:!1},readOnly:!0})],r.prototype,"type",void 0),n([i({type:["LineOfSightLayer"]})],r.prototype,"operationalLayerType",void 0),n([i({type:F,json:{read:!0,write:{isRequired:!0,ignoreOrigin:!0}}})],r.prototype,"observer",null),n([i({type:Y,json:{read:!0,write:{ignoreOrigin:!0}}})],r.prototype,"targets",null),n([i({nonNullable:!0,json:{read:!1,write:!1}})],r.prototype,"analysis",void 0),n([i({readOnly:!0})],r.prototype,"fullExtent",null),n([i({readOnly:!0})],r.prototype,"spatialReference",null),n([i({readOnly:!0,json:{read:!1,write:!1,origins:{service:{read:!1,write:!1},"portal-item":{read:!1,write:!1},"web-document":{read:!1,write:!1}}}})],r.prototype,"opacity",void 0),n([i({type:["show","hide"]})],r.prototype,"listMode",void 0),r=n([d("esri.layers.LineOfSightLayer")],r);const lt=r;export{lt as default};
