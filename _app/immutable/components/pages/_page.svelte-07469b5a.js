import{S as b,i as y,s as E,a as v,k as w,U as C,h as _,c as q,l as M,m as P,n as S,b as p,t as f,d as x,f as m,g as z,v as h,w as k,x as g,y as $}from"../../chunks/index-9feb7f28.js";import{C as A}from"../../chunks/spriteIcon-670a20ed.js";import{M as F}from"../../chunks/markdown-0d1cd30c.js";function I(a){let t,n;return t=new A({props:{contentError:a[0]}}),{c(){h(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,r){g(t,e,r),n=!0},p(e,r){const s={};r&1&&(s.contentError=e[0]),t.$set(s)},i(e){n||(m(t.$$.fragment,e),n=!0)},o(e){f(t.$$.fragment,e),n=!1},d(e){$(t,e)}}}function L(a){let t,n;return t=new F({props:{tokens:a[1].tokens}}),{c(){h(t.$$.fragment)},l(e){k(t.$$.fragment,e)},m(e,r){g(t,e,r),n=!0},p(e,r){const s={};r&2&&(s.tokens=e[1].tokens),t.$set(s)},i(e){n||(m(t.$$.fragment,e),n=!0)},o(e){f(t.$$.fragment,e),n=!1},d(e){$(t,e)}}}function R(a){let t,n,e,r,s;const u=[L,I],c=[];function d(o,l){return o[1]!=null?0:1}return e=d(a),r=c[e]=u[e](a),{c(){t=v(),n=w("article"),r.c(),this.h()},l(o){C('[data-svelte="svelte-2z1el3"]',document.head).forEach(_),t=q(o),n=M(o,"ARTICLE",{class:!0});var i=P(n);r.l(i),i.forEach(_),this.h()},h(){document.title="Pieter Fiers",S(n,"class","svelte-1gs85eq")},m(o,l){p(o,t,l),p(o,n,l),c[e].m(n,null),s=!0},p(o,[l]){let i=e;e=d(o),e===i?c[e].p(o,l):(z(),f(c[i],1,1,()=>{c[i]=null}),x(),r=c[e],r?r.p(o,l):(r=c[e]=u[e](o),r.c()),m(r,1),r.m(n,null))},i(o){s||(m(r),s=!0)},o(o){f(r),s=!1},d(o){o&&_(t),o&&_(n),c[e].d()}}}function T(a,t,n){let e,r,{data:s}=t;return a.$$set=u=>{"data"in u&&n(2,s=u.data)},a.$$.update=()=>{a.$$.dirty&4&&n(1,{home:e,contentError:r}=s,e,(n(0,r),n(2,s)))},[r,e,s]}class D extends b{constructor(t){super(),y(this,t,T,R,E,{data:2})}}export{D as default};