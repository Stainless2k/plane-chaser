(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return c(441)}])},1210:function(a,b){"use strict";function c(a,b,c,d){return!1}Object.defineProperty(b,"__esModule",{value:!0}),b.getDomainLocale=c,("function"==typeof b.default||"object"==typeof b.default&&null!==b.default)&& void 0===b.default.__esModule&&(Object.defineProperty(b.default,"__esModule",{value:!0}),Object.assign(b.default,b),a.exports=b.default)},8418:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d,e=c(4941).Z;c(5753).default,Object.defineProperty(b,"__esModule",{value:!0}),b.default=void 0;var f=(d=c(7294),d&&d.__esModule?d:{default:d}),g=c(6273),h=c(2725),i=c(3462),j=c(1018),k=c(7190),l=c(1210),m=c(8684),n=void 0!==f.default.useTransition,o={};function p(a,b,c,d){if(a&&g.isLocalURL(b)){a.prefetch(b,c,d).catch(function(a){});var e=d&& void 0!==d.locale?d.locale:a&&a.locale;o[b+"%"+c+(e?"%"+e:"")]=!0}}var q=f.default.forwardRef(function(a,b){var c,d,q=a.href,r=a.as,s=a.children,t=a.prefetch,u=a.passHref,v=a.replace,w=a.soft,x=a.shallow,y=a.scroll,z=a.locale,A=a.onClick,B=a.onMouseEnter,C=a.legacyBehavior,D=void 0===C?!0!==Boolean(!1):C,E=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)b.indexOf(c=f[d])>=0||(e[c]=a[c]);return e}(a,["href","as","children","prefetch","passHref","replace","soft","shallow","scroll","locale","onClick","onMouseEnter","legacyBehavior"]);c=s,D&&("string"==typeof c||"number"==typeof c)&&(c=f.default.createElement("a",null,c));var F=!1!==t,G=e(n?f.default.useTransition():[],2),H=G[1],I=f.default.useContext(i.RouterContext),J=f.default.useContext(j.AppRouterContext);J&&(I=J);var K=f.default.useMemo(function(){var a=e(g.resolveHref(I,q,!0),2),b=a[0],c=a[1];return{href:b,as:r?g.resolveHref(I,r):c||b}},[I,q,r]),L=K.href,M=K.as,N=f.default.useRef(L),O=f.default.useRef(M);D&&(d=f.default.Children.only(c));var P=D?d&&"object"==typeof d&&d.ref:b,Q=e(k.useIntersection({rootMargin:"200px"}),3),R=Q[0],S=Q[1],T=Q[2],U=f.default.useCallback(function(a){(O.current!==M||N.current!==L)&&(T(),O.current=M,N.current=L),R(a),P&&("function"==typeof P?P(a):"object"==typeof P&&(P.current=a))},[M,P,L,T,R]);f.default.useEffect(function(){var a=S&&F&&g.isLocalURL(L),b=void 0!==z?z:I&&I.locale,c=o[L+"%"+M+(b?"%"+b:"")];a&&!c&&p(I,L,M,{locale:b})},[M,L,S,z,F,I]);var V={ref:U,onClick:function(a){D||"function"!=typeof A||A(a),D&&d.props&&"function"==typeof d.props.onClick&&d.props.onClick(a),a.defaultPrevented||function(a,b,c,d,e,f,h,i,j,k){if("A"!==a.currentTarget.nodeName.toUpperCase()||(!(m=(l=a).currentTarget.target)||"_self"===m)&&!l.metaKey&&!l.ctrlKey&&!l.shiftKey&&!l.altKey&&(!l.nativeEvent||2!==l.nativeEvent.which)&&g.isLocalURL(c)){a.preventDefault();var l,m,n=function(){"softPush"in b&&"softReplace"in b?b[f?e?"softReplace":"softPush":e?"replace":"push"](c):b[e?"replace":"push"](c,d,{shallow:h,locale:j,scroll:i})};k?k(n):n()}}(a,I,L,M,v,w,x,y,z,J?H:void 0)},onMouseEnter:function(a){D||"function"!=typeof B||B(a),D&&d.props&&"function"==typeof d.props.onMouseEnter&&d.props.onMouseEnter(a),g.isLocalURL(L)&&p(I,L,M,{priority:!0})}};if(!D||u||"a"===d.type&&!("href"in d.props)){var W=void 0!==z?z:I&&I.locale,X=I&&I.isLocaleDomain&&l.getDomainLocale(M,W,I.locales,I.domainLocales);V.href=X||m.addBasePath(h.addLocale(M,W,I&&I.defaultLocale))}return D?f.default.cloneElement(d,V):f.default.createElement("a",Object.assign({},E,V),c)});b.default=q,("function"==typeof b.default||"object"==typeof b.default&&null!==b.default)&& void 0===b.default.__esModule&&(Object.defineProperty(b.default,"__esModule",{value:!0}),Object.assign(b.default,b),a.exports=b.default)},7190:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(4941).Z;Object.defineProperty(b,"__esModule",{value:!0}),b.useIntersection=function(a){var b=a.rootRef,c=a.rootMargin,i=a.disabled||!g,j=e.useRef(),k=d(e.useState(!1),2),l=k[0],m=k[1],n=d(e.useState(null),2),o=n[0],p=n[1];e.useEffect(function(){if(g){if(j.current&&(j.current(),j.current=void 0),!i&&!l)return o&&o.tagName&&(j.current=h(o,function(a){return a&&m(a)},{root:null==b?void 0:b.current,rootMargin:c})),function(){null==j.current||j.current(),j.current=void 0}}else if(!l){var a=f.requestIdleCallback(function(){return m(!0)});return function(){return f.cancelIdleCallback(a)}}},[o,i,c,b,l]);var q=e.useCallback(function(){m(!1)},[]);return[p,l,q]};var e=c(7294),f=c(9311),g="function"==typeof IntersectionObserver;function h(a,b,c){var d=k(c),e=d.id,f=d.observer,g=d.elements;return g.set(a,b),f.observe(a),function(){if(g.delete(a),f.unobserve(a),0===g.size){f.disconnect(),i.delete(e);var b=j.findIndex(function(a){return a.root===e.root&&a.margin===e.margin});b> -1&&j.splice(b,1)}}}var i=new Map,j=[];function k(a){var b,c={root:a.root||null,margin:a.rootMargin||""},d=j.find(function(a){return a.root===c.root&&a.margin===c.margin});if(d&&(b=i.get(d)))return b;var e=new Map,f=new IntersectionObserver(function(a){a.forEach(function(a){var b=e.get(a.target),c=a.isIntersecting||a.intersectionRatio>0;b&&c&&b(c)})},a);return b={id:c,observer:f,elements:e},j.push(c),i.set(c,b),b}("function"==typeof b.default||"object"==typeof b.default&&null!==b.default)&& void 0===b.default.__esModule&&(Object.defineProperty(b.default,"__esModule",{value:!0}),Object.assign(b.default,b),a.exports=b.default)},1018:function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0}),b.FullAppTreeContext=b.AppTreeContext=b.AppRouterContext=void 0;var d,e=(d=c(7294),d&&d.__esModule?d:{default:d}),f=e.default.createContext(null);b.AppRouterContext=f;var g=e.default.createContext(null);b.AppTreeContext=g;var h=e.default.createContext(null);b.FullAppTreeContext=h},441:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return g}});var d=c(5893);c(7294);var e=c(1664),f=c.n(e);function g(){return(0,d.jsxs)("div",{className:"flex flex-col gap-0.5",children:[(0,d.jsx)(f(),{href:"/PlaneChase",children:"PlaneChase"}),(0,d.jsx)(f(),{href:"/EternitiesMap",children:"EternitiesMap"})]})}},1664:function(a,b,c){a.exports=c(8418)}},function(a){a.O(0,[774,888,179],function(){var b;return a(a.s=8312)}),_N_E=a.O()}])