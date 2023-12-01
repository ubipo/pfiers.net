import{S as M,i as L,s as q,k as m,l as g,m as d,h as u,n as h,p as C,b as p,g as c,v,f as k,d as _,J as W,y as b,z as S,A as y,B as E,a as R,e as z,c as B,q as j,r as U,E as $}from"./index.9b0db671.js";import{T as F}from"./technologyBadge.a901ffea.js";import{D as J,S as N}from"./spriteIcon.d7130a3c.js";function I(a,l,o){const s=a.slice();return s[2]=l[o],s}function P(a){let l,o,s;return o=new F({props:{technology:a[2]}}),{c(){l=m("li"),b(o.$$.fragment),this.h()},l(r){l=g(r,"LI",{class:!0});var i=d(l);S(o.$$.fragment,i),i.forEach(u),this.h()},h(){h(l,"class","svelte-dika0a")},m(r,i){p(r,l,i),y(o,l,null),s=!0},p(r,i){const n={};i&1&&(n.technology=r[2]),o.$set(n)},i(r){s||(c(o.$$.fragment,r),s=!0)},o(r){_(o.$$.fragment,r),s=!1},d(r){r&&u(l),E(o)}}}function O(a){let l,o,s=a[0],r=[];for(let n=0;n<s.length;n+=1)r[n]=P(I(a,s,n));const i=n=>_(r[n],1,1,()=>{r[n]=null});return{c(){l=m("ul");for(let n=0;n<r.length;n+=1)r[n].c();this.h()},l(n){l=g(n,"UL",{class:!0});var t=d(l);for(let e=0;e<r.length;e+=1)r[e].l(t);t.forEach(u),this.h()},h(){h(l,"class","technology-icons svelte-dika0a"),C(l,"--icon-size",a[1])},m(n,t){p(n,l,t);for(let e=0;e<r.length;e+=1)r[e].m(l,null);o=!0},p(n,[t]){if(t&1){s=n[0];let e;for(e=0;e<s.length;e+=1){const f=I(n,s,e);r[e]?(r[e].p(f,t),c(r[e],1)):(r[e]=P(f),r[e].c(),c(r[e],1),r[e].m(l,null))}for(v(),e=s.length;e<r.length;e+=1)i(e);k()}},i(n){if(!o){for(let t=0;t<s.length;t+=1)c(r[t]);o=!0}},o(n){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)_(r[t]);o=!1},d(n){n&&u(l),W(r,n)}}}function Z(a,l,o){let{technologies:s}=l;const r=J;return a.$$set=i=>{"technologies"in i&&o(0,s=i.technologies)},[s,r]}class X extends M{constructor(l){super(),L(this,l,Z,O,q,{technologies:0})}}function w(a){let l,o,s,r,i,n;return s=new N({props:{iconId:"read-more",size:A}}),{c(){l=m("a"),o=m("span"),b(s.$$.fragment),r=j(`
    Read more`),this.h()},l(t){l=g(t,"A",{href:!0,class:!0});var e=d(l);o=g(e,"SPAN",{class:!0});var f=d(o);S(s.$$.fragment,f),f.forEach(u),r=U(e,`
    Read more`),e.forEach(u),this.h()},h(){h(o,"class","svelte-tpkifx"),h(l,"href",i=`/projects/${a[0].uriSafeName}`),h(l,"class","button svelte-tpkifx")},m(t,e){p(t,l,e),$(l,o),y(s,o,null),$(l,r),n=!0},p(t,e){(!n||e&1&&i!==(i=`/projects/${t[0].uriSafeName}`))&&h(l,"href",i)},i(t){n||(c(s.$$.fragment,t),n=!0)},o(t){_(s.$$.fragment,t),n=!1},d(t){t&&u(l),E(s)}}}function T(a){let l,o,s,r,i,n;return s=new N({props:{iconId:"arrow-out",size:A}}),{c(){l=m("a"),o=m("span"),b(s.$$.fragment),r=j(`
    Website`),this.h()},l(t){l=g(t,"A",{href:!0,class:!0});var e=d(l);o=g(e,"SPAN",{class:!0});var f=d(o);S(s.$$.fragment,f),f.forEach(u),r=U(e,`
    Website`),e.forEach(u),this.h()},h(){h(o,"class","svelte-tpkifx"),h(l,"href",i=a[0].siteUrl.toString()),h(l,"class","button svelte-tpkifx")},m(t,e){p(t,l,e),$(l,o),y(s,o,null),$(l,r),n=!0},p(t,e){(!n||e&1&&i!==(i=t[0].siteUrl.toString()))&&h(l,"href",i)},i(t){n||(c(s.$$.fragment,t),n=!0)},o(t){_(s.$$.fragment,t),n=!1},d(t){t&&u(l),E(s)}}}function D(a){let l,o,s,r,i,n;return s=new N({props:{iconId:"git",size:A}}),{c(){l=m("a"),o=m("span"),b(s.$$.fragment),r=j(`
    Repository`),this.h()},l(t){l=g(t,"A",{href:!0,class:!0});var e=d(l);o=g(e,"SPAN",{class:!0});var f=d(o);S(s.$$.fragment,f),f.forEach(u),r=U(e,`
    Repository`),e.forEach(u),this.h()},h(){h(o,"class","svelte-tpkifx"),h(l,"href",i=a[0].gitUrl.toString()),h(l,"class","button svelte-tpkifx")},m(t,e){p(t,l,e),$(l,o),y(s,o,null),$(l,r),n=!0},p(t,e){(!n||e&1&&i!==(i=t[0].gitUrl.toString()))&&h(l,"href",i)},i(t){n||(c(s.$$.fragment,t),n=!0)},o(t){_(s.$$.fragment,t),n=!1},d(t){t&&u(l),E(s)}}}function G(a){let l,o,s,r,i=a[1]&&a[0].longDescription!=null&&w(a),n=a[0].siteUrl!=null&&T(a),t=a[0].gitUrl!=null&&D(a);return{c(){i&&i.c(),l=R(),n&&n.c(),o=R(),t&&t.c(),s=z()},l(e){i&&i.l(e),l=B(e),n&&n.l(e),o=B(e),t&&t.l(e),s=z()},m(e,f){i&&i.m(e,f),p(e,l,f),n&&n.m(e,f),p(e,o,f),t&&t.m(e,f),p(e,s,f),r=!0},p(e,[f]){e[1]&&e[0].longDescription!=null?i?(i.p(e,f),f&3&&c(i,1)):(i=w(e),i.c(),c(i,1),i.m(l.parentNode,l)):i&&(v(),_(i,1,1,()=>{i=null}),k()),e[0].siteUrl!=null?n?(n.p(e,f),f&1&&c(n,1)):(n=T(e),n.c(),c(n,1),n.m(o.parentNode,o)):n&&(v(),_(n,1,1,()=>{n=null}),k()),e[0].gitUrl!=null?t?(t.p(e,f),f&1&&c(t,1)):(t=D(e),t.c(),c(t,1),t.m(s.parentNode,s)):t&&(v(),_(t,1,1,()=>{t=null}),k())},i(e){r||(c(i),c(n),c(t),r=!0)},o(e){_(i),_(n),_(t),r=!1},d(e){i&&i.d(e),e&&u(l),n&&n.d(e),e&&u(o),t&&t.d(e),e&&u(s)}}}const A="1.3em";function H(a,l,o){let{project:s}=l,{includeReadMore:r}=l;return a.$$set=i=>{"project"in i&&o(0,s=i.project),"includeReadMore"in i&&o(1,r=i.includeReadMore)},[s,r]}class Y extends M{constructor(l){super(),L(this,l,H,G,q,{project:0,includeReadMore:1})}}export{X as P,Y as a};