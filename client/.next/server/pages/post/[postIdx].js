"use strict";(()=>{var e={};e.id=412,e.ids=[412,888,660],e.modules={8286:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>h,default:()=>u,getServerSideProps:()=>m,getStaticPaths:()=>x,getStaticProps:()=>p,reportWebVitals:()=>f,routeModule:()=>P,unstable_getServerProps:()=>v,unstable_getServerSideProps:()=>S,unstable_getStaticParams:()=>w,unstable_getStaticPaths:()=>b,unstable_getStaticProps:()=>g});var s=r(7093),i=r(5244),n=r(1323),o=r(4003),l=r(9597),d=r(6540),c=e([l,d]);[l,d]=c.then?(await c)():c;let u=(0,n.l)(d,"default"),p=(0,n.l)(d,"getStaticProps"),x=(0,n.l)(d,"getStaticPaths"),m=(0,n.l)(d,"getServerSideProps"),h=(0,n.l)(d,"config"),f=(0,n.l)(d,"reportWebVitals"),g=(0,n.l)(d,"unstable_getStaticProps"),b=(0,n.l)(d,"unstable_getStaticPaths"),w=(0,n.l)(d,"unstable_getStaticParams"),v=(0,n.l)(d,"unstable_getServerProps"),S=(0,n.l)(d,"unstable_getServerSideProps"),P=new s.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/post/[postIdx]",pathname:"/post/[postIdx]",bundlePath:"",filename:""},components:{App:l.default,Document:o.default},userland:d});a()}catch(e){a(e)}})},5894:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.d(t,{Z:()=>PostContent});var s=r(997),i=r(1664),n=r.n(i);r(4579);var o=r(7518),l=r.n(o),d=r(2441),c=r(1163);r(6022);var u=e([d]);function PostContent({postData:e,postIdx:t,user:r}){let a=(0,c.useRouter)();return s.jsx(s.Fragment,{children:(0,s.jsxs)(p,{children:[s.jsx("h2",{className:"headline",children:e.subject}),(0,s.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[(0,s.jsxs)(x,{children:[s.jsx("h3",{className:"subTitle",children:e.memberName}),s.jsx("p",{className:"normalText",children:new Date(e.updateDatetime).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"})})]}),e.memberIdx!==r?.idx?null:(0,s.jsxs)(m,{children:[s.jsx(n(),{className:"buttonText",href:`/postEditor/edit?post=${t}`,children:"수정"}),s.jsx("p",{className:"buttonText",onClick:()=>(0,d.fR)(t,a),children:"삭제"})]})]}),s.jsx(h,{children:s.jsx("img",{src:e.thumbnail,alt:e.thumbnailAlt})}),s.jsx(f,{dangerouslySetInnerHTML:{__html:e.html}})]})})}d=(u.then?(await u)():u)[0];let p=l().section.withConfig({componentId:"sc-32bbcefe-0"})`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;

  min-width: 0;
  max-width: 100%;
  height: 100%;

  & img {
    max-width: 100%;
  }
`,x=l().div.withConfig({componentId:"sc-32bbcefe-1"})`
  display: flex;
  align-items: center;
  gap: 14px;
`,m=l().div.withConfig({componentId:"sc-32bbcefe-2"})`
  display: flex;
  gap: 8px;

  & > .buttonText {
    cursor: pointer;
    transition: var(--transition);
  }

  & > .buttonText:hover {
    color: #ffffff;
  }
`,h=l().div.withConfig({componentId:"sc-32bbcefe-3"})`
  width: 100%;
  text-align: center;

  & img {
    max-width: 50%;
  }

  @media all and (max-width: ${"767px"}) {
    & img {
      max-width: 90%;
    }
  }
`,f=l().div.withConfig({componentId:"sc-32bbcefe-4"})`
  word-break: break-all;
`;a()}catch(e){a(e)}})},6990:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.d(t,{Z:()=>markdownToHtml});var s=r(3025),i=r(7740),n=e([s,i]);async function markdownToHtml(e){let t=await (0,s.remark)().use(i.default).process(e);return t.toString()}[s,i]=n.then?(await n)():n,a()}catch(e){a(e)}})},6353:(e,t,r)=>{r.d(t,{Z:()=>sanitizeHtml});let a=require("dompurify");var s=r.n(a);let i=require("jsdom");function sanitizeHtml(e){return s()(new i.JSDOM("<!DOCTYPE html>").window).sanitize(e)}},6540:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>Post,getServerSideProps:()=>u});var s=r(997),i=r(2441),n=r(510),o=r(6990),l=r(6353),d=r(5894),c=e([i,n,o,d]);function Post({pageProps:e}){let{user:t,gsspProps:{postIdx:r,postData:a}}=e;return s.jsx(d.Z,{postIdx:r,postData:a,user:t})}[i,n,o,d]=c.then?(await c)():c;let u=(0,n.r)(async(e,t)=>{let{postIdx:r}=e.params;if(!r)return{redirect:"/404"};let a=await (0,i.xl)({postIdx:r,user:t});if(a.status)switch(a.status){case 404:case 401:return{redirect:`/${a.status}`};default:return{redirect:"/404"}}let s=await (0,o.Z)(a.content);return a.html=(0,l.Z)(s),{postIdx:r,postData:a}});a()}catch(e){a(e)}})},6807:e=>{e.exports=require("@redux-devtools/extension")},5648:e=>{e.exports=require("next-redux-wrapper")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},6022:e=>{e.exports=require("react-redux")},997:e=>{e.exports=require("react/jsx-runtime")},6695:e=>{e.exports=require("redux")},8417:e=>{e.exports=require("redux-thunk")},4579:e=>{e.exports=require("remove-markdown")},7518:e=>{e.exports=require("styled-components")},9648:e=>{e.exports=import("axios")},3025:e=>{e.exports=import("remark")},7740:e=>{e.exports=import("remark-html")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[761,359,859,450,597,3,510,441],()=>__webpack_exec__(8286));module.exports=r})();