(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{779:function(t,e,a){"use strict";a.d(e,"a",(function(){return o}));var r,s=a(37),i=a(85),n=a(83);let o=Object(i.b)(r=class extends s.a{constructor(...t){super(...t),this.grid=void 0,this.cards=[],this.rowHeight=0,this.rowGap=0}cardGridInit(){this.grid=document.getElementsByClassName("card-grid")[0],this.cards=Array.from(this.grid.getElementsByClassName("card")),this.rowHeight=parseInt(window.getComputedStyle(this.grid).getPropertyValue("grid-auto-rows")),this.rowGap=parseInt(window.getComputedStyle(this.grid).getPropertyValue("grid-row-gap"));for(const t of Array.from(this.grid.getElementsByTagName("img")))t.addEventListener("load",()=>this.resizeAllCards());window.addEventListener("resize",()=>this.resizeAllCards()),this.resizeAllCards()}resizeCard(t){const e=t.getElementsByClassName("card__content")[0];if(null==e)throw new n.a("Illegal layout; no content within card");const a=e.getBoundingClientRect().height,r=Math.ceil((a+this.rowGap)/(this.rowHeight+this.rowGap))+1;t.style.gridRowEnd="span ".concat(r)}resizeAllCards(){for(const t of this.cards)this.resizeCard(t)}})||r},798:function(t,e,a){var r=a(848);"string"==typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);(0,a(236).default)("09ffeedd",r,!1,{})},847:function(t,e,a){"use strict";var r=a(798);a.n(r).a},848:function(t,e,a){(e=a(234)(!1)).push([t.i,"figure[data-v-487a0b5a]{max-width:100%;margin:0}img[data-v-487a0b5a]{max-width:100%}object[data-v-487a0b5a]{background-color:rebeccapurple}.project__title[data-v-487a0b5a]{font-size:2rem;margin-bottom:0.5em}\n",""]),t.exports=e},935:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"card-grid"},this._l(this.siteData.projects,(function(t){return e("article",{key:t.name,staticClass:"card"},[e("div",{staticClass:"card__content"},[e("ProjectShort",{attrs:{project:t}})],1)])})),0)};r._withStripped=!0;var s,i,n,o,c,d=a(98),l=a.n(d),h=a(99),u=a.n(h),g=(a(345),a(767)),p=a(85),w=a(839),m=a(238),f=a(779);const b=Object(m.a)("siteData");var v=(s=Object(g.a)({components:{ProjectShort:w.a}}),i=b.Getter("data"),s((o=class extends(Object(p.c)(f.a)){constructor(...t){super(...t),l()(this,"siteData",c,this)}mounted(){this.cardGridInit()}},c=u()(o.prototype,"siteData",[i],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),n=o))||n),y=(a(847),a(127)),C=Object(y.a)(v,r,[],!1,null,"487a0b5a",null);C.options.__file="src/components/Projects.vue";e.default=C.exports}}]);