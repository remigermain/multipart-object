!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).nestedMultiPart={})}(this,(function(t){"use strict";const e={separator:"bracket"};function s(t,s=e){const i={},r="dot"==(null==(s=Object.assign(Object.assign({},e),s))?void 0:s.separator);function n(t,e){return null==t?e:r?`${t}.${e}`:`${t}[${e}]`}return function t(e,s){Object.keys(s).forEach((r=>{let o=s[r];if(o instanceof Array||o instanceof Object&&!(o instanceof Blob||o instanceof Date))t(n(e,r),s[r]);else{const t=n(e,r);i[t]=o}}))}(null,t),i}const i={separator:"bracket",throwDuplicate:!0,assignDuplicate:!1};function r(t){return r._isDigit.test(t)}r._isDigit=new RegExp(/^\d+$/);t.NestedParser=class{constructor(t,e=i){this.data=t,this._valid=null,this._validateData={},this._errors=null,this.options=Object.assign(Object.assign({},i),e),this.isDot="dot"===this.options.separator}splitKey(t){const e=this.isDot?/\./g:/\[|\]/g,s=this.isDot?1:2;let i=-s;const r=t.replace(/\s+/g,"").split(e).filter((t=>{if(t)return i+=t.length+s,t}));if(t.length!==i)throw new Error(`key "${t}" is wrong formated`);return r}constructDepth(t,e,s,i,r,n=!1){if(t instanceof Array){const i=parseInt(e);if(t.length<i)throw new Error(`array indice from key "${r}" is upper than actual array`);return t.length===i&&t.push(s),i}if(["number","string","boolean"].includes(typeof t)){if(this.options.throwDuplicate)throw new Error(`the key "${e}" as already set`);if(this.options.assignDuplicate)return(t=i.tmp)[i.key]=i.type,this.constructDepth(t[i.key],e,s,i,r,n)}else(!(e in t)||n&&this.options.assignDuplicate)&&(t[e]=s);return e}parse(t){const e={};return Object.keys(t).forEach((s=>{const i=this.splitKey(s);let n=e;const o={tmp:n,key:i[0],type:{}};for(let t=0;t<i.length-1;t++){const e=r(i[t+1])?[]:{},a=this.constructDepth(n,i[t],e,o,s);o.tmp=n,o.key=a,o.type=e,n=n[a]}const a=t[s];this.constructDepth(n,i[i.length-1],a,o,s,!0)})),e}isValid(){this._valid=!1;try{this._validateData=this.parse(this.data),this._valid=!0}catch(t){this._errors=t}return this._valid}get validateData(){if(null===this._valid)throw new Error("You need to be call is_valid() before access validate_data");if(!1===this._valid)throw new Error("You can't get validate data");return this._validateData}get errors(){return this._errors}},t.toFormData=function(t,i=e){const r=s(t,i),n=new FormData;return Object.keys(r).forEach((t=>{let e=r[t];e instanceof Blob||(e=String(e)),n.set(t,e)})),n},t.toObject=s,Object.defineProperty(t,"__esModule",{value:!0})}));