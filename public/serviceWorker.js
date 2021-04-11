!function(){"use strict";try{self["workbox:core:6.1.1"]&&_()}catch(e){}const e=(e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s};class t extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}const s=new Set,a={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},n=e=>[a.prefix,e,a.suffix].filter((e=>e&&e.length>0)).join("-"),r=e=>e||n(a.precache),i=e=>e||n(a.runtime);function c(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}let o;const h={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(h))for(const e of t);class l{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}function u(e,t){const s=t();return e.waitUntil(s),s}async function d(e,s){let a=null;if(e.url){a=new URL(e.url).origin}if(a!==self.location.origin)throw new t("cross-origin-copy-response",{origin:a});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===o){const e=new Response("");if("body"in e)try{new Response(e.body),o=!0}catch(e){o=!1}o=!1}return o}()?n.body:await n.blob();return new Response(c,i)}try{self["workbox:routing:6.1.1"]&&_()}catch(e){}const f=e=>e&&"object"==typeof e?e:{handle:e};class p{constructor(e,t,s="GET"){this.handler=f(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=f(e)}}class g extends p{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class w{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){a=e}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(i)&&0===i.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,f(e))}setCatchHandler(e){this._catchHandler=f(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new t("unregister-route-but-not-found-with-method",{method:e.method});const s=this._routes.get(e.method).indexOf(e);if(!(s>-1))throw new t("unregister-route-route-not-registered");this._routes.get(e.method).splice(s,1)}}let y;const m=()=>(y||(y=new w,y.addFetchListener(),y.addCacheListener()),y);function b(e,s,a){let n;if("string"==typeof e){const t=new URL(e,location.href);n=new p((({url:e})=>e.href===t.href),s,a)}else if(e instanceof RegExp)n=new g(e,s,a);else if("function"==typeof e)n=new p(e,s,a);else{if(!(e instanceof p))throw new t("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return m().registerRoute(n),n}try{self["workbox:strategies:6.1.1"]&&_()}catch(e){}function v(e){return"string"==typeof e?new Request(e):e}class R{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new l,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}fetch(e){return this.waitUntil((async()=>{const{event:s}=this;let a=v(e);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(e){throw new t("plugin-error-request-will-fetch",{thrownError:e})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}})())}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}cacheMatch(e){return this.waitUntil((async()=>{const t=v(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i={...n,cacheName:a};s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s})())}async cachePut(e,a){const n=v(e);var r;await(r=0,new Promise((e=>setTimeout(e,r))));const i=await this.getCacheKey(n,"write");if(!a)throw new t("cache-put-with-no-response",{url:(o=i.url,new URL(String(o),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var o;const h=await this._ensureResponseSafeToCache(a);if(!h)return!1;const{cacheName:l,matchOptions:u}=this._strategy,d=await self.caches.open(l),f=this.hasCallback("cacheDidUpdate"),p=f?await async function(e,t,s,a){const n=c(t.url,s);if(t.url===n)return e.match(t,a);const r={...a,ignoreSearch:!0},i=await e.keys(t,r);for(const t of i)if(n===c(t.url,s))return e.match(t,a)}(d,i.clone(),["__WB_REVISION__"],u):null;try{await d.put(i,f?h.clone():h)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of s)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:l,oldResponse:p,newResponse:h.clone(),request:i,event:this.event});return!0}async getCacheKey(e,t){if(!this._cacheKeys[t]){let s=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))s=v(await e({mode:t,request:s,event:this.event,params:this.params}));this._cacheKeys[t]=s}return this._cacheKeys[t]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n={...a,state:s};return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve()}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class C{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new R(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(e,s,a){let n;await e.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,e),!n||"error"===n.type)throw new t("no-response",{url:s.url})}catch(t){for(const r of e.iterateCallbacks("handlerDidError"))if(n=await r({error:t,event:a,request:s}),n)break;if(!n)throw t}for(const t of e.iterateCallbacks("handlerWillRespond"))n=await t({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){r=e}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}const k={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};try{self["workbox:precaching:6.1.1"]&&_()}catch(e){}function U(e){if(!e)throw new t("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:s,url:a}=e;if(!a)throw new t("add-to-cache-list-unexpected-type",{entry:e});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}class q{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class L{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=t&&t.cacheKey||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s):e},this._precacheController=e}}class T extends C{constructor(e={}){e.cacheName=r(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(T.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,s){let a;if(!this._fallbackToNetwork)throw new t("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return a=await s.fetch(e),a}async _handleInstall(e,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(e);if(!await s.cachePut(e,a.clone()))throw new t("bad-precaching-response",{url:e.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==T.copyRedirectedCacheableResponsesPlugin&&(a===T.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(T.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}T.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},T.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await d(e):e};class x{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new T({cacheName:r(e),plugins:[...t,new L({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const s=[];for(const a of e){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:e,url:n}=U(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new t("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==a.integrity)throw new t("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,a.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return u(e,(async()=>{const t=new q;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return u(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const s=this.getCacheKeyForURL(e);if(!s)throw new t("non-precached-url",{url:e});return t=>(t.request=new Request(e),t.params={cacheKey:s,...t.params},this.strategy.handle(t))}}let K;const P=()=>(K||(K=new x),K);class N extends p{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const e of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(e);if(t)return{cacheKey:t}}}),e.strategy)}}try{self["workbox:cacheable-response:6.1.1"]&&_()}catch(e){}class W{constructor(e={}){this._statuses=e.statuses,this._headers=e.headers}isResponseCacheable(e){let t=!0;return this._statuses&&(t=this._statuses.includes(e.status)),this._headers&&t&&(t=Object.keys(this._headers).some((t=>e.headers.get(t)===this._headers[t]))),t}}class M{constructor(e){this.cacheWillUpdate=async({response:e})=>this._cacheableResponse.isResponseCacheable(e)?e:null,this._cacheableResponse=new W(e)}}var E;self.addEventListener("activate",(e=>{const t=r();e.waitUntil((async(e,t="-precache-")=>{const s=(await self.caches.keys()).filter((s=>s.includes(t)&&s.includes(self.registration.scope)&&s!==e));return await Promise.all(s.map((e=>self.caches.delete(e)))),s})(t).then((e=>{})))})),function(e){P().precache(e)}([{revision:"95e87e75844ea550a6f16c0822741c0c",url:"manifest.json"},{revision:"c25adea9a8bec43d009e7fc116e7dabf",url:"assets/icons/logo_h_black_120px.png"},{revision:"2d3e059055309e02225bd2764271a4b5",url:"assets/icons/logo_h_black_144px.png"},{revision:"08dec09820767b79251d93c7c1778ab7",url:"assets/icons/logo_h_black_152px.png"},{revision:"50d9b272427fb67d74e836b0cc0b1573",url:"assets/icons/logo_h_black_167px.png"},{revision:"6519780c764d0cfc0a257199ae0bcf58",url:"assets/icons/logo_h_black_168px.png"},{revision:"e3cc62b2871d7b863142368a0f51922f",url:"assets/icons/logo_h_black_180px.png"},{revision:"88ea710bb2108a6ce468da556b36e6c4",url:"assets/icons/logo_h_black_192px.png"},{revision:"e8fce7e46646fea85d530ce4dc6cbd71",url:"assets/icons/logo_h_black_48px.png"},{revision:"c048b1648533dd9f39b7f83ba31376c9",url:"assets/icons/logo_h_black_512px.png"},{revision:"33d82c61be5b68e029e1df976f950bba",url:"assets/icons/logo_h_black_72px.png"},{revision:"8da08d99f58fd2fd7d79ba43784e5b36",url:"assets/icons/logo_h_black_96px.png"},{revision:"49cb61798260346c1084a9c3419c5e18",url:"assets/icons/logo_h_black.svg"},{revision:"501e54e645a8ff8fe991ea4e7dc473bf",url:"favicon.svg"},{revision:"4f1925125154f8e7fd24facd2db7baf6",url:"global.css"},{revision:"b4c3857bc70b25bad6752270a9fc800a",url:"index.html"}]),function(e){const t=P();b(new N(t,e))}(E),b((({url:e})=>e.pathname.startsWith("/build")),new class extends C{constructor(e){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(k)}async _handle(e,s){const a=s.fetchAndCachePut(e).catch((()=>{}));let n,r=await s.cacheMatch(e);if(r);else try{r=await a}catch(e){n=e}if(!r)throw new t("no-response",{url:e.url,error:n});return r}}({cacheName:"stale-while-revalidate",plugins:[new M({statuses:[200]})]})),b((({url:e})=>e.pathname.endsWith(".json")),new class extends C{constructor(e={}){super(e),this.plugins.some((e=>"cacheWillUpdate"in e))||this.plugins.unshift(k),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,s){const a=[],n=[];let r;if(this._networkTimeoutSeconds){const{id:t,promise:i}=this._getTimeoutPromise({request:e,logs:a,handler:s});r=t,n.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:e,logs:a,handler:s});n.push(i);const c=await s.waitUntil((async()=>await s.waitUntil(Promise.race(n))||await i)());if(!c)throw new t("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let a;return{promise:new Promise((t=>{a=setTimeout((async()=>{t(await s.cacheMatch(e))}),1e3*this._networkTimeoutSeconds)})),id:a}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:a}){let n,r;try{r=await a.fetchAndCachePut(t)}catch(e){n=e}return e&&clearTimeout(e),!n&&r||(r=await a.cacheMatch(t)),r}}({cacheName:"network-first",plugins:[new M({statuses:[200]})]})),b((({request:e})=>"image"===e.destination||"font"===e.destination),new class extends C{async _handle(e,s){let a,n=await s.cacheMatch(e);if(!n)try{n=await s.fetchAndCachePut(e)}catch(e){a=e}if(!n)throw new t("no-response",{url:e.url,error:a});return n}}({cacheName:"cache-first",plugins:[new M({statuses:[200]})]})),addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&(console.log("[service-worker] skip waiting"),self.skipWaiting())}))}();
