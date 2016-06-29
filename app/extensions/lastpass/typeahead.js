(function(f){var G,H,s,I,J,K,L,M,N,O,P,ga=0,d={isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(a){return!a||/^\s*$/.test(a)},escapeRegExChars:function(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(a){return"string"===typeof a},isNumber:function(a){return"number"===typeof a},isArray:f.isArray,isFunction:f.isFunction,isObject:f.isPlainObject,isUndefined:function(a){return"undefined"===
typeof a},bind:f.proxy,each:function(a,b){f.each(a,function(a,e){return b(e,a)})},map:f.map,filter:f.grep,every:function(a,b){var c=!0;if(!a)return c;f.each(a,function(e,g){if(!(c=b.call(null,g,e,a)))return!1});return!!c},some:function(a,b){var c=!1;if(!a)return c;f.each(a,function(e,g){if(c=b.call(null,g,e,a))return!1});return!!c},mixin:f.extend,getUniqueId:function(){return ga++},templatify:function(a){function b(){return String(a)}return f.isFunction(a)?a:b},defer:function(a){setTimeout(function(){a()},
0)},debounce:function(a,b,c){var e,g;return function(){var d=this,f=arguments,k,m;k=function(){e=null;c||(g=a.apply(d,f))};m=c&&!e;clearTimeout(e);e=setTimeout(function(){k()},b);m&&(g=a.apply(d,f));return g}},throttle:function(a,b){var c,e,g,d,f,k;f=0;k=function(){f=new Date;g=null;d=a.apply(c,e)};return function(){var m=new Date,Q=b-(m-f);c=this;e=arguments;0>=Q?(clearTimeout(g),g=null,f=m,d=a.apply(c,e)):g||(g=setTimeout(function(){k()},Q));return d}},noop:function(){}},w=function(a){this.maxSize=
a||100;this.size=0;this.hash={};this.list=new R},R=function(){this.head=this.tail=null},ha=function(a,b){this.key=a;this.val=b;this.prev=this.next=null};d.mixin(w.prototype,{set:function(a,b){var c=this.list.tail;this.size>=this.maxSize&&(this.list.remove(c),delete this.hash[c.key]);(c=this.hash[a])?(c.val=b,this.list.moveToFront(c)):(c=new ha(a,b),this.list.add(c),this.hash[a]=c,this.size++)},get:function(a){if(a=this.hash[a])return this.list.moveToFront(a),a.val}});d.mixin(R.prototype,{add:function(a){this.head&&
(a.next=this.head,this.head.prev=a);this.head=a;this.tail=this.tail||a},remove:function(a){a.prev?a.prev.next=a.next:this.head=a.next;a.next?a.next.prev=a.prev:this.tail=a.prev},moveToFront:function(a){this.remove(a);this.add(a)}});var S=function(a){this.prefix=["__",a,"__"].join("");this.ttlKey="__ttl__";this.keyMatcher=RegExp("^"+this.prefix)},T=function(a){return JSON.stringify(d.isUndefined(a)?null:a)},l;try{l=window.localStorage,l.setItem("~~~","!"),l.removeItem("~~~")}catch(na){l=null}d.mixin(S.prototype,
l&&window.JSON?{_prefix:function(a){return this.prefix+a},_ttlKey:function(a){return this._prefix(a)+this.ttlKey},get:function(a){this.isExpired(a)&&this.remove(a);a=l.getItem(this._prefix(a));return JSON.parse(a)},set:function(a,b,c){d.isNumber(c)?l.setItem(this._ttlKey(a),T((new Date).getTime()+c)):l.removeItem(this._ttlKey(a));return l.setItem(this._prefix(a),T(b))},remove:function(a){l.removeItem(this._ttlKey(a));l.removeItem(this._prefix(a));return this},clear:function(){var a,b,c=[],e=l.length;
for(a=0;a<e;a++)(b=l.key(a)).match(this.keyMatcher)&&c.push(b.replace(this.keyMatcher,""));for(a=c.length;a--;)this.remove(c[a]);return this},isExpired:function(a){a=l.getItem(this._ttlKey(a));a=JSON.parse(a);return d.isNumber(a)&&(new Date).getTime()>a?!0:!1}}:{get:d.noop,set:d.noop,remove:d.noop,clear:d.noop,isExpired:d.noop});var t=function(a){a=a||{};var b;if(a.transport){var c=a.transport;b=function(a,b){var h=f.Deferred();c(a,b,function(a){d.defer(function(){h.resolve(a)})},function(a){d.defer(function(){h.reject(a)})});
return h}}else b=f.ajax;this._send=b;this._get=a.rateLimiter?a.rateLimiter(this._get):this._get},x=0,y={},U=6,z=new w(10);t.setMaxPendingRequests=function(a){U=a};t.resetCache=function(){z=new w(10)};d.mixin(t.prototype,{_get:function(a,b,c){function e(b){c&&c(b);z.set(a,b)}function g(){x--;delete y[a];d.onDeckRequestArgs&&(d._get.apply(d,d.onDeckRequestArgs),d.onDeckRequestArgs=null)}var d=this,f;(f=y[a])?f.done(e):x<U?(x++,y[a]=this._send(a,b).done(e).always(g)):this.onDeckRequestArgs=[].slice.call(arguments,
0)},get:function(a,b,c){var e;d.isFunction(b)&&(c=b,b={});(e=z.get(a))?d.defer(function(){c&&c(e)}):this._get(a,b,c);return!!e}});var V=function(a){a=a||{};(!a.datumTokenizer||!a.queryTokenizer)&&f.error("datumTokenizer and queryTokenizer are both required");this.datumTokenizer=a.datumTokenizer;this.queryTokenizer=a.queryTokenizer;this.datums=[];this.trie={ids:[],children:{}}},W=function(a){a=d.filter(a,function(a){return!!a});return a=d.map(a,function(a){return a.toLowerCase()})},ia=function(a){for(var b=
{},c=[],e=0;e<a.length;e++)b[a[e]]||(b[a[e]]=!0,c.push(a[e]));return c};d.mixin(V.prototype,{bootstrap:function(a){this.datums=a.datums;this.trie=a.trie},add:function(a){var b=this;a=d.isArray(a)?a:[a];d.each(a,function(a){var e;e=b.datums.push(a)-1;a=W(b.datumTokenizer(a));d.each(a,function(a){var c,d;c=b.trie;for(a=a.split("");d=a.shift();)c=c.children[d]||(c.children[d]={ids:[],children:{}}),c.ids.push(e)})})},get:function(a){var b=this,c;a=W(this.queryTokenizer(a));d.each(a,function(a){var d,
f;if(c&&0===c.length)return!1;d=b.trie;for(a=a.split("");d&&(f=a.shift());)d=d.children[f];if(d&&0===a.length){f=d.ids.slice(0);if(c){d=c;a=function(a,b){return a-b};var j=0,k=0,m=[];d=d.sort(a);for(f=f.sort(a);j<d.length&&k<f.length;)d[j]<f[k]?j++:(d[j]>f[k]||(m.push(d[j]),j++),k++);d=m}else d=f;c=d}else return c=[],!1});return c?d.map(ia(c),function(a){return b.datums[a]}):[]},serialize:function(){return{datums:this.datums,trie:this.trie}}});var u;u={local:function(a){a=a.local||null;d.isFunction(a)&&
(a=a.call(null));return a},prefetch:function(a){var b;b={url:null,thumbprint:"",ttl:864E5,filter:null,ajax:{}};if(a=a.prefetch||null)a=d.isString(a)?{url:a}:a,a=d.mixin(b,a),a.thumbprint="0.10.1"+a.thumbprint,a.ajax.type=a.ajax.type||"GET",a.ajax.dataType=a.ajax.dataType||"json",!a.url&&f.error("prefetch requires url to be set");return a},remote:function(a){var b;b={url:null,wildcard:"%QUERY",replace:null,rateLimitBy:"debounce",rateLimitWait:300,send:null,filter:null,ajax:{}};if(a=a.remote||null){a=
d.isString(a)?{url:a}:a;b=a=d.mixin(b,a);var c;if(/^throttle$/i.test(a.rateLimitBy)){var e=a.rateLimitWait;c=function(a){return d.throttle(a,e)}}else{var g=a.rateLimitWait;c=function(a){return d.debounce(a,g)}}b.rateLimiter=c;a.ajax.type=a.ajax.type||"GET";a.ajax.dataType=a.ajax.dataType||"json";delete a.rateLimitBy;delete a.rateLimitWait;!a.url&&f.error("remote requires url to be set")}return a}};var r=window,A=function(a){(!a||!a.local&&!a.prefetch&&!a.remote)&&f.error("one of local, prefetch, or remote is required");
this.limit=a.limit||5;var b=a.sorter,c=function(a){return a.sort(b)},e=function(a){return a};this.sorter=d.isFunction(b)?c:e;this.dupDetector=a.dupDetector||ja;this.local=u.local(a);this.prefetch=u.prefetch(a);this.remote=u.remote(a);this.cacheKey=this.prefetch?this.prefetch.cacheKey||this.prefetch.url:null;this.index=new V({datumTokenizer:a.datumTokenizer,queryTokenizer:a.queryTokenizer});this.storage=this.cacheKey?new S(this.cacheKey):null},ja=function(){return!1};A.tokenizers={whitespace:function(a){return a.split(/\s+/)},
nonword:function(a){return a.split(/\W+/)}};d.mixin(A.prototype,{_loadPrefetch:function(a){function b(b){b=a.filter?a.filter(b):b;c.add(b);c._saveToStorage(c.index.serialize(),a.thumbprint,a.ttl)}var c=this,e;(e=this._readFromStorage(a.thumbprint))?(this.index.bootstrap(e),e=f.Deferred().resolve()):e=f.ajax(a.url,a.ajax).done(b);return e},_getFromRemote:function(a,b){var c=this,e;a=a||"";e=encodeURIComponent(a);e=this.remote.replace?this.remote.replace(this.remote.url,a):this.remote.url.replace(this.remote.wildcard,
e);"function"==typeof shouldSearchGroups&&shouldSearchGroups()&&(e+="&grp=1");return this.transport.get(e,this.remote.ajax,function(a){a=c.remote.filter?c.remote.filter(a):a;b(a)})},_saveToStorage:function(a,b,c){this.storage&&(this.storage.set("data",a,c),this.storage.set("protocol",location.protocol,c),this.storage.set("thumbprint",b,c))},_readFromStorage:function(a){var b,c,e;this.storage&&(b=this.storage.get("data"),c=this.storage.get("protocol"),e=this.storage.get("thumbprint"));a=e!==a||c!==
location.protocol;return b&&!a?b:null},initialize:function(){function a(){b.add(b.local)}var b=this,c;c=this.prefetch?this._loadPrefetch(this.prefetch):f.Deferred().resolve();this.local&&c.done(a);this.transport=this.remote?new t(this.remote):null;this.initialize=function(){return c.promise()};return c.promise()},add:function(a){this.index.add(a)},get:function(a,b){function c(a){var c=f.slice(0);d.each(a,function(a){!d.some(c,function(b){return e.dupDetector(a,b)})&&c.push(a);return c.length<e.limit});
b&&b(e.sorter(c))}var e=this,f,h=!1;f=this.index.get(a);f=this.sorter(f).slice(0,this.limit);f.length<this.limit&&this.transport&&(h=this._getFromRemote(a,c));!h&&b&&b(f)},ttAdapter:function(){return d.bind(this.get,this)}});r.Bloodhound=A;O='<span class="tt-suggestions"></span>';P='<div class="tt-suggestion">%BODY%</div>';G={position:"relative",display:"inline-block"};H={position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none"};s={position:"relative",verticalAlign:"top",backgroundColor:"transparent"};
I={position:"relative",verticalAlign:"top"};J={position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"};K={display:"block"};L={whiteSpace:"normal"};M={left:"0",right:"auto"};N={left:"auto",right:" 0"};d.isMsie()&&d.mixin(s,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"});d.isMsie()&&7>=d.isMsie()&&d.mixin(s,{marginTop:"-1px"});var B=function(a){(!a||!a.el)&&f.error("EventBus initialized without el");this.$el=f(a.el)};d.mixin(B.prototype,
{trigger:function(a){var b=[].slice.call(arguments,1);this.$el.trigger("typeahead:"+a,b)}});var X=function(a,b,c,e){var d;if(!c)return this;b=b.split(C);if(e){var f=c;c=f.bind?f.bind(e):function(){f.apply(e,[].slice.call(arguments,0))}}for(this._callbacks=this._callbacks||{};d=b.shift();)this._callbacks[d]=this._callbacks[d]||{sync:[],async:[]},this._callbacks[d][a].push(c);return this},Y=function(a,b,c){return function(){for(var e,d=0;!e&&d<a.length;d+=1)e=!1===a[d].apply(b,c);return!e}},C=/\s+/,
Z;Z=window.setImmediate?function(a){setImmediate(function(){a()})}:function(a){setTimeout(function(){a()},0)};var r={onSync:function(a,b,c){return X.call(this,"sync",a,b,c)},onAsync:function(a,b,c){return X.call(this,"async",a,b,c)},off:function(a){var b;if(!this._callbacks)return this;for(a=a.split(C);b=a.shift();)delete this._callbacks[b];return this},trigger:function(a){var b,c,d,f,h;if(!this._callbacks)return this;a=a.split(C);for(d=[].slice.call(arguments,1);(b=a.shift())&&(c=this._callbacks[b]);)f=
Y(c.sync,this,[b].concat(d)),h=Y(c.async,this,[b].concat(d)),f()&&Z(h);return this}},$,ka=window.document,la={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};$=function(a){function b(b){var c,d;if(c=e.exec(b.data))wrapperNode=ka.createElement(a.tagName),a.className&&(wrapperNode.className=a.className),d=b.splitText(c.index),d.splitText(c[0].length),wrapperNode.appendChild(d.cloneNode(!0)),b.parentNode.replaceChild(wrapperNode,d);return!!c}function c(a,b){for(var d,
e=0;e<a.childNodes.length;e++)if(d=a.childNodes[e],3===d.nodeType){b(d);break}else c(d,b)}var e;a=d.mixin({},la,a);if(a.node&&a.pattern){a.pattern=d.isArray(a.pattern)?a.pattern:[a.pattern];for(var f=a.pattern,h=a.caseSensitive,j=a.wordsOnly,k=[],m=0;m<f.length;m++)k.push(d.escapeRegExChars(f[m]));f=j?"\\b("+k.join("|")+")\\b":"("+k.join("|")+")";e=h?RegExp(f):RegExp(f,"i");c(a.node,b)}};var q=function(a){var b=this,c,e,g,h;a=a||{};a.input||f.error("input is missing");c=d.bind(this._onBlur,this);
e=d.bind(this._onFocus,this);g=d.bind(this._onKeydown,this);h=d.bind(this._onInput,this);this.$hint=f(a.hint);this.$input=f(a.input).on("blur.tt",c).on("focus.tt",e).on("keydown.tt",g);0===this.$hint.length&&(this.setHintValue=this.getHintValue=this.clearHint=d.noop);if(d.isMsie())this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(a){D[a.which||a.keyCode]||d.defer(d.bind(b._onInput,b,a))});else this.$input.on("input.tt",h);this.query=this.$input.val();this.$overflowHelper=f('<pre aria-hidden="true"></pre>').css({position:"absolute",
visibility:"hidden",whiteSpace:"nowrap",fontFamily:this.$input.css("font-family"),fontSize:this.$input.css("font-size"),fontStyle:this.$input.css("font-style"),fontVariant:this.$input.css("font-variant"),fontWeight:this.$input.css("font-weight"),wordSpacing:this.$input.css("word-spacing"),letterSpacing:this.$input.css("letter-spacing"),textIndent:this.$input.css("text-indent"),textRendering:this.$input.css("text-rendering"),textTransform:this.$input.css("text-transform")}).insertAfter(this.$input)},
E=function(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey},D;D={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"};q.normalizeQuery=function(a){return(a||"").replace(/^\s*/g,"").replace(/\s{2,}/g," ")};d.mixin(q.prototype,r,{_onBlur:function(){this.resetInputValue();this.trigger("blurred")},_onFocus:function(){this.trigger("focused")},_onKeydown:function(a){var b=D[a.which||a.keyCode];this._managePreventDefault(b,a);b&&this._shouldTrigger(b,a)&&this.trigger(b+"Keyed",a)},_onInput:function(){this._checkInputValue()},
_managePreventDefault:function(a,b){var c,d;switch(a){case "tab":c=this.getHintValue();d=this.getInputValue();c=c&&c!==d&&!E(b);break;case "up":case "down":c=!E(b);break;default:c=!1}c&&b.preventDefault()},_shouldTrigger:function(a,b){var c;switch(a){case "tab":c=!E(b);break;default:c=!0}return c},_checkInputValue:function(){var a,b,c;a=this.getInputValue();c=(b=q.normalizeQuery(a)===q.normalizeQuery(this.query))?this.query.length!==a.length:!1;b?c&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",
this.query=a)},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getQuery:function(){return this.query},setQuery:function(a){this.query=a},getInputValue:function(){return this.$input.val()},setInputValue:function(a,b){this.$input.val(a);!b&&this._checkInputValue()},getHintValue:function(){return this.$hint.val()},setHintValue:function(a){this.$hint.val(a)},resetInputValue:function(){this.$input.val(this.query)},clearHint:function(){this.$hint.val("")},getLanguageDirection:function(){return(this.$input.css("direction")||
"ltr").toLowerCase()},hasOverflow:function(){var a=this.$input.width()-2;this.$overflowHelper.text(this.getInputValue());return this.$overflowHelper.width()>=a},isCursorAtEnd:function(){var a,b;a=this.$input.val().length;b=this.$input[0].selectionStart;return d.isNumber(b)?b===a:document.selection?(b=document.selection.createRange(),b.moveStart("character",-a),a===b.text.length):!0},destroy:function(){this.$hint.off(".tt");this.$input.off(".tt");this.$hint=this.$input=this.$overflowHelper=null}});
var n=function(a){a=a||{};a.templates=a.templates||{};a.source||f.error("missing source");a.name&&!/^[_a-zA-Z0-9-]+$/.test(a.name)&&f.error("invalid dataset name: "+a.name);this.query=null;this.highlight=!!a.highlight;this.name=a.name||d.getUniqueId();this.source=a.source;var b=a.display||a.displayKey,c=function(a){return a[b]},b=b||"value";this.displayFn=d.isFunction(b)?b:c;a=a.templates;var e=this.displayFn,c=function(a){return"<p>"+e(a)+"</p>"};this.templates={empty:a.empty&&d.templatify(a.empty),
header:a.header&&d.templatify(a.header),footer:a.footer&&d.templatify(a.footer),suggestion:a.suggestion||c};this.$el=f('<div class="tt-dataset-%CLASS%"></div>'.replace("%CLASS%",this.name))},aa="ttDataset",ba="ttValue",ca="ttDatum";n.extractDatasetName=function(a){return f(a).data(aa)};n.extractValue=function(a){return f(a).data(ba)};n.extractDatum=function(a){return f(a).data(ca)};d.mixin(n.prototype,r,{_render:function(a,b){function c(){var c,e;c=f(O).css(K);e=d.map(b,function(a){var b;b=h.templates.suggestion(a);
b=P.replace("%BODY%",b);a=f(b).data(aa,h.name).data(ba,h.displayFn(a)).data(ca,a);a.children().each(function(){f(this).css(L)});return a});c.append.apply(c,e);h.highlight&&$({node:c[0],pattern:a});return c}function e(){return h.templates.header({query:a,isEmpty:!j})}function g(){return h.templates.footer({query:a,isEmpty:!j})}if(this.$el){var h=this,j;this.$el.empty();j=b&&b.length;!j&&this.templates.empty?this.$el.html(h.templates.empty({query:a,isEmpty:!0})).prepend(h.templates.header?e():null).append(h.templates.footer?
g():null):j&&this.$el.html(c()).prepend(h.templates.header?e():null).append(h.templates.footer?g():null);this.trigger("rendered")}},getRoot:function(){return this.$el},update:function(a){var b=this;this.query=a;this.source(a,function(c){a===b.query&&b._render(a,c)})},clear:function(){this._render(this.query||"")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=null}});var da=function(a){var b=this,c,e,g;a=a||{};a.menu||f.error("menu is required");this.isOpen=!1;this.isEmpty=
!0;this.datasets=d.map(a.datasets,ma);c=d.bind(this._onSuggestionClick,this);e=d.bind(this._onSuggestionMouseEnter,this);g=d.bind(this._onSuggestionMouseLeave,this);this.$menu=f(a.menu).on("click.tt",".tt-suggestion",c).on("mouseenter.tt",".tt-suggestion",e).on("mouseleave.tt",".tt-suggestion",g);d.each(this.datasets,function(a){b.$menu.append(a.getRoot());a.onSync("rendered",b._onRendered,b)})},ma=function(a){return new n(a)};d.mixin(da.prototype,r,{_onSuggestionClick:function(a){this.trigger("suggestionClicked",
f(a.currentTarget))},_onSuggestionMouseEnter:function(a){this._removeCursor();this._setCursor(f(a.currentTarget),!0)},_onSuggestionMouseLeave:function(){this._removeCursor()},_onRendered:function(){(this.isEmpty=d.every(this.datasets,function(a){return a.isEmpty()}))?this._hide():this.isOpen&&this._show();this.trigger("datasetRendered")},_hide:function(){this.$menu.hide()},_show:function(){this.$menu.css("display","block")},_getSuggestions:function(){return this.$menu.find(".tt-suggestion")},_getCursor:function(){return this.$menu.find(".tt-cursor").first()},
_setCursor:function(a,b){a.first().addClass("tt-cursor");!b&&this.trigger("cursorMoved")},_removeCursor:function(){this._getCursor().removeClass("tt-cursor")},_moveCursor:function(a){var b,c;this.isOpen&&(c=this._getCursor(),b=this._getSuggestions(),this._removeCursor(),a=b.index(c)+a,a=(a+1)%(b.length+1)-1,-1===a?this.trigger("cursorRemoved"):(-1>a&&(a=b.length-1),this._setCursor(b=b.eq(a)),this._ensureVisible(b)))},_ensureVisible:function(a){var b,c,d;b=a.position().top;a=b+a.outerHeight(!0);c=
this.$menu.scrollTop();d=this.$menu.height()+parseInt(this.$menu.css("paddingTop"),10)+parseInt(this.$menu.css("paddingBottom"),10);0>b?this.$menu.scrollTop(c+b):d<a&&this.$menu.scrollTop(c+(a-d))},close:function(){this.isOpen&&(this.isOpen=!1,this._removeCursor(),this._hide(),this.trigger("closed"))},open:function(){this.isOpen||(this.isOpen=!0,!this.isEmpty&&this._show(),this.trigger("opened"))},setLanguageDirection:function(a){this.$menu.css("ltr"===a?M:N)},moveCursorUp:function(){this._moveCursor(-1)},
moveCursorDown:function(){this._moveCursor(1)},getDatumForSuggestion:function(a){var b=null;a.length&&(b={raw:n.extractDatum(a),value:n.extractValue(a),datasetName:n.extractDatasetName(a)});return b},getDatumForCursor:function(){return this.getDatumForSuggestion(this._getCursor().first())},getDatumForTopSuggestion:function(){return this.getDatumForSuggestion(this._getSuggestions().first())},update:function(a){d.each(this.datasets,function(b){b.update(a)})},empty:function(){d.each(this.datasets,function(a){a.clear()});
this.isEmpty=!0},isVisible:function(){return this.isOpen&&!this.isEmpty},destroy:function(){this.$menu.off(".tt");this.$menu=null;d.each(this.datasets,function(a){a.destroy()})}});var ea=function(a){var b,c,e;a=a||{};a.input||f.error("missing input");this.autoselect=!!a.autoselect;this.minLength=d.isNumber(a.minLength)?a.minLength:1;b=a.withHint;var g,h,j;e=f(a.input);g=f('<span class="twitter-typeahead" style="width:100%"></span>').css(G);h=f('<span class="tt-dropdown-menu"></span>').css(J);j=e.clone().css(H).css({backgroundAttachment:e.css("background-attachment"),
backgroundClip:e.css("background-clip"),backgroundColor:e.css("background-color"),backgroundImage:e.css("background-image"),backgroundOrigin:e.css("background-origin"),backgroundPosition:e.css("background-position"),backgroundRepeat:e.css("background-repeat"),backgroundSize:e.css("background-size")});j.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder").prop("disabled",!0).attr({autocomplete:"off",spellcheck:"false"});e.data(F,{dir:e.attr("dir"),autocomplete:e.attr("autocomplete"),
spellcheck:e.attr("spellcheck"),style:e.attr("style")});e.addClass("tt-input").attr({autocomplete:"off",spellcheck:!1}).css(b?s:I);try{!e.attr("dir")&&e.attr("dir","auto")}catch(k){}this.$node=e.wrap(g).parent().prepend(b?j:null).append(h);b=this.$node.find(".tt-dropdown-menu");c=this.$node.find(".tt-input");e=this.$node.find(".tt-hint");this.eventBus=a.eventBus||new B({el:c});this.dropdown=(new da({menu:b,datasets:a.datasets})).onSync("suggestionClicked",this._onSuggestionClicked,this).onSync("cursorMoved",
this._onCursorMoved,this).onSync("cursorRemoved",this._onCursorRemoved,this).onSync("opened",this._onOpened,this).onSync("closed",this._onClosed,this).onAsync("datasetRendered",this._onDatasetRendered,this);this.input=(new q({input:c,hint:e})).onSync("focused",this._onFocused,this).onSync("blurred",this._onBlurred,this).onSync("enterKeyed",this._onEnterKeyed,this).onSync("tabKeyed",this._onTabKeyed,this).onSync("escKeyed",this._onEscKeyed,this).onSync("upKeyed",this._onUpKeyed,this).onSync("downKeyed",
this._onDownKeyed,this).onSync("leftKeyed",this._onLeftKeyed,this).onSync("rightKeyed",this._onRightKeyed,this).onSync("queryChanged",this._onQueryChanged,this).onSync("whitespaceChanged",this._onWhitespaceChanged,this);b.on("mousedown.tt",function(a){d.isMsie()&&9>d.isMsie()&&(c[0].onbeforedeactivate=function(){window.event.returnValue=!1;c[0].onbeforedeactivate=null});a.preventDefault()})},F="ttAttrs";d.mixin(ea.prototype,{_onSuggestionClicked:function(a,b){var c;(c=this.dropdown.getDatumForSuggestion(b))&&
this._select(c)},_onCursorMoved:function(){var a=this.dropdown.getDatumForCursor();this.input.clearHint();this.input.setInputValue(a.value,!0);this.eventBus.trigger("cursorchanged",a.raw,a.datasetName)},_onCursorRemoved:function(){this.input.resetInputValue();this._updateHint()},_onDatasetRendered:function(){this._updateHint()},_onOpened:function(){this._updateHint();this.eventBus.trigger("opened")},_onClosed:function(){this.input.clearHint();this.eventBus.trigger("closed")},_onFocused:function(){this.dropdown.empty();
!this.dropdown.isOpen&&0==this.minLength&&this.dropdown.update("");this.dropdown.open()},_onBlurred:function(){this.dropdown.close()},_onEnterKeyed:function(a,b){var c,d;c=this.dropdown.getDatumForCursor();d=this.dropdown.getDatumForTopSuggestion();c?(this._select(c),b.preventDefault()):this.autoselect&&d&&(this._select(d),b.preventDefault())},_onTabKeyed:function(a,b){var c;(c=this.dropdown.getDatumForCursor())?(this._select(c),b.preventDefault()):this._autocomplete()},_onEscKeyed:function(){this.dropdown.close();
this.input.resetInputValue()},_onUpKeyed:function(){var a=this.input.getQuery();!this.dropdown.isOpen&&a.length>=this.minLength&&this.dropdown.update(a);this.dropdown.open();this.dropdown.moveCursorUp()},_onDownKeyed:function(){var a=this.input.getQuery();!this.dropdown.isOpen&&a.length>=this.minLength&&this.dropdown.update(a);this.dropdown.open();this.dropdown.moveCursorDown()},_onLeftKeyed:function(){"rtl"===this.dir&&this._autocomplete()},_onRightKeyed:function(){"ltr"===this.dir&&this._autocomplete()},
_onQueryChanged:function(a,b){this.input.clearHint();this.dropdown.empty();b.length>=this.minLength&&this.dropdown.update(b);this.dropdown.open();this._setLanguageDirection()},_onWhitespaceChanged:function(){this._updateHint();this.dropdown.open()},_setLanguageDirection:function(){var a;if(this.dir!==(a=this.input.getLanguageDirection()))this.dir=a,this.$node.css("direction",a),this.dropdown.setLanguageDirection(a)},_updateHint:function(){var a,b,c,e;if((a=this.dropdown.getDatumForTopSuggestion())&&
this.dropdown.isVisible()&&!this.input.hasOverflow())b=this.input.getInputValue(),c=q.normalizeQuery(b),e=d.escapeRegExChars(c),c=a.value,/\/^http[s]?:\//.exec(e)||(c=""!==a.raw.a?a.raw.a:a.raw.domain),a=RegExp("^(?:"+e+")(.*$)","i"),a=a.exec(c),this.input.setHintValue(b+(a?a[1]:""))},_autocomplete:function(){var a,b;a=this.input.getHintValue();b=this.input.getQuery();a&&(b!==a&&this.input.isCursorAtEnd())&&((a=this.dropdown.getDatumForTopSuggestion())&&this.input.setInputValue(a.value),this.eventBus.trigger("autocompleted",
a.raw,a.datasetName))},_select:function(a){this.input.clearHint();this.input.setQuery(a.value);this.input.setInputValue(a.value,!0);this._setLanguageDirection();this.eventBus.trigger("selected",a.raw,a.datasetName);this.dropdown.close();d.defer(d.bind(this.dropdown.empty,this.dropdown))},open:function(){this.dropdown.open()},close:function(){this.dropdown.close()},getQuery:function(){return this.input.getQuery()},setQuery:function(a){this.input.setInputValue(a)},destroy:function(){this.input.destroy();
this.dropdown.destroy();var a=this.$node,b=a.find(".tt-input");d.each(b.data(F),function(a,e){d.isUndefined(a)?b.removeAttr(e):b.attr(e,a)});b.detach().removeData(F).removeClass("tt-input").insertAfter(a);a.remove();this.$node=null}});var fa,p,v;fa=f.fn.typeahead;p="ttTypeahead";v={initialize:function(a,b){b=d.isArray(b)?b:[].slice.call(arguments,1);a=a||{};return this.each(function(){var c=f(this),e;d.each(b,function(b){b.highlight=!!a.highlight});e=new ea({input:c,eventBus:new B({el:c}),withHint:d.isUndefined(a.hint)?
!0:!!a.hint,minLength:a.minLength,autoselect:a.autoselect,datasets:b});c.data(p,e)})},open:function(){return this.each(function(){var a;(a=f(this).data(p))&&a.open()})},close:function(){return this.each(function(){var a;(a=f(this).data(p))&&a.close()})},val:function(a){function b(){var b;(b=f(this).data(p))&&b.setQuery(a)}var c;if(arguments.length)c=this.each(b);else{var d;if(c=this.first().data(p))d=c.getQuery();c=d}return c},destroy:function(){return this.each(function(){var a=f(this),b;if(b=a.data(p))b.destroy(),
a.removeData(p)})}};f.fn.typeahead=function(a){return v[a]?v[a].apply(this,[].slice.call(arguments,1)):v.initialize.apply(this,arguments)};f.fn.typeahead.noConflict=function(){f.fn.typeahead=fa;return this}})(window.jQuery);