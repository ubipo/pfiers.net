(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{607:function(e,t,n){"use strict";var a=n(5);const o={key:0},c={key:1};var r=n(131),i=n(43),s=n(66),l=n(128),d=n(59),u=n(615),p=n.n(u);function b(e,t,n){const a=(null===t?"":`title="${t}"`)+' class="link"';if(null==e)return`<a ${a}>${n}</a>`;const o=Object(i.a)(e),c=o.protocol,l=Object(d.a)(o);if(c===s.a.CONTENT){const e=new URL(l,r.a);return`<a href="${Object(d.d)(e,"/content"+e.pathname).href}" ${a}>${n}</a>`}return c===s.a.EXTERNAL?`<a href="${l}" target="_blank" ${a}>${n}</a>`:c===s.a.RELATIVE?`<router-link to="${l}" ${a}>${n}</router-link>`:`<a href="${o.href}" ${a}>${n}</a>`}const h=function(){const e=new p.a.Renderer;return e.link=b,e.image=(e,t,n)=>`<img ${null===e?"":`src="${Object(l.a)(Object(i.a)(e))}"`} title="${t}" alt="${n}">`,e}();var m,g=Object(a.i)({props:{markdown:{type:String,required:!0}},setup:(e,t)=>({html:Object(a.b)(()=>{return t=e.markdown,`<div>${p.a.parse(t,{renderer:h})}</div>`;var t})}),components:{DynamicVc:(m={},Object(a.i)({name:"DyanmicVc",props:{content:{type:String,required:!0}},components:m,setup:(e,t)=>()=>{const t=e.content||'<p class="not-available-text">No content</p>';return Object(a.g)({name:"DynamicVcContent",components:m,template:t})}}))}}),f=n(93),O=n.n(f),j=n(609),v={insert:"head",singleton:!1};O()(j.a,v),j.a.locals;g.render=function(e,t,n,o,c,r){const i=Object(a.A)("dynamic-vc");return Object(a.s)(),Object(a.d)(i,{class:"markdown",content:e.html},null,8,["content"])};var w=g,y=n(605),k=n(130);async function x(e){if(null!==e.text)return e.text;if(null!==e.cachedText)return e.cachedText;{if(null===e.url)throw Error("MarkdownDefinition doesn't have url defined");const t=await async function(e){const t=await Object(k.a)(e.href);if(!t.ok)throw new Error(`HTTP error fetching markdown from ${e.href}: ${t.statusText}`);return await t.text()}(e.url);return e.cachedText=t,t}}var $=Object(a.i)({props:{definition:{type:Object,required:!0}},setup(e,t){const n=Object(y.a)(async()=>{const n=e.definition;let a;try{a=await x(n)}catch(e){throw console.error(e),e}return t.emit("ready"),a});return Object(a.G)(()=>e.definition,()=>{n.perform()}),n.perform(),{markdownTask:n}},components:{Markdown:w}});$.render=function(e,t,n,r,i,s){const l=Object(a.A)("Markdown");return e.markdownTask.last.isRunning?(Object(a.s)(),Object(a.d)("p",o,"Loading markdown...")):e.markdownTask.last.isError?(Object(a.s)(),Object(a.d)("p",c,"Error loading markdown: "+Object(a.D)(e.markdownTask.last.error.message),1)):(Object(a.s)(),Object(a.d)(l,{key:2,markdown:e.markdownTask.last.value},null,8,["markdown"]))};t.a=$},609:function(e,t,n){"use strict";var a=n(94),o=n.n(a)()(!1);o.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),o.push([e.i,'blockquote.twitter-tweet{display:inline-block;font-family:"Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;font-size:12px;font-weight:bold;line-height:16px;border-color:#eee #ddd #bbb;border-radius:5px;border-style:solid;border-width:1px;box-shadow:0 1px 3px rgba(0,0,0,0.15);margin:10px 5px;padding:0 16px 16px 16px;max-width:468px}blockquote.twitter-tweet p{font-size:16px;font-weight:normal;line-height:20px}blockquote.twitter-tweet a{color:inherit;font-weight:normal;text-decoration:none;outline:0 none}blockquote.twitter-tweet a:hover,blockquote.twitter-tweet a:focus{text-decoration:underline}.markdown h3{font-size:2rem;margin-bottom:0.5em}.markdown li{font-family:"Open Sans",sans-serif;color:#333}.markdown .twitter-tweet a{font-family:"Open Sans",sans-serif;color:#328546;text-decoration:underline;text-decoration-style:dotted}.banner{width:100%}\n',""]),t.a=o},611:function(e,t,n){"use strict";var a=n(5);const o=Object(a.K)("data-v-568f6dfb"),c=o((function(e,t,n,c,r,i){const s=Object(a.A)("SvgSprite"),l=Object(a.A)("router-link");return Object(a.s)(),Object(a.d)(l,{class:"technology-badge",title:e.p.technology.name,to:"/technologies/"+e.p.technology.urlSafeName.value},{default:o(()=>[Object(a.g)(s,{name:e.spriteName},null,8,["name"])]),_:1},8,["title","to"])}));var r=n(234),i=Object(a.i)({props:{technology:{type:Object,required:!0}},setup(e,t){const n=Object(a.b)(()=>"tech-"+e.technology.iconName.value);return{p:e,spriteName:n}},components:{SvgSprite:r.a}}),s=n(93),l=n.n(s),d=n(613),u={insert:"head",singleton:!1};l()(d.a,u),d.a.locals;i.render=c,i.__scopeId="data-v-568f6dfb";t.a=i},613:function(e,t,n){"use strict";var a=n(94),o=n.n(a)()(!1);o.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),o.push([e.i,".technology-badge[data-v-568f6dfb],.technology-badge>svg[data-v-568f6dfb]{display:block;background-color:#38944e;height:50px;width:50px}.technology-badge__icon[data-v-568f6dfb]{pointer-events:none;height:50px;width:50px}\n",""]),t.a=o},636:function(e,t,n){"use strict";var a=n(94),o=n.n(a)()(!1);o.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),o.push([e.i,'.header[data-v-4540c43d]{display:flex}.header>*[data-v-4540c43d]:first-child{margin-right:1em}.head-link[data-v-4540c43d]{text-decoration:none}.head[data-v-4540c43d]{font-size:2rem;margin-bottom:0.5em;margin-top:-0.2em;margin-bottom:0}.used-in[data-v-4540c43d]{font-family:"Open Sans",sans-serif;display:flex;flex-wrap:wrap}.used-in span[data-v-4540c43d]{margin-right:0.5em}.used-in span[data-v-4540c43d]::last-child{margin-right:0}\n',""]),t.a=o},637:function(e,t,n){"use strict";var a=n(94),o=n.n(a)()(!1);o.push([e.i,"figure[data-v-4618c652]{max-width:100%;margin:0}img[data-v-4618c652]{max-width:100%}object[data-v-4618c652]{background-color:rebeccapurple}.card[data-v-4618c652]{max-width:35rem}.item[data-v-4618c652]{margin-bottom:2rem}\n",""]),t.a=o},658:function(e,t,n){"use strict";n.r(t);var a=n(5);const o=Object(a.K)("data-v-4618c652");Object(a.v)("data-v-4618c652");const c={class:"card-column",ref:"gridRef"},r={class:"card"},i={class:"card__content"};Object(a.t)();const s=o((function(e,t,n,o,s,l){const d=Object(a.A)("TechnologyShort");return Object(a.s)(),Object(a.d)("div",c,[Object(a.g)("article",r,[Object(a.g)("div",i,[(Object(a.s)(!0),Object(a.d)(a.a,null,Object(a.y)(e.technologies,e=>(Object(a.s)(),Object(a.d)(d,{class:"item",key:e.name,technology:e},null,8,["technology"]))),128))])])],512)})),l=Object(a.K)("data-v-4540c43d");Object(a.v)("data-v-4540c43d");const d={class:"header"},u={class:"used-in"},p=Object(a.g)("span",null,"Used in: ",-1),b={key:0};Object(a.t)();const h=l((function(e,t,n,o,c,r){const i=Object(a.A)("TechnologyBadge"),s=Object(a.A)("router-link");return Object(a.s)(),Object(a.d)("div",d,[Object(a.g)(i,{technology:e.p.technology},null,8,["technology"]),Object(a.g)("div",null,[Object(a.g)(s,{to:"/technologies/"+e.p.technology.urlSafeName.value,class:"head-link"},{default:l(()=>[Object(a.g)("h3",{id:e.p.technology.urlSafeName.value,class:"head"},Object(a.D)(e.p.technology.name),9,["id"])]),_:1},8,["to"]),Object(a.g)("div",u,[p,(Object(a.s)(!0),Object(a.d)(a.a,null,Object(a.y)(e.p.technology.projects,(t,n)=>(Object(a.s)(),Object(a.d)("span",{key:t.name},[Object(a.g)(s,{to:"/projects/"+t.urlSafeName.value,class:"link"},{default:l(()=>[Object(a.f)(Object(a.D)(t.name),1)]),_:2},1032,["to"]),n!==e.p.technology.projects.length-1?(Object(a.s)(),Object(a.d)("span",b,",")):Object(a.e)("v-if",!0)]))),128))])])])}));var m=n(607),g=n(611),f=Object(a.i)({props:{technology:{type:Object,required:!0}},setup:(e,t)=>({p:e}),components:{TechnologyBadge:g.a,MarkdownFromDef:m.a}}),O=n(93),j=n.n(O),v=n(636),w={insert:"head",singleton:!1};j()(v.a,w),v.a.locals;f.render=h,f.__scopeId="data-v-4540c43d";var y=f,k=Object(a.i)({props:{technologies:{type:Object,required:!0}},setup(e,t){const n=Object(a.x)(null);return{technologies:e.technologies,gridRef:n}},components:{TechnologyShort:y}}),x=n(637),$={insert:"head",singleton:!1};j()(x.a,$),x.a.locals;k.render=s,k.__scopeId="data-v-4618c652";t.default=k}}]);