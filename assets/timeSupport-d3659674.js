import{B as C,ho as B,hp as v,hq as j,hr as z,bN as J,dy as V,T as y,U as g,W as Z,S as D,aS as W,hs as Y,ht as K,N as L,bY as N,_ as E,c8 as h,hu as G,hv as k,hw as H,hx as Q,hy as X,hz as tt,hA as A,hB as et,hC as rt,F as w,cd as x,bO as it}from"./index-7a28cea6.js";import{f as b,g as F}from"./projectionSupport-835893aa.js";const nt=new C({esriSRUnit_Meter:"meters",esriSRUnit_Kilometer:"kilometers",esriSRUnit_Foot:"feet",esriSRUnit_StatuteMile:"miles",esriSRUnit_NauticalMile:"nautical-miles",esriSRUnit_USNauticalMile:"us-nautical-miles"}),M=Object.freeze({}),_=new h,st=new h,P=new h,m={esriGeometryPoint:G,esriGeometryPolyline:k,esriGeometryPolygon:H,esriGeometryMultipoint:Q};function bt(t,e,i,r=t.hasZ,n=t.hasM){if(e==null)return null;const l=t.hasZ&&r,s=t.hasM&&n;if(i){const a=v(P,e,t.hasZ,t.hasM,"esriGeometryPoint",i,r,n);return G(a,l,s)}return G(e,l,s)}function d(t,e,i,r,n,l,s=e,a=i){var R,p,S;const u=e&&s,o=i&&a,c=r!=null?"coords"in r?r:r.geometry:null;if(c==null)return null;if(n){let f=B(st,c,e,i,t,n,s,a);return l&&(f=v(P,f,u,o,t,l)),((R=m[t])==null?void 0:R.call(m,f,u,o))??null}if(l){const f=v(P,c,e,i,t,l,s,a);return((p=m[t])==null?void 0:p.call(m,f,u,o))??null}return j(_,c,e,i,s,a),((S=m[t])==null?void 0:S.call(m,_,u,o))??null}async function It(t,e,i){const{outFields:r,orderByFields:n,groupByFieldsForStatistics:l,outStatistics:s}=t;if(r)for(let a=0;a<r.length;a++)r[a]=r[a].trim();if(n)for(let a=0;a<n.length;a++)n[a]=n[a].trim();if(l)for(let a=0;a<l.length;a++)l[a]=l[a].trim();if(s)for(let a=0;a<s.length;a++)s[a].onStatisticField&&(s[a].onStatisticField=s[a].onStatisticField.trim());return t.geometry&&!t.outSR&&(t.outSR=t.geometry.spatialReference),lt(t,e,i)}async function lt(t,e,i){var l;if(!t)return null;let{where:r}=t;if(t.where=r=r&&r.trim(),(!r||/^1 *= *1$/.test(r)||e&&e===r)&&(t.where=null),!t.geometry)return t;let n=await ot(t);if(t.distance=0,t.units=null,t.spatialRel==="esriSpatialRelEnvelopeIntersects"){const{spatialReference:s}=t.geometry;n=z(n),n.spatialReference=s}if(n){await b(n.spatialReference,i),n=at(n,i);const s=(await J(V(n)))[0];if(s==null)throw M;const a="quantizationParameters"in t&&((l=t.quantizationParameters)==null?void 0:l.tolerance)||"maxAllowableOffset"in t&&t.maxAllowableOffset||0,u=a&&O(n,i)?{densificationStep:8*a}:void 0,o=s.toJSON(),c=await F(o,o.spatialReference,i,u);if(!c)throw M;c.spatialReference=i,t.geometry=c}return t}function O(t,e){if(!t)return!1;const i=t.spatialReference;return(y(t)||g(t)||Z(t))&&!D(i,e)&&!W(i,e)}function at(t,e){const i=t.spatialReference;return O(t,e)&&y(t)?{spatialReference:i,rings:[[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]]]}:t}async function ot(t){const{distance:e,units:i}=t,r=t.geometry;if(e==null||"vertexAttributes"in r)return r;const n=r.spatialReference,l=i?nt.fromJSON(i):Y(n),s=n&&(K(n)||L(n))?r:await b(n,N).then(()=>F(r,N));return(await ut())(s.spatialReference,s,e,l)}async function ut(){return(await E(()=>import("./geometryEngineJSON-e0743813.js"),["assets/geometryEngineJSON-e0743813.js","assets/geometryEngineBase-009e7093.js","assets/index-7a28cea6.js","assets/index-e2475d83.css","assets/geometryEngineJSON-eda4cba2.js","assets/json-48e3ea08.js"])).geodesicBuffer}function Nt(t){return t&&T in t?JSON.parse(JSON.stringify(t,ct)):t}const T="_geVersion",ct=(t,e)=>t!==T?e:void 0;function ft(t){return t==="mesh"?X:tt(t)}function U(t,e){return t?e?4:3:e?3:2}function mt(t,e,i,r){return q(t,e,i,r.coords[0],r.coords[1])}function pt(t,e,i,r,n,l){const s=U(n,l),{coords:a,lengths:u}=r;if(!u)return!1;for(let o=0,c=0;o<u.length;o++,c+=s)if(!q(t,e,i,a[c],a[c+1]))return!1;return!0}function q(t,e,i,r,n){if(!t)return!1;const l=U(e,i),{coords:s,lengths:a}=t;let u=!1,o=0;for(const c of a)u=yt(u,s,l,o,c,r,n),o+=c*l;return u}function yt(t,e,i,r,n,l,s){let a=t,u=r;for(let o=r,c=r+n*i;o<c;o+=i){u=o+i,u===c&&(u=r);const R=e[o],p=e[o+1],S=e[u],f=e[u+1];(p<s&&f>=s||f<s&&p>=s)&&R+(s-p)/(f-p)*(S-R)<l&&(a=!a)}return a}const $="feature-store:unsupported-query",Rt={esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelDisjoint:"disjoint",esriSpatialRelEnvelopeIntersects:"intersects",esriSpatialRelIndexIntersects:null,esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:null},I={spatialRelationship:{esriSpatialRelIntersects:!0,esriSpatialRelContains:!0,esriSpatialRelWithin:!0,esriSpatialRelCrosses:!0,esriSpatialRelDisjoint:!0,esriSpatialRelTouches:!0,esriSpatialRelOverlaps:!0,esriSpatialRelEnvelopeIntersects:!0,esriSpatialRelIndexIntersects:!1,esriSpatialRelRelation:!1},queryGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!0},layerGeometry:{esriGeometryPoint:!0,esriGeometryMultipoint:!0,esriGeometryPolyline:!0,esriGeometryPolygon:!0,esriGeometryEnvelope:!1}};function ht(t){return t!=null&&I.spatialRelationship[t]===!0}function St(t){return t!=null&&I.queryGeometry[it(t)]===!0}function dt(t){return t!=null&&I.layerGeometry[t]===!0}function gt(){return E(()=>import("./geometryEngineJSON-e0743813.js"),["assets/geometryEngineJSON-e0743813.js","assets/geometryEngineBase-009e7093.js","assets/index-7a28cea6.js","assets/index-e2475d83.css","assets/geometryEngineJSON-eda4cba2.js","assets/json-48e3ea08.js"])}function At(t,e,i,r,n){if(g(e)&&i==="esriGeometryPoint"&&(t==="esriSpatialRelIntersects"||t==="esriSpatialRelContains")){const l=A(new h,e,!1,!1);return Promise.resolve(s=>mt(l,!1,!1,s))}if(g(e)&&i==="esriGeometryMultipoint"){const l=A(new h,e,!1,!1);if(t==="esriSpatialRelContains")return Promise.resolve(s=>pt(l,!1,!1,s,r,n))}if(y(e)&&i==="esriGeometryPoint"&&(t==="esriSpatialRelIntersects"||t==="esriSpatialRelContains"))return Promise.resolve(l=>et(e,d(i,r,n,l)));if(y(e)&&i==="esriGeometryMultipoint"&&t==="esriSpatialRelContains")return Promise.resolve(l=>rt(e,d(i,r,n,l)));if(y(e)&&t==="esriSpatialRelIntersects"){const l=ft(i);return Promise.resolve(s=>l(e,d(i,r,n,s)))}return gt().then(l=>{const s=l[Rt[t]].bind(null,e.spatialReference,e);return a=>s(d(i,r,n,a))})}async function xt(t,e,i){const{spatialRel:r,geometry:n}=t;if(n){if(!ht(r))throw new w($,"Unsupported query spatial relationship",{query:t});if(x(n.spatialReference)&&x(i)){if(!St(n))throw new w($,"Unsupported query geometry type",{query:t});if(!dt(e))throw new w($,"Unsupported layer geometry type",{query:t});if(t.outSR)return b(t.geometry&&t.geometry.spatialReference,t.outSR)}}}function Mt(t){if(y(t))return!0;if(g(t)){for(const e of t.rings)if(e.length!==5||e[0][0]!==e[1][0]||e[0][0]!==e[4][0]||e[2][0]!==e[3][0]||e[0][1]!==e[3][1]||e[0][1]!==e[4][1]||e[1][1]!==e[2][1])return!1;return!0}return!1}async function _t(t,e){if(!t)return null;const i=e.featureAdapter,{startTimeField:r,endTimeField:n}=t;let l=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;if(r&&n)await e.forEach(a=>{const u=i.getAttribute(a,r),o=i.getAttribute(a,n);u==null||isNaN(u)||(l=Math.min(l,u)),o==null||isNaN(o)||(s=Math.max(s,o))});else{const a=r||n;await e.forEach(u=>{const o=i.getAttribute(u,a);o==null||isNaN(o)||(l=Math.min(l,o),s=Math.max(s,o))})}return{start:l,end:s}}function Et(t,e,i){if(!e||!t)return null;const{startTimeField:r,endTimeField:n}=t;if(!r&&!n)return null;const{start:l,end:s}=e;return l===null&&s===null?null:l===void 0&&s===void 0?vt():r&&n?wt(i,r,n,l,s):$t(i,r||n,l,s)}function wt(t,e,i,r,n){return r!=null&&n!=null?l=>{const s=t.getAttribute(l,e),a=t.getAttribute(l,i);return(s==null||s<=n)&&(a==null||a>=r)}:r!=null?l=>{const s=t.getAttribute(l,i);return s==null||s>=r}:n!=null?l=>{const s=t.getAttribute(l,e);return s==null||s<=n}:void 0}function $t(t,e,i,r){return i!=null&&r!=null&&i===r?n=>t.getAttribute(n,e)===i:i!=null&&r!=null?n=>{const l=t.getAttribute(n,e);return l>=i&&l<=r}:i!=null?n=>t.getAttribute(n,e)>=i:r!=null?n=>t.getAttribute(n,e)<=r:void 0}function vt(){return()=>!1}export{bt as G,Mt as I,M,d as P,Nt as Z,It as a,xt as b,Et as n,_t as t,At as v,lt as z};