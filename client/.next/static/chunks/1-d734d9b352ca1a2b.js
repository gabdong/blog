(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[1],{1743:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{noSSR:function(){return noSSR},default:function(){return dynamic}});let a=r(3709),n=(r(2684),a._(r(6586)));function convertModule(e){return{default:(null==e?void 0:e.default)||e}}function noSSR(e,t){return delete t.webpack,delete t.modules,e(t)}function dynamic(e,t){let r=n.default,a={loading:e=>{let{error:t,isLoading:r,pastDelay:a}=e;return null}};e instanceof Promise?a.loader=()=>e:"function"==typeof e?a.loader=e:"object"==typeof e&&(a={...a,...e}),a={...a,...t};let l=a.loader;return(a.loadableGenerated&&(a={...a,...a.loadableGenerated},delete a.loadableGenerated),"boolean"!=typeof a.ssr||a.ssr)?r({...a,loader:()=>null!=l?l().then(convertModule):Promise.resolve(convertModule(()=>null))}):(delete a.webpack,delete a.modules,noSSR(r,a))}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},805:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"LoadableContext",{enumerable:!0,get:function(){return l}});let a=r(3709),n=a._(r(2684)),l=n.default.createContext(null)},6586:function(e,t,r){"use strict";/**
@copyright (c) 2017-present James Kyle <me@thejameskyle.com>
 MIT License
 Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:
 The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
*/Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return u}});let a=r(3709),n=a._(r(2684)),l=r(805),i=[],o=[],s=!1;function load(e){let t=e(),r={loading:!0,loaded:null,error:null};return r.promise=t.then(e=>(r.loading=!1,r.loaded=e,e)).catch(e=>{throw r.loading=!1,r.error=e,e}),r}let LoadableSubscription=class LoadableSubscription{promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}};function Loadable(e){return function(e,t){let r=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},t),a=null;function init(){if(!a){let t=new LoadableSubscription(e,r);a={getCurrentValue:t.getCurrentValue.bind(t),subscribe:t.subscribe.bind(t),retry:t.retry.bind(t),promise:t.promise.bind(t)}}return a.promise()}if(!s){let e=r.webpack?r.webpack():r.modules;e&&o.push(t=>{for(let r of e)if(t.includes(r))return init()})}function LoadableComponent(e,t){!function(){init();let e=n.default.useContext(l.LoadableContext);e&&Array.isArray(r.modules)&&r.modules.forEach(t=>{e(t)})}();let i=n.default.useSyncExternalStore(a.subscribe,a.getCurrentValue,a.getCurrentValue);return n.default.useImperativeHandle(t,()=>({retry:a.retry}),[]),n.default.useMemo(()=>{var t;return i.loading||i.error?n.default.createElement(r.loading,{isLoading:i.loading,pastDelay:i.pastDelay,timedOut:i.timedOut,error:i.error,retry:a.retry}):i.loaded?n.default.createElement((t=i.loaded)&&t.default?t.default:t,e):null},[e,i])}return LoadableComponent.preload=()=>init(),LoadableComponent.displayName="LoadableComponent",n.default.forwardRef(LoadableComponent)}(load,e)}function flushInitializers(e,t){let r=[];for(;e.length;){let a=e.pop();r.push(a(t))}return Promise.all(r).then(()=>{if(e.length)return flushInitializers(e,t)})}Loadable.preloadAll=()=>new Promise((e,t)=>{flushInitializers(i).then(e,t)}),Loadable.preloadReady=e=>(void 0===e&&(e=[]),new Promise(t=>{let res=()=>(s=!0,t());flushInitializers(o,e).then(res,res)})),window.__NEXT_PRELOADREADY=Loadable.preloadReady;let u=Loadable},1774:function(e,t,r){e.exports=r(1743)},2083:function(){},1514:function(){},3638:function(e,t,r){"use strict";r.d(t,{Z:function(){return rehypeSanitize}});let a="object"==typeof self?self:globalThis,deserializer=(e,t)=>{let as=(t,r)=>(e.set(r,t),t),unpair=r=>{if(e.has(r))return e.get(r);let[n,l]=t[r];switch(n){case 0:case -1:return as(l,r);case 1:{let e=as([],r);for(let t of l)e.push(unpair(t));return e}case 2:{let e=as({},r);for(let[t,r]of l)e[unpair(t)]=unpair(r);return e}case 3:return as(new Date(l),r);case 4:{let{source:e,flags:t}=l;return as(new RegExp(e,t),r)}case 5:{let e=as(new Map,r);for(let[t,r]of l)e.set(unpair(t),unpair(r));return e}case 6:{let e=as(new Set,r);for(let t of l)e.add(unpair(t));return e}case 7:{let{name:e,message:t}=l;return as(new a[e](t),r)}case 8:return as(BigInt(l),r);case"BigInt":return as(Object(BigInt(l)),r)}return as(new a[n](l),r)};return unpair},deserialize=e=>deserializer(new Map,e)(0),{toString:n}={},{keys:l}=Object,typeOf=e=>{let t=typeof e;if("object"!==t||!e)return[0,t];let r=n.call(e).slice(8,-1);switch(r){case"Array":return[1,""];case"Object":return[2,""];case"Date":return[3,""];case"RegExp":return[4,""];case"Map":return[5,""];case"Set":return[6,""]}return r.includes("Array")?[1,r]:r.includes("Error")?[7,r]:[2,r]},shouldSkip=([e,t])=>0===e&&("function"===t||"symbol"===t),serializer=(e,t,r,a)=>{let as=(e,t)=>{let n=a.push(e)-1;return r.set(t,n),n},pair=a=>{if(r.has(a))return r.get(a);let[n,i]=typeOf(a);switch(n){case 0:{let t=a;switch(i){case"bigint":n=8,t=a.toString();break;case"function":case"symbol":if(e)throw TypeError("unable to serialize "+i);t=null;break;case"undefined":return as([-1],a)}return as([n,t],a)}case 1:{if(i)return as([i,[...a]],a);let e=[],t=as([n,e],a);for(let t of a)e.push(pair(t));return t}case 2:{if(i)switch(i){case"BigInt":return as([i,a.toString()],a);case"Boolean":case"Number":case"String":return as([i,a.valueOf()],a)}if(t&&"toJSON"in a)return pair(a.toJSON());let r=[],o=as([n,r],a);for(let t of l(a))(e||!shouldSkip(typeOf(a[t])))&&r.push([pair(t),pair(a[t])]);return o}case 3:return as([n,a.toISOString()],a);case 4:{let{source:e,flags:t}=a;return as([n,{source:e,flags:t}],a)}case 5:{let t=[],r=as([n,t],a);for(let[r,n]of a)(e||!(shouldSkip(typeOf(r))||shouldSkip(typeOf(n))))&&t.push([pair(r),pair(n)]);return r}case 6:{let t=[],r=as([n,t],a);for(let r of a)(e||!shouldSkip(typeOf(r)))&&t.push(pair(r));return r}}let{message:o}=a;return as([n,{name:i,message:o}],a)};return pair},serialize=(e,{json:t,lossy:r}={})=>{let a=[];return serializer(!(t||r),!!t,new Map,a)(e),a};var i="function"==typeof structuredClone?(e,t)=>t&&("json"in t||"lossy"in t)?deserialize(serialize(e,t)):structuredClone(e):(e,t)=>deserialize(serialize(e,t));let o=point("end"),s=point("start");function point(e){return function(t){let r=t&&t.position&&t.position[e]||{};if("number"==typeof r.line&&r.line>0&&"number"==typeof r.column&&r.column>0)return{line:r.line,column:r.column,offset:"number"==typeof r.offset&&r.offset>-1?r.offset:void 0}}}let u=["ariaDescribedBy","ariaLabel","ariaLabelledBy"],c={ancestors:{tbody:["table"],td:["table"],th:["table"],thead:["table"],tfoot:["table"],tr:["table"]},attributes:{a:[...u,"dataFootnoteBackref","dataFootnoteRef",["className","data-footnote-backref"],"href"],blockquote:["cite"],code:[["className",/^language-./]],del:["cite"],div:["itemScope","itemType"],dl:[...u],h2:[["className","sr-only"]],img:[...u,"longDesc","src"],input:[["disabled",!0],["type","checkbox"]],ins:["cite"],li:[["className","task-list-item"]],ol:[...u,["className","contains-task-list"]],q:["cite"],section:["dataFootnotes",["className","footnotes"]],source:["srcSet"],summary:[...u],table:[...u],ul:[...u,["className","contains-task-list"]],"*":["abbr","accept","acceptCharset","accessKey","action","align","alt","axis","border","cellPadding","cellSpacing","char","charOff","charSet","checked","clear","colSpan","color","cols","compact","coords","dateTime","dir","encType","frame","hSpace","headers","height","hrefLang","htmlFor","id","isMap","itemProp","label","lang","maxLength","media","method","multiple","name","noHref","noShade","noWrap","open","prompt","readOnly","rev","rowSpan","rows","rules","scope","selected","shape","size","span","start","summary","tabIndex","title","useMap","vAlign","value","width"]},clobber:["ariaDescribedBy","ariaLabelledBy","id","name"],clobberPrefix:"user-content-",protocols:{cite:["http","https"],href:["http","https","irc","ircs","mailto","xmpp"],longDesc:["http","https"],src:["http","https"]},required:{input:{disabled:!0,type:"checkbox"}},strip:["script"],tagNames:["a","b","blockquote","br","code","dd","del","details","div","dl","dt","em","h1","h2","h3","h4","h5","h6","hr","i","img","input","ins","kbd","li","ol","p","picture","pre","q","rp","rt","ruby","s","samp","section","source","span","strike","strong","sub","summary","sup","table","tbody","td","tfoot","th","thead","tr","tt","ul","var"]},d={}.hasOwnProperty;function transform(e,t){if(t&&"object"==typeof t){let r="string"==typeof t.type?t.type:"";switch(r){case"comment":return function(e,t){if(e.schema.allowComments){let e="string"==typeof t.value?t.value:"",r=e.indexOf("-->"),a=r<0?e:e.slice(0,r),n={type:"comment",value:a};return patch(n,t),n}}(e,t);case"doctype":return function(e,t){if(e.schema.allowDoctypes){let e={type:"doctype"};return patch(e,t),e}}(e,t);case"element":return function(e,t){let r="string"==typeof t.tagName?t.tagName:"";e.stack.push(r);let a=children(e,t.children),n=function(e,t){let r;let a=e.stack[e.stack.length-1],n=e.schema.attributes,l=e.schema.required,i=n&&d.call(n,a)?n[a]:void 0,o=n&&d.call(n,"*")?n["*"]:void 0,s=t&&"object"==typeof t?t:{},u={};for(r in s)if(d.call(s,r)){let t=s[r],a=propertyValue(e,findDefinition(i,r),r,t);null==a&&(a=propertyValue(e,findDefinition(o,r),r,t)),null!=a&&(u[r]=a)}if(l&&d.call(l,a)){let e=l[a];for(r in e)d.call(e,r)&&!d.call(u,r)&&(u[r]=e[r])}return u}(e,t.properties);e.stack.pop();let l=!1;if(r&&"*"!==r&&(!e.schema.tagNames||e.schema.tagNames.includes(r))&&(l=!0,e.schema.ancestors&&d.call(e.schema.ancestors,r))){let t=e.schema.ancestors[r],a=-1;for(l=!1;++a<t.length;)e.stack.includes(t[a])&&(l=!0)}if(!l)return e.schema.strip&&!e.schema.strip.includes(r)?a:void 0;let i={type:"element",tagName:r,properties:n,children:a};return patch(i,t),i}(e,t);case"root":return function(e,t){let r=children(e,t.children),a={type:"root",children:r};return patch(a,t),a}(e,t);case"text":return function(e,t){let r="string"==typeof t.value?t.value:"",a={type:"text",value:r};return patch(a,t),a}(0,t)}}}function children(e,t){let r=[];if(Array.isArray(t)){let a=-1;for(;++a<t.length;){let n=transform(e,t[a]);n&&(Array.isArray(n)?r.push(...n):r.push(n))}}return r}function propertyValue(e,t,r,a){return t?Array.isArray(a)?function(e,t,r,a){let n=-1,l=[];for(;++n<a.length;){let i=propertyValuePrimitive(e,t,r,a[n]);("number"==typeof i||"string"==typeof i)&&l.push(i)}return l}(e,t,r,a):propertyValuePrimitive(e,t,r,a):void 0}function propertyValuePrimitive(e,t,r,a){if(("boolean"==typeof a||"number"==typeof a||"string"==typeof a)&&function(e,t,r){let a=e.schema.protocols&&d.call(e.schema.protocols,t)?e.schema.protocols[t]:void 0;if(!a||0===a.length)return!0;let n=String(r),l=n.indexOf(":"),i=n.indexOf("?"),o=n.indexOf("#"),s=n.indexOf("/");if(l<0||s>-1&&l>s||i>-1&&l>i||o>-1&&l>o)return!0;let u=-1;for(;++u<a.length;){let e=a[u];if(l===e.length&&n.slice(0,e.length)===e)return!0}return!1}(e,r,a)){if("object"==typeof t&&t.length>1){let e=!1,r=0;for(;++r<t.length;){let n=t[r];if(n&&"object"==typeof n&&"flags"in n){if(n.test(String(a))){e=!0;break}}else if(n===a){e=!0;break}}if(!e)return}return e.schema.clobber&&e.schema.clobberPrefix&&e.schema.clobber.includes(r)?e.schema.clobberPrefix+a:a}}function patch(e,t){let r=function(e){let t=s(e),r=o(e);if(t&&r)return{start:t,end:r}}(t);t.data&&(e.data=i(t.data)),r&&(e.position=r)}function findDefinition(e,t){let r;let a=-1;if(e)for(;++a<e.length;){let n=e[a],l="string"==typeof n?n:n[0];if(l===t)return n;"data*"===l&&(r=n)}if(t.length>4&&"data"===t.slice(0,4).toLowerCase())return r}function rehypeSanitize(e){return function(t){let r=function(e,t){let r={type:"root",children:[]},a={schema:t?{...c,...t}:c,stack:[]},n=transform(a,e);return n&&(Array.isArray(n)?1===n.length?r=n[0]:r.children=n:r=n),r}(t,e);return r}}}}]);