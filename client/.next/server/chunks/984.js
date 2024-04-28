"use strict";exports.id=984,exports.ids=[984],exports.modules={1709:(e,t,a)=>{a.d(t,{Z:()=>h});var i=a(997),n=a(7518),r=a.n(n),s=a(6689),l=a.n(s),o=a(1664),d=a.n(o),c=a(5434),p=a(1163);let x=r().div.withConfig({componentId:"sc-f4559b2f-0"})`
  display: flex;
  justify-content: center;
  gap: 8px;

  padding: 20px 0;

  & > a {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
    padding: 4px;
    border-radius: var(--border-radius);
    background: var(--gray);
    cursor: pointer;
  }

  & > a.active {
    background: var(--primary-color);
  }
`,h=l().memo(function({totalCnt:e,page:t,paginationCnt:a=10,path:n,limit:r=10}){let s=(0,p.useRouter)();if(e<=r)return null;let l=Math.floor(t/a)*a+1;t%a==0&&(l-=a);let o=Math.ceil(e/r),h=Math.ceil(e/10)>a?a:Math.ceil(e/10);return l+h>o&&(h=o-l+1),(0,i.jsxs)(x,{children:[1!==t?i.jsx(d(),{href:`${n}?page=1`,children:i.jsx(c.b2E,{})}):null,t>1?i.jsx(d(),{href:`${n}?page=${t-a<1?1:t-a}`,children:i.jsx(c.D68,{})}):null,"//* 페이지",Array.from({length:h}).map((e,t)=>{let a=l+t;return i.jsx(d(),{className:()=>{let e=Number(s.query.page),t="normalText";return e===a&&(t+=" active"),t},href:`${n}?page=${a}`,children:a},a)}),t<o?i.jsx(d(),{href:`${n}?page=${t+a>o?o:t+a}`,children:i.jsx(c.sOJ,{})}):null,t!==o?i.jsx(d(),{href:`${n}?page=${o}`,children:i.jsx(c.cHm,{})}):null]})})},3984:(e,t,a)=>{a.a(e,async(e,i)=>{try{a.d(t,{Z:()=>PostList});var n=a(997),r=a(6689),s=a(7518),l=a.n(s),o=a(4579),d=a.n(o),c=a(1664),p=a.n(c),x=a(5434),h=a(2441),u=a(1709),g=e([h]);function PostList({tagIdx:e="total",page:t=1,limit:a=9,paginationUsing:i=!0}){let[s,l]=(0,r.useState)(!0),[o,c]=(0,r.useState)([]),[p,g]=(0,r.useState)(0);return(0,r.useEffect)(()=>{!async function(){let n=await (0,h.UI)(e,t,a,i),r=n?.postList||[],s=n?.totalCnt||0;c(r),g(s),l(!1)}()},[e,t]),n.jsx(n.Fragment,{children:s?null:(0,n.jsxs)(n.Fragment,{children:[n.jsx(f,{children:o.map(t=>{let{idx:a,subject:i,content:r,thumbnail:s,thumbnailAlt:l,datetime:o}=t,c=new Date(o).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),p=d()(r.replace(/<\/?[^>]+(>|$)/g,""));return n.jsx(m,{className:"postListLi",children:(0,n.jsxs)(w,{href:`/post/${a}?tagIdx=${e}`,children:[s?n.jsx(j,{style:{background:`url(${s})`,backgroundSize:"cover",backgroundPosition:"center"},title:l}):n.jsx(j,{children:n.jsx(x.e0s,{})}),(0,n.jsxs)(v,{className:"postInfoWrap",children:[(0,n.jsxs)("div",{children:[n.jsx("p",{className:"subTitle postSubject",children:i}),n.jsx("p",{className:"caption postContent",children:p})]}),n.jsx("p",{className:"caption date",children:c})]})]})},a)})}),i?n.jsx(u.Z,{totalCnt:p,page:t,paginationCnt:5,path:`/tag/${e}`,limit:9}):null]})})}h=(g.then?(await g)():g)[0];let f=l().ul.withConfig({componentId:"sc-2aa34016-0"})`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 20px;

  min-width: 0;
  max-width: 100%;
`,m=l().li.withConfig({componentId:"sc-2aa34016-1"})`
  width: calc(100% / 3 - 14px);
  border-radius: var(--border-radius);
  background: var(--dark-l);
  transition: var(--transition);
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
  }

  @media all and (max-width: 1023px) {
    width: calc(50% - 10px);

    &:hover {
      transform: none;
    }
  }

  @media all and (max-width: 767px) {
    width: 100%;
    gap: 12px;
  }
`,w=l()(p()).withConfig({componentId:"sc-2aa34016-2"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,j=l().div.withConfig({componentId:"sc-2aa34016-3"})`
  padding-top: 52%;
  background: var(--dark-m);
  position: relative;

  & > svg {
    font-size: 38px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`,v=l().div.withConfig({componentId:"sc-2aa34016-4"})`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 14px;

  height: 100%;
  padding: 16px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 10px;

    height: 80px;
  }

  & > div .postSubject {
    max-width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div .postContent {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    word-break: break-all;
    overflow: hidden;
  }

  & > div .date {
    flex-shrink: 0;
  }

  @media all and (max-width: 479px) {
    & > div {
      height: 60px;
    }
  }
`;i()}catch(e){i(e)}})}};