import{bL as n,as as m}from"./index-58460e83.js";import{p as f}from"./queryTopFeatures-e3193ebb.js";import{S as p}from"./TopFeaturesQuery-2599143e.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
