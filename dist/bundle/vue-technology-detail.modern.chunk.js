(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{771:function(t,e,n){"use strict";var o,s=n(37),c=n(85);let a=Object(c.b)(o=class extends s.a{Pathname(){return window.location.pathname}})||o;e.a=a},789:function(t,e,n){"use strict";n.d(e,"a",(function(){return o})),n.d(e,"b",(function(){return s}));var o=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h2",[this._v("Not found")]),this._v(" "),e("p",[this._v('The page "'+this._s(this.Pathname())+'" does not exist')])])},s=[];o._withStripped=!0},799:function(t,e,n){"use strict";var o=n(789),s=n(771),c=n(127),a=Object(c.a)(s.a,o.a,o.b,!1,null,"66bc5b48",null);a.options.__file="src/components/NotFound.vue",e.a=a.exports},937:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"card-column"},[null===t.technology?n("NotFound"):n("article",{staticClass:"card"},[n("div",{staticClass:"card__content"},[n("h1",{staticClass:"page-title"},[t._v(t._s(t.technology.name))]),t._v(" "),n("p",[t._v(t._s(t.technology.short))]),t._v(" "),n("p",[t._v("Below are some projects in which I use "+t._s(t.technology.name)+":")]),t._v(" "),t._l(t.technology.projects,(function(t){return n("ProjectShort",{key:t.name,attrs:{project:t}})}))],2)])],1)};o._withStripped=!0;var s,c,a,r,i,l=n(98),u=n.n(l),h=n(99),p=n.n(h),_=(n(345),n(767)),v=n(839),d=n(799);var b=(s=Object(_.a)({components:{ProjectShort:v.a,NotFound:d.a}}),c=Object(_.b)(Object),s((r=class extends _.c{constructor(...t){super(...t),u()(this,"technology",i,this)}},i=p()(r.prototype,"technology",[c],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=r))||a),f=n(127),m=Object(f.a)(b,o,[],!1,null,null,null);m.options.__file="src/components/TechnologyDetail.vue";e.default=m.exports}}]);