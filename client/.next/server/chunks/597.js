exports.id=597,exports.ids=[597],exports.modules={4500:(e,t,a)=>{"use strict";a.d(t,{Z:()=>Button});var r=a(997),n=a(7518),i=a.n(n);function Button({text:e,classname:t="",as:a="",style:n={},onClick:i}){return r.jsx(o,{className:`${t}`,as:a,style:n,onClick:i,children:r.jsx("span",{className:"buttonText",children:e})})}let o=i().button.withConfig({componentId:"sc-66cfbac0-0"})`
  padding: 8px 12px;
  background: var(--gray);
  color: #ffffff;
  border-radius: var(--border-radius);
  transition: var(--transition);
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--primary-color);
  }
`},9869:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>UserMenuWrap});var n=a(997),i=a(7518),o=a.n(i),s=a(6022),c=a(1163),d=a(6689),l=a(1664),p=a.n(l),u=a(3746),g=a(1938),h=e([u]);function UserMenuWrap({closeUserMenuWrapFn:e}){let t=(0,s.useDispatch)(),a=(0,c.useRouter)();return(0,d.useEffect)(()=>(window.addEventListener("click",e),()=>{window.removeEventListener("click",e)}),[]),(0,n.jsxs)(f,{id:"userMenuWrap",children:[n.jsx("li",{className:"menuWrapBtn normalText",onClick:e=>{(0,u.gy)(),t((0,g.TX)()),a.reload()},children:"Logout"}),n.jsx("li",{className:"menuWrapBtn mobileOnly normalText",children:n.jsx(p(),{href:"/postEditor/new",children:"새 글 작성"})})]})}u=(h.then?(await h)():h)[0];let f=o().ul.withConfig({componentId:"sc-a4bd4a4f-0"})`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: var(--box-padding);
  background: var(--dark-l);
  border-radius: var(--border-radius);
  position: absolute;
  right: 0;
  top: calc(100% + 8px);

  & > li {
    white-space: nowrap;
    cursor: pointer;
    transition: var(--transition);
  }

  & > li:hover {
    color: var(--primary-color);
  }

  @media all and (max-width: 767px) {
    top: calc(100% + 10px);
  }
`;r()}catch(e){r(e)}})},9870:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>Header});var n=a(997),i=a(6689),o=a(7518),s=a.n(o),c=a(6893),d=a(8193),l=a(1664),p=a.n(l),u=a(1410),g=a(533),h=a(9869),f=a(2724),x=e([g,h]);[g,h]=x.then?(await x)():x;let navOpen=()=>{let e=document.getElementById("nav"),t=document.getElementById("navBackground");e.classList.add("active"),t.classList.add("active")};function Header(e){let{pageProps:{user:t},isNoNav:a}=e,[r,o]=(0,i.useState)(!1),[s,c]=(0,i.useState)(!1),loginModalHandler=e=>{o(e=>!e)};return(0,i.useEffect)(()=>{let e=document.getElementById("header");window.addEventListener("scroll",()=>{let{scrollY:t}=window;t>0?e.classList.add("active"):e.classList.remove("active")},{passive:!0})},[]),(0,n.jsxs)(m,{id:"header",children:[(0,n.jsxs)(v,{id:"headerInner",children:[!a&&n.jsx(y,{className:"mobileOnly",onClick:navOpen}),n.jsx(p(),{href:"/?tabItem=latestPostList",children:n.jsx(b,{id:"logo",children:"<Gabdong />"})}),(0,n.jsxs)(w,{children:[t?.isLogin&&n.jsx(u.Z,{classname:"pcOnly",text:"새 글 작성",href:"/postEditor/new"}),(0,n.jsxs)(k,{className:(t?.isLogin," headerUserBtnWrap"),onClick:t?.isLogin?e=>{c(e=>!e)}:loginModalHandler,children:[t?.isLogin?`${t?.name} 님`:"Login",t?.isLogin&&n.jsx(j,{})]}),t?.isLogin&&s&&n.jsx(h.Z,{closeUserMenuWrapFn:e=>{(!e.target.closest(".headerUserBtnWrap")||e.target.classList.contains(".menuWrapBtn")||e.target.closest(".menuWrapBtn"))&&c(!1)}})]})]}),n.jsx(f.Z,{modalView:r,component:n.jsx(g.Z,{modalHandler:loginModalHandler})})]})}let m=s().header.withConfig({componentId:"sc-5f8ca373-0"})`
  width: 100%;
  height: 80px;
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;
  transition: var(--transition);

  &.active {
    height: 60px;
    backdrop-filter: blur(5px);
  }

  @media all and (max-width: ${"767px"}) {
    height: 56px;

    &.active {
      height: 56px;
    }
  }
`,v=s().div.withConfig({componentId:"sc-5f8ca373-1"})`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;
  position: relative;
`,y=s()(c.cur).withConfig({componentId:"sc-5f8ca373-2"})`
  font-size: 20px;

  color: var(--gray-l);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }
`,b=s().h1.withConfig({componentId:"sc-5f8ca373-3"})`
  font-family: "Ubuntu-Regular";
  font-size: 21px;
  letter-spacing: 0.15px;
  color: var(--primary-color);
  cursor: pointer;

  @media all and (max-width: ${"767px"}) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,w=s().div.withConfig({componentId:"sc-5f8ca373-4"})`
  display: flex;
  align-items: center;
  gap: 12px;

  position: relative;
`,k=s().button.withConfig({componentId:"sc-5f8ca373-5"})`
  display: flex;
  align-items: center;

  font-size: 16px;
  color: var(--gray-l);
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }
`,j=s()(d.i0B).withConfig({componentId:"sc-5f8ca373-6"})`
  margin-left: 4px;
  font-size: 14px;
`;r()}catch(e){r(e)}})},5352:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var r=a(997),n=a(6689),i=a(7518),o=a.n(i);let s=(0,n.forwardRef)(({type:e="text",name:t,placeholder:a,defaultValue:n,style:i={},onChange:o,onKeyUp:s,onFocus:d,border:l="all",id:p,accept:u},g)=>r.jsx(c,{type:e,name:t,className:"inputText",placeholder:a,style:i,value:n,onChange:o,onKeyUp:s,onFocus:d,autoComplete:"off",ref:g,border:l,id:p,accept:u})),c=o().input.withConfig({componentId:"sc-58975b80-0"})`
  padding: 8px 12px;
  ${e=>"all"==e.border?"border: 1px solid #ddd;":`border-${e.border} 1px solid #ddd;`}
  ${e=>"all"==e.border?"border-radius: var(--border-radius);":""}
  cursor: pointer;
  transition: var(--transition);

  &:active,
  &:focus,
  &:hover {
    ${e=>"all"==e.border?"border: 1px solid var(--primary-color);":`border-${e.border} : 1px solid var(--primary-color);`}
  }
`,d=s},1410:(e,t,a)=>{"use strict";a.d(t,{Z:()=>LinkButton});var r=a(997),n=a(7518),i=a.n(n),o=a(1664),s=a.n(o);function LinkButton({text:e,classname:t="",href:a}){return r.jsx(c,{className:`${t} buttonText`,href:a,children:e})}let c=i()(s()).withConfig({componentId:"sc-98bb9d9a-0"})`
  padding: 8px 12px;
  background-color: var(--gray);
  color: #ffffff;
  border-radius: var(--border-radius);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    background-color: var(--primary-color);
  }
`},533:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>LoginModal});var n=a(997),i=a(7518),o=a.n(i),s=a(6689),c=a(1163),d=a(4304),l=a(914),p=a(5352),u=a(4500),g=e([d]);function LoginModal({modalHandler:e}){let t=(0,c.useRouter)(),a=(0,s.useRef)(null),[r,i]=(0,l.Z)(""),[o,g]=(0,l.Z)(""),loginFn=async a=>{a.preventDefault();let n=a.currentTarget;if(n.disabled=!0,!r)return alert("아이디를 입력해주세요.");if(!o)return alert("비밀번호를 입력해주세요.");try{await d.Z.post("/apis/users/login",{id:r,password:o}),t.reload(),e(a)}catch(e){console.error(e)}finally{n.disabled=!1}};return(0,s.useEffect)(()=>{a.current.focus()},[]),(0,n.jsxs)(h,{children:[n.jsx(f,{onClick:e}),n.jsx(x,{children:(0,n.jsxs)(m,{children:[n.jsx("h2",{className:"headline",children:"Login"}),n.jsx(p.Z,{placeholder:"Username",defaultValue:r,onChange:i,style:{width:"100%",color:"var(--gray-l)"},onKeyUp:e=>("Enter"===e.key)??loginFn(),ref:a,border:"bottom"}),n.jsx(p.Z,{placeholder:"Password",type:"password",defaultValue:o,onChange:g,style:{width:"100%",color:"var(--gray-l)"},onKeyUp:e=>("Enter"===e.key)??loginFn(),border:"bottom"}),n.jsx(u.Z,{text:"Login",onClick:loginFn,style:{padding:"12px",marginTop:"10px",background:"var(--primary-color)",color:"var(--primary-text-color)"}})]})})]})}d=(g.then?(await g)():g)[0];let h=o().div.withConfig({componentId:"sc-7da67a26-0"})`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
`,f=o().div.withConfig({componentId:"sc-7da67a26-1"})`
  width: 100%;
  height: 100%;
  backdrop-filter: blur(5px);
  position: fixed;
  left: 0;
  top: 0;
`,x=o().div.withConfig({componentId:"sc-7da67a26-2"})`
  width: 400px;
  height: 280px;
  max-width: 90%;
  padding: 0 20px;
  border-radius: var(--border-radius);
  background: var(--dark);
  position: relative;
  z-index: 1;
`,m=o().form.withConfig({componentId:"sc-7da67a26-3"})`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  width: 100%;
  height: 100%;
  color: var(--gray-l);

  h2 {
    align-self: flex-start;
    margin-bottom: 20px;
  }
`;r()}catch(e){r(e)}})},2724:(e,t,a)=>{"use strict";a.d(t,{Z:()=>Modal});var r=a(997);function Modal({component:e,modalView:t}){return r.jsx(r.Fragment,{})}a(6405)},3764:(e,t,a)=>{"use strict";a.d(t,{Z:()=>NavButton});var r=a(997),n=a(7518),i=a.n(n),o=a(1664),s=a.n(o),c=a(1163);function NavButton({text:e,path:t,active:a,subText:n,subTextStyle:i}){let o=(0,c.useRouter)();return r.jsx(r.Fragment,{children:(0,r.jsxs)(d,{className:a||o.asPath===t?"active":"",href:t,children:[r.jsx("span",{children:e}),n?r.jsx("span",{style:i,children:n}):null]})})}let d=i()(s()).withConfig({componentId:"sc-1b53179f-0"})`
  display: flex;
  align-items: center;

  font-family: "SUIT-Regular";
  font-size: 14px;
  letter-spacing: 0.15px;
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: #ffffff;
  }

  &.active {
    color: var(--primary-color);
    font-weight: 700;
  }
`},6514:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>Nav});var n=a(997),i=a(7518),o=a.n(i),s=a(9352),c=a(5635),d=a(3764),l=e([c]);c=(l.then?(await l)():l)[0];let navClose=()=>{let e=document.getElementById("nav"),t=document.getElementById("navBackground");e.classList.remove("active"),t.classList.remove("active")};function Nav({pageProps:e}){let{user:{isLogin:t}}=e,{tagData:{tagLoading:a,activeTagIdx:r,tagList:i,privatePostCnt:o,totalPostCnt:s}}=(0,c.Z)();return n.jsx(n.Fragment,{children:a?n.jsx(p,{id:"nav"}):(0,n.jsxs)(n.Fragment,{children:[n.jsx(u,{id:"navBackground",className:"mobileOnly",onClick:navClose}),(0,n.jsxs)(p,{id:"nav",children:[n.jsx(g,{className:"mobileOnly",onClick:navClose}),n.jsx("h2",{className:"subTitle",style:{borderBottom:"1px solid #dddddd",paddingBottom:"8px"},children:"태그 목록"}),n.jsx(d.Z,{path:"/tag/total?page=1",text:"Total",active:"total"===r?"active":"",subText:`(${s})`,subTextStyle:{marginLeft:"10px",opacity:.6,fontSize:"14px"}}),Object.entries(i).map(e=>{let t="total"!==e[0]?Number(e[0]):e[0],{auth:a,name:i,postCnt:o}=e[1],s=Number(r)===t||r===i?"active":"";return n.jsx(d.Z,{text:`${i}`,path:`/tag/${t}?page=1`,active:s,subText:`(${o})`,subTextStyle:{marginLeft:"10px",opacity:.6,fontSize:"14px"}},t)}),t?(0,n.jsxs)(n.Fragment,{children:[n.jsx(d.Z,{path:"/tag/private?page=1",text:"Private",subText:`(${o})`,subTextStyle:{marginLeft:"10px",opacity:.6,fontSize:"14px"}}),n.jsx(d.Z,{path:"/settings",text:"Settings"})]}):null]})]})})}let p=o().nav.withConfig({componentId:"sc-63a6c4f9-0"})`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 140px;

  @media all and (max-width: ${"767px"}) {
    width: 80%;
    height: 100%;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
    overflow-y: auto;
    position: fixed;
    left: -80%;
    top: 0;
    z-index: 32;
    transition: var(--transition);

    &::-webkit-scrollbar {
      width: 3px;
      background: var(--dark-l);
      border-radius: var(--border-radius);
    }
    &::-webkit-scrollbar-thumb {
      background: var(--primary-color);
      border-radius: var(--border-radius);
    }

    &.active {
      left: 0;
    }
  }
`,u=o().div.withConfig({componentId:"sc-63a6c4f9-1"})`
  @media all and (max-width: ${"767px"}) {
    display: none;

    &.active {
      display: block;

      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 31;
    }
  }
`,g=o()(s.tgW).withConfig({componentId:"sc-63a6c4f9-2"})`
  font-size: 32px;
  cursor: pointer;
`;r()}catch(e){r(e)}})},2616:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{CN:()=>getSearchTag,kV:()=>getTagList});var n=a(4304),i=e([n]);async function getTagList(){try{let e=await n.Z.get("/apis/tags/");return e}catch(e){console.error(e.response.data.msg)}}async function getSearchTag(e,t=[]){if(e)try{let a=await n.Z.get("/apis/tags/searchTag",{params:{searchWord:e,selectedTags:t},data:{checkAuth:!0}});return a.data.searchTagData}catch(e){}}n=(i.then?(await i)():i)[0],r()}catch(e){r(e)}})},3746:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Xx:()=>checkLogin,a_:()=>checkToken,gy:()=>removeToken}),a(6689),a(6022);var n=a(4304);a(1938);var i=e([n]);function removeToken(){n.Z.delete("/apis/tokens"),n.Z.defaults.headers.common.Authorization=""}async function checkToken(e=!1,t=""){t&&(n.Z.defaults.headers.cookie=t);try{let t=e?`${process.env.REACT_APP_SERVER_URL}/apis/tokens/check-token`:"/apis/tokens/check-token",a=await n.Z.get(t,{data:{isCheckToken:!0}});return a}catch(e){e.response.status,console.error(e.response?.data.msg)}}n=(i.then?(await i)():i)[0];let checkLogin=async(e=!1,t="")=>{let a=null;try{let r=await checkToken(e,t);if(r){let e=r.data.newAccessToken;(a={...r.data.user}).accessToken=e,a.isLogin=!0}return a}catch(e){console.error(e.message)}};r()}catch(e){r(e)}})},914:(e,t,a)=>{"use strict";a.d(t,{Z:()=>useInput});var r=a(6689);function useInput(e){let[t,a]=(0,r.useState)(e);return[t,e=>{a(e.target.value)},a]}},5635:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>useTagData});var n=a(6689),i=a(1163),o=a(2616),s=e([o]);function useTagData(){let e=(0,i.useRouter)(),{query:t}=e,[a,r]=(0,n.useState)({tagList:{},tagLoading:!0});return(0,n.useEffect)(()=>{(async()=>{let e=await (0,o.kV)(),{data:a}=e;r({tagList:a.tagList,totalPostCnt:a.totalPostCnt,privatePostCnt:a.privatePostCnt,tagLoading:!1,activeTagIdx:t.tagIdx})})()},[t]),{tagData:a}}o=(s.then?(await s)():s)[0],r()}catch(e){r(e)}})},4304:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.d(t,{Z:()=>c});var n=a(9648),i=a(3746),o=e([n,i]);[n,i]=o.then?(await o)():o;let s=n.default.create({timeout:3e3,withCredentials:!0});s.interceptors.request.use(async e=>{if(!e.data)return e;let t=e.data instanceof FormData,a=t?"true"===e.data.get("checkAuth"):e.data.checkAuth,r=e.data.isCheckToken||!1,n=!t&&e.data.ssr;if(!0===a&&!1===r){let a=await (0,i.a_)(n),{newAccessToken:r}=a.data,{user:o}=a.data;t?e.data.append("user",JSON.stringify(o)):"get"==e.method?e.params.user=o:e.data.user=o,r&&(s.defaults.headers.common.Authorization=`Bearer ${r}`)}return e},e=>Promise.reject(e)),s.interceptors.response.use(e=>e,e=>Promise.reject(e));let c=s;r()}catch(e){r(e)}})},9597:(e,t,a)=>{"use strict";a.a(e,async(e,r)=>{try{a.r(t),a.d(t,{default:()=>App});var n=a(997),i=a(968),o=a.n(i),s=a(6022),c=a(7518),d=a.n(c),l=a(9870),p=a(2905),u=a(6514);a(6764);var g=e([l,u]);function App({Component:e,...t}){let{store:a,props:r}=p.Z.useWrappedStore(t),i=["/401","/404","/_error"],c=t.router.route,d=i.includes(c),g=i.includes(c)||["/postEditor/[type]"].includes(c);return console.log("---------------------------------App rendering---------------------------------"),(0,n.jsxs)(s.Provider,{store:a,children:[n.jsx(o(),{children:n.jsx("title",{children:"Gabdong"})}),(0,n.jsxs)(h,{children:[!d&&n.jsx(l.Z,{...r,isNoNav:g}),(0,n.jsxs)(f,{id:"main",children:[!g&&n.jsx(u.Z,{...r}),n.jsx(e,{...r})]}),n.jsx(x,{id:"modal"})]})]})}[l,u]=g.then?(await g)():g;let h=d().div.withConfig({componentId:"sc-9c5a54a0-0"})`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;

  width: 1280px;
  max-width: 90%;
  margin: 0 auto;
  user-select: none;

  @media all and (max-width: ${"767px"}) {
    gap: 20px;
  }
`,f=d().main.withConfig({componentId:"sc-9c5a54a0-1"})`
  display: flex;
  gap: 40px;

  width: 100%;
  padding-bottom: 60px;
`,x=d().aside.withConfig({componentId:"sc-9c5a54a0-2"})`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;
`;r()}catch(e){r(e)}})},2905:(e,t,a)=>{"use strict";a.d(t,{Z:()=>d});var r=a(6695),n=(a(6807),a(8417)),i=a.n(n),o=a(5648),s=a(1938);function rootReducer(e,t){return t.type===o.HYDRATE?t.payload:(0,r.combineReducers)({user:s.ZP})(e,t)}let c=(0,o.createWrapper)(()=>{let e=(0,r.compose)((0,r.applyMiddleware)(i())),t=(0,r.legacy_createStore)(rootReducer,e);return t},{debug:!1}),d=c},1938:(e,t,a)=>{"use strict";a.d(t,{TX:()=>logoutUser,ZP:()=>__WEBPACK_DEFAULT_EXPORT__,pH:()=>loginUser});let r={idx:0,id:"",name:"",phone:"",email:"",isLogin:!1},n="user/LOGIN_USER",i="user/LOGOUT_USER",loginUser=e=>(e.isLogin=!0,{type:n,payload:e}),logoutUser=()=>({type:i,payload:{...r}}),__WEBPACK_DEFAULT_EXPORT__=function(e=r,t){switch(t.type){case n:case i:return{...e,...t.payload};default:return e}}},6764:()=>{}};