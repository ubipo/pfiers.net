(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{641:function(t,e,n){"use strict";var a=n(94),o=n.n(a)()(!1);o.push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),o.push([t.i,".error__title[data-v-0c3024bc]{color:#b42727;font-size:1.5rem}.error__msg[data-v-0c3024bc]{font-family:monospace;font-size:1rem}.loading-msg__text[data-v-0c3024bc]{text-align:center;font-style:italic}.loading-msg__spinner[data-v-0c3024bc]{position:relative;width:200px !important;height:200px !important;-webkit-transform:translate(-100px, -100px) scale(1) translate(100px, 100px);transform:translate(-100px, -100px) scale(1) translate(100px, 100px)}@keyframes loading-msg__spinner--animation-0c3024bc{0%{-webkit-transform:translate(-50%, -50%) rotate(0deg);transform:translate(-50%, -50%) rotate(0deg)}100%{-webkit-transform:translate(-50%, -50%) rotate(360deg);transform:translate(-50%, -50%) rotate(360deg)}}@-webkit-keyframes loading-msg__spinner--animation-0c3024bc{0%{-webkit-transform:translate(-50%, -50%) rotate(0deg);transform:translate(-50%, -50%) rotate(0deg)}100%{-webkit-transform:translate(-50%, -50%) rotate(360deg);transform:translate(-50%, -50%) rotate(360deg)}}.loading-msg__spinner div[data-v-0c3024bc],.loading-msg__spinner div[data-v-0c3024bc]:after{position:absolute;width:150px;height:150px;border:10px solid #38944e;border-top-color:transparent;border-radius:50%}.loading-msg__spinner div[data-v-0c3024bc]{-webkit-animation:loading-msg__spinner--animation-0c3024bc 1.5s linear infinite;animation:loading-msg__spinner--animation-0c3024bc 1.5s linear infinite;top:100px;left:100px}.loading-msg__spinner div[data-v-0c3024bc]:after{-webkit-transform:rotate(90deg);transform:rotate(90deg)}\n",""]),e.a=o},663:function(t,e,n){"use strict";n.r(e);var a=n(5);const o=Object(a.K)("data-v-0c3024bc");Object(a.v)("data-v-0c3024bc");const r={key:0,class:"loading-msg"},s=Object(a.g)("p",{class:"loading-msg__text"},"Loading site content...",-1),i=Object(a.g)("div",{class:"loading-msg__spinner"},[Object(a.g)("div")],-1),c={key:1,class:"error"},p=Object(a.g)("p",{class:"error__title"}," An error occured while trying to load the site content: ",-1),d={class:"error__msg"},l={class:"error__msg"};Object(a.t)();const m=o((function(t,e,n,m,b,g){const f=Object(a.A)("CardColumn");return null===t.p.content?(Object(a.s)(),Object(a.d)(f,{key:0},{"first-item":o(()=>[void 0===t.p.contentTask.last||t.p.contentTask.last.isRunning?(Object(a.s)(),Object(a.d)("div",r,[s,i])):t.p.contentTask.last.isError?(Object(a.s)(),Object(a.d)("div",c,[p,Object(a.g)("p",d,Object(a.D)(t.p.contentTask.last.error.name)+": ",1),Object(a.g)("p",l,Object(a.D)(t.p.contentTask.last.error.message),1),Object(a.g)("button",{onClick:e[1]||(e[1]=e=>t.performContentTask())},"Try again")])):Object(a.e)("v-if",!0)]),_:1})):(Object(a.s)(),Object(a.d)(Object(a.B)(t.p.componentName),Object(a.m)({key:1},t.componentProps),null,16))}));var b=n(311),g=n(238),f=n(236),_=Object(a.i)({props:{contentTask:{type:Object,required:!0},content:{required:!0},componentName:{type:String,required:!0},propsFn:{type:Function,required:!0},metadataUpdateFn:{type:Function,required:!0}},setup(t,e){if("object"!=typeof t.content)throw new Error("Prop `content` must be an object");Object(a.G)(()=>t.content,e=>{t.metadataUpdateFn(e)});const n=()=>{e.emit(g.b)};if(void 0===t.contentTask.last){const t=Object(b.a)();null!==t?(console.info("Got content from dom cache"),console.info(JSON.stringify(t.home)),e.emit(g.a,t)):n()}const o=Object(a.b)(()=>t.propsFn(t.content));return{p:t,componentProps:o,performContentTask:n}},components:{CardColumn:f.a}}),u=n(93),j=n.n(u),O=n(641),k={insert:"head",singleton:!1};j()(O.a,k),O.a.locals;_.render=m,_.__scopeId="data-v-0c3024bc";e.default=_}}]);