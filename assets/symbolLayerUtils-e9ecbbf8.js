import{di as v,F as n,a0 as y,_ as p,dj as c,a$ as b,dk as w,bc as l}from"./index-5df4e7ab.js";let s=f();function f(){return new v(50)}function T(){s=f()}async function $(r,i){var o,t;if((o=r.resource)!=null&&o.href)return _(r.resource.href).then(e=>[e.width,e.height]);if((t=r.resource)!=null&&t.primitive)return i!=null?[i,i]:[256,256];throw new n("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function _(r){return y(r,{responseType:"image"}).then(i=>i.data)}async function x(r,i=null){var t;if(!r.isPrimitive){const e=r.resource.href;if(!e)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const a=s.get(e);if(a!==void 0)return a;const{fetch:h}=await p(()=>import("./objectResourceUtils-d438d311.js").then(d=>d.o),["assets/objectResourceUtils-d438d311.js","assets/devEnvironmentUtils-5002a058.js","assets/index-5df4e7ab.js","assets/index-f1897d32.css","assets/mat3f64-221ce671.js","assets/mat4f64-1413b4a7.js","assets/BufferView-dbfb7357.js","assets/vec32-c6763b18.js","assets/DefaultMaterial_COLOR_GAMMA-d323ccb1.js","assets/enums-b14466b3.js","assets/quat-6cd01d63.js","assets/quatf64-3363c48e.js","assets/resourceUtils-1d112ccb.js","assets/basicInterfaces-4ab7cc6a.js","assets/Indices-2c9c471f.js","assets/byteSizeEstimations-7cf1c05d.js","assets/NestedMap-1b5db22e.js","assets/requestImageUtils-685640e5.js","assets/InterleavedLayout-ae3d09af.js","assets/types-1305598a.js","assets/sphere-3f5e493e.js","assets/ByteSizeUnit-d4757d40.js","assets/lineSegment-8f3819d2.js","assets/VertexAttribute-9f2e53ec.js","assets/Texture-c108681e.js","assets/OrderIndependentTransparency-309a1bc3.js","assets/vec3f32-ad1dc57f.js","assets/doublePrecisionUtils-e3c3d0d8.js","assets/symbolColorUtils-27f3820b.js","assets/VertexElementDescriptor-2925c6af.js","assets/VertexArrayObject-c85d2c8e.js"]),m=await h(e,{disableTextures:!0}),u=c(m.referenceBoundingBox,l());return s.put(e,u),u}if(!((t=r.resource)!=null&&t.primitive))throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const o=b(w(r.resource.primitive));if(i!=null)for(let e=0;e<o.length;e++)o[e]*=i;return c(o,l())}export{T as clearBoundingBoxCache,$ as computeIconLayerResourceSize,x as computeObjectLayerResourceSize};