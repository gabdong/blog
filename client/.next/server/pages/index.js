"use strict";(()=>{var e={};e.id=405,e.ids=[405,888,660],e.modules={1725:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{config:()=>m,default:()=>p,getServerSideProps:()=>b,getStaticPaths:()=>x,getStaticProps:()=>u,reportWebVitals:()=>g,routeModule:()=>_,unstable_getServerProps:()=>S,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>v,unstable_getStaticPaths:()=>f,unstable_getStaticProps:()=>h});var n=r(7093),i=r(5244),s=r(1323),o=r(4003),c=r(9597),l=r(7052),d=e([c,l]);[c,l]=d.then?(await d)():d;let p=(0,s.l)(l,"default"),u=(0,s.l)(l,"getStaticProps"),x=(0,s.l)(l,"getStaticPaths"),b=(0,s.l)(l,"getServerSideProps"),m=(0,s.l)(l,"config"),g=(0,s.l)(l,"reportWebVitals"),h=(0,s.l)(l,"unstable_getStaticProps"),f=(0,s.l)(l,"unstable_getStaticPaths"),v=(0,s.l)(l,"unstable_getStaticParams"),S=(0,s.l)(l,"unstable_getServerProps"),P=(0,s.l)(l,"unstable_getServerSideProps"),_=new n.PagesRouteModule({definition:{kind:i.x.PAGES,page:"/index",pathname:"/",bundlePath:"",filename:""},components:{App:c.default,Document:o.default},userland:l});a()}catch(e){a(e)}})},1813:(e,t,r)=>{r.d(t,{Z:()=>Introduce});var a=r(997);function Introduce(){return a.jsx("p",{className:"title",children:"안녕하세요 3년차 프론트엔드 개발자 김동환입니다."})}},9390:(e,t,r)=>{r.d(t,{Z:()=>Tab});var a=r(997),n=r(1163),i=r(7518),s=r.n(i),o=r(1664),c=r.n(o);let tabFn=({...e})=>{let t=e.e.currentTarget,r=t.closest(".tab"),a=r.querySelector(".tabBorder");a.style.left=`${100/e.tabCnt*e.index}%`},Tab_TabButton=function({name:e,index:t,tabCnt:r,path:n,location:i}){return a.jsx(c(),{className:i===n?"tabBtn active":"tabBtn",onClick:e=>tabFn({e,tabCnt:r,index:t}),href:n,shallow:!0,children:e})};function Tab({tabBtnList:e={},tabItemList:t={},tabCnt:r}){let i=(0,n.useRouter)(),{asPath:s}=i,o=i.query.tabItem||Object.keys(t)[0],c=Object.keys(t).indexOf(o);return(0,a.jsxs)(l,{tabBtnCnt:Object.keys(e).length,className:"tab",children:[(0,a.jsxs)(d,{className:"tabBtnWrap",children:[a.jsx(p,{children:Object.entries(e).map((e,t)=>{let[n,i]=e,{label:o,path:c}=i;return a.jsx(Tab_TabButton,{name:o,index:t,tabCnt:r,path:c,location:`${s}`},n)})}),a.jsx(u,{className:"tabBorder",style:{width:`${100/r}%`,left:`${100/r*c}%`}})]}),a.jsx(x,{className:"tabItemWrap",children:t[o]()})]})}let l=s().div.withConfig({componentId:"sc-d1dd5c8c-0"})`
  display: flex;
  flex-direction: column;
  gap: 24px;
`,d=s().div.withConfig({componentId:"sc-d1dd5c8c-1"})`
  display: flex;
  flex-direction: column;

  position: relative;

  & .tabBtn {
    flex: 1;

    padding: 0 0 8px 0;
    text-align: center;
    cursor: pointer;
    transition: var(--transition);
  }
`,p=s().div.withConfig({componentId:"sc-d1dd5c8c-2"})`
  display: flex;
  justify-content: center;
`,u=s().div.withConfig({componentId:"sc-d1dd5c8c-3"})`
  border: 1px solid var(--primary-color);
  position: relative;
  transition: var(--transition);
`,x=s().section.withConfig({componentId:"sc-d1dd5c8c-4"})``},7052:(e,t,r)=>{r.a(e,async(e,a)=>{try{r.r(t),r.d(t,{default:()=>Index,getServerSideProps:()=>u});var n=r(997),i=r(7518),s=r.n(i),o=r(510),c=r(9390),l=r(1813),d=r(3984),p=e([o,d]);function Index({}){return n.jsx(n.Fragment,{children:n.jsx(x,{children:n.jsx(c.Z,{tabBtnList:{latestPostList:{label:"최근 게시물",path:"/?tabItem=latestPostList"},introduce:{label:"소개",path:"/?tabItem=introduce"}},tabItemList:{latestPostList:()=>n.jsx(d.Z,{page:1,limit:9,paginationUsing:!1}),introduce:()=>n.jsx(l.Z,{})},tabCnt:2})})})}[o,d]=p.then?(await p)():p;let u=(0,o.r)(),x=s().section.withConfig({componentId:"sc-88ecd2a1-0"})`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 20px;

  min-width: 0;
  max-width: 100%;
`;a()}catch(e){a(e)}})},6807:e=>{e.exports=require("@redux-devtools/extension")},5648:e=>{e.exports=require("next-redux-wrapper")},2785:e=>{e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},968:e=>{e.exports=require("next/head")},6689:e=>{e.exports=require("react")},6405:e=>{e.exports=require("react-dom")},6022:e=>{e.exports=require("react-redux")},997:e=>{e.exports=require("react/jsx-runtime")},6695:e=>{e.exports=require("redux")},8417:e=>{e.exports=require("redux-thunk")},4579:e=>{e.exports=require("remove-markdown")},7518:e=>{e.exports=require("styled-components")},9648:e=>{e.exports=import("axios")},7147:e=>{e.exports=require("fs")},1017:e=>{e.exports=require("path")},2781:e=>{e.exports=require("stream")},9796:e=>{e.exports=require("zlib")}};var t=require("../webpack-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),r=t.X(0,[761,359,859,450,434,597,3,510,441,984],()=>__webpack_exec__(1725));module.exports=r})();