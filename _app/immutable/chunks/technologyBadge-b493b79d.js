import{S as h,i as m,s as _,k as g,v as u,l as y,m as d,w as z,h as r,n as c,p as f,b as p,x as S,f as v,t as I,y as E}from"./index-610a675f.js";import{S as N,D as T}from"./spriteIcon-d78e27fb.js";function $(a){let n,t,i,o;return t=new N({props:{size:a[1],iconId:a[0].icon}}),{c(){n=g("a"),u(t.$$.fragment),this.h()},l(e){n=y(e,"A",{href:!0,class:!0});var s=d(n);z(t.$$.fragment,s),s.forEach(r),this.h()},h(){c(n,"href",i=`/technologies/${a[0].urlSafeName}`),c(n,"class","svelte-1sn1hid"),f(n,"--icon-size",a[1],!1)},m(e,s){p(e,n,s),S(t,n,null),o=!0},p(e,[s]){const l={};s&2&&(l.size=e[1]),s&1&&(l.iconId=e[0].icon),t.$set(l),(!o||s&1&&i!==(i=`/technologies/${e[0].urlSafeName}`))&&c(n,"href",i),s&2&&f(n,"--icon-size",e[1],!1)},i(e){o||(v(t.$$.fragment,e),o=!0)},o(e){I(t.$$.fragment,e),o=!1},d(e){e&&r(n),E(t)}}}function w(a,n,t){let{technology:i}=n,{size:o=T}=n;return a.$$set=e=>{"technology"in e&&t(0,i=e.technology),"size"in e&&t(1,o=e.size)},[i,o]}class C extends h{constructor(n){super(),m(this,n,w,$,_,{technology:0,size:1})}}export{C as T};