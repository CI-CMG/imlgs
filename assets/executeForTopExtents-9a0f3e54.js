import{bL as n,av as m}from"./index-75aaf891.js";import{p as f}from"./queryTopFeatures-967e244f.js";import{S as p}from"./TopFeaturesQuery-1a85112b.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
