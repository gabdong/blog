"use strict";(()=>{var e={};e.id=222,e.ids=[222,888,660],e.modules={8794:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{config:()=>x,default:()=>u,getServerSideProps:()=>h,getStaticPaths:()=>g,getStaticProps:()=>p,reportWebVitals:()=>m,routeModule:()=>S,unstable_getServerProps:()=>y,unstable_getServerSideProps:()=>j,unstable_getStaticParams:()=>b,unstable_getStaticPaths:()=>v,unstable_getStaticProps:()=>f});var i=a(7093),s=a(5244),l=a(1323),n=a(4003),o=a(9597),d=a(9635),c=e([o,d]);[o,d]=c.then?(await c)():c;let u=(0,l.l)(d,"default"),p=(0,l.l)(d,"getStaticProps"),g=(0,l.l)(d,"getStaticPaths"),h=(0,l.l)(d,"getServerSideProps"),x=(0,l.l)(d,"config"),m=(0,l.l)(d,"reportWebVitals"),f=(0,l.l)(d,"unstable_getStaticProps"),v=(0,l.l)(d,"unstable_getStaticPaths"),b=(0,l.l)(d,"unstable_getStaticParams"),y=(0,l.l)(d,"unstable_getServerProps"),j=(0,l.l)(d,"unstable_getServerSideProps"),S=new i.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/postEditor/[type]",pathname:"/postEditor/[type]",bundlePath:"",filename:""},components:{App:o.default,Document:n.default},userland:d});r()}catch(e){r(e)}})},3337:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>Editor});var i=a(997);a(9157),a(4720);var s=a(5152),l=a.n(s),n=a(5905),o=a(8238),d=a(1200),c=e([n,o]);[n,o]=c.then?(await c)():c;let u=l()(()=>Promise.resolve().then(a.t.bind(a,1887,23)),{loadableGenerated:{modules:["../components/Editor.js -> @uiw/react-md-editor"]},ssr:!1});function Editor({...e}){async function onImagePasted(t){let a=t.files.length;for(let r=0;r<a;r++){let a=t.files.item(r);if(a)try{let{url:t,alt:r}=await (0,o.I)(a),i=(0,d._)(".w-md-editor-text-input",`![${r??a.name}](${t})`);if(!i)continue;e.onChange(i)}catch(e){}}}return i.jsx("div",{"data-color-mode":"dark",children:i.jsx(u,{value:e.value,onChange:e.onChange,height:e.height,previewOptions:{rehypePlugins:[[n.default]]},onPaste:async e=>{e.clipboardData.files.length>0&&e.preventDefault(),await onImagePasted(e.clipboardData)}})})}r()}catch(e){r(e)}})},8279:(e,t,a)=>{a.d(t,{Z:()=>SearchInput});var r=a(997),i=a(6689),s=a(5352);let{useRef:l}=a(6689);function SearchInput({...e}){let t,a;let n=function(){let e=l(!0),t=e.current;return e.current=!1,t}();return(e.defaultValue||""===e.defaultValue)&&e.setDefaultValue&&"function"==typeof e.setDefaultValue?(t=e.defaultValue,a=e.setDefaultValue,(0,i.useEffect)(()=>{let a=setTimeout(()=>{"function"!=typeof e.searchFunc||n||e.searchFunc(t)},300);return()=>clearTimeout(a)},[t]),r.jsx(s.Z,{...e,onChange:e=>a(e.target.value),onKeyUp:e=>a(e.target.value),defaultValue:t})):console.error("<SearchInput> 검색어 state가 없습니다.")}},1200:(e,t,a)=>{function elDisplayToggle(e=[],t="",a="remove",r=!0){function _toggleFn(r){let i=document.getElementById(t),s=r.target,l=!1;for(let t of e)(s.closest(`#${t}`)||s.id===t)&&(l=!0);l||("remove"==a?i.remove():i.classList.remove(a),document.removeEventListener("click",_toggleFn))}e=e||[],t=t||"",a=a||"",(r=r??!0)?document.addEventListener("click",_toggleFn):document.removeEventListener("click",_toggleFn)}function insertToTextArea(e,t){let a=document.querySelector(e);if(!a)return null;let r=a.value,i=r.length,s=a.selectionStart,l=a.selectionEnd,n=r.slice(0,s),o=r.slice(s,i);return r=`${n} ${t} ${o}`,a.value=r,a.selectionEnd=l+t.length+2,r}a.d(t,{_:()=>insertToTextArea,h:()=>elDisplayToggle})},9635:(e,t,a)=>{a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>PostEditor,getServerSideProps:()=>E});var i=a(997),s=a(6689),l=a(7518),n=a.n(l),o=a(510),d=a(2441),c=a(2616),u=a(914),p=a(1200),g=a(3337),h=a(5352),x=a(4500),m=a(8279),f=e([o,d,c,g]);function PostEditor({pageProps:e}){let{gsspProps:{postData:t}}=e,a=t?.idx??"",[r,l]=(0,s.useState)(t?.thumbnail??""),[n,o]=(0,s.useState)(t?.thumbnailAlt??""),[f,E,D]=(0,u.Z)(t?.subject??""),[R,V]=(0,s.useState)(t?.content??""),[Z,A]=(0,s.useState)(t?.tagData??[]),[N,F]=(0,s.useState)(t?.tags??[]),[L,$]=(0,s.useState)([]),[W,z]=(0,s.useState)(""),[G,M]=(0,s.useState)(null),U=(0,s.useRef)(null),B=(0,s.useRef)(null);(0,s.useEffect)(()=>{"edit"==e.urlParams.type&&t.subject!=f?(D(t.subject),V(t.content),A(t.tagData),F(t.tags),l(t.thumbnail),o(t.thumbnailAlt)):"new"==e.urlParams.type&&f&&(D(""),V(),A([]),F([]),l(""),o(""))},[e.urlParams]);let getSearchTagResult=async e=>{if(e){let t=await (0,c.CN)(e,N);Array.isArray(t)?$(t):$([]),U.current.classList.add("active"),(0,p.h)(["searchTagResultWrap","searchTagInput"],"searchTagResultWrap","active",!0)}else U.current.classList.remove("active"),(0,p.h)(null,null,null,!1)},clickSearchTagResult=e=>{A(t=>(t.push(e),[...t])),F(t=>(t.push(e.idx),[...t])),$(t=>{let a=t.findIndex(t=>t.idx=e.idx);return -1!==a&&t.splice(a,1),[...t]})},savePost=async(e="Y")=>{let t={isPublic:e,subject:f,content:R,tags:N,uploadThumbnail:G,thumbnailAlt:n};a?(t.postIdx=a,(0,d.dq)(t)):(0,d.lT)(t)};return(0,i.jsxs)(v,{children:[i.jsx(b,{ref:B,children:Z.length>0?Z.map(e=>i.jsx(y,{children:(0,i.jsxs)("span",{className:"caption",children:["#",e.name]})},e.idx)):null}),(0,i.jsxs)(P,{children:[i.jsx("h3",{className:"smallTitle",children:"태그"}),i.jsx(m.Z,{searchFunc:e=>getSearchTagResult(e),border:"bottom",style:{width:"100%",color:"var(--gray-l)"},placeholder:"검색",onFocus:e=>getSearchTagResult(e.target.value),id:"searchTagInput",defaultValue:W,setDefaultValue:z}),i.jsx(T,{ref:U,id:"searchTagResultWrap",className:W?"active":"noActive",children:L.length>0?L.map(e=>i.jsx(C,{onClick:t=>{t.stopPropagation(),clickSearchTagResult(e)},children:i.jsx("span",{className:"normalText",children:e.name})},e.idx)):i.jsx("span",{className:"normalText",children:"검색 결과가 없습니다."})})]}),(0,i.jsxs)(j,{children:[i.jsx("h3",{className:"smallTitle",children:"썸네일"}),i.jsx(h.Z,{type:"file",border:"bottom",accept:"image/jpeg, image/jpg, image/png, image/gif",onChange:e=>{let t=e.target.files[0];if(!["image/png","image/jpg","image/jpeg","image/gif"].includes(t.type))return alert("잘못된 확장자입니다.");let a=new FileReader;a.readAsDataURL(t),a.onload=()=>{l(a.result),M(t)}}}),i.jsx(h.Z,{defaultValue:n,onChange:e=>o(e.target.value),border:"bottom",style:{color:"var(--gray-l)"},placeholder:"썸네일 설명"}),i.jsx(S,{children:r?i.jsx(w,{id:"thumbnail",src:r,alt:n}):null})]}),(0,i.jsxs)(_,{children:[i.jsx("h3",{className:"smallTitle",children:"제목"}),i.jsx(h.Z,{defaultValue:f,onChange:E,border:"bottom",style:{color:"var(--gray-l)"},placeholder:"입력"})]}),(0,i.jsxs)(I,{children:[i.jsx("h3",{className:"smallTitle",children:"내용"}),i.jsx(g.Z,{value:R,onChange:V,height:"500"})]}),(0,i.jsxs)(k,{children:[i.jsx(x.Z,{text:"취소"}),(0,i.jsxs)(q,{children:[i.jsx(x.Z,{text:"비공개",onClick:()=>savePost("N")}),i.jsx(x.Z,{text:"저장",style:{background:"var(--primary-color)"},onClick:()=>savePost()})]})]})]})}[o,d,c,g]=f.then?(await f)():f;let v=n().article.withConfig({componentId:"sc-b66ab5d0-0"})`
  display: flex;
  flex-direction: column;
  gap: 25px;

  width: 100%;
`,b=n().div.withConfig({componentId:"sc-b66ab5d0-1"})`
  display: flex;
  align-items: center;
  gap: 8px;
`,y=n().div.withConfig({componentId:"sc-b66ab5d0-2"})`
  padding: var(--small-box-padding);
  border-radius: var(--border-radius);
  background: var(--dark-l-o);
  transition: var(--transition);
  cursor: pointer;

  & > .caption {
    color: var(--primary-color-d-text);
  }
  &:hover {
    background: var(--dark-l);
  }
`,j=n().div.withConfig({componentId:"sc-b66ab5d0-3"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,S=n().div.withConfig({componentId:"sc-b66ab5d0-4"})`
  height: 120px;
  padding: 8px;
  border: 1px solid #dddddd;
  border-radius: var(--border-radius);
`,w=n().img.withConfig({componentId:"sc-b66ab5d0-5"})`
  height: 100%;
`,P=n().div.withConfig({componentId:"sc-b66ab5d0-6"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  position: relative;
`,T=n().div.withConfig({componentId:"sc-b66ab5d0-7"})`
  display: none;
  gap: 8px;

  width: 100%;
  padding: var(--box-padding);
  background: var(--dark);
  border: 1px solid var(--gray);
  border-radius: var(--border-radius);
  position: absolute;
  top: calc(100% + 10px);

  &.active {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    z-index: 1;
  }
`,C=n().div.withConfig({componentId:"sc-b66ab5d0-8"})`
  cursor: pointer;

  & > .normalText {
    transition: var(--transition);
  }
  &:hover > .normalText {
    color: var(--primary-color);
  }
`,_=n().div.withConfig({componentId:"sc-b66ab5d0-9"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,I=n().div.withConfig({componentId:"sc-b66ab5d0-10"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,k=n().div.withConfig({componentId:"sc-b66ab5d0-11"})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`,q=n().div.withConfig({componentId:"sc-b66ab5d0-12"})`
  display: flex;
  align-items: center;
  gap: 10px;
`,E=(0,o.r)(async(e,t)=>{let{type:a}=e.params;if("edit"!=a)return{};let r=e.query.post,i=await (0,d.xl)({postIdx:r,user:t});return i.status?{redirect:`/${i.status}`}:{postData:i}});r()}catch(e){r(e)}})},6807:e=>{e.exports=require("@redux-devtools/extension")},1887:e=>{e.exports=require("@uiw/react-md-editor")},5648:e=>{e.exports=require("next-redux-wrapper")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},6022:e=>{e.exports=require("react-redux")},997:e=>{e.exports=require("react/jsx-runtime")},6695:e=>{e.exports=require("redux")},8417:e=>{e.exports=require("redux-thunk")},7518:e=>{e.exports=require("styled-components")},9648:e=>{e.exports=import("axios")},5905:e=>{e.exports=import("rehype-sanitize")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),a=t.X(0,[761,359,859,450,616,597,3,510,441],()=>__webpack_exec__(8794));module.exports=a})();