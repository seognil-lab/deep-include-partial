import{isEqual as e,isPlainObject as t,has as r,isArray as o,isObject as f}from"lodash/fp";const n=Symbol("ANY"),i=Symbol("VOID");function s(a,l,u=e){if(!t(l)||!t(a))throw"Please pass a result object and a pattern object";if("function"!=typeof u)throw"Please pass a function comparator";for(const e in l){const t=a[e],c=l[e];if(c===i){if(r(e,a))return!1}else if(c===n){if(!r(e,a))return!1}else if(o(c)){if(!o(t)||!u(t,c))return!1}else if(f(c)){if(!f(t)||!s(t,c))return!1}else if(!u(t,c))return!1}return!0}export{n as ANY,i as VOID,s as deepIncludePartial};
