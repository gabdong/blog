(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(t,e,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(9760)}])},9760:function(t,e,n){"use strict";n.r(e),n.d(e,{__N_SSP:function(){return m},default:function(){return Index}});var c=n(5059),a=n(8598),i=n(9518),r=n(4376),l=n(2691),o=n.n(l);let tabFn=t=>{let{...e}=t,n=e.e.currentTarget,c=n.closest(".tab"),a=c.querySelector(".tabBorder");a.style.left="".concat(100/e.tabCnt*e.index,"%")};var Tab_TabButton=function(t){let{name:e,index:n,tabCnt:c,path:i,location:r}=t;return(0,a.jsx)(o(),{className:r===i?"tabBtn active":"tabBtn",onClick:t=>tabFn({e:t,tabCnt:c,index:n}),href:i,shallow:!0,children:e})};function _templateObject(){let t=(0,c._)(["\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n"]);return _templateObject=function(){return t},t}function _templateObject1(){let t=(0,c._)(["\n  display: flex;\n  flex-direction: column;\n\n  position: relative;\n\n  & .tabBtn {\n    flex: 1;\n\n    padding: 0 0 8px 0;\n    text-align: center;\n    cursor: pointer;\n    transition: var(--transition);\n  }\n"]);return _templateObject1=function(){return t},t}function _templateObject2(){let t=(0,c._)(["\n  display: flex;\n  justify-content: center;\n"]);return _templateObject2=function(){return t},t}function _templateObject3(){let t=(0,c._)(["\n  border: 1px solid var(--primary-color);\n  position: relative;\n  transition: var(--transition);\n"]);return _templateObject3=function(){return t},t}function _templateObject4(){let t=(0,c._)([""]);return _templateObject4=function(){return t},t}function Tab(t){let{tabBtnList:e={},tabItemList:n={},tabCnt:c}=t,i=(0,r.useRouter)(),{asPath:l}=i,o=i.query.tabItem||Object.keys(n)[0],f=Object.keys(n).indexOf(o);return(0,a.jsxs)(s,{tabBtnCnt:Object.keys(e).length,className:"tab",children:[(0,a.jsxs)(u,{className:"tabBtnWrap",children:[(0,a.jsx)(d,{children:Object.entries(e).map((t,e)=>{let[n,i]=t,{label:r,path:o}=i;return(0,a.jsx)(Tab_TabButton,{name:r,index:e,tabCnt:c,path:o,location:"".concat(l)},n)})}),(0,a.jsx)(p,{className:"tabBorder",style:{width:"".concat(100/c,"%"),left:"".concat(100/c*f,"%")}})]}),(0,a.jsx)(b,{className:"tabItemWrap",children:n[o]()})]})}let s=i.ZP.div.withConfig({componentId:"sc-d1dd5c8c-0"})(_templateObject()),u=i.ZP.div.withConfig({componentId:"sc-d1dd5c8c-1"})(_templateObject1()),d=i.ZP.div.withConfig({componentId:"sc-d1dd5c8c-2"})(_templateObject2()),p=i.ZP.div.withConfig({componentId:"sc-d1dd5c8c-3"})(_templateObject3()),b=i.ZP.section.withConfig({componentId:"sc-d1dd5c8c-4"})(_templateObject4());function Introduce(){return(0,a.jsx)("p",{className:"title",children:"안녕하세요 3년차 프론트엔드 개발자 김동환입니다."})}var f=n(8144);function pages_templateObject(){let t=(0,c._)(["\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n  gap: 20px;\n\n  min-width: 0;\n  max-width: 100%;\n"]);return pages_templateObject=function(){return t},t}var m=!0;function Index(t){let{}=t;return(0,a.jsx)(a.Fragment,{children:(0,a.jsx)(_,{children:(0,a.jsx)(Tab,{tabBtnList:{latestPostList:{label:"최근 게시물",path:"/?tabItem=latestPostList"},introduce:{label:"소개",path:"/?tabItem=introduce"}},tabItemList:{latestPostList:()=>(0,a.jsx)(f.Z,{page:1,limit:9,paginationUsing:!1}),introduce:()=>(0,a.jsx)(Introduce,{})},tabCnt:2})})})}let _=i.ZP.section.withConfig({componentId:"sc-88ecd2a1-0"})(pages_templateObject())}},function(t){t.O(0,[228,144,774,888,179],function(){return t(t.s=5557)}),_N_E=t.O()}]);