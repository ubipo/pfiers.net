import{g as n}from"./load.71429c28.js";import{T as s}from"./index.9b0db671.js";import{p as i}from"./pageSpecificMetadataStore.4c0ed160.js";const l=async({fetch:o,route:{id:r}})=>{const{contentStore:t,contentError:a}=await n(o);if(t==null)return{contentError:a};const e=s(t).home;return await i(r,o,e.tokens),{home:e}},u=Object.freeze(Object.defineProperty({__proto__:null,load:l},Symbol.toStringTag,{value:"Module"}));export{u as _,l};