import{bL as s,g as i}from"./index-98de285b.js";import{y as n}from"./queryTopFeatures-01b35329.js";import{S as p}from"./TopFeaturesQuery-8f130178.js";async function d(r,o,t,a){const m=s(r),e={...a},{data:f}=await n(m,p.from(o),t,e);return i.fromJSON(f)}export{d as executeTopFeaturesQuery};