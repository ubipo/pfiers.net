(self.webpackChunk=self.webpackChunk||[]).push([[605],{4227:(e,t,r)=>{e.exports=r(60592)},1820:(e,t,r)=>{r(23335);var a=r(39081);e.exports=a.parseInt},76746:(e,t,r)=>{var a=r(42868),o=r(40774).trim,n=r(33781),s=a.parseInt,l=/^[+-]?0[Xx]/,d=8!==s(n+"08")||22!==s(n+"0x16");e.exports=d?function(e,t){var r=o(String(e));return s(r,t>>>0||(l.test(r)?16:10))}:s},40774:(e,t,r)=>{var a=r(83604),o="["+r(33781)+"]",n=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$"),l=function(e){return function(t){var r=String(a(t));return 1&e&&(r=r.replace(n,"")),2&e&&(r=r.replace(s,"")),r}};e.exports={start:l(1),end:l(2),trim:l(3)}},33781:e=>{e.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},23335:(e,t,r)=>{var a=r(70390),o=r(76746);a({global:!0,forced:parseInt!=o},{parseInt:o})},60592:(e,t,r)=>{var a=r(1820);e.exports=a},12793:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var a=r(93476),o=r.n(a)()((function(e){return e[1]}));o.push([e.id,"figure[data-v-33ef8873]{max-width:100%;margin:0}img[data-v-33ef8873]{max-width:100%}object[data-v-33ef8873]{background-color:#639}",""]);const n=o},82438:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var a=r(93476),o=r.n(a)()((function(e){return e[1]}));o.push([e.id,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400&display=swap);"]),o.push([e.id,"figure[data-v-38342141]{max-width:100%;margin:0}img[data-v-38342141]{max-width:100%}.head-link[data-v-38342141]{text-decoration:none}.project__header .project__header__title[data-v-38342141]{font-size:2rem;margin-bottom:.5em;margin-top:.2em}.tech-list--float[data-v-38342141]{display:none}.tech-list--under[data-v-38342141]{display:block}@media only screen and (min-width: 650px){.tech-list--float[data-v-38342141]{display:block;float:right}.tech-list--under[data-v-38342141]{display:none}}",""]);const n=o},59725:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>n});var a=r(93476),o=r.n(a)()((function(e){return e[1]}));o.push([e.id,"figure[data-v-26e0ece5]{max-width:100%;margin:0}img[data-v-26e0ece5]{max-width:100%}object[data-v-26e0ece5]{background-color:#639}.project__title[data-v-26e0ece5]{font-size:2rem;margin-bottom:.5em}",""]);const n=o},11715:(e,t,r)=>{"use strict";r.d(t,{Z:()=>f});var a=r(92117),o=(0,a.HX)("data-v-38342141");(0,a.dD)("data-v-38342141");var n={class:"project__header"},s={key:0},l=(0,a.Uk)(" Read more ");(0,a.Cn)();var d=o(((e,t,r,d,c,i)=>{var p=(0,a.up)("ProjectTechnologyList"),u=(0,a.up)("router-link"),v=(0,a.up)("MarkdownFromDef"),f=(0,a.up)("ResponsiveImage");return(0,a.wg)(),(0,a.j4)("div",null,[(0,a.Wm)("div",n,[(0,a.Wm)(p,{class:"tech-list tech-list--float",block:!0,project:e.p.project},null,8,["project"]),(0,a.Wm)(u,{class:"head-link",to:"/projects/".concat(e.p.project.urlSafeName.value)},{default:o((()=>[(0,a.Wm)("h3",{id:e.p.project.urlSafeName.value,class:"project__header__title"},(0,a.zw)(e.p.project.name),9,["id"])])),_:1},8,["to"]),(0,a.Wm)(p,{class:"tech-list tech-list--under",project:e.p.project},null,8,["project"]),null===e.p.project.short?((0,a.wg)(),(0,a.j4)("p",s,(0,a.zw)(e.p.project.description),1)):((0,a.wg)(),(0,a.j4)(v,{key:1,definition:e.p.project.short},null,8,["definition"]))]),null!==e.p.project.long?((0,a.wg)(),(0,a.j4)(u,{key:0,to:"/projects/".concat(e.p.project.urlSafeName.value),class:"button"},{default:o((()=>[l])),_:1},8,["to"])):(0,a.ry)("v-if",!0),e.p.project.siteUrl?((0,a.wg)(),(0,a.j4)("a",{key:1,href:e.p.project.siteUrl,class:"button"},"Project site",8,["href"])):(0,a.ry)("v-if",!0),e.p.project.gitUrl?((0,a.wg)(),(0,a.j4)("a",{key:2,href:e.p.project.gitUrl,class:"button"},"Git repository",8,["href"])):(0,a.ry)("v-if",!0),null!==e.p.project.imgUrl?((0,a.wg)(),(0,a.j4)(f,{key:3,url:e.p.project.imgUrl},null,8,["url"])):(0,a.ry)("v-if",!0)])})),c=r(22233),i=r(24288),p=r(12765),u=r(87236);const v=(0,a.aZ)({props:{project:{type:Object,required:!0}},setup:(e,t)=>({p:e,resolveCupUrl:i.X}),components:{ProjectTechnologyList:p.Z,MarkdownFromDef:c.Z,ResponsiveImage:u.Z}});r(48973),v.render=d,v.__scopeId="data-v-38342141";const f=v},35866:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>x});var a=r(92117),o=(0,a.HX)("data-v-26e0ece5"),n=o(((e,t,r,n,s,l)=>{var d=(0,a.up)("ProjectShort"),c=(0,a.up)("MasonryGrid");return(0,a.wg)(),(0,a.j4)(c,{items:e.masonryItems},{default:o((t=>[(0,a.Wm)(d,{project:t.data,onReady:r=>e.onReady(t.data)},null,8,["project","onReady"])])),_:1},8,["items"])})),s=r(32633),l=r.n(s),d=r(11715),c=(0,a.HX)("data-v-33ef8873");(0,a.dD)("data-v-33ef8873");var i={class:"card-grid",ref:"gridRef"},p={class:"card__content"};(0,a.Cn)();var u=c(((e,t,r,o,n,s)=>((0,a.wg)(),(0,a.j4)("div",i,[((0,a.wg)(!0),(0,a.j4)(a.HY,null,(0,a.Ko)(e.props.items,(t=>((0,a.wg)(),(0,a.j4)("article",{class:"card",key:t.key},[(0,a.Wm)("div",p,[(0,a.WI)(e.$slots,"default",{data:t.data},void 0,!0)])])))),128))],512)))),v=r(6089),f=r.n(v),m=r(4227),g=r.n(m),j=r(19837),h=r.n(j),y=r(52019);const w=(0,a.aZ)({props:{items:{type:Object,required:!0}},setup(e,t){var r=(0,a.iH)(null);return(0,a.bv)((()=>{var e=r.value;if(null===e)throw new Error("Card grid not mounted");!function(e){var t=f()(e.getElementsByClassName("card")),r=g()(window.getComputedStyle(e).getPropertyValue("grid-auto-rows")),a=g()(window.getComputedStyle(e).getPropertyValue("grid-row-gap")),o=e=>{var t=e.getElementsByClassName("card__content")[0];if(null==t)throw new y.P("Illegal layout; no content within card");var o=t.getBoundingClientRect().height,n=Math.ceil((o+a)/(r+a))+1;e.style.gridRowEnd="span ".concat(n)},n=()=>h()(t).call(t,o);for(var s of f()(e.getElementsByTagName("img")))s.addEventListener("load",(()=>n()));window.addEventListener("resize",(()=>n())),n()}(e)})),{props:e,gridRef:r}}});r(97705),w.render=u,w.__scopeId="data-v-33ef8873";const _=w,k=(0,a.aZ)({props:{projects:{type:Object,required:!0}},setup:(e,t)=>({masonryItems:(0,a.Fl)((()=>{var t;return l()(t=e.projects).call(t,(e=>({key:e.urlSafeName.value,data:e})))})),onReady:e=>console.log("Ready: ".concat(e.name))}),components:{ProjectShort:d.Z,MasonryGrid:_}});r(15368),k.render=n,k.__scopeId="data-v-26e0ece5";const x=k},97705:(e,t,r)=>{var a=r(12793);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),(0,r(49441).Z)("183e4d1a",a,!1,{})},48973:(e,t,r)=>{var a=r(82438);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),(0,r(49441).Z)("586f9d85",a,!1,{})},15368:(e,t,r)=>{var a=r(59725);a.__esModule&&(a=a.default),"string"==typeof a&&(a=[[e.id,a,""]]),a.locals&&(e.exports=a.locals),(0,r(49441).Z)("21d37858",a,!1,{})}}]);