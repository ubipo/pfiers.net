import{g as l}from"./load.9a64d90f.js";import{T as s}from"./index.9b0db671.js";import{a as c}from"./pageSpecificMetadata.1999f404.js";const i=async({fetch:o,route:{id:r}})=>{const{contentStore:t,contentError:a}=await l(o);if(t==null)return{contentError:a};const e=s(t).technologies;return await Promise.all(e.map(async n=>{c(r,o,n)})),{technologies:e}},u=Object.freeze(Object.defineProperty({__proto__:null,load:i},Symbol.toStringTag,{value:"Module"}));export{u as _,i as l};
