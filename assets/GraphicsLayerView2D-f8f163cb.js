import{j as p,m as a,V as o,R as g,a as s,b as m,c as l}from"./index-98de285b.js";import{f as c,d as n}from"./LayerView-910d1753.js";import{i as d}from"./GraphicContainer-72d364e4.js";import{o as u}from"./GraphicsView2D-49c606f0.js";import"./Container-217f2fed.js";import"./definitions-a685b3fb.js";import"./enums-b14466b3.js";import"./Texture-bb81c091.js";import"./color-cc1168ae.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./BaseGraphicContainer-c8fe92cc.js";import"./FeatureContainer-d4503f32.js";import"./AttributeStoreView-d2d439ce.js";import"./TiledDisplayObject-57ea3ace.js";import"./WGLContainer-4f1dafa2.js";import"./VertexArrayObject-858bdb1e.js";import"./ProgramTemplate-42c707fb.js";import"./GeometryUtils-a0b4e2e4.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-a401dd94.js";import"./visualVariablesUtils-f5ce97b9.js";import"./ExpandedCIM-d52b72fd.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./utils-672261a2.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-854de5b3.js";import"./floatRGBA-e3fb1d63.js";import"./clusterUtils-127f75a6.js";import"./util-5503a0ca.js";import"./TileContainer-6aeb6380.js";import"./vec3f32-ad1dc57f.js";import"./normalizeUtilsSync-9c0d510b.js";import"./projectionSupport-6d8d8e63.js";import"./json-48e3ea08.js";import"./Matcher-6b40bc7f.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-54f4afd9.js";import"./devEnvironmentUtils-5002a058.js";import"./webStyleSymbolUtils-fb0bd954.js";import"./ComputedAttributeStorage-87c717f1.js";import"./arcadeTimeUtils-c999e8ae.js";import"./executionError-c92d3b85.js";const w={remove(){},pause(){},resume(){}};let e=class extends c(n){constructor(){super(...arguments),this._highlightIds=new Map}attach(){this.graphicsView=new u({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:this.layer.graphics,container:new d(this.view.featuresTilingScheme)}),this._updateHighlight(),this.container.addChild(this.graphicsView.container),this.addAttachHandles(this.layer.on("graphic-update",this.graphicsView.graphicUpdateHandler))}detach(){this.container.removeAllChildren(),this.graphicsView=p(this.graphicsView)}async hitTest(i){return this.graphicsView?this.graphicsView.hitTest(i).map(t=>({type:"graphic",graphic:t,mapPoint:i,layer:this.layer})):null}async fetchPopupFeatures(i){return this.graphicsView?this.graphicsView.hitTest(i).filter(t=>!!t.popupTemplate):[]}queryGraphics(){return Promise.resolve(this.graphicsView.graphics)}update(i){this.graphicsView.processUpdate(i)}moveStart(){}viewChange(){this.graphicsView.viewChange()}moveEnd(){}isUpdating(){return!this.graphicsView||this.graphicsView.updating}highlight(i){let t;typeof i=="number"?t=[i]:i instanceof a?t=[i.uid]:Array.isArray(i)&&i.length>0?t=typeof i[0]=="number"?i:i.map(r=>r&&r.uid):o.isCollection(i)&&i.length>0&&(t=i.map(r=>r&&r.uid).toArray());const h=t==null?void 0:t.filter(g);return h!=null&&h.length?(this._addHighlight(h),{remove:()=>this._removeHighlight(h)}):w}_addHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const h=this._highlightIds.get(t);this._highlightIds.set(t,h+1)}else this._highlightIds.set(t,1);this._updateHighlight()}_removeHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const h=this._highlightIds.get(t)-1;h===0?this._highlightIds.delete(t):this._highlightIds.set(t,h)}this._updateHighlight()}_updateHighlight(){var i;(i=this.graphicsView)==null||i.setHighlight(Array.from(this._highlightIds.keys()))}};s([m()],e.prototype,"graphicsView",void 0),e=s([l("esri.views.2d.layers.GraphicsLayerView2D")],e);const oi=e;export{oi as default};