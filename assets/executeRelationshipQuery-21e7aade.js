import{bK as j,P as R,bL as l,g as p}from"./index-75aaf891.js";import f from"./RelationshipQuery-da341e2c.js";function m(r,t){const e=r.toJSON();return e.objectIds&&(e.objectIds=e.objectIds.join(",")),e.orderByFields&&(e.orderByFields=e.orderByFields.join(",")),e.outFields&&!(t!=null&&t.returnCountOnly)?e.outFields.includes("*")?e.outFields="*":e.outFields=e.outFields.join(","):delete e.outFields,e.outSpatialReference&&(e.outSR=e.outSR.wkid||JSON.stringify(e.outSR.toJSON()),delete e.outSpatialReference),e.dynamicDataSource&&(e.layer=JSON.stringify({source:e.dynamicDataSource}),delete e.dynamicDataSource),e}async function S(r,t,e){const n=await y(r,t,e),o=n.data,s=o.geometryType,a=o.spatialReference,c={};for(const d of o.relatedRecordGroups){const u={fields:void 0,objectIdFieldName:void 0,geometryType:s,spatialReference:a,hasZ:!!o.hasZ,hasM:!!o.hasM,features:d.relatedRecords};if(d.objectId!=null)c[d.objectId]=u;else for(const i of Object.keys(d))i!=="relatedRecords"&&(c[d[i]]=u)}return{...n,data:c}}async function b(r,t,e){const n=await y(r,t,e,{returnCountOnly:!0}),o=n.data,s={};for(const a of o.relatedRecordGroups)a.objectId!=null&&(s[a.objectId]=a.count);return{...n,data:s}}async function y(r,t,e={},n){const o=j({...r.query,f:"json",...n,...m(t,n)});return R(r.path+"/queryRelatedRecords",{...e,query:{...e.query,...o}})}async function O(r,t,e){t=f.from(t);const n=l(r);return S(n,t,e).then(o=>{const s=o.data,a={};return Object.keys(s).forEach(c=>a[c]=p.fromJSON(s[c])),a})}async function I(r,t,e){t=f.from(t);const n=l(r);return b(n,t,{...e}).then(o=>o.data)}export{O as executeRelationshipQuery,I as executeRelationshipQueryForCount};
