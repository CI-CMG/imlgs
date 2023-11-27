import{z as o,A as n}from"./index-c06df8eb.js";import{a as l}from"./AttributeStoreView-94000c71.js";const i=o("esri-2d-log-allocations");class a{constructor(t,e){this._array=t,this._pool=e}get array(){return this._array}get length(){return this._array.length}static create(t,e){const r=e.acquire(t);return new a(r,e)}expand(t){const e=this._pool.acquire(t);e.set(this._array),this._pool.release(this._array),this._array=e}destroy(){this._pool.release(this._array)}set(t,e){this._array.set(t._array,e)}slice(){const t=this._pool.acquire(this._array.byteLength);return t.set(this._array),new a(t,this._pool)}}class s{constructor(){this._data=new ArrayBuffer(s.BYTE_LENGTH),this._freeList=new l({start:0,end:this._data.byteLength})}static get BYTE_LENGTH(){return 64e6}get buffer(){return this._data}allocate(t){const e=this._freeList.firstFit(t);return e==null?null:new Uint32Array(this._data,e,t/Uint32Array.BYTES_PER_ELEMENT)}free(t){this._freeList.free(t.byteOffset,t.byteLength)}}class y{constructor(){this._bytesAllocated=0,this._pages=[],this._pagesByBuffer=new Map,this._addPage()}destroy(){this._pages=[],this._pagesByBuffer=null}get _bytesTotal(){return this._pages.length*s.BYTE_LENGTH}acquire(t){if(this._bytesAllocated+=t,i&&console.log(`Allocating ${t}, (${this._bytesAllocated} / ${this._bytesTotal})`),t>s.BYTE_LENGTH)return new Uint32Array(t/Uint32Array.BYTES_PER_ELEMENT);for(const e of this._pages){const r=e.allocate(t);if(r!=null)return r}return n(this._addPage().allocate(t),"Expected to allocate page")}release(t){this._bytesAllocated-=t.byteLength,i&&console.log(`Freeing ${t.byteLength}, (${this._bytesAllocated} / ${this._bytesTotal})`);const e=this._pagesByBuffer.get(t.buffer);e&&e.free(t)}_addPage(){const t=new s;return this._pages.push(t),this._pagesByBuffer.set(t.buffer,t),t}}export{y as i,a as r};