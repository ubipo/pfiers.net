(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{767:function(t,e,o){"use strict";o.d(e,"b",(function(){return c})),o.d(e,"d",(function(){return s}));var n=o(37);o.d(e,"c",(function(){return n.a}));var r=o(85);o.d(e,"a",(function(){return r.b}));var i="undefined"!=typeof Reflect&&void 0!==Reflect.getMetadata;function a(t,e,o){i&&(Array.isArray(t)||"function"==typeof t||void 0!==t.type||(t.type=Reflect.getMetadata("design:type",e,o)))}function c(t){return void 0===t&&(t={}),function(e,o){a(t,e,o),Object(r.a)((function(e,o){(e.props||(e.props={}))[o]=t}))(e,o)}}function s(t,e){void 0===e&&(e={});var o=e.deep,n=void 0!==o&&o,i=e.immediate,a=void 0!==i&&i;return Object(r.a)((function(e,o){"object"!=typeof e.watch&&(e.watch=Object.create(null));var r=e.watch;"object"!=typeof r[t]||Array.isArray(r[t])?void 0===r[t]&&(r[t]=[]):r[t]=[r[t]],r[t].push({handler:o,deep:n,immediate:a})}))}},769:function(t,e,o){var n=o(781);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,o(236).default)("6a5ed7fa",n,!1,{})},774:function(t,e,o){var n=o(795);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,o(236).default)("21cd6e86",n,!1,{})},780:function(t,e,o){"use strict";var n=o(769);o.n(n).a},781:function(t,e,o){(e=o(234)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,".technology-badge[data-v-20c20aa0],.technology-badge>div[data-v-20c20aa0]{display:block;background-color:#38944e;height:50px;width:50px}.technology-badge__icon[data-v-20c20aa0]{pointer-events:none;height:50px;width:50px}\n",""]),t.exports=e},785:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.isRelative?o("router-link",{attrs:{to:t.toUrl.pathname}},[t._t("default",[t._v(t._s(t.toUrl.pathname))])],2):o("a",{attrs:{href:t.toUrl.href}},[t._t("default",[t._v(t._s(t.toUrl.href))])],2)};n._withStripped=!0;var r,i,a,c,s,l,p=o(98),u=o.n(p),d=o(99),h=o.n(d),f=(o(345),o(767));var g=(r=Object(f.b)(void 0),i=Object(f.b)({required:!1,type:String}),Object(f.a)((c=class extends f.c{constructor(...t){super(...t),u()(this,"to",s,this),u()(this,"text",l,this)}get isRelative(){return this.toUrl.host===document.location.host}get toUrl(){return new URL(this.to.toString(),document.location.href)}},s=h()(c.prototype,"to",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),l=h()(c.prototype,"text",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=c))||a),b=o(127),v=Object(b.a)(g,n,[],!1,null,"98e317e8",null);v.options.__file="src/components/SmartLink.vue";e.a=v.exports},786:function(t,e,o){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("router-link",{staticClass:"technology-badge",attrs:{title:this.technology.name,to:"/technologies/"+this.technology.urlSafeName}},[e("div",{domProps:{innerHTML:this._s(this.svg)}})])};n._withStripped=!0;var r,i,a,c,s,l=o(98),p=o.n(l),u=o(99),d=o.n(u),h=(o(345),o(37)),f=o(85),g=o(767);var b=(r=Object(g.b)(Object),i=Object(g.d)("technology",{}),Object(f.b)((c=class t extends h.a{constructor(...t){super(...t),p()(this,"technology",s,this),this.svg=""}onTechnologyChanged(){this.updateSvg()}created(){this.updateSvg()}updateSvg(){new Promise((e,o)=>{let n=this.technology.iconUrl;null!=n?t.fetchSvgFromUrl(n).then(t=>{e(t)}).catch(t=>{o('The following error occurred when trying to load "'.concat(n,'":\n\n ').concat(t.message))}):e()}).then(t=>{this.svg=t}).catch(t=>{this.svg="",console.error(t)})}static fetchSvgFromUrl(t){let e=new Request(t.href);return fetch(e).then(e=>{if(!e.ok)throw new Error("HTTP Error loading ".concat(t.href,": ").concat(e.statusText));return e.text()})}},s=d()(c.prototype,"technology",[r],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),d()(c.prototype,"onTechnologyChanged",[i],Object.getOwnPropertyDescriptor(c.prototype,"onTechnologyChanged"),c.prototype),a=c))||a),v=(o(780),o(127)),_=Object(v.a)(b,n,[],!1,null,"20c20aa0",null);_.options.__file="src/components/TechnologyBadge.vue";e.a=_.exports},794:function(t,e,o){"use strict";var n=o(774);o.n(n).a},795:function(t,e,o){(e=o(234)(!1)).push([t.i,".icons[data-v-f53c7428]{display:flex;list-style:none;flex-direction:row;padding:0;margin:0}.icons__item[data-v-f53c7428]{height:50px;width:50px;background-color:#12a112;margin-right:5px;margin-bottom:5px}@media only screen and (min-width: 650px){.icons[data-v-f53c7428]{flex-wrap:wrap;flex-direction:row-reverse;max-width:calc((50px + 5px) * 3)}.icons__item[data-v-f53c7428]{margin-left:5px;margin-right:0}}.icons__icon[data-v-f53c7428]{height:50px;width:50px}a[data-v-f53c7428]{display:block;height:50px;width:50px}object[data-v-f53c7428]{pointer-events:none}\n",""]),t.exports=e},796:function(t,e,o){var n=o(844);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,o(236).default)("1ef05fea",n,!1,{})},797:function(t,e,o){var n=o(846);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,o(236).default)("5fd3508f",n,!1,{})},819:function(t,e,o){"use strict";var n=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("ul",{staticClass:"icons"},this._l(this.project.technologies,(function(t,o){return e("li",{key:o,staticClass:"icons__item"},[e("TechnologyBadge",{attrs:{technology:t}})],1)})),0)])};n._withStripped=!0;var r,i,a,c,s,l=o(98),p=o.n(l),u=o(99),d=o.n(u),h=(o(345),o(37)),f=o(85),g=o(786),b=o(767);var v=(r=Object(f.b)({components:{TechnologyBadge:g.a}}),i=Object(b.b)(Object),r((c=class extends h.a{constructor(...t){super(...t),p()(this,"project",s,this)}},s=d()(c.prototype,"project",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=c))||a),_=(o(794),o(127)),m=Object(_.a)(v,n,[],!1,null,"f53c7428",null);m.options.__file="src/components/ProjectTechnologyList.vue";e.a=m.exports},839:function(t,e,o){"use strict";var n=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("div",{staticClass:"project__header"},[o("ProjectTechnologyList",{staticClass:"tech-list tech-list--float",attrs:{project:t.project}}),t._v(" "),o("h3",{staticClass:"project__header__title",attrs:{id:t.project.urlSafeName}},[t._v(t._s(t.project.name))]),t._v(" "),o("ProjectTechnologyList",{staticClass:"tech-list tech-list--under",attrs:{project:t.project}}),t._v(" "),o("p",[t._v(t._s(t.project.short))])],1),t._v(" "),t.project.longMdUrl?o("router-link",{staticClass:"button",attrs:{to:"/projects/"+t.project.urlSafeName}},[t._v("\n    Read more\n  ")]):t._e(),t._v(" "),t.project.siteUrl?o("a",{staticClass:"button",attrs:{href:t.project.siteUrl}},[t._v("Project site")]):t._e(),t._v(" "),t.project.gitUrl?o("a",{staticClass:"button",attrs:{href:t.project.gitUrl}},[t._v("Git repository")]):t._e(),t._v(" "),null!==t.project.imgUrl?o("figure",[o("img",{attrs:{src:t.project.imgUrl}})]):t._e()],1)};n._withStripped=!0;var r=o(98),i=o.n(r),a=o(99),c=o.n(a),s=(o(345),o(767)),l=o(819),p=function(){var t=this,e=t.$createElement,o=t._self._c||e;return t.links.length>0?o("ul",{staticClass:"button-group"},t._l(t.links,(function(e){return o("SmartLink",{key:e.name,staticClass:"button-group__text",attrs:{to:e.location}},[t._v("\n    "+t._s(e.name)+"\n  ")])})),1):t._e()};p._withStripped=!0;var u,d,h,f,g,b=o(785);var v=(u=Object(s.a)({components:{SmartLink:b.a}}),d=Object(s.b)(Array),u((f=class extends s.c{constructor(...t){super(...t),i()(this,"links",g,this)}},g=c()(f.prototype,"links",[d],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),h=f))||h),_=(o(843),o(127)),m=Object(_.a)(v,p,[],!1,null,"cfaec5d4",null);m.options.__file="src/components/ButtonGroup.vue";var y,x,j,w,O,k=m.exports;var S=(y=Object(s.a)({components:{ProjectTechnologyList:l.a,ButtonGroup:k}}),x=Object(s.b)(void 0),y((w=class extends s.c{constructor(...t){super(...t),i()(this,"project",O,this)}},O=c()(w.prototype,"project",[x],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),j=w))||j),U=(o(845),Object(_.a)(S,n,[],!1,null,"35e13bbc",null));U.options.__file="src/components/ProjectShort.vue";e.a=U.exports},843:function(t,e,o){"use strict";var n=o(796);o.n(n).a},844:function(t,e,o){(e=o(234)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,'.button-group[data-v-cfaec5d4]{font-family:"Open Sans",sans-serif;display:inline-block;background-color:#38944e;border-radius:28px;cursor:pointer;margin-bottom:2em;box-shadow:6px 4px 12px 0px rgba(0,0,0,0.75);padding:0;list-style-type:none}.button-group .button-group__text[data-v-cfaec5d4]{display:inline-block;color:#ffffff;font-size:16px;text-decoration:none;padding:10px 25px}.button-group .button-group__text[data-v-cfaec5d4]:not(:last-child){border-right-style:solid;border-right-width:thin}.button-group .button-group__text[data-v-cfaec5d4]:not(:first-child){border-left-style:solid;border-left-width:thin}\n',""]),t.exports=e},845:function(t,e,o){"use strict";var n=o(797);o.n(n).a},846:function(t,e,o){(e=o(234)(!1)).push([t.i,"@import url(https://fonts.googleapis.com/css?family=Open+Sans|Quicksand:400);"]),e.push([t.i,"figure[data-v-35e13bbc]{max-width:100%;margin:0}img[data-v-35e13bbc]{max-width:100%}.project__header .project__header__title[data-v-35e13bbc]{font-size:2rem;margin-bottom:0.5em;margin-top:0.2em}.tech-list--float[data-v-35e13bbc]{display:none}.tech-list--under[data-v-35e13bbc]{display:block}@media only screen and (min-width: 650px){.tech-list--float[data-v-35e13bbc]{display:block;float:right}.tech-list--under[data-v-35e13bbc]{display:none}}\n",""]),t.exports=e}}]);