import{bL as n,as as m}from"./index-315f624f.js";import{p as f}from"./queryTopFeatures-67a19646.js";import{S as p}from"./TopFeaturesQuery-c0fb82d1.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
