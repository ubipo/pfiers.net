import{g as l}from"./load-e07c3ad9.js";import{e as c}from"./index-07d89891.js";import{a1 as s}from"./index-610a675f.js";const f=async({fetch:r,params:t})=>{const{contentStore:o,contentError:n}=await l(r);if(o==null)return{error:n};const e=s(o).technologies.find(a=>a.urlSafeName===t.technology);if(e==null)throw c(404,"Technology not found");return{technology:e}},m=Object.freeze(Object.defineProperty({__proto__:null,load:f},Symbol.toStringTag,{value:"Module"}));export{m as _,f as l};