import{bL as n,as as m}from"./index-d0045674.js";import{p as f}from"./queryTopFeatures-a7c1776b.js";import{S as p}from"./TopFeaturesQuery-282c9b47.js";async function u(o,a,r){const e=n(o),t=await f(e,p.from(a),{...r});return{count:t.data.count,extent:m.fromJSON(t.data.extent)}}export{u as executeForTopExtents};
