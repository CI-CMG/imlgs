import{ii as E,ij as F,ik as G,il as K,cj as x,bc as $,bu as O,cl as l,co as d,cn as P,im as f,i9 as q,io as N,bj as S,gR as T,ck as D,s as H,hI as Y,bv as R,ip as J,hb as U,cm as W,bx as tt,iq as V,er as j,hF as et,hG as st}from"./index-c7ff1b65.js";import{E as it}from"./ByteSizeUnit-d4757d40.js";import{n as rt}from"./mat3f64-221ce671.js";import{n as nt}from"./mat4f64-1413b4a7.js";import{n as ot}from"./quatf64-3363c48e.js";class ct{constructor(e){this._allocator=e,this._items=[],this._itemsPtr=0,this._grow()}get(){return this._itemsPtr===0&&E(()=>this._reset()),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const e=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*v);this._items.length=Math.min(e,this._items.length),this._itemsPtr=0}_grow(){for(let e=0;e<Math.max(8,Math.min(this._items.length,v));e++)this._items.push(this._allocator())}}const v=1024;let g=class a{constructor(e,s,i){this._itemByteSize=e,this._itemCreate=s,this._buffers=new Array,this._items=new Array,this._itemsPtr=0,this._itemsPerBuffer=Math.ceil(i/this._itemByteSize)}get(){this._itemsPtr===0&&E(()=>this._reset());const e=Math.floor(this._itemsPtr/this._itemsPerBuffer);for(;this._buffers.length<=e;){const s=new ArrayBuffer(this._itemsPerBuffer*this._itemByteSize);for(let i=0;i<this._itemsPerBuffer;++i)this._items.push(this._itemCreate(s,i*this._itemByteSize));this._buffers.push(s)}return this._items[this._itemsPtr++]}_reset(){const e=2*(Math.floor(this._itemsPtr/this._itemsPerBuffer)+1);for(;this._buffers.length>e;)this._buffers.pop(),this._items.length=this._buffers.length*this._itemsPerBuffer;this._itemsPtr=0}static createVec2f64(e=m){return new a(16,F,e)}static createVec3f64(e=m){return new a(24,G,e)}static createVec4f64(e=m){return new a(32,K,e)}static createMat3f64(e=m){return new a(72,rt,e)}static createMat4f64(e=m){return new a(128,nt,e)}static createQuatf64(e=m){return new a(32,ot,e)}get test(){return{size:this._buffers.length*this._itemsPerBuffer*this._itemByteSize}}};const m=4*it.KILOBYTES;g.createVec2f64();const h=g.createVec3f64();g.createVec4f64();g.createMat3f64();const ut=g.createMat4f64();g.createQuatf64();var _;(function(t){t[t.X=0]="X",t[t.Y=1]="Y",t[t.Z=2]="Z"})(_||(_={}));function at(t){return t?C(x(t.origin),x(t.direction)):C($(),$())}function C(t,e){return{origin:t,direction:e}}function qt(t,e){const s=ht.get();return s.origin=t,s.direction=e,s}function ft(t,e,s){const i=O(t.direction,l(s,e,t.origin));return d(s,t.origin,P(s,t.direction,i)),s}const ht=new ct(()=>at());function mt(t,e){const s=O(t,e)/(f(t)*f(e));return-q(s)}const _t=M();function M(){return N()}function Z(t,e=M()){return S(e,t)}function lt(t,e){return T(t[0],t[1],t[2],e)}function gt(t){return t}function pt(t){t[0]=t[1]=t[2]=t[3]=0}function $t(t,e){return t[0]=t[1]=t[2]=0,t[3]=e,t}function b(t){return t[3]}function Pt(t){return t}function Mt(t,e,s,i){return T(t,e,s,i)}function dt(t,e,s){return t!==s&&D(s,t),s[3]=t[3]+e,s}function bt(t,e,s){return H.getLogger("esri.geometry.support.sphere").error("sphere.setExtent is not yet supported"),t===s?s:Z(t,s)}function w(t,e,s){if(e==null)return!1;const{origin:i,direction:r}=e,n=wt;n[0]=i[0]-t[0],n[1]=i[1]-t[1],n[2]=i[2]-t[2];const o=r[0]*r[0]+r[1]*r[1]+r[2]*r[2];if(o===0)return!1;const c=2*(r[0]*n[0]+r[1]*n[1]+r[2]*n[2]),p=c*c-4*o*(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]-t[3]*t[3]);if(p<0)return!1;const A=Math.sqrt(p);let u=(-c-A)/(2*o);const y=(-c+A)/(2*o);return(u<0||y<u&&y>0)&&(u=y),!(u<0)&&(s&&(s[0]=i[0]+r[0]*u,s[1]=i[1]+r[1]*u,s[2]=i[2]+r[2]*u),!0)}const wt=$();function yt(t,e){return w(t,e,null)}function Bt(t,e,s){if(w(t,e,s))return s;const i=X(t,e,h.get());return d(s,e.origin,P(h.get(),e.direction,Y(e.origin,i)/f(e.direction))),s}function X(t,e,s){const i=h.get(),r=ut.get();R(i,e.origin,e.direction);const n=b(t);R(s,i,e.origin),P(s,s,1/f(s)*n);const o=I(t,e.origin),c=mt(e.origin,s);return J(r,c+o,i),U(s,s,r),s}function St(t,e,s){return w(t,e,s)?s:(ft(e,t,s),k(t,s,s))}function k(t,e,s){const i=l(h.get(),e,t),r=P(h.get(),i,t[3]/f(i));return d(s,r,t)}function zt(t,e){const s=l(h.get(),e,t),i=W(s),r=t[3]*t[3];return Math.sqrt(Math.abs(i-r))}function I(t,e){const s=l(h.get(),e,t),i=f(s),r=b(t),n=r+Math.abs(r-i);return q(r/n)}const B=$();function L(t,e,s,i){const r=l(B,e,t);switch(s){case _.X:{const n=V(r,B)[2];return j(i,-Math.sin(n),Math.cos(n),0)}case _.Y:{const n=V(r,B),o=n[1],c=n[2],p=Math.sin(o);return j(i,-p*Math.cos(c),-p*Math.sin(c),Math.cos(o))}case _.Z:return tt(i,r);default:return}}function Q(t,e){const s=l(z,e,t);return f(s)-t[3]}function At(t,e,s,i){const r=Q(t,e),n=L(t,e,_.Z,z),o=P(z,n,s-r);return d(i,e,o)}function xt(t,e){const s=et(t,e),i=b(t);return s<=i*i}function Rt(t,e,s=M()){const i=Y(t,e),r=t[3],n=e[3];return i+n<r?(S(s,t),s):i+r<n?(S(s,e),s):(st(s,t,e,(i+n-r)/(2*i)),s[3]=(i+r+n)/2,s)}const z=$(),Vt=M();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:_t,altitudeAt:Q,angleToSilhouette:I,axisAt:L,clear:pt,closestPoint:St,closestPointOnSilhouette:X,containsPoint:xt,copy:Z,create:M,distanceToSilhouette:zt,elevate:dt,fromCenterAndRadius:lt,fromRadius:$t,fromValues:Mt,getCenter:Pt,getRadius:b,intersectRay:w,intersectRayClosestSilhouette:Bt,intersectsRay:yt,projectPoint:k,setAltitudeAt:At,setExtent:bt,tmpSphere:Vt,union:Rt,wrap:gt},Symbol.toStringTag,{value:"Module"}));export{xt as Q,yt as V,M as _,h as c,at as d,b as k,qt as p,Z as q,ct as s,Pt as z};
