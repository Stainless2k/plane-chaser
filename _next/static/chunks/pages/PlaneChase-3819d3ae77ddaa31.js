(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[834],{8520:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/PlaneChase",function(){return c(5466)}])},6937:function(a,b,c){"use strict";c.d(b,{K:function(){return i},M:function(){return g}});var d=c(5893),e=c(1608),f=c.n(e),g=670/974;function h(a){var b=a.src;return(0,d.jsx)("div",{className:"h-full w-full overflow-hidden",children:(0,d.jsx)(f(),{className:"select-none",src:b,width:670,height:974,unoptimized:!0,onContextMenu:function(a){return a.preventDefault()}})})}function i(a){var b=a.error,c=a.data,e=(0,d.jsx)("div",{style:{writingMode:"vertical-lr"},className:"h-fit w-fit animate-[ping_2s_ease-out_infinite]",children:(0,d.jsx)("div",{className:"animate-fade -translate-x-1/2 rotate-180",children:"Walking..."})});return b?(0,d.jsxs)("div",{children:["An error has occurred: + ",b]}):(c&&(e=(0,d.jsx)("div",{className:"animate-pop h-full w-full",children:(0,d.jsx)(h,{src:c})},c)),(0,d.jsx)("div",{style:{aspectRatio:g.toString()},children:e}))}},7348:function(a,b,c){"use strict";c.d(b,{f:function(){return h}});var d=c(7568),e=c(4051),f=c.n(e),g=c(3471);function h(a){var b;return(0,g.useQuery)([null==a?void 0:a.name],function(){var c;return fetch(null!==(b=null==a?void 0:a.image_uris.border_crop)&& void 0!==b?b:"").then((c=(0,d.Z)(f().mark(function a(b){return f().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.t0=URL,a.next=3,b.blob();case 3:return a.t1=a.sent,a.abrupt("return",a.t0.createObjectURL.call(a.t0,a.t1));case 5:case"end":return a.stop()}},a)})),function(a){return c.apply(this,arguments)}))})}},5466:function(a,b,c){"use strict";c.r(b),c.d(b,{"__N_SSG":function(){return o},default:function(){return p}});var d=c(828),e=c(9815),f=c(5893),g=c(7294),h=c(6486),i=c.n(h),j=c(6937),k=c(7348);function l(a){var b=i().head(a);if(void 0===b)throw Error("Trying to split array of length 0: "+a.toString());return[b,i().tail(a)]}function m(a){var b=a.deck,c=a.field,f=(0,d.Z)(l(c),2),g=f[0],h=f[1];return{field:[g],deck:i().shuffle((0,e.Z)(b).concat((0,e.Z)(h)))}}function n(a,b){switch(b.type){case"walk":var c,f,g,h,i;return(f=c=a).deck.length<1&&(f=m(f)),h=(g=(0,d.Z)(l(f.deck),2))[0],i=g[1],{field:[h].concat((0,e.Z)(f.field)),deck:i};case"reset":return m(a)}}var o=!0;function p(a){var b=a.cards,c=function(){q({type:"walk"})},e=(0,d.Z)(l(b),2),h=e[0],m=e[1],o=(0,g.useReducer)(n,{field:[h],deck:m}),p=o[0].field,q=o[1],r=i().head(p),s=(0,k.f)(r),t=s.error,u=s.data;return(0,f.jsx)("div",{className:"background-animate flex h-screen w-screen items-center justify-center",onClick:function(){return c()},children:(0,f.jsx)(j.K,{error:null==t?void 0:t.message,data:u})})}}},function(a){a.O(0,[662,675,774,888,179],function(){var b;return a(a.s=8520)}),_N_E=a.O()}])