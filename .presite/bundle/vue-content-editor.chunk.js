(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{604:function(t,e,n){"use strict";var r=n(6),a={key:0},o={key:1};var c=n(15),i=n.n(c),u=n(47),s=n.n(u);var l=n(133),d=n(45),p=n(67),b=n(129),f=n(63),m=n(612),v=n.n(m);function O(t,e,n){var r=null===e?"":'title="'.concat(e,'"'),a="".concat(r,' class="link"');if(null==t)return"<a ".concat(a,">").concat(n,"</a>");var o=Object(d.a)(t),c=o.protocol,i=Object(f.a)(o);if(c===p.a.CONTENT){var u=new URL(i,l.a),s=Object(f.d)(u,"/content".concat(u.pathname)).href;return'<a href="'.concat(s,'" ').concat(a,">").concat(n,"</a>")}return c===p.a.EXTERNAL?'<a href="'.concat(i,'" target="_blank" rel="noopener" ').concat(a,">").concat(n,"</a>"):c===p.a.RELATIVE?'<router-link to="'.concat(i,'" ').concat(a,">").concat(n,"</router-link>"):'<a href="'.concat(o.href,'" ').concat(a,">").concat(n,"</a>")}var w,j=((w=new v.a.Renderer).link=O,w.image=function(t,e,n){var r=null===t?"":'src="'.concat(Object(b.a)(Object(d.a)(t)),'"');return"<img ".concat(r,' title="').concat(e,'" alt="').concat(n,'">')},w);var h,k=Object(r.i)({props:{markdown:{type:String,required:!0}},setup:function(t,e){return{html:Object(r.b)((function(){return function(t){var e=v.a.parse(t,{renderer:j});return"<div>".concat(e,"</div>")}(t.markdown)}))}},components:{DynamicVc:(h={},Object(r.i)({name:"DyanmicVc",props:{content:{type:String,required:!0}},components:h,setup:function(t,e){return function(){var e=t.content||'<p class="not-available-text">No content</p>';return Object(r.g)({name:"DynamicVcContent",components:h,template:e})}}}))}}),g=n(77),x=n.n(g),y=n(606),T={insert:"head",singleton:!1};x()(y.a,T),y.a.locals;k.render=function(t,e,n,a,o,c){var i=Object(r.A)("dynamic-vc");return Object(r.s)(),Object(r.d)(i,{class:"markdown",content:t.html},null,8,["content"])};var _=k,C=n(602),R=n(132);function D(t){return E.apply(this,arguments)}function E(){return(E=s()(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,Object(R.a)(e.href);case 2:if((n=t.sent).ok){t.next=5;break}throw new Error("HTTP error fetching markdown from ".concat(e.href,": ").concat(n.statusText));case 5:return t.next=7,n.text();case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function q(t){return A.apply(this,arguments)}function A(){return(A=s()(i.a.mark((function t(e){var n;return i.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null===e.text){t.next=2;break}return t.abrupt("return",e.text);case 2:if(null===e.cachedText){t.next=6;break}return t.abrupt("return",e.cachedText);case 6:if(null!==e.url){t.next=8;break}throw Error("MarkdownDefinition doesn't have url defined");case 8:return t.next=10,D(e.url);case 10:return n=t.sent,e.cachedText=n,t.abrupt("return",n);case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var N=Object(r.i)({props:{definition:{type:Object,required:!0}},setup:function(t,e){var n=Object(C.a)(s()(i.a.mark((function n(){var r,a;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return r=t.definition,n.prev=1,n.next=4,q(r);case 4:a=n.sent,n.next=11;break;case 7:throw n.prev=7,n.t0=n.catch(1),console.error(n.t0),n.t0;case 11:return e.emit("ready"),n.abrupt("return",a);case 13:case"end":return n.stop()}}),n,null,[[1,7]])}))));return Object(r.G)((function(){return t.definition}),(function(){n.perform()})),n.perform(),{markdownTask:n}},components:{Markdown:_}});N.render=function(t,e,n,c,i,u){var s=Object(r.A)("Markdown");return t.markdownTask.last.isRunning?(Object(r.s)(),Object(r.d)("p",a,"Loading markdown...")):t.markdownTask.last.isError?(Object(r.s)(),Object(r.d)("p",o,"Error loading markdown: "+Object(r.D)(t.markdownTask.last.error.message),1)):(Object(r.s)(),Object(r.d)(s,{key:2,markdown:t.markdownTask.last.value},null,8,["markdown"]))};e.a=N},606:function(t,e,n){"use strict";var r=n(78),a=n.n(r)()(!1);a.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),a.push([t.i,'blockquote.twitter-tweet{display:inline-block;font-family:"Helvetica Neue", Roboto, "Segoe UI", Calibri, sans-serif;font-size:12px;font-weight:bold;line-height:16px;border-color:#eee #ddd #bbb;border-radius:5px;border-style:solid;border-width:1px;box-shadow:0 1px 3px rgba(0,0,0,0.15);margin:10px 5px;padding:0 16px 16px 16px;max-width:468px}blockquote.twitter-tweet p{font-size:16px;font-weight:normal;line-height:20px}blockquote.twitter-tweet a{color:inherit;font-weight:normal;text-decoration:none;outline:0 none}blockquote.twitter-tweet a:hover,blockquote.twitter-tweet a:focus{text-decoration:underline}.markdown h3{font-size:2rem;margin-bottom:0.5em}.markdown li{font-family:"Open Sans",sans-serif;color:#333}.markdown .twitter-tweet a{font-family:"Open Sans",sans-serif;color:#328546;text-decoration:underline;text-decoration-style:dotted}.banner{width:100%}\n',""]),e.a=a},646:function(t,e,n){"use strict";var r=n(78),a=n.n(r)()(!1);a.push([t.i,".error__title[data-v-4b93246b]{color:#b42727;font-size:1.5rem}.error__msg[data-v-4b93246b]{font-family:monospace;font-size:1rem}\n",""]),e.a=a},656:function(t,e,n){"use strict";n.r(e);var r=n(6),a=Object(r.K)("data-v-4b93246b");Object(r.v)("data-v-4b93246b");var o=Object(r.g)("h1",{class:"page-title"},"Content editor",-1),c={ref:"cmInputContRef"},i=Object(r.g)("h2",null,"Parsed data",-1),u={ref:"cmOutputContRef"},s={key:0},l=Object(r.g)("p",{class:"error__title"}," An error occured while trying to update the site content: ",-1),d={class:"error__msg"},p={class:"error__msg"};Object(r.t)();var b=a((function(t,e,n,b,f,m){var v=Object(r.A)("MarkdownFromDef"),O=Object(r.A)("CardColumn");return Object(r.s)(),Object(r.d)(O,null,{"first-item":a((function(){return[o,Object(r.g)(v,{definition:t.description},null,8,["definition"]),Object(r.g)("div",c,null,512),i,Object(r.J)(Object(r.g)("div",u,null,512),[[r.F,null===t.error]]),null!==t.error?(Object(r.s)(),Object(r.d)("div",s,[l,Object(r.g)("p",d,Object(r.D)(t.error.name)+": ",1),Object(r.g)("p",p,Object(r.D)(t.error.message),1)])):Object(r.e)("v-if",!0)]})),_:1})})),f=n(604),m=n(615),v=n.n(m),O=(n(620),n(644),n(645),n(127)),w=n(125),j=n(135),h=Object(r.i)({props:{content:{type:Object,required:!0}},setup:function(t,e){var n=Object(r.x)(null),a=Object(r.x)(null),o=Object(r.x)(null);Object(r.q)((function(){var r=n.value;if(null===r)throw new Error("Ref to codemirror input div is not populated");var c=v()(r,{lineNumbers:!0,mode:"yaml",value:Object(O.b)(t.content)}),i=a.value;if(null===i)throw new Error("Ref to codemirror output div is not populated");var u=v()(i,{readOnly:!0,mode:{name:"javascript",json:!0}});function s(){var t,n=c.getDoc().getValue();try{t=Object(O.a)(n)}catch(t){return void(o.value=t)}o.value=null;var r=Object(O.d)(t);u.getDoc().setValue(JSON.stringify(r,null,2)),e.emit(w.a,t)}c.on("change",s),s()}));var c=Object(r.b)((function(){return t.content.editor.description}));return{cmInputContRef:n,cmOutputContRef:a,error:o,description:c}},components:{MarkdownFromDef:f.a,CardColumn:j.a}}),k=n(77),g=n.n(k),x=n(646),y={insert:"head",singleton:!1};g()(x.a,y),x.a.locals;h.render=b,h.__scopeId="data-v-4b93246b";e.default=h}}]);