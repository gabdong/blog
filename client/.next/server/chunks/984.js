"use strict";exports.id=984,exports.ids=[984],exports.modules={1709:(e,t,i)=>{i.d(t,{Z:()=>h});var a=i(997),n=i(7518),r=i.n(n),s=i(6689),l=i.n(s),o=i(1664),d=i.n(o),c=i(5434),p=i(1163);let x=r().div.withConfig({componentId:"sc-d0851606-0"})`
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
`,h=l().memo(function({totalCnt:e,page:t,paginationCnt:i=10,path:n,limit:r=10}){let s=(0,p.useRouter)();if(e<=r)return null;let l=Math.floor(t/i)*i+1;t%i==0&&(l-=i);let o=Math.ceil(e/r),h=Math.ceil(e/10)>i?i:Math.ceil(e/10);return l+h>o&&(h=o-l+1),(0,a.jsxs)(x,{children:[1!==t?a.jsx(d(),{href:`${n}?page=1`,children:a.jsx(c.b2E,{})}):null,t>1?a.jsx(d(),{href:`${n}?page=${t-i<1?1:t-i}`,children:a.jsx(c.D68,{})}):null,"//* 페이지",Array.from({length:h}).map((e,t)=>{let i=l+t;return a.jsx(d(),{className:()=>{let e=Number(s.query.page),t="normalText";return e===i&&(t+=" active"),t},href:`${n}?page=${i}`,children:i},i)}),t<o?a.jsx(d(),{href:`${n}?page=${t+i>o?o:t+i}`,children:a.jsx(c.sOJ,{})}):null,t!==o?a.jsx(d(),{href:`${n}?page=${o}`,children:a.jsx(c.cHm,{})}):null]})})},3984:(e,t,i)=>{i.a(e,async(e,a)=>{try{i.d(t,{Z:()=>PostList});var n=i(997),r=i(6689),s=i(7518),l=i.n(s),o=i(4579),d=i.n(o),c=i(1664),p=i.n(c),x=i(5434),h=i(2441),u=i(1709),g=e([h]);function PostList({tagIdx:e="total",page:t=1,limit:i=9,paginationUsing:a=!0}){let[s,l]=(0,r.useState)(!0),[o,c]=(0,r.useState)([]),[p,g]=(0,r.useState)(0);return(0,r.useEffect)(()=>{!async function(){let n=await (0,h.UI)(e,t,i,a),r=n?.postList||[],s=n?.totalCnt||0;c(r),g(s),l(!1)}()},[e,t]),n.jsx(n.Fragment,{children:s?null:(0,n.jsxs)(n.Fragment,{children:[n.jsx(m,{children:o.map(t=>{let{idx:i,subject:a,content:r,thumbnail:s,thumbnailAlt:l,datetime:o}=t,c=new Date(o).toLocaleDateString("ko-KR",{year:"numeric",month:"2-digit",day:"2-digit"}),p=d()(r.replace(/<\/?[^>]+(>|$)/g,""));return n.jsx(f,{className:"postListLi",children:(0,n.jsxs)(w,{href:`/post/${i}?tagIdx=${e}`,children:[s?n.jsx(b,{style:{background:`url(${s})`,backgroundSize:"cover",backgroundPosition:"center"},title:l}):n.jsx(b,{children:n.jsx(x.e0s,{})}),(0,n.jsxs)(j,{className:"postInfoWrap",children:[(0,n.jsxs)("div",{children:[n.jsx("p",{className:"subTitle postSubject",children:a}),n.jsx("p",{className:"caption postContent",children:p})]}),n.jsx("p",{className:"caption date",children:c})]})]})},i)})}),a?n.jsx(u.Z,{totalCnt:p,page:t,paginationCnt:5,path:`/tag/${e}`,limit:9}):null]})})}h=(g.then?(await g)():g)[0];let m=l().ul.withConfig({componentId:"sc-33e114b5-0"})`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 20px;

  min-width: 0;
  max-width: 100%;
`,f=l().li.withConfig({componentId:"sc-33e114b5-1"})`
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
`,w=l()(p()).withConfig({componentId:"sc-33e114b5-2"})`
  display: flex;
  flex-direction: column;
  gap: 10px;
`,b=l().div.withConfig({componentId:"sc-33e114b5-3"})`
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
`,j=l().div.withConfig({componentId:"sc-33e114b5-4"})`
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
`;a()}catch(e){a(e)}})}};