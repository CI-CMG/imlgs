import{bL as s,g as i}from"./index-7c5c2958.js";import{y as n}from"./queryTopFeatures-5c506e73.js";import{S as p}from"./TopFeaturesQuery-62961058.js";async function d(r,o,t,a){const m=s(r),e={...a},{data:f}=await n(m,p.from(o),t,e);return i.fromJSON(f)}export{d as executeTopFeaturesQuery};
