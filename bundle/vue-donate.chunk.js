(self.webpackChunk=self.webpackChunk||[]).push([[842],{1915:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>a});var r=t(93476),o=t.n(r)()((function(n){return n[1]}));o.push([n.id,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400&display=swap);"]),o.push([n.id,'blockquote.twitter-tweet{display:inline-block;font-family:"Helvetica Neue",Roboto,"Segoe UI",Calibri,sans-serif;font-size:12px;font-weight:bold;line-height:16px;border-color:#eee #ddd #bbb;border-radius:5px;border-style:solid;border-width:1px;box-shadow:0 1px 3px rgba(0,0,0,.15);margin:10px 5px;padding:0 16px 16px 16px;max-width:468px}blockquote.twitter-tweet p{font-size:16px;font-weight:normal;line-height:20px}blockquote.twitter-tweet a{color:inherit;font-weight:normal;text-decoration:none;outline:0 none}blockquote.twitter-tweet a:hover,blockquote.twitter-tweet a:focus{text-decoration:underline}.markdown h3{font-size:2rem;margin-bottom:.5em}.markdown li{font-family:"Open Sans",sans-serif;color:#333}.markdown .twitter-tweet a{font-family:"Open Sans",sans-serif;color:#328546;text-decoration:underline;text-decoration-style:dotted}.banner{width:100%}',""]);const a=o},65091:(n,e,t)=>{"use strict";t.r(e),t.d(e,{default:()=>c});var r=t(92117),o=(0,r.Wm)("h1",{class:"page-title"},"Donate",-1),a=t(39013),i=t(62047);const l=(0,r.aZ)({props:{donate:{type:Object,required:!0}},setup:(n,e)=>({p:n,onReady:()=>{}}),components:{MarkdownFromDef:a.Z,CardColumn:i.Z}});l.render=function(n,e,t,a,i,l){var c=(0,r.up)("MarkdownFromDef"),d=(0,r.up)("CardColumn");return(0,r.wg)(),(0,r.j4)(d,null,{"first-item":(0,r.w5)((()=>[o,(0,r.Wm)(c,{definition:n.p.donate.long,onReady:n.onReady},null,8,["definition","onReady"])])),_:1})};const c=l},39013:(n,e,t)=>{"use strict";t.d(e,{Z:()=>j});var r=t(92117),o={key:0},a={key:1},i=t(44559),l=t.n(i),c=t(322),d=t.n(c),s=t(26254),u=t(59339),p=t(66653),m=t(66296),f=t(64402),w=t.n(f);function k(n,e,t){var r,o=null===e?"":'title="'.concat(e,'"'),a="".concat(o,' class="link"');if(null==n)return l()(r="<a ".concat(a,">")).call(r,t,"</a>");var i,c,f,w,k,h,g=(0,u.C3)(n),y=g.protocol,v=(0,m.Jr)(g);if(y===p.Z.CONTENT){var x,b,T=new(d())(v,s.I),Z=(0,m.Xu)(T,"/content".concat(T.pathname)).href;return l()(x=l()(b='<a href="'.concat(Z,'" ')).call(b,a,">")).call(x,t,"</a>")}return y===p.Z.EXTERNAL?l()(i=l()(c='<a href="'.concat(v,'" target="_blank" rel="noopener" ')).call(c,a,">")).call(i,t,"</a>"):y===p.Z.RELATIVE?l()(f=l()(w='<router-link to="'.concat(v,'" ')).call(w,a,">")).call(f,t,"</router-link>"):l()(k=l()(h='<a href="'.concat(g.href,'" ')).call(h,a,">")).call(k,t,"</a>")}function h(n,e,t){var r,o;return l()(r=l()(o='<ResponsiveImage url="'.concat(n,'" title="')).call(o,e,'" alt="')).call(r,t,'" />')}var g=function(){var n=new(w().Renderer);return n.link=k,n.image=h,n}();const y=(0,r.aZ)({props:{markdown:{type:String,required:!0}},setup:(n,e)=>({html:(0,r.Fl)((()=>{return e=n.markdown,t=w().parse(e,{renderer:g}),"<div>".concat(t,"</div>");var e,t}))}),components:{DynamicVc:(v={},(0,r.aZ)({name:"DyanmicVc",props:{content:{type:String,required:!0}},components:v,setup:(n,e)=>()=>{var e=n.content||'<p class="not-available-text">No content</p>';return(0,r.Wm)({name:"DynamicVcContent",components:v,template:e})}}))}});var v;t(72377),y.render=function(n,e,t,o,a,i){var l=(0,r.up)("dynamic-vc");return(0,r.wg)(),(0,r.j4)(l,{class:"markdown",content:n.html},null,8,["content"])};const x=y;var b=t(41216),T=t(53102),Z=t(16072);function C(){return(C=(0,T.Z)((function*(n){var e,t=yield(0,Z.b)(n.href);if(!t.ok)throw new Error(l()(e="HTTP error fetching markdown from ".concat(n.href,": ")).call(e,t.statusText));return yield t.text()}))).apply(this,arguments)}const R=(0,r.aZ)({props:{definition:{type:Object,required:!0}},setup(n,e){var t=n.definition,{markdown:o,fetch:a}=function(n){if(null!==n.text)return{markdown:n.text};if(null!==n.cachedText)return{markdown:n.cachedText};var e,t=n.url;if(null===t)throw Error("MarkdownDefinition doesn't have url defined");return{fetch:(e=(0,T.Z)((function*(){var e=yield function(n){return C.apply(this,arguments)}(t);return n.cachedText=e,e})),function(){return e.apply(this,arguments)})}}(t),i=null==o?(0,b.KP)(a):null;return null!=i&&(0,r.YP)((()=>n.definition),(()=>{i.perform()}),{immediate:!0}),{markdown:o,markdownTask:i}},components:{Markdown:x}});R.render=function(n,e,t,i,l,c){var d=(0,r.up)("Markdown");return null==n.markdown?((0,r.wg)(),(0,r.j4)(r.HY,{key:0},[n.markdownTask.last.isRunning?((0,r.wg)(),(0,r.j4)("p",o,"Loading markdown...")):n.markdownTask.last.isError?((0,r.wg)(),(0,r.j4)("p",a,"Error loading markdown: "+(0,r.zw)(n.markdownTask.last.error.message),1)):((0,r.wg)(),(0,r.j4)(d,{key:2,markdown:n.markdownTask.last.value},null,8,["markdown"]))],2112)):((0,r.wg)(),(0,r.j4)(d,{key:1,markdown:n.markdown},null,8,["markdown"]))};const j=R},72377:(n,e,t)=>{var r=t(1915);r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[n.id,r,""]]),r.locals&&(n.exports=r.locals),(0,t(49441).Z)("56b3e6a6",r,!1,{})}}]);