import{bL as n,as as m}from"./index-5ef7e216.js";import{p as f}from"./queryTopFeatures-56d6055b.js";import{S as p}from"./TopFeaturesQuery-c9ed3877.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
