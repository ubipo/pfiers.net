(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{607:function(t,e,n){"use strict";var o=n(5);const r={key:0},c={key:1};var a=n(131),i=n(43),s=n(66),l=n(128),d=n(59),p=n(615),b=n.n(p);function u(t,e,n){const o=(null===e?"":`title="${e}"`)+' class="link"';if(null==t)return`<a ${o}>${n}</a>`;const r=Object(i.a)(t),c=r.protocol,l=Object(d.a)(r);if(c===s.a.CONTENT){const t=new URL(l,a.a);return`<a href="${Object(d.d)(t,"/content"+t.pathname).href}" ${o}>${n}</a>`}return c===s.a.EXTERNAL?`<a href="${l}" target="_blank" ${o}>${n}</a>`:c===s.a.RELATIVE?`<router-link to="${l}" ${o}>${n}</router-link>`:`<a href="${r.href}" ${o}>${n}</a>`}const j=function(){const t=new b.a.Renderer;return t.link=u,t.image=(t,e,n)=>`<img ${null===t?"":`src="${Object(l.a)(Object(i.a)(t))}"`} title="${e}" alt="${n}">`,t}();var f,h=Object(o.i)({props:{markdown:{type:String,required:!0}},setup:(t,e)=>({html:Object(o.b)(()=>{return e=t.markdown,`<div>${b.a.parse(e,{renderer:j})}</div>`;var e})}),components:{DynamicVc:(f={},Object(o.i)({name:"DyanmicVc",props:{content:{type:String,required:!0}},components:f,setup:(t,e)=>()=>{const e=t.content||'<p class="not-available-text">No content</p>';return Object(o.g)({name:"DynamicVcContent",components:f,template:e})}}))}}),g=n(93),O=n.n(g),m=n(609),w={insert:"head",singleton:!1};O()(m.a,w),m.a.locals;h.render=function(t,e,n,r,c,a){const i=Object(o.A)("dynamic-vc");return Object(o.s)(),Object(o.d)(i,{class:"markdown",content:t.html},null,8,["content"])};var k=h,y=n(605),v=n(130);async function x(t){if(null!==t.text)return t.text;if(null!==t.cachedText)return t.cachedText;{if(null===t.url)throw Error("MarkdownDefinition doesn't have url defined");const e=await async function(t){const e=await Object(v.a)(t.href);if(!e.ok)throw new Error(`HTTP error fetching markdown from ${t.href}: ${e.statusText}`);return await e.text()}(t.url);return t.cachedText=e,e}}var $=Object(o.i)({props:{definition:{type:Object,required:!0}},setup(t,e){const n=Object(y.a)(async()=>{const n=t.definition;let o;try{o=await x(n)}catch(t){throw console.error(t),t}return e.emit("ready"),o});return Object(o.G)(()=>t.definition,()=>{n.perform()}),n.perform(),{markdownTask:n}},components:{Markdown:k}});$.render=function(t,e,n,a,i,s){const l=Object(o.A)("Markdown");return t.markdownTask.last.isRunning?(Object(o.s)(),Object(o.d)("p",r,"Loading markdown...")):t.markdownTask.last.isError?(Object(o.s)(),Object(o.d)("p",c,"Error loading markdown: "+Object(o.D)(t.markdownTask.last.error.message),1)):(Object(o.s)(),Object(o.d)(l,{key:2,markdown:t.markdownTask.last.value},null,8,["markdown"]))};e.a=$},609:function(t,e,n){"use strict";var o=n(94),r=n.n(o)()(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),r.push([t.i,'blockquote.twitter-tweet{display:inline-block;font-family:"Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;font-size:12px;font-weight:bold;line-height:16px;border-color:#eee #ddd #bbb;border-radius:5px;border-style:solid;border-width:1px;box-shadow:0 1px 3px rgba(0,0,0,0.15);margin:10px 5px;padding:0 16px 16px 16px;max-width:468px}blockquote.twitter-tweet p{font-size:16px;font-weight:normal;line-height:20px}blockquote.twitter-tweet a{color:inherit;font-weight:normal;text-decoration:none;outline:0 none}blockquote.twitter-tweet a:hover,blockquote.twitter-tweet a:focus{text-decoration:underline}.markdown h3{font-size:2rem;margin-bottom:0.5em}.markdown li{font-family:"Open Sans",sans-serif;color:#333}.markdown .twitter-tweet a{font-family:"Open Sans",sans-serif;color:#328546;text-decoration:underline;text-decoration-style:dotted}.banner{width:100%}\n',""]),e.a=r},611:function(t,e,n){"use strict";var o=n(5);const r=Object(o.K)("data-v-568f6dfb"),c=r((function(t,e,n,c,a,i){const s=Object(o.A)("SvgSprite"),l=Object(o.A)("router-link");return Object(o.s)(),Object(o.d)(l,{class:"technology-badge",title:t.p.technology.name,to:"/technologies/"+t.p.technology.urlSafeName.value},{default:r(()=>[Object(o.g)(s,{name:t.spriteName},null,8,["name"])]),_:1},8,["title","to"])}));var a=n(234),i=Object(o.i)({props:{technology:{type:Object,required:!0}},setup(t,e){const n=Object(o.b)(()=>"tech-"+t.technology.iconName.value);return{p:t,spriteName:n}},components:{SvgSprite:a.a}}),s=n(93),l=n.n(s),d=n(613),p={insert:"head",singleton:!1};l()(d.a,p),d.a.locals;i.render=c,i.__scopeId="data-v-568f6dfb";e.a=i},613:function(t,e,n){"use strict";var o=n(94),r=n.n(o)()(!1);r.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),r.push([t.i,".technology-badge[data-v-568f6dfb],.technology-badge>svg[data-v-568f6dfb]{display:block;background-color:#38944e;height:50px;width:50px}.technology-badge__icon[data-v-568f6dfb]{pointer-events:none;height:50px;width:50px}\n",""]),e.a=r},617:function(t,e,n){"use strict";var o=n(94),r=n.n(o)()(!1);r.push([t.i,".icons[data-v-6d994602]{display:flex;list-style:none;flex-direction:row;padding:0;margin:0}.icons__item[data-v-6d994602]{height:50px;width:50px;background-color:#12a112;margin-right:5px;margin-bottom:5px}@media only screen and (min-width: 650px){.icons--block[data-v-6d994602]{flex-wrap:wrap;flex-direction:row-reverse;max-width:calc((50px + 5px) * 3)}.icons--block .icons__item[data-v-6d994602]{margin-left:5px;margin-right:0}}.icons__icon[data-v-6d994602]{height:50px;width:50px}a[data-v-6d994602]{display:block;height:50px;width:50px}object[data-v-6d994602]{pointer-events:none}\n",""]),e.a=r},620:function(t,e,n){"use strict";var o=n(5);const r=Object(o.K)("data-v-6d994602")((function(t,e,n,r,c,a){const i=Object(o.A)("TechnologyBadge");return Object(o.s)(),Object(o.d)("div",null,[Object(o.g)("ul",{class:t.iconsClass},[(Object(o.s)(!0),Object(o.d)(o.a,null,Object(o.y)(t.p.project.technologies,(t,e)=>(Object(o.s)(),Object(o.d)("li",{key:e,class:"icons__item"},[Object(o.g)(i,{technology:t},null,8,["technology"])]))),128))],2)])}));var c=n(611),a=Object(o.i)({props:{project:{type:Object,required:!0},block:{type:Boolean}},setup(t,e){const n=Object(o.b)(()=>"icons "+(t.block?"icons--block":""));return{p:t,iconsClass:n}},components:{TechnologyBadge:c.a}}),i=n(93),s=n.n(i),l=n(617),d={insert:"head",singleton:!1};s()(l.a,d),l.a.locals;a.render=r,a.__scopeId="data-v-6d994602";e.a=a},667:function(t,e,n){"use strict";n.r(e);var o=n(5);const r={class:"card-column"},c={class:"card"},a={class:"card__content"},i={class:"page-title"},s={key:0},l=Object(o.g)("br",null,null,-1),d={key:4,class:"not-available-text"},p={key:5};var b=n(607),u=n(620),j=Object(o.i)({props:{project:{type:Object,required:!0}},setup:(t,e)=>({p:t}),components:{ProjectTechnologyList:u.a,MarkdownFromDef:b.a}});j.render=function(t,e,n,b,u,j){const f=Object(o.A)("MarkdownFromDef"),h=Object(o.A)("ProjectTechnologyList");return Object(o.s)(),Object(o.d)("div",r,[Object(o.e)(' <NotFound v-if="!project"></NotFound> '),Object(o.g)("article",c,[Object(o.g)("div",a,[Object(o.g)("h1",i,Object(o.D)(t.p.project.name),1),null===t.p.project.short?(Object(o.s)(),Object(o.d)("p",s,Object(o.D)(t.p.project.description),1)):(Object(o.s)(),Object(o.d)(f,{key:1,definition:t.p.project.short},null,8,["definition"])),Object(o.g)(h,{project:t.p.project},null,8,["project"]),l,t.p.project.siteUrl?(Object(o.s)(),Object(o.d)("a",{key:2,href:t.p.project.siteUrl,class:"button"},"Project site",8,["href"])):Object(o.e)("v-if",!0),t.p.project.gitUrl?(Object(o.s)(),Object(o.d)("a",{key:3,href:t.p.project.gitUrl,class:"button"},"Git repository",8,["href"])):Object(o.e)("v-if",!0),null===t.p.project.long?(Object(o.s)(),Object(o.d)("p",d," No detailed description available. ")):(Object(o.s)(),Object(o.d)("article",p,[Object(o.g)(f,{definition:t.p.project.long},null,8,["definition"])]))])])])};e.default=j}}]);