import{a as r,b as t,c as y,F as n}from"./index-c7ff1b65.js";import m from"./FeatureLayer-1a7de2c6.js";import"./FeatureLayerBase-deb6a5c9.js";import"./featureLayerUtils-0703e291.js";import"./RelationshipQuery-6fd29bd0.js";import"./editsZScale-a5bc1dad.js";import"./EditBusLayer-167387c4.js";import"./FeatureEffectLayer-34eeb585.js";import"./FeatureEffect-335d26ee.js";import"./FeatureReductionLayer-5fa497a9.js";import"./clusterUtils-f91eea50.js";import"./OrderedLayer-7d9e12c6.js";import"./fieldProperties-ea18400a.js";import"./styleUtils-b7559588.js";import"./TopFeaturesQuery-6782e7c7.js";function o(a){return(i,s,p)=>{if(!i)return null;const d=i[0].orientedImageryProperties;return(d==null?void 0:d[a])??null}}let e=class extends m{constructor(){super(...arguments),this.geometryType="point",this.operationalLayerType="OrientedImageryLayer",this.type="oriented-imagery"}get effectiveElevationSource(){var d;const{elevationSource:a,demPathPrefix:i,demPathSuffix:s}=this;if(!((d=a==null?void 0:a.url)!=null&&d.trim()))return a;let p=a.url.trim();return i!=null&&i.trim()&&(p=`${i.trim()}/${p}`),s!=null&&s.trim()&&(p+=`/${s.trim()}`),{...a,url:p}}_verifySource(){if(super._verifySource(),this.geometryType!=="point")throw new n("oriented-imagery-layer:invalid-geometry-type","OrientedImageryLayer only supports point geometry type")}};r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("cameraHeading")}}})],e.prototype,"cameraHeading",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("cameraHeight")}}})],e.prototype,"cameraHeight",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("cameraPitch")}}})],e.prototype,"cameraPitch",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("cameraRoll")}}})],e.prototype,"cameraRoll",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("coveragePercent")}}})],e.prototype,"coveragePercent",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("demPathPrefix")}}})],e.prototype,"demPathPrefix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("demPathSuffix")}}})],e.prototype,"demPathSuffix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("depthImagePathPrefix")}}})],e.prototype,"depthImagePathPrefix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("depthImagePathSuffix")}}})],e.prototype,"depthImagePathSuffix",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("farDistance")}}})],e.prototype,"farDistance",void 0),r([t({json:{write:!0}})],e.prototype,"geometryType",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("horizontalFieldOfView")}}})],e.prototype,"horizontalFieldOfView",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("horizontalMeasurementUnit")}}})],e.prototype,"horizontalMeasurementUnit",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("imagePathPrefix")}}})],e.prototype,"imagePathPrefix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("imagePathSuffix")}}})],e.prototype,"imagePathSuffix",void 0),r([t({json:{type:Number,write:!0,read:{source:"layers",reader:o("imageRotation")}}})],e.prototype,"imageRotation",void 0),r([t({type:Number,json:{write:!0,read:{source:"layers",reader:o("maximumDistance")}}})],e.prototype,"maximumDistance",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("nearDistance")}}})],e.prototype,"nearDistance",void 0),r([t({type:["OrientedImageryLayer"]})],e.prototype,"operationalLayerType",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("orientedImageryType")}}})],e.prototype,"orientedImageryType",void 0),r([t({json:{read:!1},value:"oriented-imagery",readOnly:!0})],e.prototype,"type",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("verticalFieldOfView")}}})],e.prototype,"verticalFieldOfView",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("verticalMeasurementUnit")}}})],e.prototype,"verticalMeasurementUnit",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("videoPathPrefix")}}})],e.prototype,"videoPathPrefix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("videoPathSuffix")}}})],e.prototype,"videoPathSuffix",void 0),r([t({json:{write:!0,read:{source:"layers",reader:o("elevationSource")}}})],e.prototype,"elevationSource",void 0),r([t()],e.prototype,"effectiveElevationSource",null),e=r([y("esri.layers.OrientedImageryLayer")],e);const O=e;export{O as default};
