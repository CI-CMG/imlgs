import{bL as n,as as m}from"./index-64c6d7a8.js";import{p as f}from"./queryTopFeatures-8ab79dd9.js";import{S as p}from"./TopFeaturesQuery-71b711ae.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
