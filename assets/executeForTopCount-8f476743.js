import{bL as a}from"./index-04785765.js";import{m as n}from"./queryTopFeatures-cd8ef246.js";import{S as f}from"./TopFeaturesQuery-618320bd.js";async function i(o,t,r){const m=a(o);return(await n(m,f.from(t),{...r})).data.count}export{i as executeForTopCount};