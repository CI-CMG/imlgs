import{bL as n,as as m}from"./index-632af840.js";import{p as f}from"./queryTopFeatures-2410f94e.js";import{S as p}from"./TopFeaturesQuery-46f43816.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
