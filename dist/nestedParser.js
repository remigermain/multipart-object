!function(t,i){"object"==typeof exports&&"undefined"!=typeof module?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i((t="undefined"!=typeof globalThis?globalThis:t||self).nestedMultiParser={})}(this,(function(t){"use strict";const i={separator:"mixedDot",throwDuplicate:!0,assignDuplicate:!1};function e(t){return"number"==typeof t||e._isDigit.test(t)}e._isDigit=new RegExp(/^\d+$/);t.NestedParser=class{constructor(t,e=i){this.data=t,this._valid=null,this._validateData={},this._errors=null,this.options=Object.assign(Object.assign({},i),e),this.isDot="dot"===this.options.separator,this.isMixed="mixed"===this.options.separator,this.isMixedDot="mixedDot"===this.options.separator,this.isMixedDot&&(this.isMixed=!0)}mixedSplit(t){function i(t,i){const e=i;for(;i!=t.length&&"."!=t[i]&&"]"!=t[i]&&"["!=t[i];)i++;if(e==i)throw new Error(`invalid format key '${s}', empty key value at position ${i+o}`);return i}const s=t;let r=i(t,0);const o=r,n=[t.substring(0,r)];t=t.substring(r,t.length);let a=0,h=!1;for(;a<t.length;)if("["==t[a]){if(a++,r=i(t,a),"]"!=t[r])throw new Error(`invalid format key '${s}', not end with bracket at position ${a+o}`);if(!e(t.substring(a,r)))throw new Error(`invalid format key '${s}', list key is not a valid number at position ${a+o}`);n.push(parseInt(t.substring(a,r))),a=r+1,h=!0}else{if("]"==t[a])throw new Error(`invalid format key '${s}', not start with bracket at position ${a+o}`);if(!("."==t[a]&&this.isMixedDot||!this.isMixedDot&&("."!=t[a]&&h||"."==t[a]&&!h)))throw new Error(`invalid format key '${s}', invalid char at position ${a+o}`);!this.isMixedDot&&h||a++,r=i(t,a),n.push(t.substring(a,r)),a=r,h=!1}return n}splitKey(t){if(t.replace(/\s+/g,"").length!=t.length)throw new Error(`key '${t}' is wrong formated, no space available`);if(this.isMixed)return this.mixedSplit(t);const i=this.isDot?/\./g:/\[|\]/g,e=this.isDot?1:2;let s=-e;const r=t.split(i).filter((t=>{if(t)return s+=t.length+e,t}));if(t.length!==s)throw new Error(`key "${t}" is wrong formated`);return r}constructDepth(t,i,e,s,r,o=!1){if(t instanceof Array){const s=this.isMixed?i:parseInt(i);if(t.length<s)throw new Error(`array indice '${s}' from key '${r}' is upper than actual array`);return t.length===s&&t.push(e),s}if(["number","string","boolean"].includes(typeof t)){if(this.options.throwDuplicate)throw new Error(`the key "${i}" as already set`);if(this.options.assignDuplicate)return(t=s.tmp)[s.key]=s.type,this.constructDepth(t[s.key],i,e,s,r,o)}else(!(i in t)||o&&this.options.assignDuplicate)&&(t[i]=e);return i}parse(t){const i={};return Object.keys(t).forEach((s=>{const r=this.splitKey(s);let o=i;const n={tmp:o,key:r[0],type:{}};for(let t=0;t<r.length-1;t++){const i=this.isMixed?"number"==typeof r[t+1]?[]:{}:e(r[t+1])?[]:{},a=this.constructDepth(o,r[t],i,n,s);n.tmp=o,n.key=a,n.type=i,o=o[a]}const a=t[s];this.constructDepth(o,r[r.length-1],a,n,s,!0)})),i}isValid(){this._valid=!1;try{this._validateData=this.parse(this.data),this._valid=!0}catch(t){this._errors=t}return this._valid}get validateData(){if(null===this._valid)throw new Error("You need to be call is_valid() before access validate_data");if(!1===this._valid)throw new Error("You can't get validate data");return this._validateData}get errors(){return this._errors}},Object.defineProperty(t,"__esModule",{value:!0})}));
