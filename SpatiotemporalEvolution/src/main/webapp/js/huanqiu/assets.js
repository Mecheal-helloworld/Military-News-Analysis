/*
 *	jQuery carouFredSel 6.2.1
 *	Demo's and documentation:
 *	caroufredsel.dev7studios.com
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


(function($){function sc_setScroll(a,b,c){return"transition"==c.transition&&"swing"==b&&(b="ease"),{anims:[],duration:a,orgDuration:a,easing:b,startTime:getTime()}}function sc_startScroll(a,b){for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e&&e[0][b.transition](e[1],a.duration,a.easing,e[2])}}function sc_stopScroll(a,b){is_boolean(b)||(b=!0),is_object(a.pre)&&sc_stopScroll(a.pre,b);for(var c=0,d=a.anims.length;d>c;c++){var e=a.anims[c];e[0].stop(!0),b&&(e[0].css(e[1]),is_function(e[2])&&e[2]())}is_object(a.post)&&sc_stopScroll(a.post,b)}function sc_afterScroll(a,b,c){switch(b&&b.remove(),c.fx){case"fade":case"crossfade":case"cover-fade":case"uncover-fade":a.css("opacity",1),a.css("filter","")}}function sc_fireCallbacks(a,b,c,d,e){if(b[c]&&b[c].call(a,d),e[c].length)for(var f=0,g=e[c].length;g>f;f++)e[c][f].call(a,d);return[]}function sc_fireQueue(a,b,c){return b.length&&(a.trigger(cf_e(b[0][0],c),b[0][1]),b.shift()),b}function sc_hideHiddenItems(a){a.each(function(){var a=$(this);a.data("_cfs_isHidden",a.is(":hidden")).hide()})}function sc_showHiddenItems(a){a&&a.each(function(){var a=$(this);a.data("_cfs_isHidden")||a.show()})}function sc_clearTimers(a){return a.auto&&clearTimeout(a.auto),a.progress&&clearInterval(a.progress),a}function sc_mapCallbackArguments(a,b,c,d,e,f,g){return{width:g.width,height:g.height,items:{old:a,skipped:b,visible:c},scroll:{items:d,direction:e,duration:f}}}function sc_getDuration(a,b,c,d){var e=a.duration;return"none"==a.fx?0:("auto"==e?e=b.scroll.duration/b.scroll.items*c:10>e&&(e=d/e),1>e?0:("fade"==a.fx&&(e/=2),Math.round(e)))}function nv_showNavi(a,b,c){var d=is_number(a.items.minimum)?a.items.minimum:a.items.visible+1;if("show"==b||"hide"==b)var e=b;else if(d>b){debug(c,"Not enough items ("+b+" total, "+d+" needed): Hiding navigation.");var e="hide"}else var e="show";var f="show"==e?"removeClass":"addClass",g=cf_c("hidden",c);a.auto.button&&a.auto.button[e]()[f](g),a.prev.button&&a.prev.button[e]()[f](g),a.next.button&&a.next.button[e]()[f](g),a.pagination.container&&a.pagination.container[e]()[f](g)}function nv_enableNavi(a,b,c){if(!a.circular&&!a.infinite){var d="removeClass"==b||"addClass"==b?b:!1,e=cf_c("disabled",c);if(a.auto.button&&d&&a.auto.button[d](e),a.prev.button){var f=d||0==b?"addClass":"removeClass";a.prev.button[f](e)}if(a.next.button){var f=d||b==a.items.visible?"addClass":"removeClass";a.next.button[f](e)}}}function go_getObject(a,b){return is_function(b)?b=b.call(a):is_undefined(b)&&(b={}),b}function go_getItemsObject(a,b){return b=go_getObject(a,b),is_number(b)?b={visible:b}:"variable"==b?b={visible:b,width:b,height:b}:is_object(b)||(b={}),b}function go_getScrollObject(a,b){return b=go_getObject(a,b),is_number(b)?b=50>=b?{items:b}:{duration:b}:is_string(b)?b={easing:b}:is_object(b)||(b={}),b}function go_getNaviObject(a,b){if(b=go_getObject(a,b),is_string(b)){var c=cf_getKeyCode(b);b=-1==c?$(b):c}return b}function go_getAutoObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_boolean(b)?b={play:b}:is_number(b)&&(b={timeoutDuration:b}),b.progress&&(is_string(b.progress)||is_jquery(b.progress))&&(b.progress={bar:b.progress}),b}function go_complementAutoObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_boolean(b.play)||(b.play=!0),is_number(b.delay)||(b.delay=0),is_undefined(b.pauseOnEvent)&&(b.pauseOnEvent=!0),is_boolean(b.pauseOnResize)||(b.pauseOnResize=!0),is_number(b.timeoutDuration)||(b.timeoutDuration=10>b.duration?2500:5*b.duration),b.progress&&(is_function(b.progress.bar)&&(b.progress.bar=b.progress.bar.call(a)),is_string(b.progress.bar)&&(b.progress.bar=$(b.progress.bar)),b.progress.bar?(is_function(b.progress.updater)||(b.progress.updater=$.fn.carouFredSel.progressbarUpdater),is_number(b.progress.interval)||(b.progress.interval=50)):b.progress=!1),b}function go_getPrevNextObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={button:b}:is_number(b)&&(b={key:b}),b}function go_complementPrevNextObject(a,b){return is_function(b.button)&&(b.button=b.button.call(a)),is_string(b.button)&&(b.button=$(b.button)),is_string(b.key)&&(b.key=cf_getKeyCode(b.key)),b}function go_getPaginationObject(a,b){return b=go_getNaviObject(a,b),is_jquery(b)?b={container:b}:is_boolean(b)&&(b={keys:b}),b}function go_complementPaginationObject(a,b){return is_function(b.container)&&(b.container=b.container.call(a)),is_string(b.container)&&(b.container=$(b.container)),is_number(b.items)||(b.items=!1),is_boolean(b.keys)||(b.keys=!1),is_function(b.anchorBuilder)||is_false(b.anchorBuilder)||(b.anchorBuilder=$.fn.carouFredSel.pageAnchorBuilder),is_number(b.deviation)||(b.deviation=0),b}function go_getSwipeObject(a,b){return is_function(b)&&(b=b.call(a)),is_undefined(b)&&(b={onTouch:!1}),is_true(b)?b={onTouch:b}:is_number(b)&&(b={items:b}),b}function go_complementSwipeObject(a,b){return is_boolean(b.onTouch)||(b.onTouch=!0),is_boolean(b.onMouse)||(b.onMouse=!1),is_object(b.options)||(b.options={}),is_boolean(b.options.triggerOnTouchEnd)||(b.options.triggerOnTouchEnd=!1),b}function go_getMousewheelObject(a,b){return is_function(b)&&(b=b.call(a)),is_true(b)?b={}:is_number(b)?b={items:b}:is_undefined(b)&&(b=!1),b}function go_complementMousewheelObject(a,b){return b}function gn_getItemIndex(a,b,c,d,e){if(is_string(a)&&(a=$(a,e)),is_object(a)&&(a=$(a,e)),is_jquery(a)?(a=e.children().index(a),is_boolean(c)||(c=!1)):is_boolean(c)||(c=!0),is_number(a)||(a=0),is_number(b)||(b=0),c&&(a+=d.first),a+=b,d.total>0){for(;a>=d.total;)a-=d.total;for(;0>a;)a+=d.total}return a}function gn_getVisibleItemsPrev(a,b,c){for(var d=0,e=0,f=c;f>=0;f--){var g=a.eq(f);if(d+=g.is(":visible")?g[b.d.outerWidth](!0):0,d>b.maxDimension)return e;0==f&&(f=a.length),e++}}function gn_getVisibleItemsPrevFilter(a,b,c){return gn_getItemsPrevFilter(a,b.items.filter,b.items.visibleConf.org,c)}function gn_getScrollItemsPrevFilter(a,b,c,d){return gn_getItemsPrevFilter(a,b.items.filter,d,c)}function gn_getItemsPrevFilter(a,b,c,d){for(var e=0,f=0,g=d,h=a.length;g>=0;g--){if(f++,f==h)return f;var i=a.eq(g);if(i.is(b)&&(e++,e==c))return f;0==g&&(g=h)}}function gn_getVisibleOrg(a,b){return b.items.visibleConf.org||a.children().slice(0,b.items.visible).filter(b.items.filter).length}function gn_getVisibleItemsNext(a,b,c){for(var d=0,e=0,f=c,g=a.length-1;g>=f;f++){var h=a.eq(f);if(d+=h.is(":visible")?h[b.d.outerWidth](!0):0,d>b.maxDimension)return e;if(e++,e==g+1)return e;f==g&&(f=-1)}}function gn_getVisibleItemsNextTestCircular(a,b,c,d){var e=gn_getVisibleItemsNext(a,b,c);return b.circular||c+e>d&&(e=d-c),e}function gn_getVisibleItemsNextFilter(a,b,c){return gn_getItemsNextFilter(a,b.items.filter,b.items.visibleConf.org,c,b.circular)}function gn_getScrollItemsNextFilter(a,b,c,d){return gn_getItemsNextFilter(a,b.items.filter,d+1,c,b.circular)-1}function gn_getItemsNextFilter(a,b,c,d){for(var f=0,g=0,h=d,i=a.length-1;i>=h;h++){if(g++,g>=i)return g;var j=a.eq(h);if(j.is(b)&&(f++,f==c))return g;h==i&&(h=-1)}}function gi_getCurrentItems(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsPrev(a,b,c){return a.slice(c,b.items.visibleConf.old+c)}function gi_getNewItemsPrev(a,b){return a.slice(0,b.items.visible)}function gi_getOldItemsNext(a,b){return a.slice(0,b.items.visibleConf.old)}function gi_getNewItemsNext(a,b,c){return a.slice(c,b.items.visible+c)}function sz_storeMargin(a,b,c){b.usePadding&&(is_string(c)||(c="_cfs_origCssMargin"),a.each(function(){var a=$(this),d=parseInt(a.css(b.d.marginRight),10);is_number(d)||(d=0),a.data(c,d)}))}function sz_resetMargin(a,b,c){if(b.usePadding){var d=is_boolean(c)?c:!1;is_number(c)||(c=0),sz_storeMargin(a,b,"_cfs_tempCssMargin"),a.each(function(){var a=$(this);a.css(b.d.marginRight,d?a.data("_cfs_tempCssMargin"):c+a.data("_cfs_origCssMargin"))})}}function sz_storeOrigCss(a){a.each(function(){var a=$(this);a.data("_cfs_origCss",a.attr("style")||"")})}function sz_restoreOrigCss(a){a.each(function(){var a=$(this);a.attr("style",a.data("_cfs_origCss")||"")})}function sz_setResponsiveSizes(a,b){var d=(a.items.visible,a.items[a.d.width]),e=a[a.d.height],f=is_percentage(e);b.each(function(){var b=$(this),c=d-ms_getPaddingBorderMargin(b,a,"Width");b[a.d.width](c),f&&b[a.d.height](ms_getPercentage(c,e))})}function sz_setSizes(a,b){var c=a.parent(),d=a.children(),e=gi_getCurrentItems(d,b),f=cf_mapWrapperSizes(ms_getSizes(e,b,!0),b,!1);if(c.css(f),b.usePadding){var g=b.padding,h=g[b.d[1]];b.align&&0>h&&(h=0);var i=e.last();i.css(b.d.marginRight,i.data("_cfs_origCssMargin")+h),a.css(b.d.top,g[b.d[0]]),a.css(b.d.left,g[b.d[3]])}return a.css(b.d.width,f[b.d.width]+2*ms_getTotalSize(d,b,"width")),a.css(b.d.height,ms_getLargestSize(d,b,"height")),f}function ms_getSizes(a,b,c){return[ms_getTotalSize(a,b,"width",c),ms_getLargestSize(a,b,"height",c)]}function ms_getLargestSize(a,b,c,d){return is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d?b[b.d[c]]:is_number(b.items[b.d[c]])?b.items[b.d[c]]:(c=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",ms_getTrueLargestSize(a,b,c))}function ms_getTrueLargestSize(a,b,c){for(var d=0,e=0,f=a.length;f>e;e++){var g=a.eq(e),h=g.is(":visible")?g[b.d[c]](!0):0;h>d&&(d=h)}return d}function ms_getTotalSize(a,b,c,d){if(is_boolean(d)||(d=!1),is_number(b[b.d[c]])&&d)return b[b.d[c]];if(is_number(b.items[b.d[c]]))return b.items[b.d[c]]*a.length;for(var e=c.toLowerCase().indexOf("width")>-1?"outerWidth":"outerHeight",f=0,g=0,h=a.length;h>g;g++){var i=a.eq(g);f+=i.is(":visible")?i[b.d[e]](!0):0}return f}function ms_getParentSize(a,b,c){var d=a.is(":visible");d&&a.hide();var e=a.parent()[b.d[c]]();return d&&a.show(),e}function ms_getMaxDimension(a,b){return is_number(a[a.d.width])?a[a.d.width]:b}function ms_hasVariableSizes(a,b,c){for(var d=!1,e=!1,f=0,g=a.length;g>f;f++){var h=a.eq(f),i=h.is(":visible")?h[b.d[c]](!0):0;d===!1?d=i:d!=i&&(e=!0),0==d&&(e=!0)}return e}function ms_getPaddingBorderMargin(a,b,c){return a[b.d["outer"+c]](!0)-a[b.d[c.toLowerCase()]]()}function ms_getPercentage(a,b){if(is_percentage(b)){if(b=parseInt(b.slice(0,-1),10),!is_number(b))return a;a*=b/100}return a}function cf_e(a,b,c,d,e){return is_boolean(c)||(c=!0),is_boolean(d)||(d=!0),is_boolean(e)||(e=!1),c&&(a=b.events.prefix+a),d&&(a=a+"."+b.events.namespace),d&&e&&(a+=b.serialNumber),a}function cf_c(a,b){return is_string(b.classnames[a])?b.classnames[a]:a}function cf_mapWrapperSizes(a,b,c){is_boolean(c)||(c=!0);var d=b.usePadding&&c?b.padding:[0,0,0,0],e={};return e[b.d.width]=a[0]+d[1]+d[3],e[b.d.height]=a[1]+d[0]+d[2],e}function cf_sortParams(a,b){for(var c=[],d=0,e=a.length;e>d;d++)for(var f=0,g=b.length;g>f;f++)if(b[f].indexOf(typeof a[d])>-1&&is_undefined(c[f])){c[f]=a[d];break}return c}function cf_getPadding(a){if(is_undefined(a))return[0,0,0,0];if(is_number(a))return[a,a,a,a];if(is_string(a)&&(a=a.split("px").join("").split("em").join("").split(" ")),!is_array(a))return[0,0,0,0];for(var b=0;4>b;b++)a[b]=parseInt(a[b],10);switch(a.length){case 0:return[0,0,0,0];case 1:return[a[0],a[0],a[0],a[0]];case 2:return[a[0],a[1],a[0],a[1]];case 3:return[a[0],a[1],a[2],a[1]];default:return[a[0],a[1],a[2],a[3]]}}function cf_getAlignPadding(a,b){var c=is_number(b[b.d.width])?Math.ceil(b[b.d.width]-ms_getTotalSize(a,b,"width")):0;switch(b.align){case"left":return[0,c];case"right":return[c,0];case"center":default:return[Math.ceil(c/2),Math.floor(c/2)]}}function cf_getDimensions(a){for(var b=[["width","innerWidth","outerWidth","height","innerHeight","outerHeight","left","top","marginRight",0,1,2,3],["height","innerHeight","outerHeight","width","innerWidth","outerWidth","top","left","marginBottom",3,2,1,0]],c=b[0].length,d="right"==a.direction||"left"==a.direction?0:1,e={},f=0;c>f;f++)e[b[0][f]]=b[d][f];return e}function cf_getAdjust(a,b,c,d){var e=a;if(is_function(c))e=c.call(d,e);else if(is_string(c)){var f=c.split("+"),g=c.split("-");if(g.length>f.length)var h=!0,i=g[0],j=g[1];else var h=!1,i=f[0],j=f[1];switch(i){case"even":e=1==a%2?a-1:a;break;case"odd":e=0==a%2?a-1:a;break;default:e=a}j=parseInt(j,10),is_number(j)&&(h&&(j=-j),e+=j)}return(!is_number(e)||1>e)&&(e=1),e}function cf_getItemsAdjust(a,b,c,d){return cf_getItemAdjustMinMax(cf_getAdjust(a,b,c,d),b.items.visibleConf)}function cf_getItemAdjustMinMax(a,b){return is_number(b.min)&&b.min>a&&(a=b.min),is_number(b.max)&&a>b.max&&(a=b.max),1>a&&(a=1),a}function cf_getSynchArr(a){is_array(a)||(a=[[a]]),is_array(a[0])||(a=[a]);for(var b=0,c=a.length;c>b;b++)is_string(a[b][0])&&(a[b][0]=$(a[b][0])),is_boolean(a[b][1])||(a[b][1]=!0),is_boolean(a[b][2])||(a[b][2]=!0),is_number(a[b][3])||(a[b][3]=0);return a}function cf_getKeyCode(a){return"right"==a?39:"left"==a?37:"up"==a?38:"down"==a?40:-1}function cf_setCookie(a,b,c){if(a){var d=b.triggerHandler(cf_e("currentPosition",c));$.fn.carouFredSel.cookie.set(a,d)}}function cf_getCookie(a){var b=$.fn.carouFredSel.cookie.get(a);return""==b?0:b}function in_mapCss(a,b){for(var c={},d=0,e=b.length;e>d;d++)c[b[d]]=a.css(b[d]);return c}function in_complementItems(a,b,c,d){return is_object(a.visibleConf)||(a.visibleConf={}),is_object(a.sizesConf)||(a.sizesConf={}),0==a.start&&is_number(d)&&(a.start=d),is_object(a.visible)?(a.visibleConf.min=a.visible.min,a.visibleConf.max=a.visible.max,a.visible=!1):is_string(a.visible)?("variable"==a.visible?a.visibleConf.variable=!0:a.visibleConf.adjust=a.visible,a.visible=!1):is_function(a.visible)&&(a.visibleConf.adjust=a.visible,a.visible=!1),is_string(a.filter)||(a.filter=c.filter(":hidden").length>0?":visible":"*"),a[b.d.width]||(b.responsive?(debug(!0,"Set a "+b.d.width+" for the items!"),a[b.d.width]=ms_getTrueLargestSize(c,b,"outerWidth")):a[b.d.width]=ms_hasVariableSizes(c,b,"outerWidth")?"variable":c[b.d.outerWidth](!0)),a[b.d.height]||(a[b.d.height]=ms_hasVariableSizes(c,b,"outerHeight")?"variable":c[b.d.outerHeight](!0)),a.sizesConf.width=a.width,a.sizesConf.height=a.height,a}function in_complementVisibleItems(a,b){return"variable"==a.items[a.d.width]&&(a.items.visibleConf.variable=!0),a.items.visibleConf.variable||(is_number(a[a.d.width])?a.items.visible=Math.floor(a[a.d.width]/a.items[a.d.width]):(a.items.visible=Math.floor(b/a.items[a.d.width]),a[a.d.width]=a.items.visible*a.items[a.d.width],a.items.visibleConf.adjust||(a.align=!1)),("Infinity"==a.items.visible||1>a.items.visible)&&(debug(!0,'Not a valid number of visible items: Set to "variable".'),a.items.visibleConf.variable=!0)),a}function in_complementPrimarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerWidth")),a}function in_complementSecondarySize(a,b,c){return"auto"==a&&(a=ms_getTrueLargestSize(c,b,"outerHeight")),a||(a=b.items[b.d.height]),a}function in_getAlignPadding(a,b){var c=cf_getAlignPadding(gi_getCurrentItems(b,a),a);return a.padding[a.d[1]]=c[1],a.padding[a.d[3]]=c[0],a}function in_getResponsiveValues(a,b){var d=cf_getItemAdjustMinMax(Math.ceil(a[a.d.width]/a.items[a.d.width]),a.items.visibleConf);d>b.length&&(d=b.length);var e=Math.floor(a[a.d.width]/d);return a.items.visible=d,a.items[a.d.width]=e,a[a.d.width]=d*e,a}function bt_pauseOnHoverConfig(a){if(is_string(a))var b=a.indexOf("immediate")>-1?!0:!1,c=a.indexOf("resume")>-1?!0:!1;else var b=c=!1;return[b,c]}function bt_mousesheelNumber(a){return is_number(a)?a:null}function is_null(a){return null===a}function is_undefined(a){return is_null(a)||a===void 0||""===a||"undefined"===a}function is_array(a){return a instanceof Array}function is_jquery(a){return a instanceof jQuery}function is_object(a){return(a instanceof Object||"object"==typeof a)&&!is_null(a)&&!is_jquery(a)&&!is_array(a)&&!is_function(a)}function is_number(a){return(a instanceof Number||"number"==typeof a)&&!isNaN(a)}function is_string(a){return(a instanceof String||"string"==typeof a)&&!is_undefined(a)&&!is_true(a)&&!is_false(a)}function is_function(a){return a instanceof Function||"function"==typeof a}function is_boolean(a){return a instanceof Boolean||"boolean"==typeof a||is_true(a)||is_false(a)}function is_true(a){return a===!0||"true"===a}function is_false(a){return a===!1||"false"===a}function is_percentage(a){return is_string(a)&&"%"==a.slice(-1)}function getTime(){return(new Date).getTime()}function deprecated(a,b){debug(!0,a+" is DEPRECATED, support for it will be removed. Use "+b+" instead.")}function debug(a,b){if(!is_undefined(window.console)&&!is_undefined(window.console.log)){if(is_object(a)){var c=" ("+a.selector+")";a=a.debug}else var c="";if(!a)return!1;b=is_string(b)?"carouFredSel"+c+": "+b:["carouFredSel"+c+":",b],window.console.log(b)}return!1}$.fn.carouFredSel||($.fn.caroufredsel=$.fn.carouFredSel=function(options,configs){if(0==this.length)return debug(!0,'No element found for "'+this.selector+'".'),this;if(this.length>1)return this.each(function(){$(this).carouFredSel(options,configs)});var $cfs=this,$tt0=this[0],starting_position=!1;$cfs.data("_cfs_isCarousel")&&(starting_position=$cfs.triggerHandler("_cfs_triggerEvent","currentPosition"),$cfs.trigger("_cfs_triggerEvent",["destroy",!0]));var FN={};FN._init=function(a,b,c){a=go_getObject($tt0,a),a.items=go_getItemsObject($tt0,a.items),a.scroll=go_getScrollObject($tt0,a.scroll),a.auto=go_getAutoObject($tt0,a.auto),a.prev=go_getPrevNextObject($tt0,a.prev),a.next=go_getPrevNextObject($tt0,a.next),a.pagination=go_getPaginationObject($tt0,a.pagination),a.swipe=go_getSwipeObject($tt0,a.swipe),a.mousewheel=go_getMousewheelObject($tt0,a.mousewheel),b&&(opts_orig=$.extend(!0,{},$.fn.carouFredSel.defaults,a)),opts=$.extend(!0,{},$.fn.carouFredSel.defaults,a),opts.d=cf_getDimensions(opts),crsl.direction="up"==opts.direction||"left"==opts.direction?"next":"prev";var d=$cfs.children(),e=ms_getParentSize($wrp,opts,"width");if(is_true(opts.cookie)&&(opts.cookie="caroufredsel_cookie_"+conf.serialNumber),opts.maxDimension=ms_getMaxDimension(opts,e),opts.items=in_complementItems(opts.items,opts,d,c),opts[opts.d.width]=in_complementPrimarySize(opts[opts.d.width],opts,d),opts[opts.d.height]=in_complementSecondarySize(opts[opts.d.height],opts,d),opts.responsive&&(is_percentage(opts[opts.d.width])||(opts[opts.d.width]="100%")),is_percentage(opts[opts.d.width])&&(crsl.upDateOnWindowResize=!0,crsl.primarySizePercentage=opts[opts.d.width],opts[opts.d.width]=ms_getPercentage(e,crsl.primarySizePercentage),opts.items.visible||(opts.items.visibleConf.variable=!0)),opts.responsive?(opts.usePadding=!1,opts.padding=[0,0,0,0],opts.align=!1,opts.items.visibleConf.variable=!1):(opts.items.visible||(opts=in_complementVisibleItems(opts,e)),opts[opts.d.width]||(!opts.items.visibleConf.variable&&is_number(opts.items[opts.d.width])&&"*"==opts.items.filter?(opts[opts.d.width]=opts.items.visible*opts.items[opts.d.width],opts.align=!1):opts[opts.d.width]="variable"),is_undefined(opts.align)&&(opts.align=is_number(opts[opts.d.width])?"center":!1),opts.items.visibleConf.variable&&(opts.items.visible=gn_getVisibleItemsNext(d,opts,0))),"*"==opts.items.filter||opts.items.visibleConf.variable||(opts.items.visibleConf.org=opts.items.visible,opts.items.visible=gn_getVisibleItemsNextFilter(d,opts,0)),opts.items.visible=cf_getItemsAdjust(opts.items.visible,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts.responsive)opts.items.visibleConf.min||(opts.items.visibleConf.min=opts.items.visible),opts.items.visibleConf.max||(opts.items.visibleConf.max=opts.items.visible),opts=in_getResponsiveValues(opts,d,e);else switch(opts.padding=cf_getPadding(opts.padding),"top"==opts.align?opts.align="left":"bottom"==opts.align&&(opts.align="right"),opts.align){case"center":case"left":case"right":"variable"!=opts[opts.d.width]&&(opts=in_getAlignPadding(opts,d),opts.usePadding=!0);break;default:opts.align=!1,opts.usePadding=0==opts.padding[0]&&0==opts.padding[1]&&0==opts.padding[2]&&0==opts.padding[3]?!1:!0}is_number(opts.scroll.duration)||(opts.scroll.duration=500),is_undefined(opts.scroll.items)&&(opts.scroll.items=opts.responsive||opts.items.visibleConf.variable||"*"!=opts.items.filter?"visible":opts.items.visible),opts.auto=$.extend(!0,{},opts.scroll,opts.auto),opts.prev=$.extend(!0,{},opts.scroll,opts.prev),opts.next=$.extend(!0,{},opts.scroll,opts.next),opts.pagination=$.extend(!0,{},opts.scroll,opts.pagination),opts.auto=go_complementAutoObject($tt0,opts.auto),opts.prev=go_complementPrevNextObject($tt0,opts.prev),opts.next=go_complementPrevNextObject($tt0,opts.next),opts.pagination=go_complementPaginationObject($tt0,opts.pagination),opts.swipe=go_complementSwipeObject($tt0,opts.swipe),opts.mousewheel=go_complementMousewheelObject($tt0,opts.mousewheel),opts.synchronise&&(opts.synchronise=cf_getSynchArr(opts.synchronise)),opts.auto.onPauseStart&&(opts.auto.onTimeoutStart=opts.auto.onPauseStart,deprecated("auto.onPauseStart","auto.onTimeoutStart")),opts.auto.onPausePause&&(opts.auto.onTimeoutPause=opts.auto.onPausePause,deprecated("auto.onPausePause","auto.onTimeoutPause")),opts.auto.onPauseEnd&&(opts.auto.onTimeoutEnd=opts.auto.onPauseEnd,deprecated("auto.onPauseEnd","auto.onTimeoutEnd")),opts.auto.pauseDuration&&(opts.auto.timeoutDuration=opts.auto.pauseDuration,deprecated("auto.pauseDuration","auto.timeoutDuration"))},FN._build=function(){$cfs.data("_cfs_isCarousel",!0);var a=$cfs.children(),b=in_mapCss($cfs,["textAlign","float","position","top","right","bottom","left","zIndex","width","height","marginTop","marginRight","marginBottom","marginLeft"]),c="relative";switch(b.position){case"absolute":case"fixed":c=b.position}"parent"==conf.wrapper?sz_storeOrigCss($wrp):$wrp.css(b),$wrp.css({overflow:"hidden",position:c}),sz_storeOrigCss($cfs),$cfs.data("_cfs_origCssZindex",b.zIndex),$cfs.css({textAlign:"left","float":"none",position:"absolute",top:0,right:"auto",bottom:"auto",left:0,marginTop:0,marginRight:0,marginBottom:0,marginLeft:0}),sz_storeMargin(a,opts),sz_storeOrigCss(a),opts.responsive&&sz_setResponsiveSizes(opts,a)},FN._bind_events=function(){FN._unbind_events(),$cfs.bind(cf_e("stop",conf),function(a,b){return a.stopPropagation(),crsl.isStopped||opts.auto.button&&opts.auto.button.addClass(cf_c("stopped",conf)),crsl.isStopped=!0,opts.auto.play&&(opts.auto.play=!1,$cfs.trigger(cf_e("pause",conf),b)),!0}),$cfs.bind(cf_e("finish",conf),function(a){return a.stopPropagation(),crsl.isScrolling&&sc_stopScroll(scrl),!0}),$cfs.bind(cf_e("pause",conf),function(a,b,c){if(a.stopPropagation(),tmrs=sc_clearTimers(tmrs),b&&crsl.isScrolling){scrl.isStopped=!0;var d=getTime()-scrl.startTime;scrl.duration-=d,scrl.pre&&(scrl.pre.duration-=d),scrl.post&&(scrl.post.duration-=d),sc_stopScroll(scrl,!1)}if(crsl.isPaused||crsl.isScrolling||c&&(tmrs.timePassed+=getTime()-tmrs.startTime),crsl.isPaused||opts.auto.button&&opts.auto.button.addClass(cf_c("paused",conf)),crsl.isPaused=!0,opts.auto.onTimeoutPause){var e=opts.auto.timeoutDuration-tmrs.timePassed,f=100-Math.ceil(100*e/opts.auto.timeoutDuration);opts.auto.onTimeoutPause.call($tt0,f,e)}return!0}),$cfs.bind(cf_e("play",conf),function(a,b,c,d){a.stopPropagation(),tmrs=sc_clearTimers(tmrs);var e=[b,c,d],f=["string","number","boolean"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],"prev"!=b&&"next"!=b&&(b=crsl.direction),is_number(c)||(c=0),is_boolean(d)||(d=!1),d&&(crsl.isStopped=!1,opts.auto.play=!0),!opts.auto.play)return a.stopImmediatePropagation(),debug(conf,"Carousel stopped: Not scrolling.");crsl.isPaused&&opts.auto.button&&(opts.auto.button.removeClass(cf_c("stopped",conf)),opts.auto.button.removeClass(cf_c("paused",conf))),crsl.isPaused=!1,tmrs.startTime=getTime();var h=opts.auto.timeoutDuration+c;return dur2=h-tmrs.timePassed,perc=100-Math.ceil(100*dur2/h),opts.auto.progress&&(tmrs.progress=setInterval(function(){var a=getTime()-tmrs.startTime+tmrs.timePassed,b=Math.ceil(100*a/h);opts.auto.progress.updater.call(opts.auto.progress.bar[0],b)},opts.auto.progress.interval)),tmrs.auto=setTimeout(function(){opts.auto.progress&&opts.auto.progress.updater.call(opts.auto.progress.bar[0],100),opts.auto.onTimeoutEnd&&opts.auto.onTimeoutEnd.call($tt0,perc,dur2),crsl.isScrolling?$cfs.trigger(cf_e("play",conf),b):$cfs.trigger(cf_e(b,conf),opts.auto)},dur2),opts.auto.onTimeoutStart&&opts.auto.onTimeoutStart.call($tt0,perc,dur2),!0}),$cfs.bind(cf_e("resume",conf),function(a){return a.stopPropagation(),scrl.isStopped?(scrl.isStopped=!1,crsl.isPaused=!1,crsl.isScrolling=!0,scrl.startTime=getTime(),sc_startScroll(scrl,conf)):$cfs.trigger(cf_e("play",conf)),!0}),$cfs.bind(cf_e("prev",conf)+" "+cf_e("next",conf),function(a,b,c,d,e){if(a.stopPropagation(),crsl.isStopped||$cfs.is(":hidden"))return a.stopImmediatePropagation(),debug(conf,"Carousel stopped or hidden: Not scrolling.");var f=is_number(opts.items.minimum)?opts.items.minimum:opts.items.visible+1;if(f>itms.total)return a.stopImmediatePropagation(),debug(conf,"Not enough items ("+itms.total+" total, "+f+" needed): Not scrolling.");var g=[b,c,d,e],h=["object","number/string","function","boolean"],i=cf_sortParams(g,h);b=i[0],c=i[1],d=i[2],e=i[3];var j=a.type.slice(conf.events.prefix.length);if(is_object(b)||(b={}),is_function(d)&&(b.onAfter=d),is_boolean(e)&&(b.queue=e),b=$.extend(!0,{},opts[j],b),b.conditions&&!b.conditions.call($tt0,j))return a.stopImmediatePropagation(),debug(conf,'Callback "conditions" returned false.');if(!is_number(c)){if("*"!=opts.items.filter)c="visible";else for(var k=[c,b.items,opts[j].items],i=0,l=k.length;l>i;i++)if(is_number(k[i])||"page"==k[i]||"visible"==k[i]){c=k[i];break}switch(c){case"page":return a.stopImmediatePropagation(),$cfs.triggerHandler(cf_e(j+"Page",conf),[b,d]);case"visible":opts.items.visibleConf.variable||"*"!=opts.items.filter||(c=opts.items.visible)}}if(scrl.isStopped)return $cfs.trigger(cf_e("resume",conf)),$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]]),a.stopImmediatePropagation(),debug(conf,"Carousel resumed scrolling.");if(b.duration>0&&crsl.isScrolling)return b.queue&&("last"==b.queue&&(queu=[]),("first"!=b.queue||0==queu.length)&&$cfs.trigger(cf_e("queue",conf),[j,[b,c,d]])),a.stopImmediatePropagation(),debug(conf,"Carousel currently scrolling.");if(tmrs.timePassed=0,$cfs.trigger(cf_e("slide_"+j,conf),[b,c]),opts.synchronise)for(var m=opts.synchronise,n=[b,c],o=0,l=m.length;l>o;o++){var p=j;m[o][2]||(p="prev"==p?"next":"prev"),m[o][1]||(n[0]=m[o][0].triggerHandler("_cfs_triggerEvent",["configuration",p])),n[1]=c+m[o][3],m[o][0].trigger("_cfs_triggerEvent",["slide_"+p,n])}return!0}),$cfs.bind(cf_e("slide_prev",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&0==itms.first)return opts.infinite&&$cfs.trigger(cf_e("next",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if(opts.items.visibleConf.variable)c=gn_getVisibleItemsPrev(d,opts,itms.total-1);else if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsPrevFilter(d,opts,itms.total-1,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}if(opts.circular||itms.total-c<itms.first&&(c=itms.total-itms.first),opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){var f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0);f>=opts.items.visible+c&&itms.total>c&&(c++,f=cf_getItemsAdjust(gn_getVisibleItemsNext(d,opts,itms.total-c),opts,opts.items.visibleConf.adjust,$tt0)),opts.items.visible=f}else if("*"!=opts.items.filter){var f=gn_getVisibleItemsNextFilter(d,opts,itms.total-c);opts.items.visible=cf_getItemsAdjust(f,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items backward."),itms.first+=c;itms.first>=itms.total;)itms.first-=itms.total;opts.circular||(0==itms.first&&b.onEnd&&b.onEnd.call($tt0,"prev"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),$cfs.children().slice(itms.total-c,itms.total).prependTo($cfs),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),g=gi_getOldItemsPrev(d,opts,c),h=gi_getNewItemsPrev(d,opts),i=d.eq(c-1),j=g.last(),k=h.last();sz_resetMargin(d,opts);var l=0,m=0;if(opts.align){var n=cf_getAlignPadding(h,opts);l=n[0],m=n[1]}var o=0>l?opts.padding[opts.d[3]]:0,p=!1,q=$();if(c>opts.items.visible&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,i=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(h,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B={},C={},D=sc_getDuration(b,opts,c,t);switch(b.fx){case"cover":case"cover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visible),opts,"width")}p&&(opts.items[opts.d.width]=r),sz_resetMargin(d,opts,!0),m>=0&&sz_resetMargin(j,opts,opts.padding[opts.d[1]]),l>=0&&sz_resetMargin(i,opts,opts.padding[opts.d[3]]),opts.align&&(opts.padding[opts.d[1]]=m,opts.padding[opts.d[3]]=l),B[opts.d.left]=-(t-o),C[opts.d.left]=-(v-o),x[opts.d.left]=u[opts.d.width];var E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){},L=function(){},M=function(){},N=function(){},O=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp)}switch(b.fx){case"crossfade":case"uncover":case"uncover-fade":s.children().slice(0,c).remove(),s.children().slice(opts.items.visibleConf.old).remove();break;case"cover":case"cover-fade":s.children().slice(opts.items.visible).remove(),s.css(C)}if($cfs.css(B),scrl=sc_setScroll(D,b.easing,conf),w[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0,("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(E=function(){$wrp.css(u)},F=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){switch(k.not(i).length&&(y[opts.d.marginRight]=i.data("_cfs_origCssMargin"),0>l?i.css(y):(K=function(){i.css(y)},L=function(){scrl.anims.push([i,y])})),b.fx){case"cover":case"cover-fade":s.children().eq(c-1).css(y)}k.not(j).length&&(z[opts.d.marginRight]=j.data("_cfs_origCssMargin"),G=function(){j.css(z)},H=function(){scrl.anims.push([j,z])}),m>=0&&(A[opts.d.marginRight]=k.data("_cfs_origCssMargin")+opts.padding[opts.d[1]],I=function(){k.css(A)},J=function(){scrl.anims.push([k,A])})}O=function(){$cfs.css(w)};var P=opts.items.visible+c-itms.total;N=function(){if(P>0&&($cfs.children().slice(itms.total).remove(),g=$($cfs.children().slice(itms.total-(opts.items.visible-P)).get().concat($cfs.children().slice(0,P).get()))),sc_showHiddenItems(p),opts.usePadding){var a=$cfs.children().eq(opts.items.visible+c-1);a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var Q=sc_mapCallbackArguments(g,q,h,c,"prev",D,u);switch(M=function(){sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",Q,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",Q,clbk),b.fx){case"none":$cfs.css(w),E(),G(),I(),K(),O(),N(),M();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){E(),G(),I(),K(),O(),N(),scrl=sc_setScroll(D,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},M]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},M]),F(),G(),I(),K(),O(),N();break;case"cover":scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"cover-fade":scrl.anims.push([$cfs,{opacity:0}]),scrl.anims.push([s,w,function(){G(),I(),K(),O(),N(),M()}]),F();break;case"uncover":scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,M]),F(),G(),I(),K(),O(),N();break;default:scrl.anims.push([$cfs,w,function(){N(),M()}]),F(),H(),J(),L()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0
}),$cfs.bind(cf_e("slide_next",conf),function(a,b,c){a.stopPropagation();var d=$cfs.children();if(!opts.circular&&itms.first==opts.items.visible)return opts.infinite&&$cfs.trigger(cf_e("prev",conf),itms.total-1),a.stopImmediatePropagation();if(sz_resetMargin(d,opts),!is_number(c)){if("*"!=opts.items.filter){var e=is_number(b.items)?b.items:gn_getVisibleOrg($cfs,opts);c=gn_getScrollItemsNextFilter(d,opts,0,e)}else c=opts.items.visible;c=cf_getAdjust(c,opts,b.items,$tt0)}var f=0==itms.first?itms.total:itms.first;if(!opts.circular){if(opts.items.visibleConf.variable)var g=gn_getVisibleItemsNext(d,opts,c),e=gn_getVisibleItemsPrev(d,opts,f-1);else var g=opts.items.visible,e=opts.items.visible;c+g>f&&(c=f-e)}if(opts.items.visibleConf.old=opts.items.visible,opts.items.visibleConf.variable){for(var g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible-c>=g&&itms.total>c;)c++,g=cf_getItemsAdjust(gn_getVisibleItemsNextTestCircular(d,opts,c,f),opts,opts.items.visibleConf.adjust,$tt0);opts.items.visible=g}else if("*"!=opts.items.filter){var g=gn_getVisibleItemsNextFilter(d,opts,c);opts.items.visible=cf_getItemsAdjust(g,opts,opts.items.visibleConf.adjust,$tt0)}if(sz_resetMargin(d,opts,!0),0==c)return a.stopImmediatePropagation(),debug(conf,"0 items to scroll: Not scrolling.");for(debug(conf,"Scrolling "+c+" items forward."),itms.first-=c;0>itms.first;)itms.first+=itms.total;opts.circular||(itms.first==opts.items.visible&&b.onEnd&&b.onEnd.call($tt0,"next"),opts.infinite||nv_enableNavi(opts,itms.first,conf)),itms.total<opts.items.visible+c&&$cfs.children().slice(0,opts.items.visible+c-itms.total).clone(!0).appendTo($cfs);var d=$cfs.children(),h=gi_getOldItemsNext(d,opts),i=gi_getNewItemsNext(d,opts,c),j=d.eq(c-1),k=h.last(),l=i.last();sz_resetMargin(d,opts);var m=0,n=0;if(opts.align){var o=cf_getAlignPadding(i,opts);m=o[0],n=o[1]}var p=!1,q=$();if(c>opts.items.visibleConf.old&&(q=d.slice(opts.items.visibleConf.old,c),"directscroll"==b.fx)){var r=opts.items[opts.d.width];p=q,j=k,sc_hideHiddenItems(p),opts.items[opts.d.width]="variable"}var s=!1,t=ms_getTotalSize(d.slice(0,c),opts,"width"),u=cf_mapWrapperSizes(ms_getSizes(i,opts,!0),opts,!opts.usePadding),v=0,w={},x={},y={},z={},A={},B=sc_getDuration(b,opts,c,t);switch(b.fx){case"uncover":case"uncover-fade":v=ms_getTotalSize(d.slice(0,opts.items.visibleConf.old),opts,"width")}p&&(opts.items[opts.d.width]=r),opts.align&&0>opts.padding[opts.d[1]]&&(opts.padding[opts.d[1]]=0),sz_resetMargin(d,opts,!0),sz_resetMargin(k,opts,opts.padding[opts.d[1]]),opts.align&&(opts.padding[opts.d[1]]=n,opts.padding[opts.d[3]]=m),A[opts.d.left]=opts.usePadding?opts.padding[opts.d[3]]:0;var C=function(){},D=function(){},E=function(){},F=function(){},G=function(){},H=function(){},I=function(){},J=function(){},K=function(){};switch(b.fx){case"crossfade":case"cover":case"cover-fade":case"uncover":case"uncover-fade":s=$cfs.clone(!0).appendTo($wrp),s.children().slice(opts.items.visibleConf.old).remove()}switch(b.fx){case"crossfade":case"cover":case"cover-fade":$cfs.css("zIndex",1),s.css("zIndex",0)}if(scrl=sc_setScroll(B,b.easing,conf),w[opts.d.left]=-t,x[opts.d.left]=-v,0>m&&(w[opts.d.left]+=m),("variable"==opts[opts.d.width]||"variable"==opts[opts.d.height])&&(C=function(){$wrp.css(u)},D=function(){scrl.anims.push([$wrp,u])}),opts.usePadding){var L=l.data("_cfs_origCssMargin");n>=0&&(L+=opts.padding[opts.d[1]]),l.css(opts.d.marginRight,L),j.not(k).length&&(z[opts.d.marginRight]=k.data("_cfs_origCssMargin")),E=function(){k.css(z)},F=function(){scrl.anims.push([k,z])};var M=j.data("_cfs_origCssMargin");m>0&&(M+=opts.padding[opts.d[3]]),y[opts.d.marginRight]=M,G=function(){j.css(y)},H=function(){scrl.anims.push([j,y])}}K=function(){$cfs.css(A)};var N=opts.items.visible+c-itms.total;J=function(){N>0&&$cfs.children().slice(itms.total).remove();var a=$cfs.children().slice(0,c).appendTo($cfs).last();if(N>0&&(i=gi_getCurrentItems(d,opts)),sc_showHiddenItems(p),opts.usePadding){if(itms.total<opts.items.visible+c){var b=$cfs.children().eq(opts.items.visible-1);b.css(opts.d.marginRight,b.data("_cfs_origCssMargin")+opts.padding[opts.d[1]])}a.css(opts.d.marginRight,a.data("_cfs_origCssMargin"))}};var O=sc_mapCallbackArguments(h,q,i,c,"next",B,u);switch(I=function(){$cfs.css("zIndex",$cfs.data("_cfs_origCssZindex")),sc_afterScroll($cfs,s,b),crsl.isScrolling=!1,clbk.onAfter=sc_fireCallbacks($tt0,b,"onAfter",O,clbk),queu=sc_fireQueue($cfs,queu,conf),crsl.isPaused||$cfs.trigger(cf_e("play",conf))},crsl.isScrolling=!0,tmrs=sc_clearTimers(tmrs),clbk.onBefore=sc_fireCallbacks($tt0,b,"onBefore",O,clbk),b.fx){case"none":$cfs.css(w),C(),E(),G(),K(),J(),I();break;case"fade":scrl.anims.push([$cfs,{opacity:0},function(){C(),E(),G(),K(),J(),scrl=sc_setScroll(B,b.easing,conf),scrl.anims.push([$cfs,{opacity:1},I]),sc_startScroll(scrl,conf)}]);break;case"crossfade":$cfs.css({opacity:0}),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,{opacity:1},I]),D(),E(),G(),K(),J();break;case"cover":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"cover-fade":$cfs.css(opts.d.left,$wrp[opts.d.width]()),scrl.anims.push([s,{opacity:0}]),scrl.anims.push([$cfs,A,I]),D(),E(),G(),J();break;case"uncover":scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;case"uncover-fade":$cfs.css({opacity:0}),scrl.anims.push([$cfs,{opacity:1}]),scrl.anims.push([s,x,I]),D(),E(),G(),K(),J();break;default:scrl.anims.push([$cfs,w,function(){K(),J(),I()}]),D(),F(),H()}return sc_startScroll(scrl,conf),cf_setCookie(opts.cookie,$cfs,conf),$cfs.trigger(cf_e("updatePageStatus",conf),[!1,u]),!0}),$cfs.bind(cf_e("slideTo",conf),function(a,b,c,d,e,f,g){a.stopPropagation();var h=[b,c,d,e,f,g],i=["string/number/object","number","boolean","object","string","function"],j=cf_sortParams(h,i);return e=j[3],f=j[4],g=j[5],b=gn_getItemIndex(j[0],j[1],j[2],itms,$cfs),0==b?!1:(is_object(e)||(e=!1),"prev"!=f&&"next"!=f&&(f=opts.circular?itms.total/2>=b?"next":"prev":0==itms.first||itms.first>b?"next":"prev"),"prev"==f&&(b=itms.total-b),$cfs.trigger(cf_e(f,conf),[e,b,g]),!0)}),$cfs.bind(cf_e("prevPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d-1,b,"prev",c])}),$cfs.bind(cf_e("nextPage",conf),function(a,b,c){a.stopPropagation();var d=$cfs.triggerHandler(cf_e("currentPage",conf));return $cfs.triggerHandler(cf_e("slideToPage",conf),[d+1,b,"next",c])}),$cfs.bind(cf_e("slideToPage",conf),function(a,b,c,d,e){a.stopPropagation(),is_number(b)||(b=$cfs.triggerHandler(cf_e("currentPage",conf)));var f=opts.pagination.items||opts.items.visible,g=Math.ceil(itms.total/f)-1;return 0>b&&(b=g),b>g&&(b=0),$cfs.triggerHandler(cf_e("slideTo",conf),[b*f,0,!0,c,d,e])}),$cfs.bind(cf_e("jumpToStart",conf),function(a,b){if(a.stopPropagation(),b=b?gn_getItemIndex(b,0,!0,itms,$cfs):0,b+=itms.first,0!=b){if(itms.total>0)for(;b>itms.total;)b-=itms.total;$cfs.prepend($cfs.children().slice(b,itms.total))}return!0}),$cfs.bind(cf_e("synchronise",conf),function(a,b){if(a.stopPropagation(),b)b=cf_getSynchArr(b);else{if(!opts.synchronise)return debug(conf,"No carousel to synchronise.");b=opts.synchronise}for(var c=$cfs.triggerHandler(cf_e("currentPosition",conf)),d=!0,e=0,f=b.length;f>e;e++)b[e][0].triggerHandler(cf_e("slideTo",conf),[c,b[e][3],!0])||(d=!1);return d}),$cfs.bind(cf_e("queue",conf),function(a,b,c){return a.stopPropagation(),is_function(b)?b.call($tt0,queu):is_array(b)?queu=b:is_undefined(b)||queu.push([b,c]),queu}),$cfs.bind(cf_e("insertItem",conf),function(a,b,c,d,e){a.stopPropagation();var f=[b,c,d,e],g=["string/object","string/number/object","boolean","number"],h=cf_sortParams(f,g);if(b=h[0],c=h[1],d=h[2],e=h[3],is_object(b)&&!is_jquery(b)?b=$(b):is_string(b)&&(b=$(b)),!is_jquery(b)||0==b.length)return debug(conf,"Not a valid object.");is_undefined(c)&&(c="end"),sz_storeMargin(b,opts),sz_storeOrigCss(b);var i=c,j="before";"end"==c?d?(0==itms.first?(c=itms.total-1,j="after"):(c=itms.first,itms.first+=b.length),0>c&&(c=0)):(c=itms.total-1,j="after"):c=gn_getItemIndex(c,e,d,itms,$cfs);var k=$cfs.children().eq(c);return k.length?k[j](b):(debug(conf,"Correct insert-position not found! Appending item to the end."),$cfs.append(b)),"end"==i||d||itms.first>c&&(itms.first+=b.length),itms.total=$cfs.children().length,itms.first>=itms.total&&(itms.first-=itms.total),$cfs.trigger(cf_e("updateSizes",conf)),$cfs.trigger(cf_e("linkAnchors",conf)),!0}),$cfs.bind(cf_e("removeItem",conf),function(a,b,c,d){a.stopPropagation();var e=[b,c,d],f=["string/number/object","boolean","number"],g=cf_sortParams(e,f);if(b=g[0],c=g[1],d=g[2],b instanceof $&&b.length>1)return i=$(),b.each(function(){var e=$cfs.trigger(cf_e("removeItem",conf),[$(this),c,d]);e&&(i=i.add(e))}),i;if(is_undefined(b)||"end"==b)i=$cfs.children().last();else{b=gn_getItemIndex(b,d,c,itms,$cfs);var i=$cfs.children().eq(b);i.length&&itms.first>b&&(itms.first-=i.length)}return i&&i.length&&(i.detach(),itms.total=$cfs.children().length,$cfs.trigger(cf_e("updateSizes",conf))),i}),$cfs.bind(cf_e("onBefore",conf)+" "+cf_e("onAfter",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length);return is_array(b)&&(clbk[c]=b),is_function(b)&&clbk[c].push(b),clbk[c]}),$cfs.bind(cf_e("currentPosition",conf),function(a,b){if(a.stopPropagation(),0==itms.first)var c=0;else var c=itms.total-itms.first;return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("currentPage",conf),function(a,b){a.stopPropagation();var e,c=opts.pagination.items||opts.items.visible,d=Math.ceil(itms.total/c-1);return e=0==itms.first?0:itms.first<itms.total%c?0:itms.first!=c||opts.circular?Math.round((itms.total-itms.first)/c):d,0>e&&(e=0),e>d&&(e=d),is_function(b)&&b.call($tt0,e),e}),$cfs.bind(cf_e("currentVisible",conf),function(a,b){a.stopPropagation();var c=gi_getCurrentItems($cfs.children(),opts);return is_function(b)&&b.call($tt0,c),c}),$cfs.bind(cf_e("slice",conf),function(a,b,c,d){if(a.stopPropagation(),0==itms.total)return!1;var e=[b,c,d],f=["number","number","function"],g=cf_sortParams(e,f);if(b=is_number(g[0])?g[0]:0,c=is_number(g[1])?g[1]:itms.total,d=g[2],b+=itms.first,c+=itms.first,items.total>0){for(;b>itms.total;)b-=itms.total;for(;c>itms.total;)c-=itms.total;for(;0>b;)b+=itms.total;for(;0>c;)c+=itms.total}var i,h=$cfs.children();return i=c>b?h.slice(b,c):$(h.slice(b,itms.total).get().concat(h.slice(0,c).get())),is_function(d)&&d.call($tt0,i),i}),$cfs.bind(cf_e("isPaused",conf)+" "+cf_e("isStopped",conf)+" "+cf_e("isScrolling",conf),function(a,b){a.stopPropagation();var c=a.type.slice(conf.events.prefix.length),d=crsl[c];return is_function(b)&&b.call($tt0,d),d}),$cfs.bind(cf_e("configuration",conf),function(e,a,b,c){e.stopPropagation();var reInit=!1;if(is_function(a))a.call($tt0,opts);else if(is_object(a))opts_orig=$.extend(!0,{},opts_orig,a),b!==!1?reInit=!0:opts=$.extend(!0,{},opts,a);else if(!is_undefined(a))if(is_function(b)){var val=eval("opts."+a);is_undefined(val)&&(val=""),b.call($tt0,val)}else{if(is_undefined(b))return eval("opts."+a);"boolean"!=typeof c&&(c=!0),eval("opts_orig."+a+" = b"),c!==!1?reInit=!0:eval("opts."+a+" = b")}if(reInit){sz_resetMargin($cfs.children(),opts),FN._init(opts_orig),FN._bind_buttons();var sz=sz_setSizes($cfs,opts);$cfs.trigger(cf_e("updatePageStatus",conf),[!0,sz])}return opts}),$cfs.bind(cf_e("linkAnchors",conf),function(a,b,c){return a.stopPropagation(),is_undefined(b)?b=$("body"):is_string(b)&&(b=$(b)),is_jquery(b)&&0!=b.length?(is_string(c)||(c="a.caroufredsel"),b.find(c).each(function(){var a=this.hash||"";a.length>0&&-1!=$cfs.children().index($(a))&&$(this).unbind("click").click(function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),a)})}),!0):debug(conf,"Not a valid object.")}),$cfs.bind(cf_e("updatePageStatus",conf),function(a,b){if(a.stopPropagation(),opts.pagination.container){var d=opts.pagination.items||opts.items.visible,e=Math.ceil(itms.total/d);b&&(opts.pagination.anchorBuilder&&(opts.pagination.container.children().remove(),opts.pagination.container.each(function(){for(var a=0;e>a;a++){var b=$cfs.children().eq(gn_getItemIndex(a*d,0,!0,itms,$cfs));$(this).append(opts.pagination.anchorBuilder.call(b[0],a+1))}})),opts.pagination.container.each(function(){$(this).children().unbind(opts.pagination.event).each(function(a){$(this).bind(opts.pagination.event,function(b){b.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[a*d,-opts.pagination.deviation,!0,opts.pagination])})})}));var f=$cfs.triggerHandler(cf_e("currentPage",conf))+opts.pagination.deviation;return f>=e&&(f=0),0>f&&(f=e-1),opts.pagination.container.each(function(){$(this).children().removeClass(cf_c("selected",conf)).eq(f).addClass(cf_c("selected",conf))}),!0}}),$cfs.bind(cf_e("updateSizes",conf),function(){var b=opts.items.visible,c=$cfs.children(),d=ms_getParentSize($wrp,opts,"width");if(itms.total=c.length,crsl.primarySizePercentage?(opts.maxDimension=d,opts[opts.d.width]=ms_getPercentage(d,crsl.primarySizePercentage)):opts.maxDimension=ms_getMaxDimension(opts,d),opts.responsive?(opts.items.width=opts.items.sizesConf.width,opts.items.height=opts.items.sizesConf.height,opts=in_getResponsiveValues(opts,c,d),b=opts.items.visible,sz_setResponsiveSizes(opts,c)):opts.items.visibleConf.variable?b=gn_getVisibleItemsNext(c,opts,0):"*"!=opts.items.filter&&(b=gn_getVisibleItemsNextFilter(c,opts,0)),!opts.circular&&0!=itms.first&&b>itms.first){if(opts.items.visibleConf.variable)var e=gn_getVisibleItemsPrev(c,opts,itms.first)-itms.first;else if("*"!=opts.items.filter)var e=gn_getVisibleItemsPrevFilter(c,opts,itms.first)-itms.first;else var e=opts.items.visible-itms.first;debug(conf,"Preventing non-circular: sliding "+e+" items backward."),$cfs.trigger(cf_e("prev",conf),e)}opts.items.visible=cf_getItemsAdjust(b,opts,opts.items.visibleConf.adjust,$tt0),opts.items.visibleConf.old=opts.items.visible,opts=in_getAlignPadding(opts,c);var f=sz_setSizes($cfs,opts);return $cfs.trigger(cf_e("updatePageStatus",conf),[!0,f]),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),f}),$cfs.bind(cf_e("destroy",conf),function(a,b){return a.stopPropagation(),tmrs=sc_clearTimers(tmrs),$cfs.data("_cfs_isCarousel",!1),$cfs.trigger(cf_e("finish",conf)),b&&$cfs.trigger(cf_e("jumpToStart",conf)),sz_restoreOrigCss($cfs.children()),sz_restoreOrigCss($cfs),FN._unbind_events(),FN._unbind_buttons(),"parent"==conf.wrapper?sz_restoreOrigCss($wrp):$wrp.replaceWith($cfs),!0}),$cfs.bind(cf_e("debug",conf),function(){return debug(conf,"Carousel width: "+opts.width),debug(conf,"Carousel height: "+opts.height),debug(conf,"Item widths: "+opts.items.width),debug(conf,"Item heights: "+opts.items.height),debug(conf,"Number of items visible: "+opts.items.visible),opts.auto.play&&debug(conf,"Number of items scrolled automatically: "+opts.auto.items),opts.prev.button&&debug(conf,"Number of items scrolled backward: "+opts.prev.items),opts.next.button&&debug(conf,"Number of items scrolled forward: "+opts.next.items),conf.debug}),$cfs.bind("_cfs_triggerEvent",function(a,b,c){return a.stopPropagation(),$cfs.triggerHandler(cf_e(b,conf),c)})},FN._unbind_events=function(){$cfs.unbind(cf_e("",conf)),$cfs.unbind(cf_e("",conf,!1)),$cfs.unbind("_cfs_triggerEvent")},FN._bind_buttons=function(){if(FN._unbind_buttons(),nv_showNavi(opts,itms.total,conf),nv_enableNavi(opts,itms.first,conf),opts.auto.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.auto.pauseOnHover);$wrp.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.auto.button&&opts.auto.button.bind(cf_e(opts.auto.event,conf,!1),function(a){a.preventDefault();var b=!1,c=null;crsl.isPaused?b="play":opts.auto.pauseOnEvent&&(b="pause",c=bt_pauseOnHoverConfig(opts.auto.pauseOnEvent)),b&&$cfs.trigger(cf_e(b,conf),c)}),opts.prev.button&&(opts.prev.button.bind(cf_e(opts.prev.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("prev",conf))}),opts.prev.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.prev.pauseOnHover);opts.prev.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.next.button&&(opts.next.button.bind(cf_e(opts.next.event,conf,!1),function(a){a.preventDefault(),$cfs.trigger(cf_e("next",conf))}),opts.next.pauseOnHover)){var a=bt_pauseOnHoverConfig(opts.next.pauseOnHover);opts.next.button.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if(opts.pagination.container&&opts.pagination.pauseOnHover){var a=bt_pauseOnHoverConfig(opts.pagination.pauseOnHover);opts.pagination.container.bind(cf_e("mouseenter",conf,!1),function(){$cfs.trigger(cf_e("pause",conf),a)}).bind(cf_e("mouseleave",conf,!1),function(){$cfs.trigger(cf_e("resume",conf))})}if((opts.prev.key||opts.next.key)&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b==opts.next.key&&(a.preventDefault(),$cfs.trigger(cf_e("next",conf))),b==opts.prev.key&&(a.preventDefault(),$cfs.trigger(cf_e("prev",conf)))}),opts.pagination.keys&&$(document).bind(cf_e("keyup",conf,!1,!0,!0),function(a){var b=a.keyCode;b>=49&&58>b&&(b=(b-49)*opts.items.visible,itms.total>=b&&(a.preventDefault(),$cfs.trigger(cf_e("slideTo",conf),[b,0,!0,opts.pagination])))}),$.fn.swipe){var b="ontouchstart"in window;if(b&&opts.swipe.onTouch||!b&&opts.swipe.onMouse){var c=$.extend(!0,{},opts.prev,opts.swipe),d=$.extend(!0,{},opts.next,opts.swipe),e=function(){$cfs.trigger(cf_e("prev",conf),[c])},f=function(){$cfs.trigger(cf_e("next",conf),[d])};switch(opts.direction){case"up":case"down":opts.swipe.options.swipeUp=f,opts.swipe.options.swipeDown=e;break;default:opts.swipe.options.swipeLeft=f,opts.swipe.options.swipeRight=e}crsl.swipe&&$cfs.swipe("destroy"),$wrp.swipe(opts.swipe.options),$wrp.css("cursor","move"),crsl.swipe=!0}}if($.fn.mousewheel&&opts.mousewheel){var g=$.extend(!0,{},opts.prev,opts.mousewheel),h=$.extend(!0,{},opts.next,opts.mousewheel);crsl.mousewheel&&$wrp.unbind(cf_e("mousewheel",conf,!1)),$wrp.bind(cf_e("mousewheel",conf,!1),function(a,b){a.preventDefault(),b>0?$cfs.trigger(cf_e("prev",conf),[g]):$cfs.trigger(cf_e("next",conf),[h])}),crsl.mousewheel=!0}if(opts.auto.play&&$cfs.trigger(cf_e("play",conf),opts.auto.delay),crsl.upDateOnWindowResize){var i=function(){$cfs.trigger(cf_e("finish",conf)),opts.auto.pauseOnResize&&!crsl.isPaused&&$cfs.trigger(cf_e("play",conf)),sz_resetMargin($cfs.children(),opts),$cfs.trigger(cf_e("updateSizes",conf))},j=$(window),k=null;if($.debounce&&"debounce"==conf.onWindowResize)k=$.debounce(200,i);else if($.throttle&&"throttle"==conf.onWindowResize)k=$.throttle(300,i);else{var l=0,m=0;k=function(){var a=j.width(),b=j.height();(a!=l||b!=m)&&(i(),l=a,m=b)}}j.bind(cf_e("resize",conf,!1,!0,!0),k)}},FN._unbind_buttons=function(){var b=(cf_e("",conf),cf_e("",conf,!1));ns3=cf_e("",conf,!1,!0,!0),$(document).unbind(ns3),$(window).unbind(ns3),$wrp.unbind(b),opts.auto.button&&opts.auto.button.unbind(b),opts.prev.button&&opts.prev.button.unbind(b),opts.next.button&&opts.next.button.unbind(b),opts.pagination.container&&(opts.pagination.container.unbind(b),opts.pagination.anchorBuilder&&opts.pagination.container.children().remove()),crsl.swipe&&($cfs.swipe("destroy"),$wrp.css("cursor","default"),crsl.swipe=!1),crsl.mousewheel&&(crsl.mousewheel=!1),nv_showNavi(opts,"hide",conf),nv_enableNavi(opts,"removeClass",conf)},is_boolean(configs)&&(configs={debug:configs});var crsl={direction:"next",isPaused:!0,isScrolling:!1,isStopped:!1,mousewheel:!1,swipe:!1},itms={total:$cfs.children().length,first:0},tmrs={auto:null,progress:null,startTime:getTime(),timePassed:0},scrl={isStopped:!1,duration:0,startTime:0,easing:"",anims:[]},clbk={onBefore:[],onAfter:[]},queu=[],conf=$.extend(!0,{},$.fn.carouFredSel.configs,configs),opts={},opts_orig=$.extend(!0,{},options),$wrp="parent"==conf.wrapper?$cfs.parent():$cfs.wrap("<"+conf.wrapper.element+' class="'+conf.wrapper.classname+'" />').parent();if(conf.selector=$cfs.selector,conf.serialNumber=$.fn.carouFredSel.serialNumber++,conf.transition=conf.transition&&$.fn.transition?"transition":"animate",FN._init(opts_orig,!0,starting_position),FN._build(),FN._bind_events(),FN._bind_buttons(),is_array(opts.items.start))var start_arr=opts.items.start;else{var start_arr=[];0!=opts.items.start&&start_arr.push(opts.items.start)}if(opts.cookie&&start_arr.unshift(parseInt(cf_getCookie(opts.cookie),10)),start_arr.length>0)for(var a=0,l=start_arr.length;l>a;a++){var s=start_arr[a];if(0!=s){if(s===!0){if(s=window.location.hash,1>s.length)continue}else"random"===s&&(s=Math.floor(Math.random()*itms.total));if($cfs.triggerHandler(cf_e("slideTo",conf),[s,0,!0,{fx:"none"}]))break}}var siz=sz_setSizes($cfs,opts),itm=gi_getCurrentItems($cfs.children(),opts);return opts.onCreate&&opts.onCreate.call($tt0,{width:siz.width,height:siz.height,items:itm}),$cfs.trigger(cf_e("updatePageStatus",conf),[!0,siz]),$cfs.trigger(cf_e("linkAnchors",conf)),conf.debug&&$cfs.trigger(cf_e("debug",conf)),$cfs},$.fn.carouFredSel.serialNumber=1,$.fn.carouFredSel.defaults={synchronise:!1,infinite:!0,circular:!0,responsive:!1,direction:"left",items:{start:0},scroll:{easing:"swing",duration:500,pauseOnHover:!1,event:"click",queue:!1}},$.fn.carouFredSel.configs={debug:!1,transition:!1,onWindowResize:"throttle",events:{prefix:"",namespace:"cfs"},wrapper:{element:"div",classname:"caroufredsel_wrapper"},classnames:{}},$.fn.carouFredSel.pageAnchorBuilder=function(a){return'<a href="#"><span>'+a+"</span></a>"},$.fn.carouFredSel.progressbarUpdater=function(a){$(this).css("width",a+"%")},$.fn.carouFredSel.cookie={get:function(a){a+="=";for(var b=document.cookie.split(";"),c=0,d=b.length;d>c;c++){for(var e=b[c];" "==e.charAt(0);)e=e.slice(1);if(0==e.indexOf(a))return e.slice(a.length)}return 0},set:function(a,b,c){var d="";if(c){var e=new Date;e.setTime(e.getTime()+1e3*60*60*24*c),d="; expires="+e.toGMTString()}document.cookie=a+"="+b+d+"; path=/"},remove:function(a){$.fn.carouFredSel.cookie.set(a,"",-1)}},$.extend($.easing,{quadratic:function(a){var b=a*a;return a*(-b*a+4*b-6*a+4)},cubic:function(a){return a*(4*a*a-9*a+6)},elastic:function(a){var b=a*a;return a*(33*b*b-106*b*a+126*b-67*a+15)}}))})(jQuery);
(function() {



    function formatDate1(ns) {
        if (ns == 0 || isNaN(ns)) { return '' }
        var date = new Date(parseInt(ns));
        Y = date.getFullYear() + '.';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '.';
        D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
        return Y + M + D;
    }

    var oFadeFirst=true;
    // 热门新闻
    $(window).on("scroll resize", function() {
        var lastDiv = $(".r-container").children("div").eq($(".r-container").children("div").length-2);
        var tH = lastDiv.offset().top + lastDiv.height();
        var rH = lastDiv.offset().right;
        if ($(window).scrollTop() > tH) {
            $(".r-hotnews").css({
                "display": "block",
                "position": "fixed",
                "top": "40px",
                "right": rH
            });

            if(oFadeFirst && !$(".r-hotnews img").hasClass("fadeImg"))
            {
            	$(".r-hotnews").find("img").addClass("fadeImg");
            }
            oFadeFirst=false;

            $(".r-hotnews").find("img").each(function(){
            	if(!$(this).hasClass("imgH") && !$(this).hasClass("imgS") && !$(this).hasClass("imgD") && $(this).attr('src')!=undefined)
            	{
            		if($(this).attr("src").indexOf("rs1.huanqiucdn.cn")>0 || $(this).attr("src").indexOf("himg2.huanqiucdn.cn")>0)
            		{
        	    		if($(this).height()>=60 && $(this).height()<=120)
        	    		{
        	    			$(this).addClass("imgH");
        	    		}
        	    		else
        	    		{
        	    			$(this).addClass("imgS");
        	    		}
            		}
            		else
            		{
            			$(this).addClass("imgD");
            		}

            	}
            });
            if($(".float-ad").find("img").length>0)
            {
                $(".float-ad").show();
                $(".fAd-btn").show();
            }
        } else {
            $(".r-hotnews").hide();
            if($(".float-ad").find("img").length>0)
            {
                $(".float-ad").hide();
                $(".fAd-btn").hide();
            }
        };

        if(!oFadeFirst && $(".r-hotnews img").hasClass("fadeImg"))
        {
        	var oFadeFn=setTimeout(function(){
        		$(".r-hotnews").find("img").removeClass("fadeImg");
        		clearTimeout(oFadeFn);
        	},1000);

        }
    });

    var newsTime = $("#hotnews .info");
    for(var t = 0; t < newsTime.length;t++){
        $(newsTime[t]).text(formatDate($(newsTime[t]).text()))
    }

    var tradeTime = $(".hqTrade-con span");
    for(var z = 0; z < tradeTime.length;z++){
        $(tradeTime[z]).text(formatDate($(tradeTime[z]).text()))
    }

    if($(".focus-box .f-ad img").length == 0){
        $(".focus-box .f-ad").remove();
    }
    // 焦点图
    $('#focus').carouFredSel({
        prev: '.focus-box .prev-btn',
        next: '.focus-box .next-btn',
        pagination: {
            container: '.focus-box .focus-page',
        }
    });
    var focusLength = $(".focus-box ").width() / $(".focus-box li").length;
    $(".focus-box .focus-page a").css("width", focusLength);
    //$('#focus').find('img').addClass("fadeImg");

    //底部广告
    if($(".float-ad").find("img").length>0)
    {
        $(".fAd-btn").on("click",function(){
        	if($(this).hasClass("fAd-move"))
        	{
        		$(".float-ad").css("width","1030px");
        		$(".fAd-content").animate({
                    left:'0'
                },300);
        		$(this).removeClass("fAd-move").text("收起").animate({
        			marginLeft:'452px',
        			bottom:'89px'
        		});;
        	}
        	else
        	{
        		$(".fAd-content").animate({
                    left:'1030px'
                },300,function(){
                	$(".float-ad").css("width","0");
                });
        		$(this).addClass("fAd-move").text('展开').animate({
        			marginLeft:'467px',
        			bottom:'19px'
        		});
        	}
        });
    }

})();
// $(document).ready(function () {
//     try{
//          // 判断文章类型，进行路径地址修改
//         if(article == 1){
//             $('.cs-link').each(function(){
//                 if($(this).data('type') == 'gallery'){
//                     $(this).attr('href', '/'+ global_type.gallery +'/' + $(this).attr('href'));
//                 }else{
//                     $(this).attr('href', '/'+ global_type.article +'/' + $(this).attr('href'));
//                 }
//             })
//         }else{
//             $('.cs-link').each(function(){
//                 var oHref=$(this).attr("href");
//                 if(oHref.indexOf("gallery") >= 0 ){
//                     $(this).attr("href",oHref.replace('gallery',global_type.gallery));
//                 }else if(oHref.indexOf('normal') >= 0 ){
//                     $(this).attr("href",oHref.replace('normal',global_type.article));
//                 }else if(oHref.indexOf('video') >= 0 ){
//                     $(this).attr("href",oHref.replace('video',global_type.article));
//                 }else if(oHref.indexOf('audio') >= 0){
//                     $(this).attr("href",oHref.replace('audio',global_type.article));
//                 }
//             })

//         }
//     }catch(e){
//         //console.log(e);
//     }

// })
//兼容ie8
var DEFAULT_VERSION = 8.0;
var ua = navigator.userAgent.toLowerCase();
var isIE = ua.indexOf("msie")>-1;
var safariVersion;
if(isIE){
    safariVersion =  ua.match(/msie ([\d.]+)/)[1];
}
if(safariVersion <= DEFAULT_VERSION ){
  jQuery.support.cors = true;
  jQuery.ajaxSetup({
        xhr: function() {
            if(window.ActiveXObject){
                return new window.ActiveXObject("Microsoft.XMLHTTP");
            }else{
                return new window.XMLHttpRequest();
            }
        }
    });
};

// 黑色背景导航
    $.ajax({
        url: window.host + '/api/black_json',
        type: 'get',
        dataType: 'json'
    })
    .done(function(data) {
        // console.log(data.data,11111);
        var data = data.data;
        var html_nav = '';
        $.each(data, function(i, v){
            // console.log(v)
            html_nav += '<div class=""><div class=""><h3>'+ v.name +'</h3><h4>'+ v.desc +'</h4></div>'
            html_nav += '<ul class="">'
            try{
                if(i === 6){
                    $.each(v.children, function(i, v){
                        html_nav += '<li><a href="'+ v.url +'" target="_blank"><p>'+ v.name +'</p></a></li>'
                    })
                }else{
                    $.each(v.children, function(i, v){
                        html_nav += '<li><a href="'+ v.url +'" target="_blank"><span class="name-cn">'+ v.name +'</span><span class="name-en">'+ v.desc +'</span></a></li>'
                    })
                }
            }catch(e){
                //console.log(e)
            }
            html_nav += '</ul>'
            html_nav += '</div>'
        })
        // 头部
        $('.nav-flyout-container').html(html_nav)
        .children('div').addClass('nav-flyout-menu-item')
        .children('div').addClass('nav-flyout-menu-item-title')
        .siblings().addClass('nav-flyout-menu-item-list')
        .end().end().end()
        .find('.nav-flyout-menu-item:eq(0),.nav-flyout-menu-item:eq(1),.nav-flyout-menu-item:eq(2)').addClass('s-hight');
        $('.nav-flyout-menu-item:eq(1)').find('ul').addClass('long');
        $('.nav-flyout-menu-item:eq(5)').find('ul').addClass('long2');
        $('.nav-flyout-menu-item:eq(2),.nav-flyout-menu-item:eq(7)').find('ul').addClass('long3');
        // &连接符间距
        $('.nav-flyout-container').find('h3 span, h4 span').css('margin', '10px');

        if($('.footer-container')){
            // 底部
            $('.footer-container').html(html_nav)
            .children('div').addClass('footer-container-item')
            .children('div').addClass('footer-container-item-title')
            .siblings().addClass('footer-container-item-list')
            .end().end().end()
            $('.footer-container-item:eq(1)').find('ul').addClass('long');
            $('.footer-container-item:eq(5)').find('ul').addClass('long2');
            $('.footer-container-item:eq(2),.footer-container-item:eq(7)').find('ul').addClass('long3');
            // &连接符间距
            $('.footer-container').find('h3 span, h4 span').css('margin', '10px');
        }
    })
    .fail(function() {
        //console.log("error");
    });

    var flag = "translateY(0px)";
    // 头部导航点击效果
    $("#search-button").on("click",function(){
        if($("#search-form").hasClass("ani-search")){
            $(".search-input").blur();
            $("#search-form").removeClass("ani-search");
             $(this).show();
        }else{
            $("#search-form").addClass("ani-search");
            $(this).hide();
            $(".search-input").focus();
        }
    });
    $(".all-con,.navClick,.navFlyout,.footer").on("click",function(){
        $("#search-form").removeClass("ani-search");
        $("#search-button").show();
    })
    $("#menu").on("click",function(){
        if($(this).hasClass("close-btn")){
            // console.log(flag)
            $("#search-form").removeClass("ani-search");
            $("#search-button").show();
            $("#header-wrap").css({
                "transform": flag,
                "-webkit-transform":flag,
                "-o-transform":flag,
                "-moz-transform":flag,
                "-ms-transform":flag
            });
            $('body,html').css('overflow', 'visible');
            $('#top-ad-wrap').show();
            $(this).removeClass("close-btn").addClass("zoomIn").removeClass("zoomIn2");
            $(".navFlyout").hide();
            $("#search-button").removeClass("open");
            $(".hdTop .navTopSec .nav-container .nav-section .nav-section-submenu a").css("color","#AEAEAE");
            $(".hdTop .navTopSec .nav-container .nav-section .nav-section-submenu i").css("color","#AEAEAE");
        }else{
            $("#search-form").removeClass("ani-search");
            $("#search-button").show();
            $("#header-wrap").css({
                "transform": "translateY(0px)",
                "-webkit-transform":"translateY(0px)",
                "-o-transition":"translateY(0px)",
                "-moz-transition":"translateY(0px)",
                "-ms-transform":"translateY(0px)"
            });
            $('body,html').css('overflow', 'hidden');
            $('#top-ad-wrap').hide();
            $(this).addClass("close-btn").addClass("zoomIn2").removeClass("zoomIn");
            $(".navFlyout").show();
            $("#search-button").addClass("open");
            $(".hdTop .navTopSec .nav-container .nav-section .nav-section-submenu a").css("color","#595959");
            $(".hdTop .navTopSec .nav-container .nav-section .nav-section-submenu i").css("color","#595959");
        }
    });

    // 判断导航是否插入广告
    if($(".topAd_01").find("img").length != 0){
        var topAdheight = $("#top-ad-wrap").outerHeight()+ 60 +'px';
        var topY = 'translateY(-'+topAdheight+')';
        $(".all-con").css("padding-top",topAdheight);
        $(".topAd_01").css("padding","15px");
        $("#top-ad-wrap").css("padding","15px 0");
        $(window).on("scroll resize",function(){
            topAdheight = $("#top-ad-wrap").outerHeight()+'px';
            topY = 'translateY(-'+topAdheight+')';
            $(".all-con").css("padding-top",topAdheight);

            if($(window).scrollTop() > 50){
                flag = topY;
                $("#header-wrap").css({
                    "transform": topY,
                    "-webkit-transform":topY,
                    "-o-transform":topY,
                    "-moz-transform":topY,
                    "-ms-transform":topY
                });
            }else{
                flag = "translateY(0px)";
                $("#header-wrap").css({
                    "transform": "translateY(0px)",
                    "-webkit-transform":"translateY(0px)",
                    "-o-transition":"translateY(0px)",
                    "-moz-transition":"translateY(0px)",
                    "-ms-transform":"translateY(0px)"
                });
            }
        });
        if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") {
            $(window).scroll(function(){
                if($(window).scrollTop() > 250){
                    $("#header-wrap").hide();
                }else{
                    $("#header-wrap").show();
                }
            });
        };
    }else{
        $("#top-ad-wrap").hide();
    }

    // 导航搜索
    $(".search-submit-button").on("click",function(){
        search();
    });

    $('.search-input').bind('keypress', function (event) {
       if (event.keyCode == "13") {
            search();
       }
    })

    function search(){
        var val = $(".search-input").val();
        if(val == ""){
            window.open("https://www.baidu.com/s?wd=site:huanqiu.com 环球网");
        }else{
            window.open("https://www.baidu.com/s?wd=site:huanqiu.com "+val);
        }
    }
// $(function() {
    // 左侧导航渲染

    // go.huanqiu.develenv.com

    // console.log('go-index-site-nav')

    function getURL(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    window.name = (getURL('c1') || window.location.host).split('.')[0]



    function load_nav() {
        $.ajax({
            type: "get",
            url: window.host+"/api/site_nav",
            dataType: "json",
            success: function(data) {
                // console.log(data,10000);
                var oDom = '';
                var flag4='';
                for (var i in data.site) {
                    flag4 = global_host.path?global_host.path:window.location.host;
                    if (data.site[i].ename == flag4.split('.')[0]) {
                        for (var n in data.site[i].children) {
                            oDom += '<div class="l-list-con">';
                            oDom += '<h3 class="list-title"><a href="' + data.site[i].children[n].url + '"><span></span>' + data.site[i].children[n].name + '</a></h3>';
                            oDom += '<ul class="l-list-inner">';
                            for (var m in data.site[i].children[n].children) {
                                oDom += '<li><a href="' + data.site[i].children[n].children[m].url + '">' + data.site[i].children[n].children[m].name + '</a></li>';
                            }
                            oDom += '</ul>';
                            oDom += '</div>';
                        }
                    }
                }
                // console.log(window.host,oDom);
                // console.log(oDom);
                $(".all-con .l-list").html(oDom);
            }
        });
    }
    load_nav();


    // 返回到顶部
    var goTop = {
        addStyle: function(configCss) {
            if ((/msie (\d+)/i.test(navigator.userAgent) && !window.opera) ? parseInt(RegExp.jQuery1) : 0) {
                var t = document.createStyleSheet();
                t.cssText = configCss;
            } else {
                var r = document.createElement("style");
                r.setAttribute("type", "text/css");
                document.getElementsByTagName('head')[0].appendChild(r);
                if (r.styleSheet) {
                    r.styleSheet.cssText = configCss;
                } else {
                    r.appendChild(document.createTextNode(configCss));
                }
            }
        },
        createHTML: function(configHTML, configClass, configId) {
            if (!this.box) {
                this.box = document.createElement("div");
                this.box.innerHTML = configHTML;
                document.body.appendChild(this.box);
                if (configId) { this.box.id = configId; };
                if (configClass) { this.box.className = configClass; };
            }
            return this;
        },
        goToTop: function(opt) {
            var opt = opt || {};
            var botNum = opt.botNum || '15px';
            var gotoHtml = '<a class="backBtn" href="javascript:void(0)"></a>';
            this.createHTML(gotoHtml, "backArea", "HQbackArea");
            var conWidth = $(".container").width() + 100;
            var dLocation = Math.ceil(($(window).width() - conWidth) / 2);
            $("#HQbackArea").css({
                bottom: botNum,
                right: dLocation
            });
            var winScrollTop = $(window).scrollTop();
            if (winScrollTop < 350) {
                $("#HQbackArea").hide();
            } else {
                $("#HQbackArea").show();
            }
        },
        goBackTop: function() {
            var gotoCss = "#HQbackArea{position:fixed;display:block;_display:none;}#HQbackArea .backBtn{display:inline-block;border-top: 13px solid transparent;border-left: 13px solid transparent;border-right: 13px solid transparent;border-bottom: 13px solid #000000;}";
            this.addStyle(gotoCss);
            $("#HQbackArea .backBtn").click(function() {
                $("html,body").animate({
                    scrollTop: 0
                }, 300);
                return false;
            });
        }
    }

    goTop.goToTop();
    goTop.goBackTop();

    $(window).on("scroll resize", function() {
        goTop.goToTop();
    });
// });
// (function() {
    // http://huanqiu.develenv.com/api/list?c1=/%E6%97%85%E6%B8%B8&offset= page*20
    // console.log('list-ceshi');
    // 广告 api 地址
    var adApi = '//3w-test.huanqiu.com/api/ad?agt=8';

    // 时间戳 --> 日期  yyyy-mm-dd hh:mm:ss
    function formatDate(ns) {
        if (ns == 0 || isNaN(ns)) { return '' }
        if(ns.length == 13){var date = new Date(parseInt(ns));}else{var date = new Date(parseInt(ns) * 1000);}
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
        s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m;
    }
    
    function IEVersion() {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 8 || fIEVersion == 7 || fIEVersion == 6) {
                return 8;
            }
        }
    }
    
    var flag1 = 1;
    var oLoadImgNum=0;
    var List = {
        init: function() {

            // var tH = Math.max(window.innerHeight,$('body').height());
            // $(".l-container").css("height", tH);
            // $(".left-gray").css("height", tH);
            this.recommend.init();
            // this.ad.init();
            this.scroll();
        },
        ajax: function(params, callback) {

            params.method = params.method ? params.method : 'GET'

            var _default = {
                url: params.url,
                type: params.method.toUpperCase(),
                data: params.data || ''
            }
            var _param = $.extend({}, _default, params.config)
                // let _param = Object.assign({}, _default, params.config)

            var xhr = $.ajax(_param)
            // xhr
            //     .done((result) => {
            //         callback && callback(result)
            //             // try {
            //             //     callback && callback(result)
            //             // } catch (err) { console.log(err) }
            //     })
            //     .fail((err) => {
            //         console.log(err)
            //     })
                
            xhr.done(function(result){
                callback && callback(result)
                    // try {
                    //     callback && callback(result)
                    // } catch (err) { console.log(err) }
            }).fail(function(err){
                    // console.log(err)
            })
        },
        recommend: {
            init: function() {
                if(window.isList){
                    var oUrl = window.host + '/api/list2?node='+ window.name +  '&offset=' + (List.recommend.page - 1) * 20 + '&limit=20';
                }else{
                    var oUrl = window.host + '/api/list?node='+ window.name +  '&offset=' + (List.recommend.page - 1) * 20 + '&limit=20';
                }
                List.ajax({
                    // url: window.host + '/api/list?c1=' + window.name + '&offset=' + (List.recommend.page - 1) * 20,
                    url:oUrl,
                    method: 'GET',
                    contentType: "application/json",
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest'
                    },
                    // config: { dataType: 'jsonp', jsonp: 'callback' },
                }, function(result) {
                    if(List.recommend.page==1 && JSON.parse(result).list.length==1)
                    {
                        $('.no-loading').html('没有内容了~');                        
                    }

                    List.recommend.data = result; // JSON.parse(result).list
                    var str = List.recommend.created();
                    $('#recommend').append(str);
                    $("#recommend img").each(function(){
                    	var _this=this;
                    	if(!$(_this).hasClass("loadMark") && $(_this).hasClass("imgMark"))
                    	{
                    		$(_this).addClass("loadMark");

                    		var img='img'+oLoadImgNum;
                    		img=new Image();
	                        img.src = $(_this).attr("src");
	                        if (IEVersion() == 8) 
	                        {
	                            $(_this).addClass("imgD");
	                        }
	                        else
	                        {
                                img.onload=function(){
	                            // 	console.log(img.src,img.height);
    		                        if(!$(_this).hasClass("imgH") && !$(_this).hasClass("imgS") && !$(_this).hasClass("imgD") && $(_this).attr('src')!=undefined)
    		                    	{
    		                    		if($(_this).attr("src").indexOf("rs1.huanqiucdn.cn")>0 || $(_this).attr("src").indexOf("himg2.huanqiucdn.cn")>0)
    		                    		{
    		                	    		if(img.height>=88 && img.height<=196)
    		                	    		{
    		                	    			$(_this).addClass("imgH");
    		                	    		}
    		                	    		else
    		                	    		{
    		                	    			$(_this).addClass("imgS");
    		                	    		}
    		                    		}
    		                    		else
    		                    		{
    		                    			$(_this).addClass("imgD");
    		                    		}
    		                    	}
    		                    	
    		                    	if(!$(_this).hasClass("fadeImg"))
    		                        {
    		                            $(_this).addClass("fadeImg");
    		                        }
    	                        }
	                            oLoadImgNum++;	                            
	                        }

                    	}
                    });
                    
                        var adObj = {
                            mil:"a",
                            tech:"b",
                            china:"a",
                            world:"e",
                            bbs:"",
                            finance:"c",
                            corp:"",
                            opinion:"b",
                            taiwan:"a",
                            ifoto:"",
                            ent:"",
                            oversea:"",
                            health:"c",
                            mobile:"",
                            blog:"",
                            sports:"c",
                            auto:"a",
                            v:"",
                            hope:"c",
                            look:"b",
                            fashion:"c",
                            news:"",
                            society:"a",
                            uav:"a",
                            lx:"",
                            run:"c",
                            ski:"c",
                            smart:"g",
                            city:"",
                            quality:"f",
                            cul:"c",
                            bigdata:"b",
                            biz:"",
                            chamber:"",
                            art:"b",
                            house:"h",
                            yrd:"",
                            ishow:""
                        };
                
                        var adA = '<div id="AD_SURVEY_POSITION_SIMPLE_7004648"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004648");</script></div>',
                            adB = '<div id="AD_SURVEY_POSITION_SIMPLE_7004649"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004649");</script></div>',
                            adC = '<div id="AD_SURVEY_POSITION_SIMPLE_7004650"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004650");</script></div>',
                            adE = '<div id="AD_SURVEY_POSITION_SIMPLE_7004651"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004651");</script></div>',
                            adF = '<div id="AD_SURVEY_POSITION_SIMPLE_7004652"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004652");</script></div>',
                            adG = '<div id="AD_SURVEY_POSITION_SIMPLE_7004653"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004653");</script></div>',
                            adH = '<div id="AD_SURVEY_POSITION_SIMPLE_7004945"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004945");</script></div>';
                        if (IEVersion()!= 8 && window.AD_SURVEY_Add_AdPos_Simple){
                            if(flag1 == 1){
                                flag1 ++;
                                for (var k in adObj){
                                    if(k == window.location.host.split(".")[0]){
                                        if(adObj[k] == "a"){
                                            $('.list-item-onepic3').append(adA);
                                        }else if(adObj[k] == "b"){
                                            $('.list-item-onepic3').append(adB);
                                        }else if(adObj[k] == "c"){
                                            $('.list-item-onepic3').append(adC);
                                        }else if(adObj[k] == "e"){
                                            $('.list-item-onepic3').append(adE);
                                        }else if(adObj[k] == "f"){
                                            $('.list-item-onepic3').append(adF);  
                                        }else if(adObj[k] == "g"){
                                            $('.list-item-onepic3').append(adG);                    
                                        }else if(adObj[k] == "h"){
                                            $('.list-item-onepic3').append(adH);                    
                                        }
                                    }
                                }
                            };                            
                        } else if(!window.AD_SURVEY_Add_AdPos_Simple) {
                            $(".ad_01").hide()
                        }

                    // var listAd = '<div id="AD_SURVEY_POSITION_SIMPLE_7004648"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004648");</script></div>';
                    // $('.list-item-onepic3').append(listAd);
                    // if(flag1 == 1){
                    //     flag1 ++;
                    //     var str1;
                    //      var adObj = {
                    //         // go:[
                    //         //     '<div id="AD_SURVEY_POSITION_SIMPLE_7003879"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7003879");</script></div>',
                    //         //     '<div id="AD_SURVEY_POSITION_SIMPLE_7003880"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7003880");</script></div>',
                    //         //     '<div id="AD_SURVEY_POSITION_SIMPLE_7003882"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7003882");</script></div>',
                    //         //     '<div id="AD_SURVEY_POSITION_SIMPLE_7003883"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7003883");</script></div>'
                    //         // ],
                    //         fashion:[
                    //             '<div id="AD_SURVEY_POSITION_SIMPLE_7004235"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004235");</script></div>',
                    //             '<div id="AD_SURVEY_POSITION_SIMPLE_7004234"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004234");</script></div>',
                    //             '<div id="AD_SURVEY_POSITION_SIMPLE_7004232"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004232");</script></div>',
                    //             '<div id="AD_SURVEY_POSITION_SIMPLE_7004233"><script type="text/javascript"> window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("7004233");</script></div>'
                    //         ]
                    //     };
                    //     for (var nodeName in adObj){
                    //         // console.log(nodeName);
                    //         // console.log(adObj[nodeName]);
                    //         var name = window.location.host.split(".")[0];
                    //         // console.log(name);
                    //         if( nodeName == name){
                    //             $('.list-item-onepic0').each(function(index,item){
                    //                 if($(this).hasClass('list-item-onepic1')){
                    //                     str1 = adObj[nodeName][0];
                    //                 }else if($(this).hasClass('list-item-onepic2')){
                    //                     str1 = adObj[nodeName][1];
                    //                 }else if($(this).hasClass('list-item-onepic3')){
                    //                     str1 = adObj[nodeName][2];
                    //                 }else if($(this).hasClass('list-item-onepic4')){
                    //                     str1 = adObj[nodeName][3];
                    //                 }
                    //                 $(this).append(str1);
                    //             });
                    //         }
            
                    //     }
                    // }
                })

            },
            created: function() {
                var str = '',
                    data = JSON.parse(List.recommend.data).list; // JSON.parse(List.recommend.data).list;

                for (var i = 0; i < data.length-1; i++) {
                    // console.log(data[i],data[i].typedata,data[i].typedata == '');
                    if(data[i].typedata == '' || data[i].typedata == [] && data[i].typedata.length > 0 || (JSON.stringify(data[i].typedata) == "{}")){
                        data[i].typedata = {};
                        data[i].typedata.pic_urls = [];
                    }else{
                        if(data[i].typedata.gallery){
                            data[i].typedata.pic_urls = data[i].typedata.gallery.members;
                        }else if(data[i].typedata.video){
                            data[i].typedata.pic_urls = data[i].typedata.video.members;
                            // data[i].typedata.pic_urls[0].url = data[i].typedata.pic_urls[0].cover;
                        }else if(data[i].typedata.audio){
                            data[i].typedata.pic_urls = data[i].typedata.audio.members;
                        }
                    }
                    
                    // if(data[i].addltype == 'link' && window.isList != 1){
                    //     continue;
                    // }
                    
                    // 不加信息流广告的频道
                    var oAd=1,noadStr;
                    noadStr = ["go","qinzi","capital","movie","anquan","lx","luxury","women","biz","ent","gteu","v","oversea","zhiku","game","city","yrd","ishow","5gcenter","chamber"];
                    for(var t = 0; t < noadStr.length; t++){
                        if(window.location.host.split(".")[0] == noadStr[t]){
                            oAd=0;
                        }
                    } 

                    // 广告结构 第5、10条
                    if (List.recommend.page == 1 && oAd == 1 && (window.location.host.split("-")[0] != "go")) {
                        if(window.isList){
                            // if(i == 4){
                            //     str += '<li class="list-item-onepic0 list-item-onepic1">';
                            //     str += '</li>';
                            // }else if(i == 8){
                            //     str += '<li class="list-item-onepic0 list-item-onepic2">';
                            //     str += '</li>';
                            // }
                        }else{
                            if (IEVersion()!= 8){
                                if(i == 2){
                                    // console.log(1222224)
                                    str += '<li class="list-item-onepic0 list-item-onepic3">';
                                    str += '</li>';
                                }                                
                            }

                            // else if(i == 8){
                            //     // console.log(134)
                            //     str += '<li class="list-item-onepic0 list-item-onepic4">';
                            //     str += '</li>';
                            // }
                        }
                    }
                    // 图集四张图
                    if (data[i].addltype == 'gallery' && data[i].typedata.pic_urls && data[i].typedata.pic_urls.length > 3) {
                        str += '<li class="list-item-pics">'
                        str += '<a href="/'+ global_type.gallery +'/' + data[i].aid + '" target="_blank">'
                        str += '<h4>' + data[i].title + '</h4>'
                        str += '<div class="con-pic">'
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].typedata.pic_urls[0].url 
                        if(data[i].typedata.pic_urls[0].url.indexOf("?")>0)
                        {
                            str += '&w=240" alt=""></span>'
                        }
                        else
                        {
                            str += '?w=240" alt=""></span>'
                        }
                        
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].typedata.pic_urls[1].url 
                        if(data[i].typedata.pic_urls[1].url.indexOf("?")>0)
                        {
                            str += '&w=240" alt=""></span>'
                        }
                        else
                        {
                            str += '?w=240" alt=""></span>'
                        }
                        
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].typedata.pic_urls[2].url 
                        if(data[i].typedata.pic_urls[2].url.indexOf("?")>0)
                        {
                            str += '&w=240" alt=""></span>'
                        }
                        else
                        {
                            str += '?w=240" alt=""></span>'
                        }
                        
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].typedata.pic_urls[3].url 
                        if(data[i].typedata.pic_urls[3].url.indexOf("?")>0)
                        {
                            str += '&w=240" alt=""></span>'
                        }
                        else
                        {
                            str += '?w=240" alt=""></span>'
                        }
                        
                        str += '</div>'
                        // if(data[i].ext_displaytime != '{{ext-serious}}' && data[i].ext_displaytime != ''){
                            
                        //     str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].ext_displaytime) + '</span></div>'
                        
                        // }else{
                            
                        str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].xtime) + '</span></div>'
                        
                        // }
                        str += '</a>'
                        str += '</li>'
                    }
                    // 图集小于四张图
                    else if (data[i].addltype == 'gallery' && data[i].typedata.pic_urls && data[i].typedata.pic_urls.length <= 3 && data[i].typedata.pic_urls.length !=0) {
                        str += '<li class="list-item-onepic">'
                        str += '<a href="/'+ global_type.gallery +'/' + data[i].aid + '" target="_blank">'
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].typedata.pic_urls[0].url 
                        if(data[i].typedata.pic_urls[0].url.indexOf("?")>0)
                        {
                            str +='&w=240" alt=""></span>'
                        }
                        else
                        {
                            str +='?w=240" alt=""></span>'
                        }
                        
                        str += '<div class="con-txt"><h4>' + data[i].title + '</h4>'
                        str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].xtime) + '</span></div>'
                        str += '</div>'
                        str += '</a>'
                        str += '</li>'
                    }
                    // 一张图
                    // data[i].cover || (data[i].typedata.pic_urls && data[i].typedata.pic_urls.length)
                    else if (data[i].cover&&data[i].cover.split('')[data[i].cover.split('').length-1] != '.') {
                        str += '<li class="list-item-onepic">'
                        str += '<a href="/'+ global_type.article +'/' + data[i].aid + '" target="_blank">'
                        str += '<span class="listPw"><img class="imgMark" src="' + data[i].cover 
                        if(data[i].cover.indexOf("?")>0)
                        {
                            str +='&w=240" alt=""></span>'
                        }
                        else
                        {
                            str +='?w=240" alt=""></span>'
                        }
                        
                        str += '<div class="con-txt"><h4>' + data[i].title + '</h4>'
                        // if(data[i].ext_displaytime != '{{ext-serious}}' && data[i].ext_displaytime != ''){
                            
                        //     str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].ext_displaytime) + '</span></div>'
                        
                        // }else{
                            
                        str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].xtime) + '</span></div>'
                        
                        // }
                        str += '</div>'
                        str += '</a>'
                        str += '</li>'
                    }
                    // 无图
                    else {
                        str += '<li class="list-item-txt">'
                        str += '<a href="/'+ global_type.article +'/' + data[i].aid + '" target="_blank">'
                        str += '<div class="con-txt"><h4>' + data[i].title + '</h4>'
                        // if(data[i].ext_displaytime != '{{ext-serious}}' && data[i].ext_displaytime != ''){
                            
                        //     str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].ext_displaytime) + '</span></div>'
                        
                        // }else{
                            
                        str += '<div class="con-tool"><span class="original">' + (data[i].source.name || '') + '</span><span class="time">' + formatDate(data[i].xtime) + '</span></div>'
                        
                        // }
                        str += '</div>'
                        str += '</a>'
                        str += '</li>'
                    }
                }
                return str;
            },
            data: {},
            page: 1

        },
        scroll: function() {
            // 节流
            window.throttle = function(fun,delay){
                var timer = null;
                var startTime = Date.now();  
    
                return function(){
                    var curTime = Date.now();
                    var remaining = delay-(curTime-startTime);  // 计算出两次触发的时间间隔有没有大余delay 
                    var context = this;
                    var args = arguments;
    
                    clearTimeout(timer);
                    if(remaining<=0){ 
                        fun.apply(context,args);
                        startTime = Date.now();  // 如果两次触发时间大余delay，则立马触发一次任务函数并且更新起始时间戳
                    }else{
                        timer = setTimeout(fun,remaining);  // 如果两次触发时间小于delay， 则改变定时器时间保证delay时间一定触发任务函数
                    }
                }
            }
            var oLoading=0;
            function getCookieFn(key){var name=key+"=";var ca=document.cookie.split(";");for(var i=0;i<ca.length;i++){ca[i]=ca[i].replace(/^\s+|\s+$/g,"");var c=ca[i];if(c.indexOf(name)==0){return c.substring(name.length,c.length)}}return""};
            if( getCookieFn('cs_id') ){
                var foo = function(){
                    // console.log(JSON.parse(List.recommend.data).list[0]);
                    //文档内容实际高度（包括超出视窗的溢出部分）
                    var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                    //滚动条滚动距离
                    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                    //窗口可视范围高度
                    var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
                    if(clientHeight + scrollTop + 1000 >= scrollHeight &&  (!$.isEmptyObject(JSON.parse(List.recommend.data).list[0]))){
                        List.recommend.page++;
                        List.recommend.init();
                    }else if($.isEmptyObject(JSON.parse(List.recommend.data).list[0])){
                        if(oLoading==0)
                        {
                            $('.no-loading').html('没有内容了~');
                            oLoading=1;
                        }
                    }
                }
                window.addEventListener('scroll', throttle (foo, 500)); 
                // window.onscroll= function(){
                //     //文档内容实际高度（包括超出视窗的溢出部分）
                //     var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
                //     //滚动条滚动距离
                //     var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                //     //窗口可视范围高度
                //     var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight,document.body.clientHeight);
                //     if(clientHeight + scrollTop + 600 >= scrollHeight){
                //         List.recommend.page++;
                //         List.recommend.init();
                //     }
            
                // }
            }else{
                var foo = function(){
                    $('body').css('height','auto');
                    var windowHeight = $(window).height();//当前窗口的高度             
                    var scrollTop = $(window).scrollTop();//当前滚动条从上往下滚动的距离            
                    var docHeight = $(document).height(); //当前文档的高度 
                    if (scrollTop + windowHeight + 800 >= docHeight && (!$.isEmptyObject(JSON.parse(List.recommend.data).list[0]))) { 
                        List.recommend.page++;
                        List.recommend.init();
                    }else if($.isEmptyObject(JSON.parse(List.recommend.data).list[0])){
                        if(oLoading==0)
                        {
                            $('.no-loading').html('没有内容了');
                            oLoading=1;
                        }
                    }
                }
                $(window).on('resize scroll', throttle (foo, 500)); // 当dom连续触发scroll 时 任务函数每隔1秒也会触发一次，当然眼尖朋友会发现有个小瑕疵
                // $(window).on("resize scroll",function(){
                //     var windowHeight = $(window).height();//当前窗口的高度             
                //     var scrollTop = $(window).scrollTop();//当前滚动条从上往下滚动的距离            
                //     var docHeight = $(document).height(); //当前文档的高度 
                //     if (scrollTop + windowHeight + 600 >= docHeight) { 
                //         List.recommend.page++;
                //         List.recommend.init();
                //     }
                // });
            };
        },
        ad: {
            init: function() {
                // List.ajax({
                //     url: adApi,
                //     method: 'GET',
                //     config: { dataType: 'jsonp', jsonp: 'callback' },
                // }, (result) => {
                //     List.ad.data.data = result.data;
                //     List.ad.data.flow = []; // flow流广告 
                //     for (var n in result.data) {
                //         if (result.data[n].pos && result.data[n].pos.indexOf('flow') != -1) {
                //             if (List.ad.data.flow.length < 2) { // 设置展示两条广告
                //                 List.ad.data.flow.push(result.data[n])
                //             }
                //         }
                //     }
                //     // 开启定时器渲染广告
                //     List.ad.render()
                // })
                
                List.ajax({
                    url: adApi,
                    method: 'GET',
                    config: { dataType: 'jsonp', jsonp: 'callback' },
                },function(result){
                    List.ad.data.data = result.data;
                    List.ad.data.flow = []; // flow流广告 
                    for (var n in result.data) {
                        if (result.data[n].pos && result.data[n].pos.indexOf('flow') != -1) {
                            if (List.ad.data.flow.length < 2) { // 设置展示两条广告
                                List.ad.data.flow.push(result.data[n])
                            }
                        }
                    }
                    // 开启定时器渲染广告
                    // List.ad.render()
                })
            },
            data: {
                flow: [],
                load: true,
                len: 0
            },
            render: function() {
                var ad = List.ad.data.flow,
                    load = ad[0],
                    num = 0,
                    repeatNumPeng = 0,
                    repeatNumU = 0,
                    repeatNumFeed = 0
                var container = document.querySelector("ul#recommend");
                load && (List.ad.data.len < 2) && setInterval(function() {
                    ad = List.ad.data.flow;
                    var ads = container.querySelectorAll(".nad-item");
                    for (var i = 0, j = 0; i < ads.length; i++) {
                        if (i >= ad.length - 1) {
                            if ((ad[j].name && ad[j].name.indexOf('循环')) || ad[j].repeat) j = ad.length - 1;
                        } else { j = i }

                        var adEle = ads[i];
                        if (adEle.querySelector("iframe") || adEle.querySelector("div")) { List.ad.data.len++; continue; };
                        if (adEle.childElementCount) break;

                        // feed 360 广告
                        if (ad[j].code && (ad[j].code.indexOf('feed') >= 0 || ad[j]._id.indexOf('feed') >= 0)) {
                            num = repeatNumFeed++;
                            $(adEle).attr('id', 'aa_feed_' + ad[j]._id + '_' + num).append(ad[j].code)
                        }
                        // 搜狗 广告
                        else if (ad[j]._id.indexOf('sogou_wap_') >= 0) {
                            if (ad[j].repeat || (ad[j].name && ad[j].name.indexOf('循环') != -1)) { num = repeatNumU++; } else { num = 0 }
                            var sid = 'sogou_wap_' + (ad[j]._id).replace("sogou_wap_", '') + '_' + num;
                            var s = '<script>var sogou_div = document.getElementById("' + sid + '"); window.sogou_un = window.sogou_un || []; window.sogou_un.push({id: "' + (ad[j]._id).replace("sogou_wap_", '') + '",ele:sogou_div})<\/script>';
                            $(adEle).attr('id', (ad[j]._id).replace("sogou_wap_", '') + '+' + num).append(s);
                        }
                        // 百度 广告
                        else if (ad[j]._id.indexOf('u') >= 0) {

                            if (ad[j].repeat || (ad[j].name && ad[j].name.indexOf('循环') != -1)) { num = repeatNumU++; } else { num = 0 }
                            var sid = '<script type="text/javascript">var cpro_id = "' + ad[j]._id + '"; <\/script> <script type="text/javascript" src="//cpro.baidustatic.com/cpro/ui/c.js"><\/script>'
                            $(adEle).attr('id', 'BAIDU_SSP__wrapper_' + ad[j]._id + '_' + num).append(sid);
                        }
                        // 反屏蔽直投广告
                        else if (ad[j]._id && ad[j]._id.indexOf('zt') >= 0) {
                            var s = document.createElement('script')
                            s.src = '${ad[j].code}'
                            adEle.appendChild(s)
                        }
                        // 鹏泰广告
                        else {
                            if (ad[j].repeat || (ad[j].name && ad[j].name.indexOf('循环') != -1)) {
                                num = repeatNumPeng++;
                            } else { num = 0 }
                            var sid = '<script type="text/javascript">window.AD_SURVEY_Add_AdPos_Simple && AD_SURVEY_Add_AdPos_Simple("' + ad[j]._id + '");<\/script>'
                            $(adEle).attr('id', 'AD_SURVEY_POSITION_SIMPLE_' + ad[j]._id + '_' + num).append(sid)
                        }
                        break
                    }
                }, 400);
            }
        }
    }


    // 请求栏目名称
    function getURL(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
    }
    window.name = getURL('c1') || window.location.host;
    $.ajax({
        type: 'GET',
        url: window.host + '/api/navigate?type=column&path=' + 'http:' + window.host1,
        dataType: 'json',
        jsonp: 'callback',
        success: function(result) {
            // var result = {
            //     "code": 200,
            //     "data": [{
            //             "url": "go.huanqiu.develenv.com", // url
            //             "domain_name": "旅游", // 所在子域名称
            //             "path_name": "旅游" //所在路径名称
            //         },
            //         {
            //             "url": "go.huanqiu.develenv.com/path",
            //             "domain_name": "旅游",
            //             "path_name": "旅游新闻"
            //         },
            //         {
            //             "url": "go.huanqiu.develenv.com/path/path2",
            //             "domain_name": "旅游",
            //             "path_name": "旅游新闻2"
            //         }
            //     ],
            //     "msg": ""
            // }
            var le = result.data.length - 1;
            if (result.code == 200) {
                
                var str = '';
                for (var i in result.data) {
                    str += '<a href="//' + result.data[i].url + '" target="_blank">' + result.data[i].path_name + '</a>';
                    if (i < result.data.length - 1) {
                        str += '<i>›</i>'
                    }
                }
                
                if(navigator.userAgent.toLowerCase().indexOf("msie")>-1){  
                    if(navigator.userAgent.toLowerCase().match(/msie ([\d.]+)/)[1]>8)
                    {
                        if(result.data.length==1)
                        {
                            $("#pageTitle").html(result.data[0].path_name+'_'+'环球网');
                        }
                        else
                        {
                            $("#pageTitle").html(result.data[result.data.length-1].path_name+'_'+result.data[0].path_name+'_'+'环球网');
                        }    
                    }
                } 
                else
                {
                    if(result.data.length==1)
                    {
                        $("#pageTitle").html(result.data[0].path_name+'_'+'环球网');
                    }
                    else
                    {
                        $("#pageTitle").html(result.data[result.data.length-1].path_name+'_'+result.data[0].path_name+'_'+'环球网');
                    }    
                }

                $('.nav-section-submenu').html(str);
                
                // 列表分类栏目名
                if(window.isList){
                    $('h3.m-recommend-title').text(result.data[result.data.length-1].path_name).show();
                }
                
                var oOpen=0;
                if (result.data.length) {
                    if(result.data[le].catnode.length){
                        var oCatnode = '';
                        $.ajax({
                            url: window.host + '/api/channel_pc',
                            type: 'get',
                            dataType: 'json',
                            success: function(data) {
                                var res = data.children;
                                // console.log(res)
                                for (var i in res) {
                                    if(res[i].node == result.data[le].catnode[0].catnode){
                                        // console.log(res[i]);
                                        for (var t in res[i].children){
                                            oCatnode += '"' + res[i].children[t].node + '"' + ",";
                                            if(res[i].children[t].children != undefined){
                                                for(var x in res[i].children[t].children){
                                                    //console.log(res[i].children[t].children[x].node);
                                                    oCatnode += '"' + res[i].children[t].children[x].node + '"' + ",";
                                                }
                                            }
                                        }
                                        window.name = oCatnode.substring(0, oCatnode.lastIndexOf(','));
                                        // console.log(window.name);
                                        oOpen=1;
                                    }
                                }
                                if(oOpen==0){
                                    // console.log(window.name);
                                    window.name = result.data[le].catnode[0].catnode;
                                };
                                List.init();
                            },
                            err: function(e) {
                                //console.log(e)
                            }
                        })
                        // 首页瀑布流显示节点规则判断
                        // if(result.data[le].catnode[0].catnode == '/e3pmh1tuv'){
                        //     // 旅游
                        //     window.name = '"/e3pmh1tuv/e3pmh1ufv/e3pmh1v35"';
                        // }
                        // else if(result.data[le].catnode[0].catnode == '/e3pn4vu2g'){
                        //     // 时尚
                        //   window.name = '"/e3pn4vu2g/e3pn4vuih","/e3pn4vu2g/e3pright6","/e3pn4vu2g/e3pn7fph9","/e3pn4vu2g/e3pn7v7f6","/e3pn4vu2g/e3poftkqs","/e3pn4vu2g/e3pn61569","/e3pn4vu2g/e3prijklc","/e3pn4vu2g/e3ptq4t9b","/e3pn4vu2g/e3pokk591"'; 
                        // }else if(result.data[le].catnode[0].catnode == '/e5d59phvs'){
                        //     // 创投
                        //     window.name = '"/e5d59phvs/e5d5m10mv/e5d5o560g","/e5d59phvs/e5d5m10mv/e5d5oecei","/e5d59phvs/e5d5m10mv/e5d5pk5dq","/e5d59phvs/e5d5m10mv/e5d5pqj2e","/e5d59phvs/e5d5m10mv/e5d5q06t9","/e5d59phvs/e5d5m10mv/e5d5q73kg"';
                        // }else if(result.data[le].catnode[0].catnode == '/e5ipl1avc'){
                        //     // 影视
                        //     window.name = '"/e5ipl1avc/e5ipl1bm2","/e5ipl1avc/e5ipm43ik","/e5ipl1avc/e5ipm6m83"'; 
                        // }
                        // else{
                        //     window.name = result.data[le].catnode[0].catnode;
                        // }
                    }else{
                        window.name = '"/e3pmh1tuv/e3pmh1ufv/e3pmh1v35"';
                        List.init();
                    }
                    // List.init();

                }
            }
        }
    });

// });
$(function(){
    $(".r-hqTrade").find("img").each(function(){
    	if(!$(this).hasClass("imgH") && !$(this).hasClass("imgS") && !$(this).hasClass("imgD") && $(this).attr('src')!=undefined)
    	{
    		if($(this).attr("src").indexOf("rs1.huanqiucdn.cn")>0 || $(this).attr("src").indexOf("himg2.huanqiucdn.cn")>0)
    		{
	    		if($(this).height()>=80 && $(this).height()<=160)
	    		{
	    			$(this).addClass("imgH");
	    		}
	    		else
	    		{
	    			$(this).addClass("imgS");
	    		}
    		}
    		else
    		{
    			$(this).addClass("imgD");
    		}
    	}
    });
});
$(function(){
    $("#hotnews li img").each(function(){
        if($(this).attr("src")==undefined || $(this).attr("src")=="" || $(this).attr("src")=="?w=180"){
            $(this).parent().hide();
        }
    });
});
