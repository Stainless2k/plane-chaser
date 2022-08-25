"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[202],{1557:function(a,b,c){c.d(b,{"$3":function(){return U},U5:function(){return S}});var d=c(7294);/*! @license Rematrix v0.2.2

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/ /**
 * @module Rematrix
 */ /**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */ function e(a){if(a.constructor!==Array)throw TypeError("Expected array.");if(16===a.length)return a;if(6===a.length){var b=f();return b[0]=a[0],b[1]=a[1],b[4]=a[2],b[5]=a[3],b[12]=a[4],b[13]=a[5],b}throw RangeError("Expected array with either 6 or 16 values.")}function f(){for(var a=[],b=0;b<16;b++)b%5==0?a.push(1):a.push(0);return a}function g(a,b){for(var c=e(a),d=e(b),f=[],g=0;g<4;g++)for(var h=[c[g],c[g+4],c[g+8],c[g+12]],i=0;i<4;i++){var j=4*i,k=[d[j],d[j+1],d[j+2],d[j+3]],l=h[0]*k[0]+h[1]*k[1]+h[2]*k[2]+h[3]*k[3];f[g+j]=l}return f}var h=function(a){return"number"==typeof a},i=function(a){return"function"==typeof a},j=function(a){return"[object Object]"===Object.prototype.toString.call(a)},k=function(a){return Array.prototype.slice.apply(a)},l=function(a){var b=a.reduce(function(a,b){return a[b]=(a[b]||0)+1,a},{});return Object.keys(b).filter(function(a){return b[a]>1})};function m(a){return[].slice.call(arguments,1).forEach(function(b){if(b)for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])}),a}var n,o=function(a,b,c){return a+(b-a)*c},p={__proto__:null,isNumber:h,isFunction:i,isObject:j,toArray:k,getDuplicateValsAsStrings:l,assign:m,tweenProp:o},q={__proto__:null,DATA_FLIP_ID:"data-flip-id",DATA_INVERSE_FLIP_ID:"data-inverse-flip-id",DATA_FLIP_COMPONENT_ID:"data-flip-component-id",DATA_FLIP_CONFIG:"data-flip-config",DATA_PORTAL_KEY:"data-portal-key",DATA_EXIT_CONTAINER:"data-exit-container"},r={noWobble:{stiffness:200,damping:26},gentle:{stiffness:120,damping:14},veryGentle:{stiffness:130,damping:17},wobbly:{stiffness:180,damping:12},stiff:{stiffness:260,damping:26}},s=function(a){return j(a)?a:Object.keys(r).indexOf(a)> -1?r[a]:{}};"undefined"!=typeof window&&(n=window.requestAnimationFrame);var t=n=n||function(a){window.setTimeout(a,1e3/60)},u=Date.now(),v="object"==typeof performance&&"function"==typeof performance.now?function(){return performance.now()}:function(){return Date.now()-u};function w(a,b){var c=a.indexOf(b);-1!==c&&a.splice(c,1)}var x=function(){function a(){}return a.prototype.run=function(){var a=this;t(function(){a.springSystem.loop(v())})},a}(),y=function(){this.position=0,this.velocity=0},z=0,A=function(){function a(a){this._id="s"+z++,this._springSystem=a,this.listeners=[],this._startValue=0,this._currentState=new y,this._displacementFromRestThreshold=.001,this._endValue=0,this._overshootClampingEnabled=!1,this._previousState=new y,this._restSpeedThreshold=.001,this._tempState=new y,this._timeAccumulator=0,this._wasAtRest=!0,this._cachedSpringConfig={}}var b=a.prototype;return b.getId=function(){return this._id},b.destroy=function(){this.listeners=[],this._springSystem.deregisterSpring(this)},b.setSpringConfig=function(a){return this._springConfig=a,this},b.getCurrentValue=function(){return this._currentState.position},b.getDisplacementDistanceForState=function(a){return Math.abs(this._endValue-a.position)},b.setEndValue=function(a){if(a===this._endValue||(this.prevEndValue=a,this._endValue===a&&this.isAtRest()))return this;this._startValue=this.getCurrentValue(),this._endValue=a,this._springSystem.activateSpring(this.getId());for(var b=0,c=this.listeners.length;b<c;b++){var d=this.listeners[b].onSpringEndStateChange;d&&d(this)}return this},b.setVelocity=function(a){return a===this._currentState.velocity||(this._currentState.velocity=a,this._springSystem.activateSpring(this.getId())),this},b.setCurrentValue=function(a){this._startValue=a,this._currentState.position=a;for(var b=0,c=this.listeners.length;b<c;b++){var d=this.listeners[b];d.onSpringUpdate&&d.onSpringUpdate(this)}return this},b.setAtRest=function(){return this._endValue=this._currentState.position,this._tempState.position=this._currentState.position,this._currentState.velocity=0,this},b.setOvershootClampingEnabled=function(a){return this._overshootClampingEnabled=a,this},b.isOvershooting=function(){var a=this._startValue,b=this._endValue;return this._springConfig.tension>0&&(a<b&&this.getCurrentValue()>b||a>b&&this.getCurrentValue()<b)},b.advance=function(a,b){var c=this.isAtRest();if(!c||!this._wasAtRest){var d=b;b>.064&&(d=.064),this._timeAccumulator+=d;for(var e,f,g,h,i,j,k=this._springConfig.tension,l=this._springConfig.friction,m=this._currentState.position,n=this._currentState.velocity,o=this._tempState.position,p=this._tempState.velocity;this._timeAccumulator>=.001;)this._timeAccumulator-=.001,this._timeAccumulator<.001&&(this._previousState.position=m,this._previousState.velocity=n),f=k*(this._endValue-o)-l*n,h=k*(this._endValue-(o=m+.001*(e=n)*.5))-l*(p=n+.001*f*.5),j=k*(this._endValue-(o=m+.001*(g=p)*.5))-l*(p=n+.001*h*.5),o=m+.001*(i=p),m+=1/6*(e+2*(g+i)+(p=n+.001*j))*.001,n+=1/6*(f+2*(h+j)+(k*(this._endValue-o)-l*p))*.001;this._tempState.position=o,this._tempState.velocity=p,this._currentState.position=m,this._currentState.velocity=n,this._timeAccumulator>0&&this._interpolate(this._timeAccumulator/.001),(this.isAtRest()||this._overshootClampingEnabled&&this.isOvershooting())&&(this._springConfig.tension>0?(this._startValue=this._endValue,this._currentState.position=this._endValue):(this._endValue=this._currentState.position,this._startValue=this._endValue),this.setVelocity(0),c=!0);var q=!1;this._wasAtRest&&(this._wasAtRest=!1,q=!0);var r=!1;c&&(this._wasAtRest=!0,r=!0),this.notifyPositionUpdated(q,r)}},b.notifyPositionUpdated=function(a,b){var c=this;this.listeners.filter(Boolean).forEach(function(d){a&&d.onSpringActivate&&!c._onActivateCalled&&(d.onSpringActivate(c),c._onActivateCalled=!0),d.onSpringUpdate&&d.onSpringUpdate(c),b&&d.onSpringAtRest&&d.onSpringAtRest(c)})},b.systemShouldAdvance=function(){return!this.isAtRest()||!this.wasAtRest()},b.wasAtRest=function(){return this._wasAtRest},b.isAtRest=function(){return Math.abs(this._currentState.velocity)<this._restSpeedThreshold&&(this.getDisplacementDistanceForState(this._currentState)<=this._displacementFromRestThreshold||0===this._springConfig.tension)},b._interpolate=function(a){this._currentState.position=this._currentState.position*a+this._previousState.position*(1-a),this._currentState.velocity=this._currentState.velocity*a+this._previousState.velocity*(1-a)},b.addListener=function(a){return this.listeners.push(a),this},b.addOneTimeListener=function(a){var b=this;return Object.keys(a).forEach(function(c){var d;a[c]=(d=a[c],function(){d.apply(void 0,[].slice.call(arguments)),b.removeListener(a)})}),this.listeners.push(a),this},b.removeListener=function(a){return w(this.listeners,a),this},a}(),B=function(){function a(a){this.looper=a||new x,this.looper.springSystem=this,this.listeners=[],this._activeSprings=[],this._idleSpringIndices=[],this._isIdle=!0,this._lastTimeMillis=-1,this._springRegistry={}}var b=a.prototype;return b.createSpring=function(a,b){return this.createSpringWithConfig({tension:a,friction:b})},b.createSpringWithConfig=function(a){var b=new A(this);return this.registerSpring(b),b.setSpringConfig(a),b},b.getIsIdle=function(){return this._isIdle},b.registerSpring=function(a){this._springRegistry[a.getId()]=a},b.deregisterSpring=function(a){w(this._activeSprings,a),delete this._springRegistry[a.getId()]},b.advance=function(a,b){for(var c=this;this._idleSpringIndices.length>0;)this._idleSpringIndices.pop();for(this._activeSprings.filter(Boolean).forEach(function(d){d.systemShouldAdvance()?d.advance(a/1e3,b/1e3):c._idleSpringIndices.push(c._activeSprings.indexOf(d))});this._idleSpringIndices.length>0;){var d=this._idleSpringIndices.pop();d>=0&&this._activeSprings.splice(d,1)}},b.loop=function(a){-1===this._lastTimeMillis&&(this._lastTimeMillis=a-1);var b,c=a-this._lastTimeMillis;this._lastTimeMillis=a;var d=0,e=this.listeners.length;for(d=0;d<e;d++)(b=this.listeners[d]).onBeforeIntegrate&&b.onBeforeIntegrate(this);for(this.advance(a,c),0===this._activeSprings.length&&(this._isIdle=!0,this._lastTimeMillis=-1),d=0;d<e;d++)(b=this.listeners[d]).onAfterIntegrate&&b.onAfterIntegrate(this);this._isIdle||this.looper.run()},b.activateSpring=function(a){var b=this._springRegistry[a];-1===this._activeSprings.indexOf(b)&&this._activeSprings.push(b),this.getIsIdle()&&(this._isIdle=!1,this.looper.run())},a}(),C=new B,D=function(a){var b=a.springConfig,c=b.overshootClamping,d=a.getOnUpdateFunc,e=a.onAnimationEnd,f=a.onSpringActivate,g=C.createSpring(b.stiffness,b.damping);g.setOvershootClampingEnabled(!!c);var h={onSpringActivate:f,onSpringAtRest:function(){g.destroy(),e()},onSpringUpdate:d({spring:g,onAnimationEnd:e})};return g.addListener(h),g},E=function(a){var b=D(a);return b.setEndValue(1),b},F=function(a,b){if(void 0===b&&(b={}),a&&a.length){b.reverse&&a.reverse();var c,d="number"!=typeof(c=b.speed)?1.1:1+Math.min(Math.max(5*c,0),5),e=1/Math.max(Math.min(a.length,100),10),f=a.map(function(a,b){var c=a.getOnUpdateFunc;return a.getOnUpdateFunc=function(a){var g=c(a);return function(a){var c=a.getCurrentValue();(c=c<.01?0:c>.99?1:c)>=e&&f[b+1]&&f[b+1](Math.max(Math.min(c*d,1),0)),g(a)}},a}).map(function(a){var b=D(a);if(b)return b.setEndValue.bind(b)}).filter(Boolean);f[0]&&f[0](1)}},G=function(a){return[0,1,4,5,12,13].map(function(b){return a[b]})},H=function(a){return a.top<window.innerHeight&&a.bottom>0&&a.left<window.innerWidth&&a.right>0};function I(a){return JSON.parse(a.dataset.flipConfig||"{}")}var J,K=function(a,b){var c;return m(a,((c={})[b[0]]=b[1],c))},L=function(a,b){return k(b?document.querySelectorAll('[data-portal-key="'+b+'"]'):a.querySelectorAll("[data-flip-id]"))},M=function(a){return a.map(function(a){return[a,a.getBoundingClientRect()]})},N=function(a){var b,c,d,j,n,p,q,t,u,v,w,x,y,z,A,B,C,D,J,N,O,P,Q,R=a.cachedOrderedFlipIds,S=a.inProgressAnimations,T=a.flippedElementPositionsBeforeUpdate,U=void 0===T?{}:T,V=a.flipCallbacks,W=a.containerEl,X=a.applyTransformOrigin,Y=a.spring,Z=a.debug,$=a.portalKey,_=a.staggerConfig,aa=a.decisionData,ab=void 0===aa?{}:aa,ac=a.handleEnterUpdateDelete,ad=a.onComplete,ae=a.onStart,af=M(L((Q={element:W,portalKey:$}).element,Q.portalKey)).map(function(a){var b=a[0],c=a[1],d=window.getComputedStyle(b);return[b.dataset.flipId,{element:b,rect:c,opacity:parseFloat(d.opacity),transform:d.transform}]}).reduce(K,{}),ag=(c=(b={containerEl:W,portalKey:$}).containerEl,d=b.portalKey,d?(j=d,function(a){return k(document.querySelectorAll('[data-portal-key="'+j+'"]'+a))}):c?(n=c,p=Math.random().toFixed(5),n.dataset.flipperId=p,function(a){return k(n.querySelectorAll('[data-flipper-id="'+p+'"] '+a))}):function(){return[]}),ah=(q=ag,function(a){return q('[data-flip-id="'+a+'"]')[0]}),ai=function(a){return U[a]&&af[a]},aj=Object.keys(U).concat(Object.keys(af)).filter(function(a){return!ai(a)}),ak={flipCallbacks:void 0===V?{}:V,getElement:ah,flippedElementPositionsBeforeUpdate:U,flippedElementPositionsAfterUpdate:af,inProgressAnimations:void 0===S?{}:S,decisionData:ab},al=(v=(t=m({},ak,{unflippedIds:aj})).unflippedIds,w=t.flipCallbacks,x=t.getElement,y=t.flippedElementPositionsBeforeUpdate,z=t.flippedElementPositionsAfterUpdate,A=t.inProgressAnimations,B=t.decisionData,C=v.filter(function(a){return z[a]}).filter(function(a){return w[a]&&w[a].onAppear}),D=v.filter(function(a){return y[a]&&w[a]&&w[a].onExit}),J=new Promise(function(a){u=a}),N=[],O=0,P=D.map(function(a,b){var c=y[a].domDataForExitAnimations,d=c.element,e=c.parent,f=c.childPosition,g=f.top,h=f.left,i=f.width,j=f.height;"static"===getComputedStyle(e).position&&(e.style.position="relative"),d.style.transform="matrix(1, 0, 0, 1, 0, 0)",d.style.position="absolute",d.style.top=g+"px",d.style.left=h+"px",d.style.height=j+"px",d.style.width=i+"px";var k=N.filter(function(a){return a[0]===e})[0];k||(k=[e,document.createDocumentFragment()],N.push(k)),k[1].appendChild(d),O+=1;var l=function(){try{e.removeChild(d)}catch(a){}finally{0==(O-=1)&&u()}};return A[a]={stop:l},function(){return w[a].onExit(d,b,l,B)}}),N.forEach(function(a){a[0].appendChild(a[1])}),P.length||u(),{hideEnteringElements:function(){C.forEach(function(a){var b=x(a);b&&(b.style.opacity="0")})},animateEnteringElements:function(){C.forEach(function(a,b){var c=x(a);c&&w[a].onAppear(c,b,B)})},animateExitingElements:function(){return P.forEach(function(a){return a()}),J}}),am=al.hideEnteringElements,an=al.animateEnteringElements,ao=al.animateExitingElements,ap=m({},ak,{containerEl:W,flippedIds:(void 0===R?[]:R).filter(ai),applyTransformOrigin:X,spring:Y,debug:Z,staggerConfig:void 0===_?{}:_,scopedSelector:ag,onComplete:ad});ae&&ae(W,ab);var aq=function(a){var b,c=a.flippedIds,d=a.flipCallbacks,j=a.inProgressAnimations,n=a.flippedElementPositionsBeforeUpdate,p=a.flippedElementPositionsAfterUpdate,q=a.applyTransformOrigin,t=a.spring,u=a.getElement,v=a.debug,w=a.staggerConfig,x=void 0===w?{}:w,y=a.decisionData,z=void 0===y?{}:y,A=a.onComplete,B=a.containerEl,C=new Promise(function(a){b=a});if(A&&C.then(function(){return A(B,z)}),!c.length)return function(){return b([]),C};var D=[],J=u(c[0]),K=J?J.ownerDocument.querySelector("body"):document.querySelector("body"),L=(l(c),c.map(function(a){var c=n[a].rect,l=p[a].rect,u=n[a].opacity,v=p[a].opacity,w=l.width<1||l.height<1,x=p[a].element;if(!H(c)&&!H(l)||!x)return!1;var y,A,B,C=I(x),E=(B=(A={flipperSpring:t,flippedSpring:C.spring}).flippedSpring,m({},r.noWobble,s(A.flipperSpring),s(B))),F=!0===C.stagger?"default":C.stagger,J={element:x,id:a,stagger:F,springConfig:E};if(d[a]&&d[a].shouldFlip&&!d[a].shouldFlip(z.previous,z.current))return!1;var M=Math.abs(c.left-l.left)+Math.abs(c.top-l.top),N=Math.abs(c.width-l.width)+Math.abs(c.height-l.height),O=Math.abs(v-u);if(0===c.height&&0===l.height||0===c.width&&0===l.width||M<.5&&N<.5&&O<.01)return!1;var P,Q,R,S,T,U,V,W,X=function(a){if("string"==typeof a){var b=a.match(/matrix(3d)?\(([^)]+)\)/);if(b){var c=b[2].split(", ").map(parseFloat);return e(c)}}return f()}(p[a].transform),Y={matrix:X},Z={matrix:[]},$=[X];C.translate&&($.push((P=c.left-l.left,(Q=f())[12]=P,Q)),$.push((R=c.top-l.top,(S=f())[13]=R,S))),C.scale&&($.push((T=Math.max(c.width,1)/Math.max(l.width,1),(U=f())[0]=T,U)),$.push((V=Math.max(c.height,1)/Math.max(l.height,1),(W=f())[5]=V,W))),C.opacity&&(Z.opacity=u,Y.opacity=v);var _=[];(!d[a]||!d[a].shouldInvert||d[a].shouldInvert(z.previous,z.current))&&(_=(aa=x,ab=a,k(aa.querySelectorAll('[data-inverse-flip-id="'+ab+'"]'))).map(function(a){return[a,I(a)]})),Z.matrix=G($.reduce(g)),Y.matrix=G(Y.matrix);var aa,ab,ac,ad,ae,af,ag,ah=(ad=(ac={element:x,invertedChildren:_,body:K}).element,ae=ac.invertedChildren,af=ac.body,function(a){var b=a.matrix,c=a.opacity,d=a.forceMinVals;if(h(c)&&(ad.style.opacity=c+""),d&&(ad.style.minHeight="1px",ad.style.minWidth="1px"),b){var e,f="matrix("+(e=b).join(", ")+")";ad.style.transform=f,ae&&function(a){var b=a.matrix,c=a.body;a.invertedChildren.forEach(function(a){var d=a[0],e=a[1];if(c.contains(d)){var f=b[0],g=b[3],h=b[5],i={translateX:0,translateY:0,scaleX:1,scaleY:1},j="";e.translate&&(i.translateX=-b[4]/f,i.translateY=-h/g,j+="translate("+i.translateX+"px, "+i.translateY+"px)"),e.scale&&(i.scaleX=1/f,i.scaleY=1/g,j+=" scale("+i.scaleX+", "+i.scaleY+")"),d.style.transform=j}})}({invertedChildren:ae,matrix:b,body:af})}});if(d[a]&&d[a].onComplete){var ai=d[a].onComplete;ag=function(){return ai(x,z)}}var aj=h(Z.opacity)&&h(Y.opacity)&&Z.opacity!==Y.opacity,ak=!1;return m({},J,{stagger:F,springConfig:E,getOnUpdateFunc:function(b){var c=b.spring,e=b.onAnimationEnd;return j[a]={destroy:c.destroy.bind(c),onAnimationEnd:e},function(b){d[a]&&d[a].onSpringUpdate&&d[a].onSpringUpdate(b.getCurrentValue()),ak||(ak=!0,d[a]&&d[a].onStart&&d[a].onStart(x,z));var c=b.getCurrentValue();if(K.contains(x)){var e={matrix:[]};e.matrix=Z.matrix.map(function(a,b){return o(a,Y.matrix[b],c)}),aj&&(e.opacity=o(Z.opacity,Y.opacity,c)),ah(e)}else b.destroy()}},initializeFlip:function(){ah({matrix:Z.matrix,opacity:aj?Z.opacity:void 0,forceMinVals:w}),d[a]&&d[a].onStartImmediate&&d[a].onStartImmediate(x,z),C.transformOrigin?x.style.transformOrigin=C.transformOrigin:q&&(x.style.transformOrigin="0 0"),_.forEach(function(a){var b=a[0],c=a[1];c.transformOrigin?b.style.transformOrigin=c.transformOrigin:q&&(b.style.transformOrigin="0 0")})},onAnimationEnd:function(c){delete j[a],i(ag)&&ag(),x.style.transform="",_.forEach(function(a){a[0].style.transform=""}),w&&x&&(x.style.minHeight="",x.style.minWidth=""),c||(D.push(a),D.length>=L.length&&b(D))},delayUntil:C.delayUntil})}).filter(Boolean));if(L.forEach(function(a){return(0,a.initializeFlip)()}),v)return function(){};var M=L.filter(function(a){var b;return a.delayUntil&&(b=a.delayUntil,L.filter(function(a){return a.id===b}).length)}),N={},O={},P={};M.forEach(function(a){a.stagger?(P[a.stagger]=!0,O[a.delayUntil]?O[a.delayUntil].push(a.stagger):O[a.delayUntil]=[a.stagger]):N[a.delayUntil]?N[a.delayUntil].push(a):N[a.delayUntil]=[a]});var Q=L.filter(function(a){return a.stagger}).reduce(function(a,b){return a[b.stagger]?a[b.stagger].push(b):a[b.stagger]=[b],a},{}),R=L.filter(function(a){return -1===M.indexOf(a)});return R.forEach(function(a){a.onSpringActivate=function(){N[a.id]&&N[a.id].forEach(E),O[a.id]&&Object.keys(O[a.id].reduce(function(a,b){var c;return m(a,((c={})[b]=!0,c))},{})).forEach(function(a){F(Q[a],x[a])})}}),function(){return L.length||b([]),R.filter(function(a){return!a.stagger}).forEach(E),Object.keys(Q).forEach(function(a){P[a]||F(Q[a],x[a])}),C}}(ap);ac?ac({hideEnteringElements:am,animateEnteringElements:an,animateExitingElements:ao,animateFlippedElements:aq}):(am(),ao().then(an),aq())},O=function(a){var b=a.element,c=a.flipCallbacks,d=void 0===c?{}:c,e=a.inProgressAnimations,f=L(b,a.portalKey),g=k(b.querySelectorAll("[data-inverse-flip-id]")),h={},i=[],j={};f.filter(function(a){return d&&d[a.dataset.flipId]&&d[a.dataset.flipId].onExit}).forEach(function(a){var b=a.parentNode;if(a.closest){var c=a.closest("[data-exit-container]");c&&(b=c)}var d=i.findIndex(function(a){return a[0]===b});-1===d&&(i.push([b,b.getBoundingClientRect()]),d=i.length-1),h[a.dataset.flipId]=i[d][1],j[a.dataset.flipId]=b});var l,n,o=M(f),p=o.map(function(a){var b=a[0],c=a[1],e={};if(d&&d[b.dataset.flipId]&&d[b.dataset.flipId].onExit){var f=h[b.dataset.flipId];m(e,{element:b,parent:j[b.dataset.flipId],childPosition:{top:c.top-f.top,left:c.left-f.left,width:c.width,height:c.height}})}return[b.dataset.flipId,{rect:c,opacity:parseFloat(window.getComputedStyle(b).opacity||"1"),domDataForExitAnimations:e}]}).reduce(K,{});return l=void 0===e?{}:e,n=f.concat(g),Object.keys(l).forEach(function(a){l[a].destroy&&l[a].destroy(),l[a].onAnimationEnd&&l[a].onAnimationEnd(!0),delete l[a]}),n.forEach(function(a){a.style.transform="",a.style.opacity=""}),{flippedElementPositions:p,cachedOrderedFlipIds:o.map(function(a){return a[0].dataset.flipId})}};function P(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)b.indexOf(c=f[d])>=0||(e[c]=a[c]);return e}(J=(function a(b){this.applyTransformOrigin=!0,m(this,b),this.inProgressAnimations={},this.flipCallbacks={},this.recordBeforeUpdate=this.recordBeforeUpdate.bind(this),this.update=this.update.bind(this),this.addFlipped=this.addFlipped.bind(this),this.addInverted=this.addInverted.bind(this)}).prototype).recordBeforeUpdate=function(){this.snapshot=O({element:this.element,flipCallbacks:this.flipCallbacks,inProgressAnimations:this.inProgressAnimations})},J.update=function(a,b){this.snapshot&&(N({flippedElementPositionsBeforeUpdate:this.snapshot.flippedElementPositions,cachedOrderedFlipIds:this.snapshot.cachedOrderedFlipIds,containerEl:this.element,inProgressAnimations:this.inProgressAnimations,flipCallbacks:this.flipCallbacks,applyTransformOrigin:this.applyTransformOrigin,spring:this.spring,debug:this.debug,staggerConfig:this.staggerConfig,handleEnterUpdateDelete:this.handleEnterUpdateDelete,decisionData:{previous:a,current:b},onComplete:this.onComplete,onStart:this.onStart}),delete this.snapshot)},J.addFlipped=function(a){var b=a.element,c=a.flipId,d=a.opacity,e=a.translate,f=a.scale,g=a.transformOrigin,h=a.spring,i=a.stagger,j=a.delayUntil,k=a.onAppear,l=a.onStart,n=a.onSpringUpdate,o=a.onComplete,p=a.onExit,q=a.shouldFlip,r=a.shouldInvert;if(!b)throw Error("no element provided");if(!c)throw Error("No flipId provided");var s={scale:f,translate:e,opacity:d,transformOrigin:g,spring:h,stagger:i,delayUntil:j};s.scale||s.translate||s.opacity||m(s,{translate:!0,scale:!0,opacity:!0}),c&&(b.dataset.flipId=String(c)),b.dataset.flipConfig=JSON.stringify(s),this.flipCallbacks[c]={shouldFlip:q,shouldInvert:r,onAppear:k,onStart:l,onSpringUpdate:n,onComplete:o,onExit:p}},J.addInverted=function(a){var b=a.element,c=a.parent,d=a.opacity,e=a.translate,f=a.scale,g=a.transformOrigin;if(!b)throw Error("no element provided");if(!c)throw Error("parent must be provided");var h=c.dataset.flipId,i={scale:f,translate:e,opacity:d,transformOrigin:g};i.scale||i.translate||i.opacity||m(i,{translate:!0,scale:!0,opacity:!0}),b.dataset.inverseFlipId=h,b.dataset.flipConfig=JSON.stringify(i)},new B;var Q=(0,d.createContext)({}),R=(0,d.createContext)("portal"),S=function(a){function b(){var b;return(b=a.apply(this,arguments)||this).inProgressAnimations={},b.flipCallbacks={},b.el=void 0,b}e=a,(c=b).prototype=Object.create(e.prototype),c.prototype.constructor=c,c.__proto__=e;var c,e,f=b.prototype;return f.getSnapshotBeforeUpdate=function(a){return a.flipKey!==this.props.flipKey&&this.el?O({element:this.el,flipCallbacks:this.flipCallbacks,inProgressAnimations:this.inProgressAnimations,portalKey:this.props.portalKey}):null},f.componentDidUpdate=function(a,b,c){this.props.flipKey!==a.flipKey&&this.el&&N({flippedElementPositionsBeforeUpdate:c.flippedElementPositions,cachedOrderedFlipIds:c.cachedOrderedFlipIds,containerEl:this.el,inProgressAnimations:this.inProgressAnimations,flipCallbacks:this.flipCallbacks,applyTransformOrigin:this.props.applyTransformOrigin,spring:this.props.spring,debug:this.props.debug,portalKey:this.props.portalKey,staggerConfig:this.props.staggerConfig,handleEnterUpdateDelete:this.props.handleEnterUpdateDelete,decisionData:{previous:a.decisionData,current:this.props.decisionData},onComplete:this.props.onComplete,onStart:this.props.onStart})},f.render=function(){var a=this,b=this.props,c=b.portalKey,e=d.createElement(Q.Provider,{value:this.flipCallbacks},d.createElement(b.element,{className:b.className,ref:function(b){return a.el=b}},this.props.children));return c&&(e=d.createElement(R.Provider,{value:c},e)),e},b}(d.Component);S.defaultProps={applyTransformOrigin:!0,element:"div"};var T=function(a){var b,c,e=a.children,f=a.flipId,g=a.inverseFlipId,h=a.portalKey,i=P(a,["children","flipId","inverseFlipId","portalKey"]),j=e,k="function"==typeof(b=j);if(!k)try{j=d.Children.only(e)}catch(l){throw Error("Each Flipped component must wrap a single child")}i.scale||i.translate||i.opacity||p.assign(i,{translate:!0,scale:!0,opacity:!0});var m=((c={})[q.DATA_FLIP_CONFIG]=JSON.stringify(i),c);return void 0!==f?m[q.DATA_FLIP_ID]=String(f):g&&(m[q.DATA_INVERSE_FLIP_ID]=String(g)),void 0!==h&&(m[q.DATA_PORTAL_KEY]=h),k?j(m):(0,d.cloneElement)(j,m)},U=function(a){var b=a.children,c=a.flipId,e=a.shouldFlip,f=a.shouldInvert,g=a.onAppear,h=a.onStart,i=a.onStartImmediate,j=a.onComplete,k=a.onExit,l=a.onSpringUpdate,m=P(a,["children","flipId","shouldFlip","shouldInvert","onAppear","onStart","onStartImmediate","onComplete","onExit","onSpringUpdate"]);return b?m.inverseFlipId?d.createElement(T,Object.assign({},m),b):d.createElement(R.Consumer,null,function(a){return d.createElement(Q.Consumer,null,function(n){return p.isObject(n)&&c&&(n[c]={shouldFlip:e,shouldInvert:f,onAppear:g,onStart:h,onStartImmediate:i,onComplete:j,onExit:k,onSpringUpdate:l}),d.createElement(T,Object.assign({flipId:c},m,{portalKey:a}),b)})}):null};U.displayName="Flipped"},9287:function(a,b,c){c.d(b,{TA:function(){return m}});var d,e,f,g,h=c(7294);function i(){return(i=Object.assign||function(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a}).apply(this,arguments)}function j(a){var b=a.nativeEvent;return window.TouchEvent?b instanceof TouchEvent:"touches"in b}function k(a){return a.nativeEvent instanceof MouseEvent}function l(a){return j(a)?{x:a.touches[0].pageX,y:a.touches[0].pageY}:k(a)?{x:a.pageX,y:a.pageY}:null}function m(a,b){var c=void 0===b?{}:b,d=c.threshold,e=void 0===d?400:d,m=c.captureEvent,n=void 0!==m&&m,o=c.detect,p=void 0===o?g.BOTH:o,q=c.cancelOnMovement,r=void 0!==q&&q,s=c.filterEvents,t=c.onStart,u=c.onMove,v=c.onFinish,w=c.onCancel,x=(0,h.useRef)(!1),y=(0,h.useRef)(!1),z=(0,h.useRef)(),A=(0,h.useRef)(a),B=(0,h.useRef)(null),C=(0,h.useCallback)(function(a){return function(b){if(!y.current&&(k(b)||j(b))&&(void 0===s||s(b))){B.current=l(b),n&&b.persist();var c=void 0===a?{}:{context:a};null==t||t(b,c),y.current=!0,z.current=setTimeout(function(){A.current&&(A.current(b,c),x.current=!0)},e)}}},[n,s,t,e]),D=(0,h.useCallback)(function(a,b){return function(c){if(k(c)||j(c)){B.current=null,n&&c.persist();var d=void 0===a?{}:{context:a};x.current?null==v||v(c,d):y.current&&(null==w||w(c,i({},d,{reason:null!=b?b:f.CANCELED_BY_TIMEOUT}))),x.current=!1,y.current=!1,void 0!==z.current&&clearTimeout(z.current)}}},[n,v,w]),E=(0,h.useCallback)(function(a){return function(b){if(null==u||u(b,{context:a}),r&&B.current){var c=l(b);if(c){var d=!0===r?25:r,e={x:Math.abs(c.x-B.current.x),y:Math.abs(c.y-B.current.y)};(e.x>d||e.y>d)&&D(a,f.CANCELED_BY_MOVEMENT)(b)}}}},[D,r,u]);return(0,h.useEffect)(function(){return function(){void 0!==z.current&&clearTimeout(z.current)}},[]),(0,h.useEffect)(function(){A.current=a},[a]),(0,h.useMemo)(function(){return function(b){var c={onMouseDown:C(b),onMouseMove:E(b),onMouseUp:D(b),onMouseLeave:D(b)},d={onTouchStart:C(b),onTouchMove:E(b),onTouchEnd:D(b)};return null===a?{}:p===g.MOUSE?c:p===g.TOUCH?d:i({},c,d)}},[a,D,p,E,C])}(d=f||(f={})).CANCELED_BY_MOVEMENT="canceled-by-movement",d.CANCELED_BY_TIMEOUT="canceled-by-timeout",(e=g||(g={})).BOTH="both",e.MOUSE="mouse",e.TOUCH="touch"},139:function(a,b,c){/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var d=c(7294),e=c(1688),f="function"==typeof Object.is?Object.is:function(a,b){return a===b&&(0!==a||1/a==1/b)||a!=a&&b!=b},g=e.useSyncExternalStore,h=d.useRef,i=d.useEffect,j=d.useMemo,k=d.useDebugValue;b.useSyncExternalStoreWithSelector=function(a,b,c,d,e){var l=h(null);if(null===l.current){var m={hasValue:!1,value:null};l.current=m}else m=l.current;l=j(function(){function a(a){if(!i){if(i=!0,g=a,a=d(a),void 0!==e&&m.hasValue){var b=m.value;if(e(b,a))return h=b}return h=a}if(b=h,f(g,a))return b;var c=d(a);return void 0!==e&&e(b,c)?b:(g=a,h=c)}var g,h,i=!1,j=void 0===c?null:c;return[function(){return a(b())},null===j?void 0:function(){return a(j())}]},[b,c,d,e]);var n=g(a,l[0],l[1]);return i(function(){m.hasValue=!0,m.value=n},[n]),k(n),n}},2798:function(a,b,c){a.exports=c(139)},6902:function(a,b,c){c.d(b,{ZP:function(){return k}});let d=a=>{let b,c=new Set,d=(a,d)=>{let e="function"==typeof a?a(b):a;if(e!==b){let f=b;b=(null!=d?d:"object"!=typeof e)?e:Object.assign({},b,e),c.forEach(a=>a(b,f))}},e=()=>b,f=a=>(c.add(a),()=>c.delete(a)),g=()=>c.clear(),h={setState:d,getState:e,subscribe:f,destroy:g};return b=a(d,e,h),h},e=a=>a?d(a):d;var f=c(7294),g=c(2798);let{useSyncExternalStoreWithSelector:h}=g,i=a=>{let b="function"==typeof a?e(a):a,c=(a,c)=>(function(a,b=a.getState,c){let d=h(a.subscribe,a.getState,a.getServerState||a.getState,b,c);return(0,f.useDebugValue)(d),d})(b,a,c);return Object.assign(c,b),c},j=a=>a?i(a):i;var k=j},1438:function(a,b,c){c.d(b,{Z:function(){return d}});function d(a,b){if(!(a instanceof b))throw TypeError("Cannot call a class as a function")}},9396:function(a,b,c){c.d(b,{Z:function(){return d}});function d(a,b){return b=null!=b?b:{},Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):(function(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);c.push.apply(c,d)}return c})(Object(b)).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))}),a}},9534:function(a,b,c){c.d(b,{Z:function(){return d}});function d(a,b){if(null==a)return{};var c,d,e=function(a,b){if(null==a)return{};var c,d,e={},f=Object.keys(a);for(d=0;d<f.length;d++)c=f[d],b.indexOf(c)>=0||(e[c]=a[c]);return e}(a,b);if(Object.getOwnPropertySymbols){var f=Object.getOwnPropertySymbols(a);for(d=0;d<f.length;d++)c=f[d],!(b.indexOf(c)>=0)&&Object.prototype.propertyIsEnumerable.call(a,c)&&(e[c]=a[c])}return e}}}])