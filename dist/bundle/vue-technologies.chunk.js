(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{768:function(t,e,n){"use strict";n.d(e,"b",(function(){return l})),n.d(e,"d",(function(){return u}));var o=n(2),r=n.n(o),a=n(38);n.d(e,"c",(function(){return a.a}));var i=n(86);n.d(e,"a",(function(){return i.b}));var c="undefined"!=typeof Reflect&&void 0!==Reflect.getMetadata;function s(t,e,n){c&&(Array.isArray(t)||"function"==typeof t||void 0!==t.type||(t.type=Reflect.getMetadata("design:type",e,n)))}function l(t){return void 0===t&&(t={}),function(e,n){s(t,e,n),Object(i.a)((function(e,n){(e.props||(e.props={}))[n]=t}))(e,n)}}function u(t,e){void 0===e&&(e={});var n=e.deep,o=void 0!==n&&n,a=e.immediate,c=void 0!==a&&a;return Object(i.a)((function(e,n){"object"!==r()(e.watch)&&(e.watch=Object.create(null));var a=e.watch;"object"!==r()(a[t])||Array.isArray(a[t])?void 0===a[t]&&(a[t]=[]):a[t]=[a[t]],a[t].push({handler:n,deep:o,immediate:c})}))}},770:function(t,e,n){var o=n(784);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(237).default)("780eb069",o,!1,{})},782:function(t,e,n){"use strict";n.d(e,"a",(function(){return v}));var o,r=n(34),a=n.n(r),i=n(129),c=n.n(i),s=n(35),l=n.n(s),u=n(26),h=n.n(u),d=n(36),g=n.n(d),f=n(38),p=n(86),y=n(84),v=Object(p.b)(o=function(t){function e(){var t,n;a()(this,e);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return(n=l()(this,(t=h()(e)).call.apply(t,[this].concat(r)))).grid=void 0,n.cards=[],n.rowHeight=0,n.rowGap=0,n}return g()(e,t),c()(e,[{key:"cardGridInit",value:function(){var t=this;this.grid=document.getElementsByClassName("card-grid")[0],this.cards=Array.from(this.grid.getElementsByClassName("card")),this.rowHeight=parseInt(window.getComputedStyle(this.grid).getPropertyValue("grid-auto-rows")),this.rowGap=parseInt(window.getComputedStyle(this.grid).getPropertyValue("grid-row-gap"));for(var e=0,n=Array.from(this.grid.getElementsByTagName("img"));e<n.length;e++){n[e].addEventListener("load",(function(){return t.resizeAllCards()}))}window.addEventListener("resize",(function(){return t.resizeAllCards()})),this.resizeAllCards()}},{key:"resizeCard",value:function(t){var e=t.getElementsByClassName("card__content")[0];if(null==e)throw new y.a("Illegal layout; no content within card");var n=e.getBoundingClientRect().height,o=Math.ceil((n+this.rowGap)/(this.rowHeight+this.rowGap))+1;t.style.gridRowEnd="span ".concat(o)}},{key:"resizeAllCards",value:function(){var t=!0,e=!1,n=void 0;try{for(var o,r=this.cards[Symbol.iterator]();!(t=(o=r.next()).done);t=!0){var a=o.value;this.resizeCard(a)}}catch(t){e=!0,n=t}finally{try{t||null==r.return||r.return()}finally{if(e)throw n}}}}]),e}(f.a))||o},783:function(t,e,n){"use strict";var o=n(770);n.n(o).a},784:function(t,e,n){(e=n(235)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,".technology-badge[data-v-1e81934a],.technology-badge>div[data-v-1e81934a]{display:block;background-color:#38944e;height:50px;width:50px}.technology-badge__icon[data-v-1e81934a]{pointer-events:none;height:50px;width:50px}\n",""]),t.exports=e},788:function(t,e,n){"use strict";var o=function(){var t=this.$createElement,e=this._self._c||t;return e("router-link",{staticClass:"technology-badge",attrs:{title:this.technology.name,to:"/technologies/"+this.technology.urlSafeName}},[e("div",{domProps:{innerHTML:this._s(this.svg)}})])};o._withStripped=!0;var r,a,i,c,s,l=n(100),u=n.n(l),h=n(34),d=n.n(h),g=n(129),f=n.n(g),p=n(35),y=n.n(p),v=n(26),m=n.n(v),_=n(87),b=n.n(_),w=n(36),C=n.n(w),j=n(101),k=n.n(j),O=(n(346),n(38)),S=n(86),T=n(768),x=(r=Object(T.b)(Object),a=Object(T.d)("technology",{}),Object(S.b)((c=function(t){function e(){var t,n;d()(this,e);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return n=y()(this,(t=m()(e)).call.apply(t,[this].concat(r))),u()(n,"technology",s,b()(n)),n.svg="",n}return C()(e,t),f()(e,[{key:"onTechnologyChanged",value:function(){this.updateSvg()}},{key:"created",value:function(){this.updateSvg()}},{key:"updateSvg",value:function(){var t=this;new Promise((function(n,o){var r=t.technology.iconUrl;null!=r?e.fetchSvgFromUrl(r).then((function(t){n(t)})).catch((function(t){o('The following error occurred when trying to load "'.concat(r,'":\n\n ').concat(t.message))})):n()})).then((function(e){t.svg=e})).catch((function(e){t.svg="",console.error(e)}))}}],[{key:"fetchSvgFromUrl",value:function(t){var e=new Request(t.href);return fetch(e).then((function(e){if(!e.ok)throw new Error("HTTP Error loading ".concat(t.href,": ").concat(e.statusText));return e.text()}))}}]),e}(O.a),s=k()(c.prototype,"technology",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),k()(c.prototype,"onTechnologyChanged",[a],Object.getOwnPropertyDescriptor(c.prototype,"onTechnologyChanged"),c.prototype),i=c))||i),A=(n(783),n(128)),E=Object(A.a)(x,o,[],!1,null,"1e81934a",null);E.options.__file="src/components/TechnologyBadge.vue";e.a=E.exports},813:function(t,e,n){var o=n(894);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);(0,n(237).default)("760f2ef1",o,!1,{})},893:function(t,e,n){"use strict";var o=n(813);n.n(o).a},894:function(t,e,n){(e=n(235)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,".technology__header[data-v-87a47dba]{display:flex;justify-content:space-between;align-items:center}.technology__header .technology__header__title[data-v-87a47dba]{font-size:2rem;margin-bottom:0.5em;margin-top:0.2em}\n",""]),t.exports=e},932:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-grid"},this._l(this.siteData.technologies,(function(t){return e("article",{key:t.name,staticClass:"card"},[e("div",{staticClass:"card__content"},[e("TechnologyShort",{attrs:{technology:t}})],1)])})),0)};o._withStripped=!0;var r=n(100),a=n.n(r),i=n(34),c=n.n(i),s=n(129),l=n.n(s),u=n(35),h=n.n(u),d=n(26),g=n.n(d),f=n(87),p=n.n(f),y=n(36),v=n.n(y),m=n(101),_=n.n(m),b=(n(346),n(768)),w=n(86),C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{staticClass:"technology__header"},[n("h3",{staticClass:"technology__header__title",attrs:{id:t.technology.urlSafeName}},[t._v("\n      "+t._s(t.technology.name)+"\n    ")]),t._v(" "),n("TechnologyBadge",{attrs:{technology:t.technology}})],1),t._v(" "),n("p",[t._v(t._s(t.technology.short))]),t._v(" "),n("router-link",{staticClass:"button",attrs:{to:"/technologies/"+t.technology.urlSafeName}},[t._v("\n    Read more\n  ")]),t._v(" "),n("p",[t._v("Used in:")]),t._v(" "),n("ul",t._l(t.technology.projects,(function(e){return n("li",{key:e.name},[n("router-link",{staticClass:"link",attrs:{to:"/projects/"+e.urlSafeName}},[t._v("\n        "+t._s(e.name)+"\n      ")])],1)})),0)],1)};C._withStripped=!0;var j,k,O,S,T,x=n(788),A=(j=Object(b.a)({components:{TechnologyBadge:x.a}}),k=Object(b.b)(void 0),j((S=function(t){function e(){var t,n;c()(this,e);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return n=h()(this,(t=g()(e)).call.apply(t,[this].concat(r))),a()(n,"technology",T,p()(n)),n}return v()(e,t),e}(b.c),T=_()(S.prototype,"technology",[k],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),O=S))||O),E=(n(893),n(128)),z=Object(E.a)(A,C,[],!1,null,"87a47dba",null);z.options.__file="src/components/TechnologyShort.vue";var B,N,G,R,P,D=z.exports,H=n(239),I=n(782),M=Object(H.a)("siteData"),U=(B=Object(b.a)({components:{TechnologyShort:D}}),N=M.Getter("data"),B((R=function(t){function e(){var t,n;c()(this,e);for(var o=arguments.length,r=new Array(o),i=0;i<o;i++)r[i]=arguments[i];return n=h()(this,(t=g()(e)).call.apply(t,[this].concat(r))),a()(n,"siteData",P,p()(n)),n}return v()(e,t),l()(e,[{key:"mounted",value:function(){this.cardGridInit()}}]),e}(Object(w.c)(I.a)),P=_()(R.prototype,"siteData",[N],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),G=R))||G),L=Object(E.a)(U,o,[],!1,null,"5171912d",null);L.options.__file="src/components/Technologies.vue";e.default=L.exports}}]);