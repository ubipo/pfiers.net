(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{793:function(t,e,n){"use strict";var i,o=n(36),a=n.n(o),r=n(132),c=n.n(r),s=n(37),l=n.n(s),u=n(28),p=n.n(u),h=n(38),d=n.n(h),f=n(40),v=n(90),_=Object(v.b)(i=function(t){function e(){return a()(this,e),l()(this,p()(e).apply(this,arguments))}return d()(e,t),c()(e,[{key:"Pathname",value:function(){return window.location.pathname}}]),e}(f.a))||i;e.a=_},811:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return o}));var i=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",[this._v("Not found")]),this._v(" "),e("p",[this._v('The page "'+this._s(this.Pathname())+'" does not exist')])])},o=[];i._withStripped=!0},837:function(t,e,n){"use strict";var i=n(811),o=n(793),a=n(131),r=Object(a.a)(o.a,i.a,i.b,!1,null,"647be3f2",null);r.options.__file="src/components/NotFound.vue",e.a=r.exports},839:function(t,e,n){var i=n(927);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(240).default)("ea243c64",i,!1,{})},840:function(t,e,n){var i=n(929);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,n(240).default)("e3868da2",i,!1,{})},926:function(t,e,n){"use strict";var i=n(839);n.n(i).a},927:function(t,e,n){(e=n(238)(!1)).push([t.i,"blockquote{margin:1rem 2rem}.wiki-text{font-style:italic}\n",""]),t.exports=e},928:function(t,e,n){"use strict";var i=n(840);n.n(i).a},929:function(t,e,n){(e=n(238)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,"[data-v-0dc66c00] .technology-header .technology-header__badge{float:right}[data-v-0dc66c00] .technology-header .technology-header__badge,[data-v-0dc66c00] .technology-header .technology-header__badge>svg{height:75px;width:75px}\n",""]),t.exports=e},969:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-column"},[null===t.technology?n("NotFound"):n("article",{staticClass:"card"},[n("div",{staticClass:"card__content"},[n("div",{staticClass:"technology-header"},[n("TechnologyBadge",{staticClass:"technology-header__badge",attrs:{technology:t.technology}}),t._v(" "),n("h1",{staticClass:"page-title"},[t._v(t._s(t.technology.name))])],1),t._v(" "),n("Wikipedia",{attrs:{"article-name":t.technology.wikiArticleName}}),t._v(" "),n("p",[t._v(t._s(t.technology.short))]),t._v(" "),n("p",[t._v("Some projects in which I use "+t._s(t.technology.name)+":")]),t._v(" "),t._l(t.technology.projects,(function(t){return n("ProjectShort",{key:t.name,attrs:{project:t}})}))],2)])],1)};i._withStripped=!0;var o=n(103),a=n.n(o),r=n(36),c=n.n(r),s=n(132),l=n.n(s),u=n(37),p=n.n(u),h=n(28),d=n.n(h),f=n(91),v=n.n(f),_=n(38),g=n.n(_),y=n(104),k=n.n(y),w=(n(348),n(770)),m=n(867),b=n(837),x=n(801),T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("blockquote",[n("p",{staticClass:"wiki-text"},[t._v('\n      "'+t._s(t.wikiText)+'"\n    ')]),t._v(" "),n("footer",[n("p",[t._v("\n        Extract from\n        "),n("cite",[n("a",{staticClass:"link",attrs:{href:t.wikiUrl}},[t._v(t._s(t.wikiTitle))])]),t._v("\n        on\n        "),n("a",{staticClass:"link",attrs:{href:"https://en.wikipedia.org/wiki/Main_Page"}},[t._v("Wikipedia")]),t._v("\n        , the free encyclopedia\n      ")])])]),t._v(" "),n("p")])};T._withStripped=!0;var j,O,C,N,S,W=n(99),P=n.n(W),E=n(171),$=n.n(E),D=(j=Object(w.b)(String),O=Object(w.d)("articleName",{}),Object(w.a)((N=function(t){function e(){var t,n;c()(this,e);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return n=p()(this,(t=d()(e)).call.apply(t,[this].concat(o))),a()(n,"articleName",S,v()(n)),n.wikiDescription=null,n.wikiText=null,n.wikiTitle=null,n.wikiUrl=null,n}var n;return g()(e,t),l()(e,[{key:"created",value:function(){this.updateWikiText()}},{key:"updateWikiText",value:(n=$()(P.a.mark((function t(){var e,n,i,o=this;return P.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=encodeURIComponent(this.articleName),n="https://en.wikipedia.org/api/rest_v1/page/summary/".concat(e),i=new Request(n),t.abrupt("return",fetch(i).then((function(t){if(!t.ok)throw new Error("HTTP Error loading ".concat(n,": ").concat(t.statusText));return console.log(t),t.json()})).then((function(t){console.log(t),o.wikiDescription=t.description,o.wikiText=t.extract,o.wikiTitle=t.title,o.wikiUrl="https://en.wikipedia.org/wiki/".concat(t.title)})));case 4:case"end":return t.stop()}}),t,this)}))),function(){return n.apply(this,arguments)})},{key:"contentLoad",value:function(){this.$emit("content-load")}}]),e}(w.c),S=k()(N.prototype,"articleName",[j],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),k()(N.prototype,"updateWikiText",[O],Object.getOwnPropertyDescriptor(N.prototype,"updateWikiText"),N.prototype),C=N))||C),U=(n(926),n(131)),q=Object(U.a)(D,T,[],!1,null,null,null);q.options.__file="src/components/Wikipedia.vue";var A,F,z,B,I,J=q.exports,R=(A=Object(w.a)({components:{TechnologyBadge:x.a,ProjectShort:m.a,NotFound:b.a,Wikipedia:J}}),F=Object(w.b)(Object),A((B=function(t){function e(){var t,n;c()(this,e);for(var i=arguments.length,o=new Array(i),r=0;r<i;r++)o[r]=arguments[r];return n=p()(this,(t=d()(e)).call.apply(t,[this].concat(o))),a()(n,"technology",I,v()(n)),n}return g()(e,t),l()(e,[{key:"mounted",value:function(){var t=this;this.$nextTick((function(){return t.$emit("content-load")}))}}]),e}(w.c),I=k()(B.prototype,"technology",[F],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),z=B))||z),H=(n(928),Object(U.a)(R,i,[],!1,null,"0dc66c00",null));H.options.__file="src/components/TechnologyDetail.vue";e.default=H.exports}}]);