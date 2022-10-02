import{w as a}from"./index-3081dac7.js";import"./preload-helper-aa6bc0ce.js";import"./markdown-5cd79b44.js";class i extends Error{constructor(t,o=void 0){super(t),this.message=t,this.name=this.constructor.name,this.cause=o}}function f(n){return typeof n=="object"&&n!==null}function u(n){const{projects:t,technologies:o,home:e}=n;for(const r of t)r.technologies=r.technologies.map(s=>o[s]);for(const r of o)r.projects=r.projects.map(s=>t[s]);return{home:e,projects:t,technologies:o}}function l(n){const t=JSON.parse(n,(o,e)=>{if(typeof e=="string"){if(e.startsWith("s"))return e.slice(1);if(e.startsWith("u"))return new URL(e.slice(1))}return e});if(!f(t)||!Array.isArray(t.projects))throw new i(`Failed to load content from JSON: invalid format ${n}`);return u(t)}async function p(n){const t=await n("/api/content");if(!t.ok)throw new i(`Failed to load content from API: ${t.status} ${t.statusText}`);const o=await t.text();return l(o)}let c=null;async function g(n){try{return{contentStore:await h(n)}}catch(t){return console.error(`Error loading site content: ${t}`),{contentError:t}}}async function h(n){if(c!=null)return c;const t=await p(n);return c=a(t),c}export{g};