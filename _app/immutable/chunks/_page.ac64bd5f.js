import{g as a}from"./load.db7da343.js";import{e as c}from"./index.2defaa64.js";import{T as s}from"./index.9b0db671.js";const f=async({fetch:r,params:t})=>{const{contentStore:o,contentError:n}=await a(r);if(o==null)return{error:n};const e=s(o).technologies.find(l=>l.urlSafeName===t.technology);if(e==null)throw c(404,"Technology not found");return{technology:e}},m=Object.freeze(Object.defineProperty({__proto__:null,load:f},Symbol.toStringTag,{value:"Module"}));export{m as _,f as l};
