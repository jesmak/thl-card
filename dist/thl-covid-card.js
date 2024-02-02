function t(t,e,s,i){var a,n=arguments.length,l=n<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(t,e,s,i);else for(var o=t.length-1;o>=0;o--)(a=t[o])&&(l=(n<3?a(l):n>3?a(e,s,l):a(e,s))||l);return n>3&&l&&Object.defineProperty(e,s,l),l}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),a=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=a.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&a.set(e,t))}return t}toString(){return this.cssText}};const l=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new n(s,t,i)},o=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:r,defineProperty:h,getOwnPropertyDescriptor:p,getOwnPropertyNames:c,getOwnPropertySymbols:d,getPrototypeOf:u}=Object,_=globalThis,m=_.trustedTypes,g=m?m.emptyScript:"",f=_.reactiveElementPolyfillSupport,$=(t,e)=>t,y={toAttribute(t,e){switch(e){case Boolean:t=t?g:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},C=(t,e)=>!r(t,e),v={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:C};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;class A extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=v){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:a}=p(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return i?.call(this)},set(e){const n=i?.call(this);a.call(this,e),this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??v}static _$Ei(){if(this.hasOwnProperty($("elementProperties")))return;const t=u(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty($("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty($("properties"))){const t=this.properties,e=[...c(t),...d(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(o(t))}else void 0!==t&&e.push(o(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$ES(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$E_??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$E_?.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,i)=>{if(s)t.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const s of i){const i=document.createElement("style"),a=e.litNonce;void 0!==a&&i.setAttribute("nonce",a),i.textContent=s.cssText,t.appendChild(i)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$E_?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$E_?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const a=(void 0!==s.converter?.toAttribute?s.converter:y).toAttribute(e,s.type);this._$Em=t,null==a?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),a="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:y;this._$Em=i,this[i]=a.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,s){if(void 0!==t){if(s??=this.constructor.getPropertyOptions(t),!(s.hasChanged??C)(this[t],e))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$Eg=this._$EP())}C(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$Em!==t&&(this._$ET??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t)!0!==s.wrapped||this._$AL.has(e)||void 0===this[e]||this.C(e,this[e],s)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$E_?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$Ej()}catch(e){throw t=!1,this._$Ej(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$E_?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ej(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$ET&&=this._$ET.forEach((t=>this._$EO(t,this[t]))),this._$Ej()}updated(t){}firstUpdated(t){}}A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[$("elementProperties")]=new Map,A[$("finalized")]=new Map,f?.({ReactiveElement:A}),(_.reactiveElementVersions??=[]).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const k=globalThis,w=k.trustedTypes,b=w?w.createPolicy("lit-html",{createHTML:t=>t}):void 0,x="$lit$",L=`lit$${(Math.random()+"").slice(9)}$`,S="?"+L,E=`<${S}>`,M=document,j=()=>M.createComment(""),z=t=>null===t||"object"!=typeof t&&"function"!=typeof t,P=Array.isArray,O="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,T=/-->/g,H=/>/g,F=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),R=/'/g,N=/"/g,D=/^(?:script|style|textarea|title)$/i,V=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),I=Symbol.for("lit-noChange"),B=Symbol.for("lit-nothing"),W=new WeakMap,q=M.createTreeWalker(M,129);function K(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==b?b.createHTML(e):e}const J=(t,e)=>{const s=t.length-1,i=[];let a,n=2===e?"<svg>":"",l=U;for(let e=0;e<s;e++){const s=t[e];let o,r,h=-1,p=0;for(;p<s.length&&(l.lastIndex=p,r=l.exec(s),null!==r);)p=l.lastIndex,l===U?"!--"===r[1]?l=T:void 0!==r[1]?l=H:void 0!==r[2]?(D.test(r[2])&&(a=RegExp("</"+r[2],"g")),l=F):void 0!==r[3]&&(l=F):l===F?">"===r[0]?(l=a??U,h=-1):void 0===r[1]?h=-2:(h=l.lastIndex-r[2].length,o=r[1],l=void 0===r[3]?F:'"'===r[3]?N:R):l===N||l===R?l=F:l===T||l===H?l=U:(l=F,a=void 0);const c=l===F&&t[e+1].startsWith("/>")?" ":"";n+=l===U?s+E:h>=0?(i.push(o),s.slice(0,h)+x+s.slice(h)+L+c):s+L+(-2===h?e:c)}return[K(t,n+(t[s]||"<?>")+(2===e?"</svg>":"")),i]};class Z{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let a=0,n=0;const l=t.length-1,o=this.parts,[r,h]=J(t,e);if(this.el=Z.createElement(r,s),q.currentNode=this.el.content,2===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=q.nextNode())&&o.length<l;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(x)){const e=h[n++],s=i.getAttribute(t).split(L),l=/([.?@])?(.*)/.exec(e);o.push({type:1,index:a,name:l[2],strings:s,ctor:"."===l[1]?tt:"?"===l[1]?et:"@"===l[1]?st:Y}),i.removeAttribute(t)}else t.startsWith(L)&&(o.push({type:6,index:a}),i.removeAttribute(t));if(D.test(i.tagName)){const t=i.textContent.split(L),e=t.length-1;if(e>0){i.textContent=w?w.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],j()),q.nextNode(),o.push({type:2,index:++a});i.append(t[e],j())}}}else if(8===i.nodeType)if(i.data===S)o.push({type:2,index:a});else{let t=-1;for(;-1!==(t=i.data.indexOf(L,t+1));)o.push({type:7,index:a}),t+=L.length-1}a++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function G(t,e,s=t,i){if(e===I)return e;let a=void 0!==i?s._$Co?.[i]:s._$Cl;const n=z(e)?void 0:e._$litDirective$;return a?.constructor!==n&&(a?._$AO?.(!1),void 0===n?a=void 0:(a=new n(t),a._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=a:s._$Cl=a),void 0!==a&&(e=G(t,a._$AS(t,e.values),a,i)),e}class Q{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??M).importNode(e,!0);q.currentNode=i;let a=q.nextNode(),n=0,l=0,o=s[0];for(;void 0!==o;){if(n===o.index){let e;2===o.type?e=new X(a,a.nextSibling,this,t):1===o.type?e=new o.ctor(a,o.name,o.strings,this,t):6===o.type&&(e=new it(a,this,t)),this._$AV.push(e),o=s[++l]}n!==o?.index&&(a=q.nextNode(),n++)}return q.currentNode=M,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=B,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),z(t)?t===B||null==t||""===t?(this._$AH!==B&&this._$AR(),this._$AH=B):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>P(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==B&&z(this._$AH)?this._$AA.nextSibling.data=t:this.$(M.createTextNode(t)),this._$AH=t}g(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Z.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new Q(i,this),s=t.u(this.options);t.p(e),this.$(s),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new Z(t)),e}T(t){P(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const a of t)i===e.length?e.push(s=new X(this.k(j()),this.k(j()),this,this.options)):s=e[i],s._$AI(a),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,a){this.type=1,this._$AH=B,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=a,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=B}_$AI(t,e=this,s,i){const a=this.strings;let n=!1;if(void 0===a)t=G(this,t,e,0),n=!z(t)||t!==this._$AH&&t!==I,n&&(this._$AH=t);else{const i=t;let l,o;for(t=a[0],l=0;l<a.length-1;l++)o=G(this,i[s+l],e,l),o===I&&(o=this._$AH[l]),n||=!z(o)||o!==this._$AH[l],o===B?t=B:t!==B&&(t+=(o??"")+a[l+1]),this._$AH[l]=o}n&&!i&&this.O(t)}O(t){t===B?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class tt extends Y{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===B?void 0:t}}class et extends Y{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==B)}}class st extends Y{constructor(t,e,s,i,a){super(t,e,s,i,a),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??B)===I)return;const s=this._$AH,i=t===B&&s!==B||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,a=t!==B&&(s===B||i);i&&this.element.removeEventListener(this.name,this,s),a&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const at=k.litHtmlPolyfillSupport;at?.(Z,X),(k.litHtmlVersions??=[]).push("3.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class nt extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let a=i._$litPart$;if(void 0===a){const t=s?.renderBefore??null;i._$litPart$=a=new X(e.insertBefore(j(),t),t,void 0,s??{})}return a._$AI(t),a})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}}nt._$litElement$=!0,nt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:nt});const lt=globalThis.litElementPolyfillSupport;
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ot(t,e,s){return t?e(t):s?.(t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */lt?.({LitElement:nt}),(globalThis.litElementVersions??=[]).push("4.0.3");const rt={attribute:!0,type:String,converter:y,reflect:!1,hasChanged:C},ht=(t=rt,e,s)=>{const{kind:i,metadata:a}=s;let n=globalThis.litPropertyMetadata.get(a);if(void 0===n&&globalThis.litPropertyMetadata.set(a,n=new Map),n.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const a=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,a,t)},init(e){return void 0!==e&&this.C(i,void 0,t),e}}}if("setter"===i){const{name:i}=s;return function(s){const a=this[i];e.call(this,s),this.requestUpdate(i,a,t)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function pt(t){return(e,s)=>"object"==typeof s?ht(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,i?{...t,wrapped:!0}:t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var ct,dt;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(ct||(ct={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(dt||(dt={}));var ut="Version",_t="Invalid configuration",mt="THL's Covid-19 stats from Finland",gt="THL Covid-19 stats",ft="COVID-19 stats",$t="Change",yt="Last week",Ct="Two weeks ago",vt="Whole country",At={version:ut,invalid_configuration:_t,description:mt,name:gt,title:ft,change:$t,last_week:yt,two_weeks_ago:Ct,whole_country:vt},kt="Versio",wt="Virheellinen konfiguraatio",bt="THL:n Covid-19 tilastot",xt="THL Covid-19 tilastot",Lt="COVID-19-tilanne",St="Muutos",Et="Viime viikko",Mt="Toissa viikko",jt="Koko maa",zt={version:kt,invalid_configuration:wt,description:bt,name:xt,title:Lt,change:St,last_week:Et,two_weeks_ago:Mt,whole_country:jt};const Pt={en:Object.freeze({__proto__:null,change:$t,default:At,description:mt,invalid_configuration:_t,last_week:yt,name:gt,title:ft,two_weeks_ago:Ct,version:ut,whole_country:vt}),fi:Object.freeze({__proto__:null,change:St,default:zt,description:bt,invalid_configuration:wt,last_week:Et,name:xt,title:Lt,two_weeks_ago:Mt,version:kt,whole_country:jt})};function Ot(t,e="",s=""){var i;let a,n=null===(i=localStorage.getItem("selectedLanguage"))||void 0===i?void 0:i.replace(/['"]+/g,"").replace("-","_");if(!n||"null"===n){const t=document.querySelector("home-assistant").hass;n=t.selectedLanguage||t.language||"en"}try{a=t.split(".").reduce(((t,e)=>t[e]),Pt[n])}catch(e){a=t.split(".").reduce(((t,e)=>t[e]),Pt.en)}return void 0===a&&(a=t.split(".").reduce(((t,e)=>t[e]),Pt.en)),""!==e&&""!==s&&(a=a.replace(e,s)),a}console.info(`%c  THL-COVID-CARD  \n%c  ${Ot("version")} 1.0.1    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"thl-covid-card",name:Ot("name"),description:Ot("description")});let Ut=class extends nt{constructor(){super(...arguments),this.latestWeek=0,this.wholeFinland={area_id:"finland"},this.selectedArea={area_id:""}}static getStubConfig(){return{}}setConfig(t){if(!t||!t.entity)throw new Error(Ot("invalid_configuration"));this.config=Object.assign({name:Ot("name")},t)}shouldUpdate(t){if(!this.config)return!1;let e=!1;if(this.hass.states[this.config.entity].attributes.last_week!==this.latestWeek){this.latestWeek=this.hass.states[this.config.entity].attributes.last_week;const t=this.hass.states[this.config.entity].attributes.values;this.wholeFinland=t.find((t=>"finland"===t.area_id))||{area_id:"finland"},e=!0}return e||function(t,e,s){if(e.has("config")||s)return!0;if(t.config.entity){var i=e.get("hass");return!i||i.states[t.config.entity]!==t.hass.states[t.config.entity]}return!1}(this,t,!1)}getFillColor(t){const e=this.hass.states[this.config.entity].attributes.values.find((e=>e.area_id===t));return void 0===e?"var(--primary-text-color)":0===e.amount_last_week?"#6495ED":e.change_percentage<-40?"#0DAD4B":e.change_percentage<-10?"#86C43F":e.change_percentage>40?"#ED3028":e.change_percentage>10?"#F57E20":"#FDE602"}getAmount(t){const e=this.hass.states[this.config.entity].attributes.values.find((e=>e.area_id===t));return void 0===e?"":e.amount_last_week}setSelected(t){const e=this.hass.states[this.config.entity].attributes.values;this.selectedArea=e.find((e=>e.area_id===t))||{area_id:""}}render(){return V`
      <ha-card>
        <div class="map">
          <span class="amount" style="bottom: 25px; left: 23px;">${this.getAmount("ahvenanmaa")}</span>
          <span class="amount" style="bottom: 60px; left: 155px;">${this.getAmount("etela-karjalan_shp")}</span>
          <span class="amount" style="bottom: 115px; left: 70px;">${this.getAmount("etela-pohjanmaan_shp")}</span>
          <span class="amount" style="bottom: 80px; left: 143px;">${this.getAmount("etela-savon_shp")}</span>
          <span class="amount" style="bottom: 35px; left: 95px;">${this.getAmount("helsingin_ja_uudenmaan_shp")}</span>
          <span class="amount" style="bottom: 90px; left: 170px;">${this.getAmount("ita-savon_shp")}</span>
          <span class="amount" style="top: 210px; left: 155px;">${this.getAmount("kainuun_shp")}</span>
          <span class="amount" style="bottom: 53px; left: 90px;">${this.getAmount("kanta-hameen_shp")}</span>
          <span class="amount" style="top: 232px; left: 90px;">${this.getAmount("keski-pohjanmaan_shp")}</span>
          <span class="amount" style="bottom: 107px; left: 110px;">${this.getAmount("keski-suomen_shp")}</span>
          <span class="amount" style="bottom: 40px; left: 140px;">${this.getAmount("kymenlaakson_shp")}</span>
          <span class="amount" style="top: 100px; left: 120px;">${this.getAmount("lapin_shp")}</span>
          <span class="amount" style="top: 155px; left: 110px;">${this.getAmount("lansi-pohjan_shp")}</span>
          <span class="amount" style="bottom: 83px; left: 85px;">${this.getAmount("pirkanmaan_shp")}</span>
          <span class="amount" style="bottom: 115px; left: 180px;">${this.getAmount("pohjois-karjalan_shp")}</span>
          <span class="amount" style="top: 205px; left: 110px;">${this.getAmount("pohjois-pohjanmaan_shp")}</span>
          <span class="amount" style="bottom: 125px; left: 140px;">${this.getAmount("pohjois-savon_shp")}</span>
          <span class="amount" style="bottom: 57px; left: 119px;">${this.getAmount("paijat-hameen_shp")}</span>
          <span class="amount" style="bottom: 75px; left: 50px;">${this.getAmount("satakunnan_shp")}</span>
          <span class="amount" style="bottom: 130px; left: 50px;">${this.getAmount("vaasan_shp")}</span>
          <span class="amount" style="bottom: 50px; left: 55px;">${this.getAmount("varsinais-suomen_shp")}</span>
          <svg width="235" height="400" viewBox="0 0 235 400" version="1.1">
            <g>
              <path
                clip-path="url(#p348aba3507)"
                d="m 25.71128,363.05357 -0.697863,-0.4702 -0.307898,1.43043 -0.969615,-1.25815 -0.09197,-0.11933 -0.08635,0.51638 -0.943772,-0.0843 -0.307887,-0.61135 -0.558698,0.57805 -0.388567,-1.37119 -0.505361,-1.78333 -0.438878,0.32019 0.54191,-1.71533 -0.729466,-2.59225 1.374331,0.004 0.424629,0.48306 0.418423,-0.67119 -0.226413,-1.08621 0.972388,0.55116 -0.823746,1.96796 0.671006,2.17983 0.03492,-0.65975 0.07886,-1.4898 0.694994,0.56886 0.85051,-1.39428 -0.73171,-0.99061 0.50069,-0.12602 0.271457,0.69473 0.345444,-0.75609 -0.37659,-0.22411 -0.130741,-0.0778 -0.392255,0.1876 -0.290539,0.13894 -0.03525,-0.13214 -0.356932,-1.33811 -0.223959,1.23305 -0.3856,-0.43567 0.312402,-0.79787 -0.429803,-0.30912 -0.525917,0.54882 -0.143286,-0.36071 1.355165,-0.52673 0.455642,-1.06337 1.477018,-0.15755 0.810842,0.93497 -0.296585,0.67977 -0.04421,0.10133 -0.07801,0.17881 0.409379,0.0331 2.262299,0.18277 0.228979,0.85612 1.21695,0.2304 0.231171,0.81403 -0.359004,0.47206 -0.343904,0.4522 0.640663,-0.41461 0.660594,0.72908 -0.122668,1.46116 -0.566373,0.30126 0.280195,0.79529 0.676451,-0.15282 -0.349435,0.55094 -0.363324,-0.3513 -0.805276,0.29496 -0.602352,0.86712 -0.800696,-0.82296 -0.640588,0.2671 -0.740728,-1.65731 -0.15804,-0.3536 0.672477,-2.56495 -1.015313,1.95708 -0.0015,0.003 0.381939,0.93083 -0.358977,1.03797 -0.01875,0.0542 0.593401,0.37578 -0.584361,1.88003 0.374468,0.79659 0.02094,0.0445 -0.389287,0.15564 -0.389017,0.15553 -0.113109,-0.0762"
                style="display:inline;"
                fill="${this.getFillColor("ahvenanmaa")}"
                id="ahvenanmaa"
                class=${ot("ahvenanmaa"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("ahvenanmaa")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 179.68941,331.48995 -0.58833,0.52425 -0.43746,0.74902 -0.0435,0.0397 -1.18731,0.34636 -1.05335,0.74558 -0.20793,0.92468 -0.43712,0.52752 -0.023,0.0256 -1.01682,1.22686 -0.002,0.0108 -0.89851,3.28694 -0.004,-3.3e-4 -2.18775,-0.20871 -0.01,0.0117 -9.2e-4,-8e-5 -5.38402,6.18598 -0.36567,0.0745 -0.37201,0.77308 -2.48719,2.85766 -0.0107,-0.0683 -1.44955,-0.87755 -0.4451,-0.80931 -0.37571,-1.40773 -0.25939,-0.22711 -0.98337,-0.12684 -0.10389,0.004 -0.79828,0.16959 -0.17716,-0.81766 -0.24498,-0.23853 -1.81976,-0.34383 -0.10097,-0.002 -1.53801,0.21845 -1.18534,-1.36024 -0.0248,-0.0254 -1.75457,-1.59986 -0.12873,-0.0703 -1.77236,-0.4728 -0.98097,-1.22693 1.39391,-0.60069 0.0649,-0.53046 -1.55069,-1.17966 0.12802,-1.47562 1.18542,-0.88272 0.12098,-0.29562 -0.33886,-2.18466 2.18536,-0.34437 0.25081,-0.22587 0.36923,-1.38333 0.7487,-1.7521 2.20906,0.24669 0.34069,-0.2638 0.22306,-1.56262 0.71676,-0.91993 1.59011,0.43752 0.35445,-0.15148 0.51344,-0.95206 2.08063,0.33726 0.11239,-0.002 5.29397,-1.09845 0.15167,-0.08 2.82574,-2.71833 0.0935,-0.19368 0.13017,-1.36725 1.29592,0.88872 0.18603,0.0541 2.32107,-0.0827 0.003,-1.4e-4 1.76664,-0.0821 0.29213,-0.26645 0.24603,-1.76763 2.12597,-0.2128 0.0152,-0.002 5.00386,-0.75202 0.23895,-0.18532 0.73589,-1.73728 1.39252,-1.52907 2.10825,-1.09249 0.15992,-0.20861 0.26176,-1.19644 8.14894,-4.77808 0.54146,-0.008 -0.74396,0.88015 -0.009,0.009 -3.5e-4,0.001 -0.002,0.002 -0.39402,1.62593 -0.0582,0.23917 -0.74497,0.86313 -2.66784,3.0899 -8.8e-4,0.002 -0.003,0.003 -8.9e-4,0.006 -0.50559,1.20884 -0.46654,0.62432 -0.19086,0.94746 -0.002,0.005 -0.0113,0.0139 -1.51644,1.76226 -0.76535,1.03122 -0.0431,0.0528 -0.24098,0.031 -1.32293,0.1585 0.15254,1.0448 8.1e-4,0.006 -0.006,0.008 -0.9159,1.29656 -1.92016,2.72489 -1.1885,2.68868 -0.002,0.003 -1.7e-4,1.6e-4 -2.59696,2.16431 -1.012,0.7887"
                style="display:inline;fill:${this.getFillColor("etela-karjalan_shp")}"
                id="etela-karjalan_shp"
                class=${ot("etela-karjalan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("etela-karjalan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 59.758099,299.52426 v 0 l 0.247048,-4.08177 2.150854,-2.27126 -0.006,-0.43171 -1.302433,-1.30096 0.465887,-3.09784 -0.266988,-0.353 -1.749417,-0.22234 0.101931,-1.96905 1.080559,-3.56326 0.01329,-0.086 0.02998,-2.44359 1.106385,-0.99845 2.179196,-1.68932 0.107176,-0.33224 -0.744031,-2.51826 0.729105,-2.5023 0.843973,1.31709 0.127694,0.11253 5.235461,2.4887 0.353492,-0.0625 1.254666,-1.27593 0.08836,-0.23355 -0.165708,-3.08674 -0.03009,-0.11746 -1.365086,-2.84034 1.648641,-3.07027 6.012417,-0.85991 0.257332,-0.23513 0.413499,-1.74899 -0.04966,-0.25151 -0.572798,-0.7989 -0.05763,-1.15267 -0.0038,-0.0354 -0.225451,-1.35271 0.621707,-0.7493 0.0034,-0.004 1.877884,-2.34394 2.960758,1.18199 0.407899,-0.18835 0.40664,-1.2037 1.727656,0.53 0.281686,-0.0523 1.677374,-1.31515 0.09326,-0.12107 0.982845,-2.28117 1.780881,-0.74627 v 0 0 l 2.072556,1.07765 2.155801,3.06217 2.374019,3.6624 0.17689,0.12986 2.826131,0.78455 2.42098,2.81215 -0.75255,0.54164 0.061,0.53648 2.51823,1.05722 -1.09453,1.42225 -0.0628,0.21775 0.24817,2.63447 0.0667,0.16456 0.62756,0.78264 -0.1361,1.45627 0.22434,0.32669 1.2212,0.34337 0.10889,0.78925 -1.40557,0.27949 -0.22181,0.43056 2.34375,5.20493 0.20373,0.82469 0.10755,0.16777 0.73442,0.58535 -0.72595,1.02146 -0.0425,0.27357 0.43047,1.34521 -0.51369,1.80773 -1.27755,1.29634 -1.62469,-0.28385 -0.31943,0.14701 -0.60574,1.02165 -1.00047,-0.88943 -0.44693,0.0376 -3.005964,3.74542 -1.039711,-0.76083 -0.45294,-2.28978 -0.04121,-0.10404 -0.771135,-1.23295 -0.478429,-0.0574 -2.776932,2.7087 -2.400199,-0.32215 -0.292343,0.12597 -0.488828,0.67936 -1.701208,-1.25398 -0.437749,0.0725 -2.042402,2.94013 -1.112232,0.41187 -2.442656,0.88678 -2.541251,0.43542 -2.984949,-1.19866 -0.635105,-0.38594 -0.449385,0.15301 -1.255271,3.25199 -1.07062,0.28022 -0.169751,0.11442 -1.371475,1.83993 -0.859508,1.15465 -1.785515,-0.13813 -0.277534,0.13129 -1.611132,2.306 -2.11352,1.4947 -3.385278,-1.46209 -0.07351,-0.0214 -1.354008,-0.21799"
                style="display:inline;fill:${this.getFillColor("etela-pohjanmaan_shp")}"
                id="etela-pohjanmaan_shp"
                class=${ot("etela-pohjanmaan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("etela-pohjanmaan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 175.52478,319.79763 -0.21418,1.5388 -1.50826,0.0701 -2.21748,0.079 -1.64509,-1.12819 -0.48306,0.22587 -0.16909,1.77609 -2.67879,2.57696 -5.15066,1.06872 -2.24158,-0.36335 -0.32187,0.15858 -0.50102,0.92904 -1.55179,-0.42698 -0.32619,0.10817 -0.89435,1.14787 -0.0622,0.14646 -0.19229,1.34701 -2.13933,-0.23891 -0.3189,0.18594 -0.84776,1.98394 -0.0144,0.0418 -0.32302,1.21021 -2.28656,0.36031 -2.80461,0.35114 -1.71311,-0.92763 0.12505,-1.26308 -0.0387,-0.18307 -1.13299,-1.999 -0.46661,-0.0857 -2.57279,2.13125 0.0643,-0.48085 -0.02,-0.15745 -0.61111,-1.50459 -0.35171,-0.1861 -1.71514,0.36858 -0.41314,-1.40065 -0.30044,-0.22188 -1.23059,0.0145 -1.21254,-1.54845 -0.81433,-1.79808 0.25072,-3.72815 0.61807,-2.3782 0.86668,-1.41403 2.00664,0.95896 0.44192,-0.25492 0.21019,-2.67068 -0.0306,-0.16036 -1.20556,-2.46229 -0.0826,-0.1039 -1.2265,-0.99851 0.32844,-1.40349 0.004,-0.12239 -0.16979,-0.99842 -0.33871,-0.25573 -0.51354,0.0562 0.0876,-1.57938 1.27451,-1.01798 0.0726,-0.40037 -1.32237,-2.21583 -0.003,-0.005 -1.666,-2.68392 1.4194,-2.54165 1.85405,-0.60971 0.11172,-0.0652 1.45273,-1.32339 0.91611,1.38088 0.32657,0.13065 0.2378,-0.25917 0.27478,-1.97958 0.78762,-0.98986 0.062,-0.2496 -0.16642,-0.88916 1.43198,-0.34592 0.15903,-0.50591 -1.41175,-1.59472 0.35022,-1.27417 1.02514,0.11749 0.23968,-0.0751 1.30701,-1.1503 0.94915,0.2688 0.10636,0.0109 1.65716,-0.11837 0.0317,-0.004 0.8799,-0.15528 1.07868,0.75508 0.41533,-0.0556 0.50471,-0.6066 1.75124,-0.76271 0.85888,-0.0164 4.47242,4.32358 0.1462,0.0792 0.77425,0.17675 -0.21423,1.24004 0.0844,0.26971 1.50621,1.5309 0.34699,0.0654 0.77572,-0.34718 2.30613,1.67093 0.15091,0.82941 -0.47313,1.11541 0.006,0.25514 0.75607,1.56936 -2.18035,1.07752 -0.15339,0.38407 0.20442,0.5568 -1.00949,0.51991 -0.16668,0.3009 0.0979,1.16985 0.15343,0.24206 3.32398,1.92275 0.38159,-0.0572 0.76594,-0.824 1.14626,0.47392 -0.0387,0.31129 -0.91042,0.54269 -0.0726,0.06 -1.08709,1.2207 -0.0403,0.3545 0.5773,1.05351 -0.11062,1.38277 0.0612,0.21077 1.0086,1.33997 -0.99163,0.81773 0.0467,0.50929 1.00281,0.55674 0.94777,1.15273 0.1934,0.10954 2.43866,0.36353 1.05121,1.84268 0.21296,0.15104 1.82716,0.33511 3.765,1.98039"
                style="display:inline;fill:${this.getFillColor("etela-savon_shp")}"
                id="etela-savon_shp"
                class=${ot("etela-savon_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("etela-savon_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 81.667462,374.31226 -0.999046,0.56058 0.17285,1.08648 -0.420105,0.46594 0.620534,0.0941 -5.077158,0.58299 -0.581391,-0.37536 0.232361,-0.58485 4.124828,-1.36683 0.524877,-0.75568 -0.21647,-0.0112 -0.310147,-0.016 -0.212852,-0.71667 1.157422,-0.68743 -0.381414,-0.70087 -0.140799,0.88676 -0.447967,0.11693 -0.100161,-0.7195 -0.755194,0.82051 -0.129252,-0.95084 0.364146,-1.07124 0.902352,-0.40852 -2.468401,0.86988 0.789438,0.15414 -0.178853,0.83282 0.406602,-0.10293 -0.654902,1.40337 -1.04972,-0.67008 0.0759,0.48868 -1.117729,0.43316 -1.229124,-0.90855 -0.04346,-0.95961 -0.741514,-0.83695 0.02173,-1.18663 0.413134,0.11435 -0.004,0.0534 0.07852,0.14545 -0.196204,0.41586 0.435548,0.9433 1.297429,-0.68071 0.891428,0.67879 0.78389,-0.51698 -0.496629,-1.72547 1.865875,0.20748 -0.03719,0.82482 0.300679,-1.07785 0.823071,-0.53845 1.137085,0.0548 0.02806,0.46177 0.550057,-0.41974 -1.648637,-0.36939 -1.033887,0.42811 -0.09448,0.54276 -0.720417,-0.21946 -0.328868,-0.8488 -0.878653,-0.1861 0.549515,-0.67178 0.0931,0.19612 2.192111,-0.003 0.218773,-0.091 2.603307,-2.61179 0.695492,1.06839 0.39385,0.10986 3.259191,-1.57315 1.016913,0.303 0.391308,-0.35965 -0.433928,-2.08358 2.426285,-2.17302 0.102926,-0.23712 -0.02518,-1.17978 1.006739,-0.51203 0.169162,-0.27628 -0.0032,-2.15277 -0.203848,-0.29041 -0.543524,-0.19732 0.01641,-0.68305 2.072846,-0.44296 0.237089,-0.37117 -0.350607,-1.54322 1.272277,-1.5318 0.06669,-0.25152 -0.173132,-0.98057 0.667945,0.25712 0.131376,0.02 1.225531,-0.0802 2.991287,0.91582 0.684615,1.71016 0.538887,0.0651 0.9483,-1.32451 0.56035,0.37067 0.26323,1.37141 0.32874,0.25012 2.13444,-0.17191 0.24224,-0.15217 0.51289,-0.87656 0.0416,-0.1785 -0.10767,-1.49545 0.66729,-0.90438 1.85361,0.68498 0.21294,5.9e-4 1.60361,-0.58263 3.24961,-0.51534 1.18795,0.779 0.46341,-0.16141 0.62137,-1.87441 -0.22482,-0.39905 -0.94726,-0.21634 1.31295,-1.39955 0.0514,-0.34958 -0.55417,-1.11359 1.09406,-0.47166 1.29144,2.82755 0.28452,0.18087 1.41886,-0.014 0.25903,-0.14489 0.68599,-1.09267 0.76887,0.79926 0.2205,1.70405 -0.61612,0.28544 -0.1102,0.0858 -0.79906,0.98465 -0.0569,0.2813 0.26689,0.91892 0.0326,0.0742 1.20612,1.98859 0.49459,0.0465 0.93811,-1.0424 1.21285,0.0235 1.70088,0.83276 0.84833,1.25123 0.001,0.002 7.3e-4,10e-4 v 10e-6 l 0.36082,0.11619 1.96061,-0.7105 0.17672,-0.16385 1.08824,-2.41629 4e-5,-9e-5 0.003,-0.006 0.007,-0.0153 -0.32118,-0.43405 -1.10501,0.14048 0.33134,-0.84805 0.0212,-0.11243 4.7e-4,-0.78238 1.21179,-0.26066 1.2473,0.97318 0.34226,0.0256 1.78718,-1.00698 0.15704,-0.28729 -5e-5,-7.7e-4 -0.0591,-1.03643 0.95941,0.19911 0.71334,2.84099 0.002,0.006 1.7e-4,6.7e-4 0.1806,0.20999 5.5e-4,2.3e-4 0.002,7e-4 1.78451,0.74616 1.30023,2.06825 0.0217,0.39753 -0.54555,0.23535 -0.17544,0.36748 0.12899,0.46119 -0.97105,1.06744 -0.0577,0.32498 0.10105,0.24802 0.14665,0.0792 0.14005,0.15445 6.7e-4,1.88119 -0.75545,-0.18919 0.0369,0.74819 -0.46427,-0.28704 -0.82929,0.43457 -0.22208,0.96009 -0.43064,-1.60124 -1.04861,-1.41645 0.45431,2.1254 -1.59674,-0.41096 0.37164,1.51659 -0.66469,-1.09864 -1.38329,-1.2869 -0.46979,0.15938 -1.18391,-1.84114 -0.75697,-0.35882 0.65774,0.75722 -0.18859,0.76291 0.5507,-0.0354 0.78326,0.97682 -0.37939,1.14724 0.99996,1.43465 0.8922,-0.43843 -0.57636,1.55612 -1.25244,0.29068 -0.0549,-1.16984 -1.32429,-1.18944 -1.52943,-1.37368 1.07952,1.90006 -0.0534,0.55914 -0.68877,0.19921 0.9353,2.75351 -0.35834,0.24178 -0.72267,-0.32182 -0.0581,-1.12725 -0.7978,0.15942 -1.01153,-1.2769 0.47147,1.25947 1.1298,0.19673 -0.21648,0.49015 -0.99222,0.70378 -1.17632,-1.18007 -0.66866,-0.0332 -0.39421,-1.77098 1.3129,-0.42399 -0.63831,-1.3071 -1.69243,2.07927 -0.9307,-0.4814 0.17069,1.50971 -0.48893,0.58357 -1.35713,1.61982 -0.49832,-0.88388 1.17426,-0.23784 -1.48581,0.0851 -0.18232,-0.61118 -1.03838,0.52674 -1.23547,-0.0797 -0.18447,-0.0119 -0.83913,0.89516 -0.23133,1.24657 -1.33362,-0.33402 -0.88882,0.46511 0.7024,0.98709 -1.30797,-0.29468 0.52307,-0.59633 -0.47232,-1.01915 -0.45794,0.0905 -0.46313,1.74966 -0.79098,0.35535 -0.0281,-1.12617 -1.08404,-0.82939 -0.24759,0.13158 -0.32671,0.17362 0.32042,0.22945 0.0992,0.071 -0.10431,0.25678 -0.10156,0.25001 -2.76946,1.62301 -0.66284,-0.74093 -0.22294,-0.24921 -0.0819,1.09523 0.5349,0.15404 -1.00746,0.57152 0.33206,0.30256 0.69769,-0.42987 -1.45832,1.57412 0.34858,-0.28956 0.19389,0.48901 -0.57871,-0.1496 -0.35255,0.86061 -2.04295,1.63948 -0.68839,-0.0592 1.55009,-2.88633 -1.31224,1.48684 -0.91332,-0.23531 -0.39407,0.70598 0.88386,-1.96269 -0.0245,-0.7292 -0.24362,-0.13692 -0.26311,-0.14788 -0.16327,0.38922 -0.513127,-0.15659 0.146664,0.79469 -0.497167,0.28263 -0.403707,0.22951 -1.599576,-0.44121 0.599454,0.94178 -1.190004,-0.3624 -1.789995,0.33557 -0.238024,-0.66659 -0.988291,1.09454 -1.616621,-0.37307 0.170073,0.36797 -0.858399,0.87697 -0.476947,0.48726 -0.367812,0.0373 -0.151354,-0.70849 -0.620433,0.6102 -0.763314,-0.17339 0.436482,1.08614 -1.624713,0.13519 0.354742,0.29269 -0.957217,0.60716 -1.064893,-0.73792 0.451477,-0.0607 -3.54902,0.2953 1.149133,-1.18243 0.950564,0.50811 -0.312329,-0.77378 2.182902,-0.78053 -2.609251,0.38041 1.102568,-0.9751 0.249083,-1.09719 0.740426,-0.25845 0.08237,-1.82072 -1.345245,1.53481 -0.2953,1.54857 -1.500586,2.14108 -1.74937,0.9816 m 23.418757,-7.2779 -0.77708,-0.86863 -0.0931,0.40896 0.87016,0.45967 m -16.623498,5.49459 -0.189768,0.25705 0.482144,0.0348 0.213133,-0.3456 -0.505509,0.0538 m -7.932847,1.04447 -0.08777,0.11091 0.295531,-0.19734 0.775995,-0.51817 0.714012,-1.5405 -1.697764,2.1451 m -0.393645,-3.07585 0.784375,-0.3551 -0.324928,-0.2372 -0.459447,0.5923"
                style="display:inline;fill:${this.getFillColor("helsingin_ja_uudenmaan_shp")}"
                id="helsingin_ja_uudenmaan_shp"
                class=${ot("helsingin_ja_uudenmaan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("helsingin_ja_uudenmaan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 175.92298,319.30779 -3.91688,-2.06027 -0.0882,-0.0305 -1.73199,-0.31766 -1.05435,-1.84818 -0.22316,-0.15273 -2.46955,-0.36814 -0.90952,-1.10621 -0.0888,-0.074 -0.65726,-0.3649 0.86969,-0.71718 0.0504,-0.42483 -1.11603,-1.4827 0.10864,-1.35802 -0.0371,-0.17338 -0.51685,-0.94319 0.91019,-1.02206 0.99945,-0.59575 0.14864,-0.22764 0.0865,-0.69549 -0.18885,-0.32413 -1.56279,-0.64613 -0.34488,0.0753 -0.74424,0.80065 -2.97044,-1.71824 -0.0671,-0.80257 1.06856,-0.55033 0.1488,-0.38175 -0.20283,-0.55248 2.20581,-1.0901 0.14168,-0.41173 -0.82824,-1.71916 0.45456,-1.07165 0.0196,-0.17623 -0.11521,-0.63324 5.05649,0.56949 1.75217,0.37694 1.47375,1.6763 0.52968,-0.1184 0.73189,-2.53231 1.59546,0.51154 0.4012,-0.33562 -0.28015,-2.09847 2.4522,0.67444 0.36149,-0.16542 1.02712,-2.15872 2.4343,-0.22723 0.28032,-0.32322 -0.0852,-1.74369 0.695,-0.78302 0.77669,0.74334 0.48697,2.42613 0.0513,0.11857 1.77807,2.49756 0.0519,2.59882 0.0126,0.0814 1.02361,3.47027 0.0923,0.14468 2.84369,2.50446 -0.59418,2.03117 0.0623,0.28854 1.31571,1.53142 -0.21757,2.30167 -1.75687,2.40813 0.002,0.0412 -0.0545,0.075 -0.25967,1.18692 -2.0285,1.05116 -0.0864,0.0664 -1.46534,1.60903 -0.0562,0.0877 -0.6889,1.62634 -4.82494,0.72514 -2.26793,0.227"
                style="display:inline;fill:${this.getFillColor("ita-savon_shp")}"
                id="ita-savon_shp"
                class=${ot("ita-savon_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("ita-savon_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 190.33419,213.77495 0.0511,1.85284 0.002,0.004 0.65206,1.53175 -0.0157,0.19225 0.55797,1.08162 1.5e-4,3.4e-4 -8.4e-4,0.0122 -0.1188,1.68081 1.03209,1.22772 0.26962,0.0757 0.14349,0.14384 1.10798,0.20772 1.87257,1.25257 0.56102,0.37529 -0.0582,0.63758 0.43363,0.40014 1.41568,0.15523 0.007,7.8e-4 0.48406,1.37732 -0.61598,0.62997 0.008,0.0128 -6.5e-4,6.8e-4 0.27759,0.46192 1.07545,1.79644 -0.13761,3.03489 -2.87439,4.9666 -0.001,0.002 -0.73685,2.95525 -0.0267,0.10706 -0.006,0.003 -4.0064,2.28851 -0.0435,-0.0489 -0.30128,-0.0957 -1.47084,0.34218 -0.16271,0.0976 -1.15803,1.32268 -0.63161,-1.08508 -0.79296,-4.43115 -0.35813,-0.25027 -7.91326,1.38945 -0.69067,0.056 -0.0169,0.002 -3.38032,0.46251 -5.83053,-1.4364 -0.35503,0.17088 -2.05169,4.44931 0.001,0.009 -0.006,8.8e-4 -1.07582,2.57569 -1.30104,-1.2347 -3.7617,-4.40119 -0.068,-0.0593 -5.90297,-3.78967 -0.25862,-0.0352 -1.28583,0.39775 -4.90482,-1.54415 -3.74015,-1.58277 v 0 0 0 l -1.17413,-0.60801 -0.13042,-5.29766 -1e-5,-5e-4 -0.0419,-1.59833 0.65794,-1.0083 1.60609,-0.83987 1.32297,1.07739 0.28085,0.0575 2.20178,-0.6326 0.21043,-0.20681 0.93785,-3.06274 -0.0199,-0.2306 -0.90381,-1.78158 3.00905,-3.85945 -0.0112,-0.39407 -1.28699,-1.47038 -0.97716,-2.7721 0.18787,-1.13783 -0.0237,-0.17858 -1.29307,-2.84147 2.40382,0.62729 0.35841,-0.16827 0.70002,-1.49599 0.0283,-0.15441 -0.26959,-3.57703 -0.0636,-0.16578 -1.69837,-2.20111 0.81378,-1.83434 2.91158,0.0214 0.16714,-0.0476 1.65825,-1.04396 3.1812,0.94831 0.38379,-0.20434 1.36139,-4.36088 2.23662,-0.97763 6.38675,-1.38774 0.24117,-0.26259 0.43946,-3.38844 4.16515,-2.02618 2.2373,-0.0786 0.26319,-0.16556 1.20331,-2.29517 2.41638,0.38847 0.0737,0.003 2.15289,-0.17134 2.86626,0.16538 -0.1774,0.56601 0.0268,2.49076 0.35508,1.81187 2e-5,2.1e-4 -1.2e-4,1.9e-4 -1.8737,2.55186 -0.0856,0.55106 0.50601,0.95767 0.0203,1.4e-4 2.74703,0.35676 0.6503,0.25388 0.3957,0.55533 1e-5,2e-5 -0.002,0.003 -0.99814,1.72367 0.51161,0.56511 0.67304,0.73096 0.001,0.002 -2.35382,0.58292 -0.0101,6e-4 -1.49192,1.12316 -0.30923,2.27547 0.28093,0.99777 -0.013,1.33507 0.0743,0.26419 1.1e-4,0.0678 0.50771,1.73831 0.83617,0.96333 0.01,0.0114 -8.2e-4,0.004 -0.15118,0.63865 0.80855,0.96742 4.45189,-0.31038 0.67186,0.61977 1.5e-4,1.6e-4 -0.57845,1.12436 -0.0305,0.0377 0.22731,0.96173 1.32005,2.14659 9e-5,1.8e-4 -0.20967,0.80762 -4e-5,3e-5 -0.93813,0.41342 -0.91527,0.9983"
                style="display:inline;fill:${this.getFillColor("kainuun_shp")}"
                id="kainuun_shp"
                class=${ot("kainuun_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("kainuun_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 114.01732,344.34634 -0.0343,0.0937 0.60392,1.21356 -1.5347,1.63593 0.15678,0.5134 1.14104,0.2606 -0.38752,1.16899 -0.95126,-0.62379 -0.21815,-0.0469 -3.39705,0.53871 -0.0572,0.0148 -1.52494,0.55404 -1.96542,-0.72631 -0.35627,0.10654 -0.87323,1.1835 -0.0597,0.20595 0.10899,1.51374 -0.38298,0.65454 -1.69719,0.13669 -0.2355,-1.22694 -0.13318,-0.19976 -0.9177,-0.60704 -0.42233,0.0779 -0.79299,1.10759 -0.529693,-1.32316 -0.196691,-0.18088 -3.187146,-0.97579 -0.110802,-0.0129 -1.214227,0.0795 -1.115578,-0.42942 -0.02932,0.0241 -0.04505,-0.0426 -3.532056,-0.42291 -2.839671,-3.06321 -0.23864,-0.0988 -1.584037,0.06 -0.09844,0.02 -2.065307,0.78664 -1.634356,-1.92851 1.210063,-1.49094 -0.138784,-0.48734 -1.241282,-0.43092 -0.0156,-1.06938 1.904625,-0.056 0.290233,-0.23084 0.585222,-2.23213 -0.07135,-0.28773 -1.274568,-1.38866 0.653857,-0.31362 v 0 0 l 1.505102,0.20802 1.6962,1.78154 0.396998,0.0433 1.274777,-0.85874 2.492382,-0.42398 1.894533,2.35092 0.536097,-0.10121 0.340892,-1.08235 -0.0319,-0.25561 -0.625707,-1.01279 -0.329644,-0.83715 -0.0088,-0.0202 -0.401597,-0.83958 3.118407,-1.24681 4.683228,-1.49664 0.14626,-0.1 1.08552,-1.34006 0.0674,-0.16375 0.127,-1.25986 4.29903,-2.11413 2.05293,1.09281 0.44281,-0.18766 0.29871,-1.03921 1.13872,1.11949 0.44408,-0.0105 1.22064,-1.31931 0.38793,0.73003 0.0544,0.0736 0.60509,0.60509 0.5846,0.99074 0.23835,0.15091 2.69744,0.24654 0.78128,1.67511 -0.36831,2.26827 -1.41349,1.62361 -2.04157,1.01637 -0.17134,0.26622 -0.12409,3.55299 0.21866,0.30668 0.90276,0.27644 0.16485,1.64498 0.002,1.58807 0.0667,0.0438"
                style="display:inline;fill:${this.getFillColor("kanta-hameen_shp")}"
                id="kanta-hameen_shp"
                class=${ot("kanta-hameen_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("kanta-hameen_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 104.82296,264.36109 -2.25143,-0.94521 0.57825,-0.41619 0.0537,-0.45304 -2.7025,-3.13915 -0.15174,-0.0963 -2.803535,-0.77828 -2.313417,-3.56892 -0.0066,-0.01 -2.202606,-3.12865 -0.110273,-0.0964 -2.195354,-1.1415 -3.201989,-4.95752 -0.133569,-0.11458 -3.299548,-1.47617 -1.296465,-1.87573 1.273347,-1.07771 0.09332,-0.33505 -0.03401,-0.10089 0.0722,0.0852 0.133323,0.1573 -0.02183,-0.19583 -0.18177,-1.63063 -0.258088,0.0233 -0.04292,0.67338 -0.112866,-0.33482 -0.0033,-0.009 -0.308699,-0.82818 0.16556,0.0942 0.271726,-0.64509 -1.215483,-0.68276 0.07974,-1.0357 1.177041,0.26056 0.757599,2.4382 -0.422049,0.0382 0.795722,0.56283 0.05446,0.81424 0.01573,0.23513 0.07101,-0.26511 0.754406,-2.81669 0.603874,-0.17759 0.423682,0.82277 0.34522,-0.56108 -0.737096,-1.44603 0.741351,0.93948 0.158926,-1.00037 2.220729,0.35007 0.430024,-0.87674 0.624173,0.63855 0.71654,-0.65559 -0.433433,-1.01879 0.883685,-3.84151 2.198518,1.45485 0.536281,-0.0934 -0.06066,0.15273 1.974275,2.6396 0.405139,0.0811 2.085327,-1.23134 0.114817,-0.11919 1.362725,-2.51837 1.31119,0.69618 0.44272,2.91803 0.0234,0.0797 1.66421,3.72728 0.13949,0.14822 2.55315,1.33121 2.65313,6.52871 0.50873,0.099 1.72393,-1.77613 2.60543,1.32966 0.44433,-0.2161 0.52668,-2.68691 1.62368,0.30957 2.02498,4.43292 -1.44275,1.04534 -0.11688,0.16876 -0.96508,3.52004 -0.57127,0.23443 -2.09451,0.85957 -0.1174,0.0848 -2.08664,2.43281 -0.0719,0.24179 0.34596,2.63187 -0.55844,0.22822 -0.19225,0.29536 0.1201,4.16667 -3.34531,-0.86596 -0.21109,0.0204 -2.60878,1.248"
                style="display:inline;fill:${this.getFillColor("keski-pohjanmaan_shp")}"
                id="keski-pohjanmaan_shp"
                class=${ot("keski-pohjanmaan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("keski-pohjanmaan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 121.88122,314.56386 0.55737,-3.09735 1.02254,-2.00374 -0.0284,-0.32681 -2.42937,-3.22596 -0.1291,-0.0999 -1.45437,-0.60045 0.53443,-1.61269 -0.0918,-0.33181 -1.53718,-1.32388 1.29909,-1.85126 0.006,-0.34628 -0.96992,-1.4936 -0.20623,-0.13629 -2.61052,-0.45642 -2.30021,-1.6515 -0.43244,0.0717 -2.3623,3.31336 -0.0365,0.29174 0.62415,1.60604 -1.87441,0.89068 -2.42337,-5.40913 -0.15772,-0.15669 -0.98275,-0.43266 -0.36543,0.0888 -1.05514,1.30655 -1.14817,-0.4645 -1.82965,-2.90381 -0.13534,-0.11746 -1.931583,-0.86494 -0.858683,-2.75332 2.884356,-3.5939 1.03765,0.9225 0.47178,-0.0734 0.68813,-1.16063 1.57403,0.275 0.27366,-0.0876 1.447,-1.4683 0.0773,-0.13262 0.5609,-1.97382 -0.003,-0.17889 -0.41178,-1.28681 0.80594,-1.13401 -0.0594,-0.42125 -0.88114,-0.70229 -0.18523,-0.74976 -0.0182,-0.0528 -2.19556,-4.87583 1.3101,-0.26051 0.24619,-0.34579 -0.17645,-1.27892 -0.22278,-0.2556 -1.16793,-0.32839 0.12375,-1.32409 -0.0667,-0.22237 -0.64793,-0.80804 -0.22806,-2.42097 1.22031,-1.58569 v 0 0 l 2.56559,-1.22734 3.63478,0.94089 0.38686,-0.30849 -0.12579,-4.3641 0.58084,-0.23737 0.18974,-0.32678 -0.35905,-2.73145 1.94823,-2.27143 2.0256,-0.83129 0.71199,-0.29218 0.18095,-0.20446 0.97654,-3.56181 1.38566,-1.00397 v 0 0 l 1.35786,0.90497 2.0093,1.72458 0.13256,0.0669 4.36803,0.99882 1.71487,2.22191 0.17034,0.11125 1.56537,0.38897 0.16989,-0.006 2.35929,-0.76343 0.0314,0.12596 -1.61747,2.76765 0.0522,0.37874 0.80805,0.7803 0.1661,1.79723 0.27805,4.40131 0.0237,0.10084 0.84022,1.99035 0.0594,0.0914 1.38859,1.48034 -1.18454,0.20148 -0.15065,0.53902 1.52844,1.3232 -0.64183,1.33909 -0.47528,-0.62041 -0.25178,-0.1212 -1.53606,0.0304 -0.11385,0.0241 -1.33478,0.56144 -0.1794,0.36355 0.42284,1.6166 0.18534,0.20936 1.2676,0.50251 -0.15851,0.61867 0.072,0.28624 3.18595,3.46522 0.44546,0.0105 1.10424,-1.09278 2.13099,5.57311 -1.75862,2.55608 0.0178,0.37416 2.37102,2.82927 0.25471,0.11019 0.78399,-0.0445 -0.35072,1.27603 0.0667,0.28712 1.18191,1.3351 -1.21754,0.29412 -0.2315,0.35773 0.19445,1.03893 -0.75231,0.94548 -0.0644,0.15013 -0.17402,1.25367 -0.66365,-1.00033 -0.46625,-0.0577 -1.67059,1.52186 -1.90587,0.62675 -0.1735,0.14308 -1.56715,2.8062 0.007,0.31408 1.76073,2.83652 1.18261,1.98165 -1.17172,0.93589 -0.11584,0.22466 -0.11542,2.08204 0.34261,0.32474 0.58652,-0.0641 0.11045,0.64943 -0.35829,1.53103 0.10594,0.31048 1.32384,1.07775 1.13848,2.32528 -0.1682,2.13711 -1.85163,-0.88489 -0.39726,0.1175 -0.67648,1.10371 v 0 0 l -0.30633,-1.00973 -0.33954,-0.21655 -1.49861,0.21239 -0.19024,0.10351 -0.54402,0.62656 -1.16782,-3.59393 -0.21243,-0.20279 -1.06353,-0.29178 -0.87161,-1.3042 -0.14056,-0.11464 -1.24276,-0.50613 -0.41138,0.19207 -1.14321,3.56397 -0.95693,-0.75232 -0.38835,0.005 -1.28233,1.0595 -1.26448,0.0671"
                style="display:inline;fill:${this.getFillColor("keski-suomen_shp")}"
                id="keski-suomen_shp"
                class=${ot("keski-suomen_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("keski-suomen_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 161.10788,351.74564 -0.2556,0.29263 -0.58003,0.90655 0.15819,0.58078 -0.002,0.004 -0.78204,0.62257 -0.58794,-1.2791 -0.70823,0.15884 -0.18995,2.1352 0.45268,0.78124 -2.06383,0.37397 -0.44585,-0.61718 0.92671,-0.72944 -0.52605,-0.1808 -0.63447,0.50398 0.53445,1.45875 -1.91131,-1.30271 -0.66451,0.6252 0.49995,0.99117 -1.16063,-0.34063 -0.34777,-0.6862 -0.0662,-0.13053 -1.59562,-0.89625 -1.75873,0.0412 0.043,-1.17426 1.31634,0.67591 -1.79919,-1.3703 -0.13836,1.86664 -1.13573,-0.97133 -0.0532,0.55108 -0.74074,-0.55716 0.19522,0.56024 -0.44317,0.19436 -0.34529,-0.94032 0.0622,0.56384 0.073,0.66111 -1.14964,1.10341 -0.71036,-0.43657 0.61272,0.56094 -0.39815,0.47418 -0.61275,-0.55596 -0.82407,0.74941 -0.0217,0.0198 -1.2175,0.23222 -0.31807,-0.64474 0.44625,0.39337 0.0854,-1.02816 -0.78008,0.43244 0.15159,0.96092 -1.21758,0.85126 -0.63942,-1.02885 -0.64872,-0.12799 -0.60721,0.32139 -0.0384,0.66644 -1.47055,-1.62173 -8e-5,-0.23105 -0.0229,-0.11664 -0.0274,-0.0673 0.955,-1.0498 0.0691,-0.29158 -0.10228,-0.36571 0.49544,-0.21374 0.18641,-0.30096 -0.0378,-0.69303 -0.047,-0.14787 -1.39505,-2.21907 -0.1426,-0.1208 -10e-4,-4.7e-4 -1.73306,-0.7252 -0.65341,-2.6023 0.97933,-0.30974 0.2156,-0.27704 0.0791,-1.35684 2.08706,-1.10853 0.1434,-0.16154 0.57508,-1.48499 0.0175,-0.15747 -0.64931,-4.34693 -0.21101,-0.24878 -1.96874,-0.63538 -0.34507,0.11216 -0.55191,0.75684 -0.90474,-0.26983 0.0401,-1.68783 0.70149,-1.19216 -0.0987,-0.41681 -0.90131,-0.58265 2.1928,-1.70954 0.10527,-0.15229 0.63815,-2.05535 1.32731,-0.69551 v 0 0 l 1.70055,-0.36544 0.48246,1.18785 -0.15816,1.18317 0.15675,0.31168 0.34737,-0.0324 2.8972,-2.39999 0.90244,1.59223 -0.13564,1.37008 0.16059,0.3026 1.98126,1.07283 0.18579,0.0349 2.6098,-0.32675 0.31154,2.0085 -1.14733,0.85435 -0.12348,0.22145 -0.15476,1.78389 0.12094,0.27303 1.26468,0.96208 -1.27992,0.55157 -0.11923,0.47742 1.29789,1.6233 0.16193,0.10575 1.79777,0.47958 1.68565,1.53702 1.28408,1.47356 0.27681,0.10307 1.65374,-0.23489 1.56793,0.29624 0.19899,0.9184 0.36673,0.23717 1.04816,-0.22268 0.7252,0.0935 0.33188,1.24354 0.0278,0.0693 0.50319,0.91492 0.11089,0.1156 1.47454,0.89268 -1.4968,1.71975 v 0 l -10e-4,0.002"
                style="display:inline;fill:${this.getFillColor("kymenlaakson_shp")}"
                id="kymenlaakson_shp"
                class=${ot("kymenlaakson_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("kymenlaakson_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 131.09829,173.38991 v 0 0 l -3.26972,-3.78686 2.30395,-4.01172 0.0157,-0.27683 -0.99891,-2.31222 4.03521,-2.20829 -0.0139,-0.55009 -4.04775,-1.95556 -0.13447,-0.0308 -5.97966,-0.003 -7.10118,-4.23361 3.52366,-4.55638 0.0642,-0.20693 -0.54945,-9.63086 -0.23754,-0.28347 -1.92061,-0.45548 -0.14675,9.6e-4 -1.46462,0.36769 -0.1662,0.10671 -1.16501,1.45486 -0.013,0.0175 -1.84785,2.67365 -2.73129,0.89341 -0.20475,0.22216 -0.35759,1.49561 -0.89272,0.43838 -0.10146,0.0798 -0.54185,0.65112 -1.15981,0.37642 -0.0422,0.0172 -1.93817,0.96329 -1.78683,-1.85782 -0.24877,-0.0206 -0.002,-0.0217 0.85614,-0.90804 0.0115,-0.007 0.3829,-0.9025 -0.0233,-1.28098 0.53168,-3.24903 0.002,-0.009 -0.17106,-1.57795 -0.0101,-0.0939 0.49342,-1.00417 0.001,4.4e-4 0.65092,0.30903 0.52667,-1.22516 -0.70696,-2.17647 -0.89303,-1.29888 -9e-5,-2e-4 -1.1e-4,-0.0154 -0.005,-1.09199 -0.94625,-1.61547 -0.57625,-0.74675 -10e-4,-0.002 v -1e-5 l -0.83583,-2.05744 -0.11325,-0.88814 -1.256054,-2.48248 -1.56e-4,-3.8e-4 0.01612,-0.0309 0.62374,-1.19336 -0.62771,-0.63329 -0.0017,-0.002 0.46954,-1.46607 0.0188,-0.004 1.93544,-0.37331 0.71649,-1.71516 -0.56363,-1.85733 -0.003,-0.009 0.003,-0.005 0.70325,-1.40912 -0.92586,-0.59697 -1.97772,-0.69439 -0.630244,0.46976 -0.0022,0.002 -1.260588,-1.40228 0.07019,-0.0968 1.166047,-1.607 -0.18503,-0.94828 -0.0011,-0.006 0.0031,-0.002 1.109235,-0.5877 0.19149,-1.37843 -0.5571,-1.15997 -0.14689,-0.30666 0.14899,-6.07497 0.72877,-1.590799 0.007,-0.0018 0.72418,-0.172519 1.16637,-1.591957 -0.54078,-0.96776 -0.42064,-0.142383 -0.40469,-0.465152 -0.50357,-0.915287 -1.498667,-1.386099 -1.88e-4,-2.17e-4 -0.01413,-0.04867 -1.069483,-3.693199 -1.551603,0.61593 -0.0026,9.96e-4 -0.08031,-3.861541 0.003,-0.03753 -0.767008,-0.7126 -0.01111,-0.01037 -0.0014,-0.0092 -0.180917,-1.242292 -0.01303,-0.01035 -2.665783,-2.362773 1.15e-4,-0.0025 0.04112,-0.689481 -0.786721,-0.197037 -0.644418,-0.137876 -0.0015,-3.65e-4 -0.933754,-1.371087 -9.2e-5,-0.02381 -0.955983,0.0045 -0.0456,-1.22e-4 -1.80766,-1.415191 -0.02006,-0.024 -0.934285,0.659749 -0.0022,0.0015 2.06e-4,-0.0019 0.161328,-1.278886 -1.327409,-0.03572 -1.109689,0.20537 -2.82e-4,2e-5 -1.413493,-0.398809 -0.01857,-0.04261 -0.554961,-1.992922 -1.051661,-1.690921 -2.168157,-0.47926 -0.01022,-0.0023 -5.38e-4,-0.02733 -0.02109,-1.14218 -0.92746,-1.284967 -2.375592,-1.396953 -0.05428,-0.03196 -3.3e-5,-4.21e-4 0.0046,-1.931307 -0.194071,-0.480932 -1.110039,-0.01371 -0.0033,-7.5e-5 -0.01576,-0.04681 -0.561456,-1.671239 -2.710968,-3.235094 -1.323958,0.01724 -0.0071,5.5e-5 -0.441642,-1.572065 0.002,-0.0013 0.930907,-0.596271 -0.409371,-0.962021 -0.654993,-0.941553 -0.900616,-1.166707 -0.01193,-0.0034 -2.119817,-0.966278 2.237928,-1.839951 0.0083,0.007 3.882512,3.279803 0.853298,-2.263788 -0.587189,-0.683548 -0.0029,-0.0035 -0.60375,-2.528985 1.530634,-2.149056 10e-7,-10e-7 2.420544,-1.585354 4.122416,1.59666 0.0041,0.0016 5.816723,11.57964 0.0028,0.03747 0.09496,1.270451 1.232919,2.529263 0.372554,0.764368 5.11e-4,0.01355 0.132373,3.823706 2.076375,-0.807571 0.0052,-0.002 0.09303,0.06415 3.088884,2.131471 2.988194,0.138059 0.08675,0.004 0.0028,0.0044 1.390381,2.187369 3.501864,-1.955059 0.0562,-0.03133 0.0318,-0.0032 2.91164,-0.293522 0.80376,-1.520022 0.6773,-2.317229 1.5e-4,-3.87e-4 1.22912,-0.546795 v 0 l 1.37664,0.392745 0.0119,0.01865 1.06028,1.66314 1.04752,-0.286118 0.004,-0.0011 -7.8e-4,0.0079 -0.12665,1.233871 1.18455,0.96797 4.19493,1.660012 0.21929,0.08681 2.13563,1.654109 0.003,0.0025 0.61747,1.903176 0.22141,0.682919 0.57135,0.282706 0.23227,-1.737224 5.4e-4,-0.0037 0.96152,-0.417679 0.81398,-0.142845 0.77242,-0.542936 -1.3e-4,-0.0375 0.47864,-5.044782 2.1e-4,-2.89e-4 1.13247,-1.285009 0.22609,-0.588143 9e-5,-1.19e-4 2.89624,-2.057808 1.5e-4,8.2e-5 0.67889,0.585241 0.7125,0.181608 0.83072,-0.80151 0.003,-0.0084 1.60467,-3.772906 0.007,-0.01197 -0.015,-0.03809 -0.57394,-2.583975 -5e-5,-0.0017 0.20019,-1.859445 -0.28554,-0.935474 -0.0835,-2.733532 3e-5,-9.1e-5 0.38591,-0.39646 0.0416,-0.708424 1.42291,-3.677617 0.009,-0.01808 -0.50562,-0.886641 -0.003,-0.0051 2e-4,-7.47e-4 0.58217,-1.794071 0.0206,-0.464947 0.33634,-1.260449 0.004,-0.01107 -0.35878,-0.962404 -0.003,-0.0093 0.0249,-0.01764 1.00578,-0.710442 0.60042,-1.31573 -0.19796,-1.073452 -0.76534,-0.805472 -0.0216,-0.02275 1.33347,-1.869002 0.15024,-0.04112 1.13435,-0.306704 1.50648,-2.10826 0.13555,-0.702019 6e-5,-9.5e-5 0.10774,-0.09044 1.61609,-1.355885 0.35526,-0.831781 -0.0119,-0.128521 0.40374,-1.124793 0.10598,-0.109558 0.20233,-0.749377 1.4e-4,-3.99e-4 5e-4,-1.66e-4 0.97197,-0.255256 1.48394,-0.565559 7.7e-4,-2.58e-4 0.001,0.0021 0.46404,0.673527 0.0365,-0.01884 1.50886,-0.491029 0.002,0.0064 0.35117,0.921199 1.07462,-0.175209 0.005,-7e-4 0.002,0.002 0.8523,0.95218 0.0234,-0.01552 3.00602,-1.494895 0.0337,-0.01347 -0.27719,-0.789423 -0.008,-0.02593 0.46475,-0.377828 0.41688,-0.04669 0.74498,-0.897875 1.5e-4,-1.19e-4 0.012,-0.0023 1.29357,-0.249593 0.32104,-1.221748 0.002,-0.0069 0.67958,-0.544047 1.53284,0.331343 0.0172,0.01026 0.0174,-0.01065 2.50586,-0.988792 0.005,0.04208 0.3311,2.649032 2.14334,3.171346 2.1148,1.278082 0.10352,0.0626 -0.002,0.01131 -0.15031,1.084122 0.90165,1.041824 8.64175,3.904038 0.19725,0.08915 1.3e-4,3.68e-4 0.50764,1.925812 2.20448,5.467713 4.3e-4,0.0012 -1.31656,2.835391 -0.0806,0.109195 -4.45091,6.023462 3.9e-4,0.01848 -0.20239,3.872399 -0.003,0.02333 0.64094,1.172467 0.94775,0.824158 1.2e-4,1.46e-4 -6.16373,4.844935 -0.0657,0.03548 0.67344,1.020178 2.39304,-0.09483 0.01,-3.76e-4 1.75217,0.54212 -1.04326,4.76058 -0.10408,0.215209 -3.15322,6.514576 0.62993,2.521169 2.36701,9.255039 8.83672,3.894327 0.0519,0.02293 0.30299,0.594201 4.38223,8.595167 1e-5,1e-5 4.72001,4.10744 0.15922,0.13858 -0.89148,5.26011 -3.3e-4,5.3e-4 -1.12054,1.54879 -0.53046,1.07656 -2.15158,3.42138 -0.0194,0.0287 0.28311,0.46709 0.0374,0.0652 -0.66589,0.40648 -0.35334,0.0952 -0.55855,0.45693 -3.6e-4,0.009 -0.28613,1.44564 -5.33934,9.59385 -0.39139,1.19956 -0.0243,0.46832 -0.052,0.20682 0.0317,0.1833 -0.02,0.38674 0.4525,2.48459 0.54907,1.12776 0.46136,1.04261 3.81509,6.32798 0.28394,0.63662 0.90537,1.34574 0.003,0.007 1.3,3.43929 -4.12634,0.15825 -0.29727,0.32314 0.0186,0.41303 -7.43246,-2.30315 -0.38075,0.18537 -2.03545,5.34064 -10e-4,0.21746 0.81779,2.21298 0.23411,0.19704 1.91279,0.35291 -0.31435,3.59024 -1.32403,0.26314 -0.24462,0.35615 0.33958,1.96698 0.17713,0.22918 1.76883,0.80215 -0.1424,1.03471 -1.03414,0.43 -1.41003,-0.66386 -0.20019,-0.0218 -2.14979,0.48709 -0.23609,0.24654 -0.22681,1.24971 0.0664,0.25289 1.91536,2.30762 0.0775,1.17858 -3.78051,1.54709 -6.28247,-0.78419 -1.4875,-4.38794 -0.47903,-0.14798 -1.66957,1.25532 -1.52109,-0.51439 -0.35817,0.12386 -4.65067,7.11665 -3.34463,0.93743 -9.11496,-0.88513 0.0651,-3.05052 -0.45081,-0.28184 -2.93564,1.50862"
                style="display:inline;fill:${this.getFillColor("lapin_shp")}"
                id="lapin_shp"
                class=${ot("lapin_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("lapin_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 112.8695,177.44925 -0.24103,-0.93773 -0.54666,-0.37835 0.29656,-0.62972 -1.01321,-0.64931 -0.0255,-0.50872 -1.76056,-0.3534 0.0506,-0.47606 0.0211,-0.19787 -1.50509,-1.06439 -1.21605,0.18449 -0.0691,0.62926 -1.13739,0.61364 -0.39032,-1.23015 4e-5,-1.6e-4 0.41821,-0.80081 0.19047,-1.37008 -0.002,-0.007 -0.48415,-2.63713 2.2e-4,-0.0137 -0.0195,-0.0132 -1.00048,-1.27371 0.002,-0.0118 0.196,-1.02135 -0.68779,-1.41208 -0.64379,-1.22905 -0.001,-0.002 -4e-5,-7.8e-4 -0.001,-1.11683 -0.0631,-0.26633 -0.0671,-1.44127 0.003,-0.0156 -0.47068,-0.5694 -0.77424,-0.18359 -1.46515,-0.88788 -0.870445,-4.01957 -3.19e-4,-0.001 0.177166,-0.75152 0.318828,-1.35011 -0.0429,-0.91158 -0.08788,-0.23933 -0.204286,-1.7979 9.6e-5,-1e-4 0.90031,-0.53076 0.19927,-0.63548 0.24862,-0.26369 0.6642,-0.49384 0.0169,0.0361 1.94423,2.02149 0.36076,0.0626 2.12106,-1.05419 1.22317,-0.39698 0.14232,-0.0964 0.55687,-0.66915 0.96419,-0.47349 0.16456,-0.2058 0.3512,-1.46889 2.66587,-0.87201 0.15836,-0.11818 1.90091,-2.75044 1.09307,-1.36501 1.29029,-0.32392 1.62272,0.38483 0.52972,9.28516 -3.66656,4.74116 0.0863,0.4551 7.4743,4.45606 0.15833,0.0437 5.99406,0.003 3.44276,1.66328 -3.75521,2.05505 -0.13551,0.39418 1.04922,2.42869 -2.33599,4.06751 0.0341,0.35634 3.31653,3.84108 -1.71309,0.8914 -5.10469,-0.1762 -0.23492,0.096 -4.32184,4.54475 -0.48335,0.481 -0.0732,-0.20383 -0.67324,-0.14795 0.31287,-0.43861 -1.79259,-0.55994 -0.46861,-0.97026 -1.37362,0.44202 -0.60924,-0.53435 -0.43569,0.92535 -0.53442,0.0326 -0.15814,-0.61525"
                style="display:inline;fill:${this.getFillColor("lansi-pohjan_shp")}"
                id="lansi-pohjan_shp"
                class=${ot("lansi-pohjan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("lansi-pohjan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 83.957403,335.82938 0.392676,-0.94673 0.01043,-0.20792 -0.41295,-1.36889 1.947664,-0.68032 0.111742,-0.51586 -1.85916,-1.77657 0.283784,-1.1393 -0.364767,-0.37745 -4.388384,0.9352 -1.012311,-0.65718 v 0 0 l -1.210747,-1.12576 -0.158104,-0.0783 -3.285413,-0.56679 -0.581678,-1.77957 -0.02479,-0.0562 -0.53372,-0.9435 0.379185,-2.14394 -0.04265,-0.21845 -1.935226,-3.08196 2.345007,-1.70518 0.0157,-0.0122 1.982176,-1.64601 0.103817,-0.16842 0.179971,-0.77916 0.365547,-0.66592 0.008,-0.28231 -0.511179,-1.06995 -0.0394,-0.0622 -0.324913,-0.39843 0.23877,-0.0524 0.241462,-0.27058 0.103791,-1.00901 1.360333,-0.44318 0.190877,-0.17785 0.818568,-2.01689 0.0055,-0.218 -0.377586,-1.08587 -0.141086,-0.81474 -0.028,-0.0853 -0.713231,-1.42988 -0.04876,-0.0709 -1.398661,-1.52635 -0.02053,-0.0204 -1.545268,-1.39814 3.87002,-1.68399 0.185923,-0.27803 0.0558,-3.01951 1.29866,-0.45915 0.20533,-0.31618 -0.248213,-3.13431 2.376333,-0.40716 0.05334,-0.0141 2.469626,-0.89657 0.0019,-6.8e-4 1.204361,-0.44599 0.146683,-0.11364 1.916317,-2.75862 1.696994,1.25087 0.434785,-0.0684 0.563252,-0.78279 2.365612,0.3175 0.257236,-0.0852 2.609969,-2.54584 0.537379,0.85919 0.465321,2.35238 0.120823,0.18968 1.29364,0.94664 v 0 l 0.918934,2.94651 0.168947,0.1903 1.973529,0.88372 1.83296,2.90906 0.14575,0.1219 1.45338,0.58797 0.3568,-0.0924 1.05052,-1.30084 0.65706,0.28927 2.50406,5.58922 0.41521,0.15298 2.42005,-1.14996 0.15562,-0.39159 -0.66784,-1.71846 2.08508,-2.92454 2.10549,1.51169 0.12718,0.0534 2.54741,0.4454 0.7827,1.20528 -1.34001,1.90959 0.0514,0.41222 1.59253,1.37155 -0.55988,1.68949 0.17564,0.38337 1.64242,0.6781 2.26212,3.00386 -0.95543,1.87223 -0.0289,0.0858 -0.63467,3.52694 0.0178,0.0202 -0.0224,0.0228 -0.0761,1.97837 -1.06766,4.27649 -7.42698,0.99464 -1.70769,-0.88428 -0.44883,0.31714 0.70319,5.09015 -1.20052,1.29756 -1.28198,-1.26033 -0.51434,0.13518 -0.33679,1.17164 -1.85549,-0.98771 -0.28196,-0.005 -4.59528,2.25982 -0.17133,0.24665 -0.13495,1.33878 -0.969162,1.19643 -4.605645,1.47184 -0.02068,0.007 -3.435506,1.3736 -0.164272,0.42085 0.53947,1.12782 0.335748,0.85265 0.02467,0.0493 0.565799,0.91583 -0.124779,0.39617 -1.645896,-2.04238 -0.292839,-0.1109 -2.737035,0.46561 -0.12099,0.0484 -1.113286,0.74995 -1.590566,-1.67059 -0.181746,-0.0932 -1.307474,-0.18071"
                style="display:inline;fill:${this.getFillColor("pirkanmaan_shp")}"
                id="pirkanmaan_shp"
                class=${ot("pirkanmaan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("pirkanmaan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 202.36889,300.32313 -0.47873,0.92044 -0.1983,0.32485 -0.81478,1.10172 -0.48244,0.65234 -0.71404,0.57357 0.14584,0.66509 -0.17786,0.35461 -5e-5,8e-5 v 0 l -0.42891,0.0676 -0.94897,1.46086 -0.22788,0.37126 -0.82007,0.9702 -0.0955,-0.20183 -0.89248,0.0131 -0.15197,0.0425 -7.05292,4.13544 v 0 l 0.93022,-1.27505 0.0581,-0.15325 0.23796,-2.51726 -0.0734,-0.23077 -1.29202,-1.50385 0.60232,-2.05898 -0.0925,-0.31911 -2.92443,-2.57557 -0.9866,-3.34478 -0.0529,-2.65278 -0.0573,-0.17329 -1.79516,-2.52156 -0.49312,-2.45675 -0.0894,-0.16266 -1.07909,-1.03276 -0.44539,0.0181 -0.99209,1.11773 -0.0777,0.22052 0.0769,1.5741 -2.31463,0.21606 -0.25067,0.17515 -0.99126,2.08335 -2.65277,-0.72961 -0.38878,0.33932 0.27724,2.07672 -1.33405,-0.42773 v 0 0 l -1.44567,-2.05214 -0.14782,-0.11282 -1.81679,-0.65639 -0.02,-0.80504 -0.27176,-0.29947 -1.8065,-0.22104 -1.0381,-2.10375 0.49025,-1.32344 1.2645,0.30168 0.38054,-0.27999 0.20674,-3.03846 1.57686,0.27978 0.31768,-0.14263 -0.0162,-0.34785 -0.58681,-0.78156 1.81037,-0.35343 0.23787,-0.21737 0.6208,-2.13667 0.70595,-1.27285 -0.0153,-0.325 -0.99222,-1.44801 1.08161,-0.86664 0.10356,-0.1548 0.37585,-1.28782 0.44692,-0.48405 2.04751,1.7785 0.47559,-0.0873 0.50191,-0.93528 1.97056,-1.49247 0.04,-0.45715 -1.95073,-2.10245 -0.0609,-1.36913 1.29068,-0.90693 0.002,-0.50505 -3.21279,-2.29333 -1.58473,-2.64772 -0.008,-0.0125 -1.04624,-1.5721 -0.12061,-0.10603 -1.0983,-0.54229 1.72229,-3.47974 0.0304,-0.10463 0.28052,-2.64486 -0.11438,-0.27425 -1.39296,-1.11463 -0.4085,-1.71928 -0.01,-0.0326 -0.56563,-1.582 0.8601,-1.05364 -0.10465,-0.47409 -0.80343,-0.38978 -0.26602,-3.07321 -0.049,-0.14222 -0.68143,-1.04605 -0.28224,-0.13968 -1.2118,0.0901 -1.36773,-1.62956 1.86253,-4.03911 5.63987,1.38944 0.11597,0.006 3.43046,-0.46938 0.69652,-0.0565 0.0285,-0.004 7.62363,-1.3386 0.74827,4.18141 0.0372,0.10116 0.87576,1.50451 0.50026,0.0482 1.37603,-1.57167 1.37379,-0.3196 0.0834,-0.0327 0.0492,-0.0281 4.44378,5.43525 0.0252,0.0778 2.00472,1.22091 0.004,0.002 0.01,0.0156 1.66623,2.61642 4.73614,1.82337 0.0673,0.0259 1.1e-4,1.3e-4 1.04025,1.21027 0.92286,0.25453 0.4074,0.11381 0.0926,0.1859 0.70094,1.4129 0.0179,0.003 2.56006,1.35389 0.43649,0.6525 1.08215,0.69933 0.14396,0.13253 0.028,0.77844 0.22078,0.44983 0.0861,0.42751 0.091,0.90543 0.32943,1.19429 0.0242,0.0186 1.57698,1.32552 0.33236,0.54099 0.46639,0.1304 0.77512,0.65153 -0.17885,0.64149 0.858,0.27899 5.9e-4,2e-4 1.34322,2.54852 0.19521,0.37037 -2.01909,4.42165 -0.001,0.003 -0.70559,3.33161 -0.0173,1.37795 -0.002,0.0114 -0.41815,0.24864 -1.5872,4.94874 -0.58707,0.3567 -0.0406,0.0144 -0.01,0.0663 -0.2403,1.59916 -0.001,0.002 -0.37882,0.1572 -0.6558,0.92524 -2.23185,3.02109 0.1651,0.0875 -0.0955,0.84074 -0.004,0.0135 -0.63492,-0.12356 -1.41521,1.46209 -0.0144,0.33439 -0.29253,0.37003 -1.02217,1.50694 -6.6e-4,8.9e-4 -0.004,2.5e-4 -1.01329,0.0568 -0.41734,0.71879 0.0902,0.32361 -0.4155,1.31817 -5e-4,8.2e-4 -1.78526,2.78846"
                style="display:inline;fill:${this.getFillColor("pohjois-karjalan_shp")}"
                id="pohjois-karjalan_shp"
                class=${ot("pohjois-karjalan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("pohjois-karjalan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 132.88787,253.55528 -2.37273,0.76779 -1.37505,-0.34168 -1.71686,-2.22449 -0.17599,-0.11259 -4.40167,-1.00653 -1.96555,-1.68703 -0.0299,-0.0227 -1.47923,-0.98585 v 0 0 l -2.16012,-4.72876 -0.22351,-0.1754 -2.08316,-0.39718 -0.36162,0.24444 -0.50699,2.58643 -2.44356,-1.24705 -0.36271,0.0601 -1.55287,1.59989 -2.51743,-6.19479 -0.14362,-0.15789 -2.5584,-1.33394 -1.60318,-3.59058 -0.45978,-3.03047 -0.16083,-0.22689 -1.71983,-0.91315 -0.41727,0.12604 -1.467964,2.71285 -1.77244,1.04659 -1.808076,-2.41739 -0.03323,-0.0132 0.213661,-0.61155 -0.609997,-1.72222 0.764946,0.20227 1.376666,-2.34966 -0.416468,-1.15297 1.804821,-0.50751 0.598482,-1.52374 1.044261,-0.15232 0.239418,-1.54521 0.96186,-0.69041 0.27434,-0.69115 0.48317,-1.21727 1.02883,-0.23966 -0.1148,-0.50457 2.98671,-2.33117 -0.44719,-1.09027 0.91897,0.30999 0.41884,-0.2828 0.49359,-0.33327 0.74261,-4.16488 2.41591,-2.15718 0.27939,-1.81788 -0.0791,-0.16547 -0.43984,-0.92057 1.42619,-0.5616 0.31615,1.01887 0.54976,-2.10468 1.9269,-0.65657 1.55726,0.25909 0.38637,-0.77471 0.57063,-0.14711 1.48744,-0.38345 2.86026,2.21355 0.10167,0.45221 0.14318,0.63686 0.86169,-1.95975 0.24485,-0.55685 -2.37836,-1.69133 -0.0699,-1.4699 1.67511,0.0984 1.33907,1.47763 0.98307,-0.29653 -0.99709,-1.44586 0.67369,-0.80556 -0.95832,0.50866 0.36749,-1.17199 -0.4891,-1.96294 -2.18504,-1.229 -0.0149,-1.29819 0.63872,-0.0899 -0.0425,-0.77919 0.53493,-0.0988 -0.13223,-1.29636 0.77901,0.13839 -0.47708,-0.36683 0.24809,-0.65911 0.0207,-0.055 -0.89429,-0.22006 0.73445,-0.63058 -1.00024,-1.62292 1.26097,-0.91815 -0.89704,-0.45012 -0.0586,-1.12773 0.82294,0.0813 0.71159,-0.62802 -0.55085,-0.84664 0.33522,-0.32858 -0.30363,-0.95832 -0.62154,-0.16512 -1.06301,-2.54112 -1.20617,0.08 -0.31342,-0.87265 0.15177,0.0342 0.58914,-0.58628 0.006,-0.006 4.22891,-4.44702 5.04698,0.17421 0.15351,-0.0347 2.13166,-1.10921 2.68958,-1.38217 -0.0602,2.81818 0.27946,0.31461 9.4582,0.91846 0.11342,-0.01 3.51234,-0.98443 0.17553,-0.12869 4.58314,-7.01332 1.44866,0.4899 0.2851,-0.0458 1.45828,-1.09647 1.41251,4.16668 0.25473,0.20772 6.55541,0.81826 0.15553,-0.0207 4.06175,-1.66218 0.19158,-0.30669 -0.0987,-1.50102 -0.0707,-0.17734 -1.88734,-2.27385 0.16452,-0.90647 1.84639,-0.41834 1.43772,0.67689 0.25062,0.006 1.32432,-0.55066 0.18775,-0.24354 0.19802,-1.43889 -0.17875,-0.32401 -1.8298,-0.82981 -0.26037,-1.50815 1.25579,-0.24958 0.24794,-0.27651 0.35913,-4.10176 -0.25212,-0.3313 -2.01634,-0.37202 -0.71651,-1.93892 1.89067,-4.96079 7.57565,2.34752 0.40073,-0.3095 -0.0244,-0.54164 3.91857,-0.15028 0.0669,-0.10088 1.98904,5.26222 3.37398,4.84788 1.16543,3.84045 0.10996,1.22157 0.37392,0.37294 0.80243,2.64427 1.22729,6.50593 0.10236,0.94233 0.0135,0.12414 -0.0275,-0.0135 -1.74329,-0.85987 -4.10362,2.23847 0.49877,0.93591 1.64304,1.61536 4e-5,3e-5 -7e-5,1.3e-4 -1.35102,2.07119 -0.0945,-0.13673 -2.96506,-0.17109 -0.0424,4.6e-4 -2.13705,0.17009 -2.59953,-0.41792 -0.32318,0.16184 -1.22319,2.33309 -2.12313,0.0746 -0.1245,0.031 -4.37416,2.12786 -0.17151,0.23846 -0.43287,3.33764 -6.20368,1.34796 -0.0582,0.0188 -2.39417,1.0465 -0.17145,0.19133 -1.31243,4.20405 -3.02295,-0.90113 -0.25326,0.0347 -1.7004,1.07051 -3.02392,-0.0222 -0.28514,0.18395 -0.97082,2.18832 0.0379,0.31453 1.75439,2.27371 0.25652,3.40371 -0.55646,1.18919 -2.78365,-0.72641 -0.35979,0.42759 1.52337,3.34753 -0.18548,1.12331 0.0135,0.15329 1.02336,2.90315 0.059,0.10093 1.15779,1.32276 -2.97267,3.81278 -0.0319,0.33027 0.93628,1.84556 -0.85218,2.78296 -1.88503,0.54159 -1.35566,-1.10402 -0.3388,-0.0343 -1.85839,0.9718 -0.11576,0.10511 -0.75481,1.15676 -0.0502,0.17721 0.0444,1.69452 0.13491,5.48041 0.16706,0.26718 0.82338,0.42637 -4.1974,2.22922 -0.0573,0.0392 -4.8384,4.18412 -0.10619,0.25686 0.62446,8.4526 -1.29841,0.60408 -0.17485,0.23058 -0.49815,3.04338 -0.004,0.0548 0.0103,0.65175"
                style="display:inline;fill:${this.getFillColor("pohjois-pohjanmaan_shp")}"
                id="pohjois-pohjanmaan_shp"
                class=${ot("pohjois-pohjanmaan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("pohjois-pohjanmaan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 172.29764,295.78003 -0.6223,2.15307 -1.16832,-1.32889 -0.16732,-0.0982 -1.86714,-0.40168 -0.0304,-0.005 -5.40446,-0.60868 -2.48557,-1.80095 -0.30798,-0.0319 -0.74269,0.33239 -1.24406,-1.26445 0.23714,-1.37262 -0.23606,-0.35436 -0.9761,-0.22284 -4.50279,-4.35294 -0.22098,-0.0869 -1.0488,0.02 -0.11766,0.0257 -1.87486,0.81655 -0.11431,0.0858 -0.3696,0.44421 -0.95044,-0.66531 -0.23124,-0.0512 -0.99036,0.17477 -1.58705,0.11336 -1.05913,-0.29995 -0.28876,0.0654 -1.33041,1.1709 -1.15198,-0.13203 -0.0334,0.0225 -0.0194,-0.024 -1.05908,0.0601 -2.12018,-2.52996 1.71745,-2.49625 0.0341,-0.28591 -2.35853,-6.16822 -0.5067,-0.10942 -1.2133,1.20071 -2.85504,-3.1053 0.18449,-0.72005 -0.18573,-0.36447 -1.37529,-0.5452 -0.3153,-1.20546 1.03289,-0.43446 1.32027,-0.0261 0.68677,0.89648 0.5247,-0.0544 0.96194,-2.00695 -0.0765,-0.3677 -1.21143,-1.04876 1.10618,-0.18816 0.17381,-0.51676 -1.74485,-1.86014 -0.79827,-1.89096 -0.27502,-4.35335 -7e-4,-0.009 -0.17707,-1.91606 -0.0932,-0.19412 -0.7158,-0.69122 1.5584,-2.66656 0.0331,-0.23105 -0.13355,-0.53526 -0.0129,-0.81742 0.46726,-2.85459 1.34382,-0.62522 0.17807,-0.30336 -0.62875,-8.51067 4.69432,-4.05952 4.55756,-2.42051 3.62914,1.53579 0.0277,0.0102 5.01102,1.57758 0.18437,4.6e-4 1.24058,-0.38374 5.74344,3.68725 3.74255,4.37879 0.0222,0.0234 1.63831,1.5548 0.49855,-0.1052 1.05296,-2.52093 1.2691,1.51204 0.25997,0.10965 1.18748,-0.0883 0.53927,0.82782 0.27449,3.171 0.17322,0.25173 0.60932,0.2956 -0.72305,0.88575 -0.0517,0.29986 0.61872,1.73047 0.42917,1.80625 0.10773,0.17008 1.34383,1.07532 -0.25682,2.4214 -1.83513,3.70774 0.14033,0.41473 1.30147,0.64262 0.99608,1.49673 1.6141,2.69678 0.0857,0.0929 2.90973,2.07701 -1.07195,0.75323 -0.13123,0.26694 0.0735,1.65203 0.0823,0.19671 1.79539,1.93503 -1.75184,1.32681 -0.0858,0.10035 -0.35071,0.65353 -1.98172,-1.72135 -0.43028,0.0237 -0.69989,0.75804 -0.0697,0.12322 -0.36887,1.26389 -1.22949,0.98512 -0.0618,0.41641 1.04643,1.52711 -0.63005,1.13599 -0.0265,0.0638 -0.57784,1.98882 -2.10983,0.41188 -0.18816,0.48951 0.4121,0.54887 -1.14353,-0.2029 -0.36279,0.28368 -0.20531,3.0175 -1.17552,-0.28045 -0.36198,0.1935 -0.63179,1.70552 0.0127,0.24443 1.17104,2.37315 0.23991,0.17022 1.70731,0.20891 0.0186,0.74948 0.2042,0.28334 1.92405,0.69515 1.36371,1.93581"
                style="display:inline;fill:${this.getFillColor("pohjois-savon_shp")}"
                id="pohjois-savon_shp"
                class=${ot("pohjois-savon_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("pohjois-savon_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 114.56892,343.832 -0.001,-1.1336 -0.002,-0.0305 -0.18689,-1.86494 -0.2173,-0.26503 -0.8726,-0.2672 0.10937,-3.13169 1.93173,-0.96169 0.0955,-0.0738 1.51181,-1.73654 0.0721,-0.15359 0.39772,-2.44938 -0.025,-0.1804 -0.89672,-1.92263 -0.25228,-0.17736 -2.71674,-0.24831 -0.52402,-0.88807 -0.0477,-0.0615 -0.60011,-0.60011 -0.54492,-1.02546 -0.63394,-4.58892 1.26375,0.6544 0.18337,0.0319 7.73195,-1.03549 0.25916,-0.23175 1.1263,-4.51142 0.009,-0.0631 0.0664,-1.7282 1.47461,-0.0782 0.18071,-0.0705 1.16878,-0.96568 1.1108,0.87328 0.48591,-0.14875 1.17715,-3.66978 0.84556,0.34437 0.88302,1.32127 0.17541,0.12647 1.01395,0.27818 1.2854,3.9558 0.52796,0.10725 0.82705,-0.95256 1.12161,-0.15895 0.40403,1.3318 -0.61505,2.36658 -0.009,0.0571 -0.25788,3.83472 0.0269,0.14842 0.86174,1.90277 0.0382,0.0631 1.32977,1.69815 0.24728,0.11864 1.14937,-0.0135 0.35619,1.20761 -1.25343,0.65679 -0.1519,0.18234 -0.64748,2.08542 -2.45957,1.9175 0.0223,0.50392 1.01767,0.65788 -0.59176,1.00569 -0.0427,0.14958 -0.0477,2.00448 0.22092,0.30389 1.34087,0.39991 0.33847,-0.11421 0.54883,-0.75262 1.57296,0.50765 0.60885,4.07607 -0.50386,1.30109 -2.13891,1.13608 -0.16377,0.25528 -0.0768,1.31776 -0.97682,0.30895 -1.46506,-0.30405 -3.1e-4,-6e-5 -5e-5,-10e-6 -0.37151,0.32069 0.0712,1.24727 -1.43948,0.81107 -1.19874,-0.9353 -0.25543,-0.0586 -1.59741,0.34361 -0.24437,0.30234 -5.8e-4,0.97398 -0.4998,1.27917 -3.4e-4,8.9e-4 -1.6e-4,4.1e-4 -1e-5,1e-5 0.32759,0.41911 1.0739,-0.13709 -0.81725,1.81459 -1.61218,0.58268 -0.75946,-1.12015 -0.12005,-0.10427 -1.83632,-0.89908 -0.12893,-0.0314 h -4e-5 l -0.001,-2e-5 -1.42274,-0.0276 -0.236,0.10239 -0.75411,0.83793 -0.96894,-1.59755 -0.21031,-0.72415 0.65184,-0.80323 0.75701,-0.35072 0.17681,-0.32049 -0.26273,-2.03038 -0.0839,-0.17482 -1.11418,-1.15821 -0.48509,0.05 -0.80662,1.28481 -1.04873,0.0103 -1.33377,-2.92022 -0.40398,-0.1556 -1.24099,0.53501"
                style="display:inline;fill:${this.getFillColor("paijat-hameen_shp")}"
                id="paijat-hameen_shp"
                class=${ot("paijat-hameen_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("paijat-hameen_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 78.146273,329.45608 -0.279692,1.99786 0.02492,0.17133 0.971195,2.12907 -0.274648,0.65556 -1.960397,-1.84767 -0.520151,0.1944 -0.34445,3.445 -1.661124,0.0851 -7.02e-4,4e-5 -3.018556,0.1616 -0.235018,0.48921 0.630918,0.88075 -4.832442,0.029 -0.210287,0.0842 -1.536896,1.44727 -0.284257,-0.72211 -0.278796,-0.19596 -2.146788,-0.0635 -0.329736,-2.3961 -0.122934,-0.20689 -1.693993,-1.24883 -1.063455,-0.93188 -0.361575,-0.0335 -1.602403,0.94859 -0.471876,-1.58769 -0.488997,-0.15422 -1.157601,0.91878 -1.257508,6.2e-4 -0.693769,-1.02744 0.07153,-0.58764 -0.798651,-0.61293 1.590207,0.13246 -0.01304,-1.351 -0.565821,-0.26341 0.791175,-0.23138 -0.323181,-1.6305 1.094227,-0.34326 0.07526,-0.16769 0.419789,-0.93541 1.159641,0.24654 -1.723912,-1.3525 -0.057,-0.50764 0.536351,-0.13988 -0.307379,-0.70355 0.989198,-0.007 -0.152671,-0.82061 0.501505,-0.52901 -0.795081,-0.97765 0.547438,-0.5591 -0.270133,-0.65203 -1.210371,-0.84203 0.696771,-0.2493 1.131579,0.53618 0.03612,-0.0364 0.610112,-0.61523 -1.857496,-2.44165 1.638693,0.71014 0.940333,-0.5024 -1.453144,-0.89921 -0.66633,-2.19488 0.608911,-0.2223 0.956219,1.14875 1.785048,0.73334 -2.2663,-4.59515 0.201082,-1.64925 0.681402,0.0922 -0.303918,-0.33548 -1.69822,-1.87458 0.0083,-0.63283 0.455251,7e-4 0.320071,0.81635 0.64304,-1.18017 -0.807325,-0.47598 -0.388357,-3.27164 -0.38397,-1.00141 -0.65795,0.36411 -0.535793,-0.32063 0.03161,-0.50483 0.20241,0.1049 1.506867,-1.2113 3.470014,-0.0404 1.566312,0.25217 3.509369,1.51567 0.301368,-0.0314 2.299454,-1.62619 0.07499,-0.0754 1.540789,-2.20532 1.779415,0.13766 0.272092,-0.12375 0.961365,-1.29149 1.306472,-1.75271 1.118968,-0.29287 0.210334,-0.18793 1.179101,-3.05466 0.340704,0.20704 0.04539,0.0227 2.911816,1.16928 0.236613,2.98783 -1.276845,0.45144 -0.206243,0.28603 -0.05609,3.0353 -4.127599,1.79607 -0.08415,0.51321 1.89021,1.71024 1.35951,1.48362 0.673575,1.35039 0.137661,0.79496 0.01263,0.0488 0.347631,0.99972 -0.720654,1.77563 -1.414928,0.46096 -0.211968,0.26256 -0.101488,0.98663 -0.511634,0.11233 -0.173455,0.49781 0.619463,0.75962 0.426792,0.89333 -0.309791,0.56435 -0.03024,0.0793 -0.166111,0.71915 -1.894202,1.57295 -2.570763,1.86934 -0.08008,0.41483 2.025529,3.22578 -0.377777,2.13598 0.03538,0.20625 0.57326,1.0134 0.62998,1.92734 0.241523,0.2088 3.378343,0.58283 1.044917,0.97156"
                style="display:inline;fill:${this.getFillColor("satakunnan_shp")}"
                id="satakunnan_shp"
                class=${ot("satakunnan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("satakunnan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 59.140806,299.47917 -3.315622,0.0386 -0.19027,0.0682 -1.370156,1.10141 0.04221,-0.67402 -0.652554,0.30506 0.746527,-3.28522 -0.02987,-2.19298 0.408027,-0.2463 0.431126,0.69551 0.017,-1.35598 1.37047,-1.35182 -0.431634,0.15755 -0.426366,-0.67982 0.226762,-1.46266 -0.580694,0.83405 -0.541716,-0.009 0.782812,-2.021 -0.466619,0.3724 -0.220672,-0.6001 -0.107815,-0.2932 0.566989,-0.0861 0.161437,-0.0245 0.02559,-0.12998 0.266232,-1.35244 -0.795141,0.48776 -0.07016,-0.66699 -0.110528,-1.0508 -0.81254,0.36202 0.0124,-0.93377 0.01117,-0.84116 -1.065822,0.58891 0.257312,-1.50468 -0.916751,-1.00628 1.053618,-1.55255 -0.211945,-0.63063 0.786094,-1.92978 -0.747517,-0.10641 -0.169912,-0.88137 -0.806665,1.11091 -0.121344,-0.60798 0.20425,-1.35498 -0.108705,0.25033 -0.165309,-0.29205 0.294188,-0.0921 0.0869,-0.57648 0.02883,-0.19124 0.986618,-0.30502 0.610337,-1.16512 -0.687532,-1.15797 0.293105,-1.34064 1.072927,0.22723 1.182495,-2.7584 0.667235,0.23643 1.005744,0.35638 0.238206,-0.71309 0.24978,0.45713 0.620092,-2.2695 0.960166,-0.54948 -0.02261,-1.15757 -0.03662,-1.87509 0.850784,-10e-4 0.135749,-0.70447 1.444635,1.10439 0.504067,0.38535 0.372609,-0.31282 -0.14963,-0.17041 -0.863517,-0.98341 -0.08539,-1.25272 -0.601488,-0.22187 -0.563475,-1.4679 0.04641,-0.20463 0.1273,-0.56128 0.561475,0.0213 -0.59233,-0.6376 0.22968,-1.13754 0.529175,-0.23638 -0.122579,-0.83088 0.496667,-0.12667 0.144409,1.19676 1.178189,1.08539 0.41437,-0.79375 0.592266,0.37459 0.967254,-1.29898 1.260251,0.31982 0.750508,-0.48863 0.373644,0.71262 0.204182,-0.0879 0.402843,-0.1735 0.421174,1.59288 -0.459427,0.0596 -0.583859,0.0757 0.229474,0.83252 -0.437644,0.0814 0.722251,1.02557 -0.185123,-1.31952 0.357781,-0.27837 0.0712,-0.0554 0.506705,0.29585 0.255223,-1.66648 0.745133,-0.0347 -0.06181,0.88161 1.705948,-1.06641 0.657296,0.23228 -0.01951,-0.66668 1.033503,-1.22975 1.062865,0.63525 0.26045,-1.66856 0.02783,-0.1783 -2.047148,-2.9764 -0.358571,-1.42539 1.442122,-0.34673 1.460339,1.48252 -1.098383,-1.64406 -0.233224,-1.25919 0.747388,-1.52218 0.484328,-0.078 -0.179308,2.12467 0.984344,1.00291 0.87262,-1.73178 -0.215037,-0.83065 0.879864,-1.07073 -0.749013,0.43605 -0.543872,-0.85279 0.871489,-0.0679 0.170704,-0.4646 0.378659,-1.03059 1.357503,-0.77418 0.274807,-1.52728 0.276208,0.90493 0.386949,-0.22325 0.429446,0.5101 0.0614,-0.83239 0.03677,0.0112 0.735169,0.22438 -0.925397,-1.9497 1.431605,-1.06784 -0.675951,0.23477 -0.618624,-0.63541 0.663078,-1.25399 1.310181,0.26501 0.01158,-0.64946 0.583524,0.33185 -0.06184,0.23782 0.436112,1.17 0.377236,1.11911 -1.327075,1.12318 -0.05464,0.41215 1.505224,2.17777 0.128187,0.10652 3.29476,1.47402 2.996146,4.63882 v 0 l -1.688917,0.70774 -0.164594,0.16295 -1.001057,2.32344 -1.488137,1.16678 -1.860781,-0.57084 -0.383922,0.1968 -0.39839,1.17927 -2.870301,-1.14588 -0.35623,0.0939 -2.019556,2.52078 -0.710363,0.85615 -0.06709,0.24847 0.24578,1.47468 0.06129,1.22574 0.05757,0.16486 0.543762,0.75839 -0.332567,1.40667 -5.958441,0.85219 -0.228815,0.15993 -1.797067,3.34669 -0.0063,0.28043 1.406463,2.92644 0.155079,2.88875 -1.004502,1.02152 -4.956521,-2.35611 -1.163447,-1.81566 -0.557634,0.0804 -0.944912,3.24296 3.28e-4,0.17424 0.709859,2.4026 -2.021265,1.56688 -0.01773,0.0148 -1.215417,1.09685 -0.102103,0.22593 -0.0311,2.53494 -1.078756,3.55732 -0.0129,0.0738 -0.118728,2.2935 0.270016,0.32298 1.720205,0.21863 -0.442042,2.93929 0.08732,0.26495 1.199814,1.19845 -2.021072,2.13423 -0.08419,0.19407 -0.253381,4.18642"
                style="display:inline;fill:${this.getFillColor("vaasan_shp")}"
                id="vaasan_shp"
                class=${ot("vaasan_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("vaasan_shp")}"
              />
              <path
                clip-path="url(#p348aba3507)"
                d="m 69.012231,362.57474 -0.471066,0.61506 0.992655,0.13928 0.46748,-0.25963 0.660938,-0.36708 -1.136433,0.31728 -0.01071,0.003 -3.64e-4,-0.0126 -0.01389,-0.47976 1.024319,-0.7949 -0.563581,-0.60334 -1.450167,0.26672 0.03605,-0.44999 0.02716,-0.33906 0.56796,-0.70659 2.073019,-2.57898 0.597541,-0.74338 -0.672655,0.55934 -0.415265,0.34531 -1.618353,-0.38228 0.13619,-1.1859 -3.424589,0.94388 -0.17378,-0.33147 -0.47885,-0.91336 -0.113812,0.98854 -1.156578,0.06 -0.308569,-1.0324 1.0597,-0.50187 0.476384,0.40144 -0.726288,-0.91236 -1.116472,0.13355 -0.193243,-0.37828 -0.145086,-0.28401 -0.216318,0.20602 -0.228815,0.21792 -1.002946,-0.59139 0.587164,1.09763 -1.312659,0.13535 -0.824539,-1.03064 -0.163165,-1.12386 1.656359,0.94025 0.08086,-0.95688 -0.518493,-0.41081 -0.487933,-0.3866 0.07882,-0.98001 -0.736736,0.32221 -0.09827,-0.83666 -0.735906,0.19625 0.168223,0.84738 0.18318,0.92272 -0.318104,0.37483 1.177239,2.06466 -0.133649,1.28244 0.788072,0.18118 0.680755,0.95352 -1.089051,0.44138 -2.654378,-0.7691 0.119093,-0.3161 1.348692,0.32623 -1.899242,-1.5968 0.704194,-0.74782 0.635784,0.4126 -0.62449,-0.83288 -0.125251,-1.61928 0.875295,-0.002 -0.561017,-0.47376 -1.447291,0.55895 -0.171676,-0.56758 -0.510965,1.23079 -0.328752,-0.44313 1.255373,-2.76924 0.789805,0.52765 -1.157312,1.41311 1.044168,-0.22206 0.04151,-0.19484 0.463159,-2.1738 0.438363,-2.05741 -0.99736,0.87799 -0.454953,0.4005 -0.515732,0.0912 -0.817599,0.14459 -0.573483,2.29578 -1.369698,0.70629 0.528609,-1.08056 -1.386372,-1.97703 0.268517,-0.44406 -0.487898,0.50512 -1.173581,-0.92656 -0.322443,-0.78782 -0.160325,-0.39172 0.890798,0.24249 0.04343,-0.67931 -0.456299,0.0255 -1.27155,-1.5074 0.944717,-1.53022 0.04296,-1.00395 0.57461,1.18891 -0.814447,0.37066 1.492063,0.4132 -1.243989,-3.24448 0.305892,-0.76158 -0.71902,-0.28957 -0.386603,0.54879 -1.369412,-0.75595 -1.00169,-1.55057 0.411334,-0.64679 0.935631,0.14734 -0.495053,-0.80041 1.635032,-0.54976 0.09129,-0.93675 -0.983017,-0.69803 0.808533,-0.81564 1.545781,2.27469 -0.453698,0.45348 0.456495,0.20991 0.628032,0.28879 -0.03479,-1.34804 -1.341757,-2.2274 0.293729,-0.27171 -0.847896,-2.08743 0.527391,-0.0649 0.639243,0.62735 -0.05302,0.37282 1.174764,1.73976 0.256604,0.13628 1.529832,-7.5e-4 0.192225,-0.0671 0.883458,-0.7012 0.454438,1.52902 0.454257,0.17813 1.750734,-1.0364 0.904637,0.79271 0.02032,0.0163 1.599368,1.17907 0.347625,2.5261 0.297414,0.26713 2.204476,0.0652 0.376879,0.95741 0.500082,0.11194 1.780995,-1.67714 5.308637,-0.0319 0.249703,-0.48964 -0.650284,-0.90779 2.454373,-0.1314 1.926382,-0.0987 0.292068,-0.27825 0.308351,-3.08395 1.827858,1.72275 0.49765,-0.10561 0.499551,-1.19239 -0.0039,-0.248 -0.989952,-2.17019 0.222178,-1.58703 v 0 l 0.734832,0.47705 0.232993,0.0431 4.029312,-0.85868 -0.207483,0.83298 0.08648,0.29852 1.623658,1.55153 -1.750321,0.61138 -0.194215,0.38151 0.466629,1.54683 -0.458552,1.10556 -1.007661,0.48332 -0.09415,0.48826 1.442771,1.57192 -0.483665,1.84478 -1.977891,0.0582 -0.300317,0.31382 0.02321,1.59098 0.207927,0.28782 1.02919,0.35729 -1.093723,1.3476 0.0042,0.39507 1.941863,2.29136 0.346216,0.0891 2.222376,-0.84647 1.39115,-0.0527 2.82033,3.04234 0.190146,0.0969 3.416909,0.40912 0.203498,1.15255 -1.278184,1.53892 -0.06371,0.26627 0.31498,1.3864 -2.005138,0.42849 -0.244689,0.29518 -0.02762,1.14959 0.203759,0.2983 0.549103,0.19935 0.0026,1.74614 -1.01053,0.51396 -0.169091,0.28243 0.02629,1.23188 -2.453185,2.19711 -0.0965,0.2936 0.364546,1.75044 -0.634762,-0.18914 -0.222876,0.0179 -3.121895,1.50688 -0.7555,-1.16057 -0.478504,-0.0496 -2.782689,2.79176 -1.909038,0.002 0.02023,-1.04037 -0.888196,0.89405 0.137117,-0.67035 -1.861782,-1.42702 0.360719,-0.534 -0.239103,-0.43929 -0.06695,-0.12301 0.307224,-0.37804 2.666059,-3.28059 1.006626,-2.19704 -1.176784,1.45889 -2.426699,0.648 -0.01338,0.004 -1.448828,1.5435 -2.993346,0.83571 0.87289,-0.0265 2.962276,-0.0899 0.374434,-0.6177 1.0301,-1.69937 0.939096,0.23742 -1.283961,1.73235 -0.870401,1.17437 -0.174621,1.18925 -0.49311,0.13388 0.627839,1.57772 -0.64404,1.25314 -1.235457,0.65073 0.08308,1.94892 -1.574807,0.10449 -0.189963,-0.62832 0.01423,1.18079 -0.369123,0.0546 0.187775,-1.6752 -0.342702,0.80052 -1.44525,-0.56273 -2.075183,0.99319 -0.09935,-0.7156 -0.907147,0.56343 -0.320129,-2.10698 0.0946,-0.93746 0.948056,-0.66092 1.085074,1.16181 0.004,-1.05581 -0.812902,-0.79361 2.0031,-0.6449 -2.194898,-0.36579 0.137169,-0.82049 0.868864,-0.72759 0.0924,-1.10533 0.03923,0.0262 0.584175,0.39034 -0.05328,0.0696"
                style="fill:${this.getFillColor("varsinais-suomen_shp")}"
                id="varsinais-suomen_shp"
                class=${ot("varsinais-suomen_shp"===this.selectedArea.area_id,(()=>"selected"))}
                @click="${()=>this.setSelected("varsinais-suomen_shp")}"
              />
            </g>
          </svg>
        </div>
        <div class="right-pane">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 80 28.6"
            style="enable-background:new 0 0 80 28.6;"
            xml:space="preserve"
            class="thl-logo"
          >
            <style type="text/css">
              .st0 {
                fill: #606060;
              }
              .st1 {
                fill: #7bc143;
              }
              .st2 {
                fill: #ffffff;
              }
            </style>
            <path
              class="st0"
              d="M43.5,13.6h3.8V9.2h-3.8V6.9c0-1.2-0.9-2.1-2.1-2.2c0,0-0.1,0-0.1,0h-3.2v4.5h-2.2v4.4h2.2v6.2
	c0,5.6,4.9,6.3,7.6,6.3c0.5,0,1,0,1.6-0.1v-4.9c0,0-0.3,0-0.8,0c-1.1,0-3-0.3-3-2.1L43.5,13.6z M64.7,26h4.6v-4.7h-0.9
	c-0.6,0-1.1-0.5-1.1-1.1c0,0,0,0,0,0v-5c0-4.7-2.3-6.3-5.8-6.3c-2.1-0.1-4,0.9-5.2,2.6V4.9c0-1.2-0.9-2.1-2.1-2.2c0,0-0.1,0-0.1,0
	H51V26h5.4v-7.4c0-0.7,0.1-1.5,0.3-2.2c0.4-1.5,1.8-2.5,3.4-2.5c1.3,0,1.9,0.7,1.9,2.2v7.1c-0.1,1.4,1,2.6,2.4,2.7
	C64.4,26,64.6,26,64.7,26 M80,26v-4.7h-0.8c-0.6,0-1.1-0.4-1.2-1.1c0,0,0,0,0-0.1V6.9c0-1.2-0.9-2.1-2.1-2.2c0,0-0.1,0-0.1,0h-3.2
	v18.5c-0.1,1.4,1,2.6,2.4,2.7c0.1,0,0.3,0,0.4,0H80z"
            />
            <path
              class="st1"
              d="M28.6,14.3c0,7.9-6.4,14.3-14.3,14.3C6.4,28.6,0,22.2,0,14.3S6.4,0,14.3,0c0,0,0,0,0,0
	C22.2,0,28.6,6.4,28.6,14.3"
            />
            <path
              class="st2"
              d="M15.5,13.9c1.3-2.4,2.9-4,4.6-4.6c2.5-0.8,4,0.7,5.2,1.4c-0.6,1.2-0.9,3.3-3.4,4.2C20.1,15.4,17.9,15,15.5,13.9
	 M11.4,7.2c0-2.6,1.9-3.6,2.9-4.5c1,0.9,2.9,1.8,2.9,4.5c0,1.9-1,3.8-2.9,5.8C12.4,11,11.4,9.1,11.4,7.2 M13.1,13.9
	c-2.5,1.2-4.6,1.6-6.4,1c-2.5-0.8-2.8-3-3.4-4.2c1.2-0.6,2.6-2.2,5.2-1.4C10.2,9.9,11.8,11.5,13.1,13.9 M13.5,15.3
	c0.3,2.7,0,4.9-1.1,6.4c-1.6,2.2-3.7,1.8-5,1.9c-0.2-1.3-1.3-3.2,0.3-5.3C8.9,16.7,10.8,15.8,13.5,15.3 M21,23.6
	c-1.3-0.2-3.4,0.2-5-1.9c-1.1-1.5-1.4-3.7-1.1-6.4c2.7,0.5,4.7,1.5,5.8,3C22.3,20.4,21.2,22.3,21,23.6"
            />
          </svg>
          <div class="covid-logo-container">
            <svg
              class="covid-logo"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0"
              y="0"
              width="180"
              height="180"
              viewBox="0, 0, 180, 180"
            >
              <g id="Layer_1">
                <g>
                  <g>
                    <path
                      d="M89.553,132.112 C66.909,132.112 48.553,113.756 48.553,91.112 C48.553,68.468 66.909,50.112 89.553,50.112 C112.197,50.112 130.553,68.468 130.553,91.112 C130.553,113.756 112.197,132.112 89.553,132.112 z"
                      fill="#FFFFFF"
                    />
                    <path
                      d="M89.553,132.112 C66.909,132.112 48.553,113.756 48.553,91.112 C48.553,68.468 66.909,50.112 89.553,50.112 C112.197,50.112 130.553,68.468 130.553,91.112 C130.553,113.756 112.197,132.112 89.553,132.112 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="7"
                    />
                  </g>
                  <g>
                    <path
                      d="M84.563,32.42 L84.563,32.42 C86.699,32.233 88.583,33.814 88.77,35.95 L89.773,47.417 C89.96,49.553 88.38,51.437 86.243,51.624 L86.243,51.624 C84.106,51.811 82.222,50.23 82.035,48.094 L81.032,36.627 C80.845,34.491 82.426,32.607 84.563,32.42 z"
                      fill="#000000"
                    />
                    <path
                      d="M84.563,32.42 L84.563,32.42 C86.699,32.233 88.583,33.814 88.77,35.95 L89.773,47.417 C89.96,49.553 88.38,51.437 86.243,51.624 L86.243,51.624 C84.106,51.811 82.222,50.23 82.035,48.094 L81.032,36.627 C80.845,34.491 82.426,32.607 84.563,32.42 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M117.487,39.308 L117.487,39.308 C119.431,40.214 120.272,42.525 119.365,44.469 L114.501,54.9 C113.594,56.844 111.284,57.685 109.34,56.779 L109.34,56.779 C107.396,55.872 106.555,53.561 107.461,51.618 L112.326,41.186 C113.232,39.242 115.543,38.401 117.487,39.308 z"
                      fill="#000000"
                    />
                    <path
                      d="M117.487,39.308 L117.487,39.308 C119.431,40.214 120.272,42.525 119.365,44.469 L114.501,54.9 C113.594,56.844 111.284,57.685 109.34,56.779 L109.34,56.779 C107.396,55.872 106.555,53.561 107.461,51.618 L112.326,41.186 C113.232,39.242 115.543,38.401 117.487,39.308 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M141.182,60.641 L141.182,60.641 C142.413,62.398 141.986,64.82 140.229,66.05 L130.8,72.652 C129.043,73.882 126.622,73.455 125.391,71.698 L125.391,71.698 C124.161,69.941 124.588,67.519 126.345,66.289 L135.774,59.687 C137.531,58.457 139.952,58.884 141.182,60.641 z"
                      fill="#000000"
                    />
                    <path
                      d="M141.182,60.641 L141.182,60.641 C142.413,62.398 141.986,64.82 140.229,66.05 L130.8,72.652 C129.043,73.882 126.622,73.455 125.391,71.698 L125.391,71.698 C124.161,69.941 124.588,67.519 126.345,66.289 L135.774,59.687 C137.531,58.457 139.952,58.884 141.182,60.641 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M149.015,94.883 L149.015,94.883 C148.828,97.02 146.945,98.6 144.808,98.414 L133.342,97.41 C131.205,97.223 129.624,95.34 129.811,93.203 L129.811,93.203 C129.998,91.066 131.882,89.486 134.019,89.673 L145.485,90.676 C147.622,90.863 149.202,92.746 149.015,94.883 z"
                      fill="#000000"
                    />
                    <path
                      d="M149.015,94.883 L149.015,94.883 C148.828,97.02 146.945,98.6 144.808,98.414 L133.342,97.41 C131.205,97.223 129.624,95.34 129.811,93.203 L129.811,93.203 C129.998,91.066 131.882,89.486 134.019,89.673 L145.485,90.676 C147.622,90.863 149.202,92.746 149.015,94.883 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M122.518,113.515 L122.518,113.515 C123.748,111.758 126.17,111.331 127.927,112.561 L137.355,119.163 C139.112,120.393 139.539,122.815 138.309,124.572 L138.309,124.572 C137.079,126.329 134.657,126.756 132.9,125.525 L123.471,118.923 C121.714,117.693 121.287,115.272 122.518,113.515 z"
                      fill="#000000"
                    />
                    <path
                      d="M122.518,113.515 L122.518,113.515 C123.748,111.758 126.17,111.331 127.927,112.561 L137.355,119.163 C139.112,120.393 139.539,122.815 138.309,124.572 L138.309,124.572 C137.079,126.329 134.657,126.756 132.9,125.525 L123.471,118.923 C121.714,117.693 121.287,115.272 122.518,113.515 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M105.117,126.986 L105.117,126.986 C107.132,126.252 109.361,127.291 110.094,129.307 L114.031,140.123 C114.765,142.138 113.725,144.367 111.71,145.1 L111.71,145.1 C109.694,145.834 107.466,144.795 106.732,142.779 L102.795,131.963 C102.062,129.948 103.101,127.719 105.117,126.986 z"
                      fill="#000000"
                    />
                    <path
                      d="M105.117,126.986 L105.117,126.986 C107.132,126.252 109.361,127.291 110.094,129.307 L114.031,140.123 C114.765,142.138 113.725,144.367 111.71,145.1 L111.71,145.1 C109.694,145.834 107.466,144.795 106.732,142.779 L102.795,131.963 C102.062,129.948 103.101,127.719 105.117,126.986 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M82.087,129.551 L82.087,129.551 C84.199,129.923 85.61,131.938 85.237,134.05 L83.239,145.385 C82.866,147.497 80.852,148.908 78.74,148.535 L78.74,148.535 C76.627,148.163 75.217,146.149 75.589,144.036 L77.588,132.701 C77.96,130.589 79.975,129.178 82.087,129.551 z"
                      fill="#000000"
                    />
                    <path
                      d="M82.087,129.551 L82.087,129.551 C84.199,129.923 85.61,131.938 85.237,134.05 L83.239,145.385 C82.866,147.497 80.852,148.908 78.74,148.535 L78.74,148.535 C76.627,148.163 75.217,146.149 75.589,144.036 L77.588,132.701 C77.96,130.589 79.975,129.178 82.087,129.551 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M62.229,120.228 L62.229,120.228 C63.745,121.744 63.745,124.203 62.229,125.72 L54.09,133.859 C52.573,135.375 50.114,135.375 48.598,133.859 L48.598,133.859 C47.081,132.342 47.081,129.883 48.598,128.366 L56.736,120.228 C58.253,118.711 60.712,118.711 62.229,120.228 z"
                      fill="#000000"
                    />
                    <path
                      d="M62.229,120.228 L62.229,120.228 C63.745,121.744 63.745,124.203 62.229,125.72 L54.09,133.859 C52.573,135.375 50.114,135.375 48.598,133.859 L48.598,133.859 C47.081,132.342 47.081,129.883 48.598,128.366 L56.736,120.228 C58.253,118.711 60.712,118.711 62.229,120.228 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M50.723,99.548 L50.723,99.548 C51.279,101.62 50.049,103.75 47.977,104.305 L36.86,107.284 C34.788,107.839 32.658,106.61 32.103,104.538 L32.103,104.538 C31.548,102.466 32.777,100.336 34.849,99.781 L45.967,96.802 C48.039,96.247 50.168,97.477 50.723,99.548 z"
                      fill="#000000"
                    />
                    <path
                      d="M50.723,99.548 L50.723,99.548 C51.279,101.62 50.049,103.75 47.977,104.305 L36.86,107.284 C34.788,107.839 32.658,106.61 32.103,104.538 L32.103,104.538 C31.548,102.466 32.777,100.336 34.849,99.781 L45.967,96.802 C48.039,96.247 50.168,97.477 50.723,99.548 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M51.471,78.34 L51.471,78.34 C50.737,80.355 48.508,81.394 46.493,80.661 L35.677,76.724 C33.662,75.991 32.622,73.762 33.356,71.746 L33.356,71.746 C34.089,69.731 36.318,68.692 38.334,69.425 L49.149,73.362 C51.165,74.096 52.204,76.324 51.471,78.34 z"
                      fill="#000000"
                    />
                    <path
                      d="M51.471,78.34 L51.471,78.34 C50.737,80.355 48.508,81.394 46.493,80.661 L35.677,76.724 C33.662,75.991 32.622,73.762 33.356,71.746 L33.356,71.746 C34.089,69.731 36.318,68.692 38.334,69.425 L49.149,73.362 C51.165,74.096 52.204,76.324 51.471,78.34 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                  <g>
                    <path
                      d="M52.218,44.659 L52.218,44.659 C53.861,43.281 56.31,43.495 57.689,45.138 L65.088,53.955 C66.466,55.598 66.252,58.048 64.609,59.427 L64.609,59.427 C62.966,60.805 60.516,60.591 59.137,58.948 L51.739,50.131 C50.36,48.488 50.575,46.038 52.218,44.659 z"
                      fill="#000000"
                    />
                    <path
                      d="M52.218,44.659 L52.218,44.659 C53.861,43.281 56.31,43.495 57.689,45.138 L65.088,53.955 C66.466,55.598 66.252,58.048 64.609,59.427 L64.609,59.427 C62.966,60.805 60.516,60.591 59.137,58.948 L51.739,50.131 C50.36,48.488 50.575,46.038 52.218,44.659 z"
                      fill-opacity="0"
                      stroke="#000000"
                      stroke-width="1"
                    />
                  </g>
                </g>
                <path
                  d="M86.911,69.8 C83.873,69.8 81.411,67.338 81.411,64.3 C81.411,61.262 83.873,58.8 86.911,58.8 C89.948,58.8 92.411,61.262 92.411,64.3 C92.411,67.338 89.948,69.8 86.911,69.8 z"
                  fill="#000000"
                />
                <path
                  d="M124.247,88.947 C121.21,88.947 118.747,86.485 118.747,83.447 C118.747,80.41 121.21,77.947 124.247,77.947 C127.285,77.947 129.747,80.41 129.747,83.447 C129.747,86.485 127.285,88.947 124.247,88.947 z"
                  fill="#000000"
                />
                <path
                  d="M72.079,127.726 C69.041,127.726 66.579,125.264 66.579,122.226 C66.579,119.189 69.041,116.726 72.079,116.726 C75.117,116.726 77.579,119.189 77.579,122.226 C77.579,125.264 75.117,127.726 72.079,127.726 z"
                  fill="#000000"
                />
                <path
                  d="M57.679,78.463 C54.641,78.463 52.179,76.001 52.179,72.963 C52.179,69.926 54.641,67.463 57.679,67.463 C60.717,67.463 63.179,69.926 63.179,72.963 C63.179,76.001 60.717,78.463 57.679,78.463 z"
                  fill="#000000"
                />
                <path
                  d="M109.847,124.695 C106.81,124.695 104.347,122.232 104.347,119.195 C104.347,116.157 106.81,113.695 109.847,113.695 C112.885,113.695 115.347,116.157 115.347,119.195 C115.347,122.232 112.885,124.695 109.847,124.695 z"
                  fill="#000000"
                />
                <path
                  d="M104.037,81.368 C100.999,81.368 98.537,78.906 98.537,75.868 C98.537,72.831 100.999,70.368 104.037,70.368 C107.074,70.368 109.537,72.831 109.537,75.868 C109.537,78.906 107.074,81.368 104.037,81.368 z"
                  fill="#000000"
                />
                <path
                  d="M76.879,87.179 C73.841,87.179 71.379,84.717 71.379,81.679 C71.379,78.641 73.841,76.179 76.879,76.179 C79.917,76.179 82.379,78.641 82.379,81.679 C82.379,84.717 79.917,87.179 76.879,87.179 z"
                  fill="#000000"
                />
                <path
                  d="M86.858,113.832 C83.82,113.832 81.358,111.369 81.358,108.332 C81.358,105.294 83.82,102.832 86.858,102.832 C89.895,102.832 92.358,105.294 92.358,108.332 C92.358,111.369 89.895,113.832 86.858,113.832 z"
                  fill="#000000"
                />
                <path
                  d="M104.289,102.842 C101.252,102.842 98.789,100.38 98.789,97.342 C98.789,94.305 101.252,91.842 104.289,91.842 C107.327,91.842 109.789,94.305 109.789,97.342 C109.789,100.38 107.327,102.842 104.289,102.842 z"
                  fill="#000000"
                />
                <path
                  d="M63.616,101.326 C60.578,101.326 58.116,98.864 58.116,95.826 C58.116,92.789 60.578,90.326 63.616,90.326 C66.653,90.326 69.116,92.789 69.116,95.826 C69.116,98.864 66.653,101.326 63.616,101.326 z"
                  fill="#000000"
                />
                <path
                  d="M105.047,63.053 C102.01,63.053 99.547,60.59 99.547,57.553 C99.547,54.515 102.01,52.053 105.047,52.053 C108.085,52.053 110.547,54.515 110.547,57.553 C110.547,60.59 108.085,63.053 105.047,63.053 z"
                  fill="#000000"
                />
              </g>
            </svg>
            <span>${Ot("title")}</span>
          </div>
          <div class="stats-container">
            <span class="stats-title">${Ot("whole_country")}</span>
            <span class="stats">${Ot("last_week")}: ${this.wholeFinland.amount_last_week}</span>
            <span class="stats">${Ot("two_weeks_ago")}: ${this.wholeFinland.amount_two_weeks_ago}</span>
            <span class="stats">
              ${Ot("change")}: ${this.wholeFinland.change_percentage}%
              (${this.wholeFinland.change_in_numbers})
            </span>
          </div>
          ${ot(""!==this.selectedArea.area_id,(()=>V`<div class="stats-container">
                <span class="stats-title">${this.selectedArea.name}</span>
                <span class="stats">${Ot("last_week")}: ${this.selectedArea.amount_last_week}</span>
                <span class="stats">${Ot("two_weeks_ago")}: ${this.selectedArea.amount_two_weeks_ago}</span>
                <span class="stats">
                  ${Ot("change")}: ${this.selectedArea.change_percentage}%
                  (${this.selectedArea.change_in_numbers})
                </span>
              </div>`))}
        </div>
      </ha-card>
    `}static get styles(){return l`
      .header {
        font-size: 24px;
        margin: 20px 20px 30px 12px;
      }

      .map {
        display: inline-block;
      }

      .map path:hover {
        opacity: 0.7;
      }

      .map path:active {
        opacity: 0.4;
      }

      .map path.selected {
        opacity: 0.5;
      }

      .map path {
        cursor: pointer;
      }

      .amount {
        color: var(--primary-text-color);
        font-size: 9px;
        position: absolute;
        text-shadow: 1px 1px 2px black;
      }

      .right-pane {
        display: inline-block;
        vertical-align: top;
        width: calc(100% - 240px);
        margin-top: 50px;
      }

      .thl-logo {
        display: flex;
        height: 40px;
      }

      .covid-logo-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .covid-logo {
        height: 50px;
        width: 50px;
      }

      .stats-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .stats-title {
        font-weight: 600;
        margin-top: 10px;
      }

      .stats {
        font-size: 12px;
      }
    `}};t([pt()],Ut.prototype,"hass",void 0),t([function(t){return pt({...t,state:!0,attribute:!1})}()],Ut.prototype,"config",void 0),t([pt({type:Object})],Ut.prototype,"wholeFinland",void 0),t([pt({type:Object})],Ut.prototype,"selectedArea",void 0),Ut=t([(t=>(e,s)=>{void 0!==s?s.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)})("thl-covid-card")],Ut);export{Ut as THLCovidCard};
