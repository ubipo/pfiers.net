(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{607:function(e,t,n){"use strict";var r=n(5);const o={key:0},a={key:1};var i=n(131),c=n(43),s=n(66),l=n(128),d=n(59),u=n(615),p=n.n(u);function b(e,t,n){const r=(null===t?"":`title="${t}"`)+' class="link"';if(null==e)return`<a ${r}>${n}</a>`;const o=Object(c.a)(e),a=o.protocol,l=Object(d.a)(o);if(a===s.a.CONTENT){const e=new URL(l,i.a);return`<a href="${Object(d.d)(e,"/content"+e.pathname).href}" ${r}>${n}</a>`}return a===s.a.EXTERNAL?`<a href="${l}" target="_blank" ${r}>${n}</a>`:a===s.a.RELATIVE?`<router-link to="${l}" ${r}>${n}</router-link>`:`<a href="${o.href}" ${r}>${n}</a>`}const m=function(){const e=new p.a.Renderer;return e.link=b,e.image=(e,t,n)=>`<img ${null===e?"":`src="${Object(l.a)(Object(c.a)(e))}"`} title="${t}" alt="${n}">`,e}();var f,w=Object(r.i)({props:{markdown:{type:String,required:!0}},setup:(e,t)=>({html:Object(r.b)(()=>{return t=e.markdown,`<div>${p.a.parse(t,{renderer:m})}</div>`;var t})}),components:{DynamicVc:(f={},Object(r.i)({name:"DyanmicVc",props:{content:{type:String,required:!0}},components:f,setup:(e,t)=>()=>{const t=e.content||'<p class="not-available-text">No content</p>';return Object(r.g)({name:"DynamicVcContent",components:f,template:t})}}))}}),h=n(93),k=n.n(h),O=n(609),j={insert:"head",singleton:!1};k()(O.a,j),O.a.locals;w.render=function(e,t,n,o,a,i){const c=Object(r.A)("dynamic-vc");return Object(r.s)(),Object(r.d)(c,{class:"markdown",content:e.html},null,8,["content"])};var g=w,x=n(605),y=n(130);async function $(e){if(null!==e.text)return e.text;if(null!==e.cachedText)return e.cachedText;{if(null===e.url)throw Error("MarkdownDefinition doesn't have url defined");const t=await async function(e){const t=await Object(y.a)(e.href);if(!t.ok)throw new Error(`HTTP error fetching markdown from ${e.href}: ${t.statusText}`);return await t.text()}(e.url);return e.cachedText=t,t}}var v=Object(r.i)({props:{definition:{type:Object,required:!0}},setup(e,t){const n=Object(x.a)(async()=>{const n=e.definition;let r;try{r=await $(n)}catch(e){throw console.error(e),e}return t.emit("ready"),r});return Object(r.G)(()=>e.definition,()=>{n.perform()}),n.perform(),{markdownTask:n}},components:{Markdown:g}});v.render=function(e,t,n,i,c,s){const l=Object(r.A)("Markdown");return e.markdownTask.last.isRunning?(Object(r.s)(),Object(r.d)("p",o,"Loading markdown...")):e.markdownTask.last.isError?(Object(r.s)(),Object(r.d)("p",a,"Error loading markdown: "+Object(r.D)(e.markdownTask.last.error.message),1)):(Object(r.s)(),Object(r.d)(l,{key:2,markdown:e.markdownTask.last.value},null,8,["markdown"]))};t.a=v},609:function(e,t,n){"use strict";var r=n(94),o=n.n(r)()(!1);o.push([e.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),o.push([e.i,'blockquote.twitter-tweet{display:inline-block;font-family:"Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;font-size:12px;font-weight:bold;line-height:16px;border-color:#eee #ddd #bbb;border-radius:5px;border-style:solid;border-width:1px;box-shadow:0 1px 3px rgba(0,0,0,0.15);margin:10px 5px;padding:0 16px 16px 16px;max-width:468px}blockquote.twitter-tweet p{font-size:16px;font-weight:normal;line-height:20px}blockquote.twitter-tweet a{color:inherit;font-weight:normal;text-decoration:none;outline:0 none}blockquote.twitter-tweet a:hover,blockquote.twitter-tweet a:focus{text-decoration:underline}.markdown h3{font-size:2rem;margin-bottom:0.5em}.markdown li{font-family:"Open Sans",sans-serif;color:#333}.markdown .twitter-tweet a{font-family:"Open Sans",sans-serif;color:#328546;text-decoration:underline;text-decoration-style:dotted}.banner{width:100%}\n',""]),t.a=o},633:function(e,t,n){"use strict";var r=n(94),o=n.n(r)()(!1);o.push([e.i,".banner{width:100%}\n",""]),t.a=o},661:function(e,t,n){"use strict";n.r(t);var r=n(5);const o=Object(r.g)("h1",{class:"page-title"},"Pieter Fiers",-1);var a=n(607),i=n(236),c=Object(r.i)({props:{home:{type:Object,required:!0}},setup:(e,t)=>({p:e,onReady:()=>console.log("Ready")}),components:{MarkdownFromDef:a.a,CardColumn:i.a}}),s=n(93),l=n.n(s),d=n(633),u={insert:"head",singleton:!1};l()(d.a,u),d.a.locals;c.render=function(e,t,n,a,i,c){const s=Object(r.A)("MarkdownFromDef"),l=Object(r.A)("CardColumn");return Object(r.s)(),Object(r.d)(l,null,{"first-item":Object(r.I)(()=>[o,Object(r.g)(s,{definition:e.p.home.long,onReady:e.onReady},null,8,["definition","onReady"])]),_:1})};t.default=c}}]);