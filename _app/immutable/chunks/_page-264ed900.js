import{g as l}from"./load-d6156b17.js";import{e as c}from"./index-07d89891.js";import{a3 as s}from"./index-9feb7f28.js";const f=async({fetch:r,params:t})=>{const{contentStore:o,contentError:n}=await l(r);if(o==null)return{error:n};const e=s(o).technologies.find(a=>a.urlSafeName===t.technology);if(e==null)throw c(404,"Technology not found");return{technology:e}},m=Object.freeze(Object.defineProperty({__proto__:null,load:f},Symbol.toStringTag,{value:"Module"}));export{m as _,f as l};