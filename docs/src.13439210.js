parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"YvuL":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.create=void 0;var e={};!function t(e,n,a,r){var o=!!(e.Worker&&e.Blob&&e.Promise&&e.OffscreenCanvas&&e.OffscreenCanvasRenderingContext2D&&e.HTMLCanvasElement&&e.HTMLCanvasElement.prototype.transferControlToOffscreen&&e.URL&&e.URL.createObjectURL);function i(){}function l(t){var a=n.exports.Promise,r=void 0!==a?a:e.Promise;return"function"==typeof r?new r(t):(t(i,i),null)}var s,c,u,d,f,h,m=(u=Math.floor(1e3/60),d={},f=0,"function"==typeof requestAnimationFrame&&"function"==typeof cancelAnimationFrame?(s=function(t){var e=Math.random();return d[e]=requestAnimationFrame(function n(a){f===a||f+u-1<a?(f=a,delete d[e],t()):d[e]=requestAnimationFrame(n)}),e},c=function(t){d[t]&&cancelAnimationFrame(d[t])}):(s=function(t){return setTimeout(t,u)},c=function(t){return clearTimeout(t)}),{frame:s,cancel:c}),g=function(){var e,n,r={};return function(){if(e)return e;if(!a&&o){var i=["var CONFETTI, SIZE = {}, module = {};","("+t.toString()+")(this, module, true, SIZE);","onmessage = function(msg) {","  if (msg.data.options) {","    CONFETTI(msg.data.options).then(function () {","      if (msg.data.callback) {","        postMessage({ callback: msg.data.callback });","      }","    });","  } else if (msg.data.reset) {","    CONFETTI && CONFETTI.reset();","  } else if (msg.data.resize) {","    SIZE.width = msg.data.resize.width;","    SIZE.height = msg.data.resize.height;","  } else if (msg.data.canvas) {","    SIZE.width = msg.data.canvas.width;","    SIZE.height = msg.data.canvas.height;","    CONFETTI = module.exports.create(msg.data.canvas);","  }","}"].join("\n");try{e=new Worker(URL.createObjectURL(new Blob([i])))}catch(s){return void 0!==typeof console&&"function"==typeof console.warn&&console.warn("🎊 Could not load worker",s),null}!function(t){function e(e,n){t.postMessage({options:e||{},callback:n})}t.init=function(e){var n=e.transferControlToOffscreen();t.postMessage({canvas:n},[n])},t.fire=function(a,o,i){if(n)return e(a,null),n;var s=Math.random().toString(36).slice(2);return n=l(function(o){function l(e){e.data.callback===s&&(delete r[s],t.removeEventListener("message",l),n=null,i(),o())}t.addEventListener("message",l),e(a,s),r[s]=l.bind(null,{data:{callback:s}})})},t.reset=function(){for(var e in t.postMessage({reset:!0}),r)r[e](),delete r[e]}}(e)}return e}}(),b={particleCount:50,angle:90,spread:45,startVelocity:45,decay:.9,gravity:1,drift:0,ticks:200,x:.5,y:.5,shapes:["square","circle"],zIndex:100,colors:["#26ccff","#a25afd","#ff5e7e","#88ff5a","#fcff42","#ffa62d","#ff36ff"],disableForReducedMotion:!1,scalar:1};function v(t,e,n){return function(t,e){return e?e(t):t}(t&&null!=t[e]?t[e]:b[e],n)}function p(t){return t<0?0:Math.floor(t)}function M(t){return parseInt(t,16)}function y(t){return t.map(w)}function w(t){var e=String(t).replace(/[^0-9a-f]/gi,"");return e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),{r:M(e.substring(0,2)),g:M(e.substring(2,4)),b:M(e.substring(4,6))}}function x(t){t.width=document.documentElement.clientWidth,t.height=document.documentElement.clientHeight}function C(t){var e=t.getBoundingClientRect();t.width=e.width,t.height=e.height}function T(t,e,n,o,i){var s,c,u=e.slice(),d=t.getContext("2d"),f=l(function(e){function l(){s=c=null,d.clearRect(0,0,o.width,o.height),i(),e()}s=m.frame(function e(){!a||o.width===r.width&&o.height===r.height||(o.width=t.width=r.width,o.height=t.height=r.height),o.width||o.height||(n(t),o.width=t.width,o.height=t.height),d.clearRect(0,0,o.width,o.height),(u=u.filter(function(t){return function(t,e){e.x+=Math.cos(e.angle2D)*e.velocity+e.drift,e.y+=Math.sin(e.angle2D)*e.velocity+e.gravity,e.wobble+=e.wobbleSpeed,e.velocity*=e.decay,e.tiltAngle+=.1,e.tiltSin=Math.sin(e.tiltAngle),e.tiltCos=Math.cos(e.tiltAngle),e.random=Math.random()+2,e.wobbleX=e.x+10*e.scalar*Math.cos(e.wobble),e.wobbleY=e.y+10*e.scalar*Math.sin(e.wobble);var n=e.tick++/e.totalTicks,a=e.x+e.random*e.tiltCos,r=e.y+e.random*e.tiltSin,o=e.wobbleX+e.random*e.tiltCos,i=e.wobbleY+e.random*e.tiltSin;if(t.fillStyle="rgba("+e.color.r+", "+e.color.g+", "+e.color.b+", "+(1-n)+")",t.beginPath(),"circle"===e.shape)t.ellipse?t.ellipse(e.x,e.y,Math.abs(o-a)*e.ovalScalar,Math.abs(i-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI):function(t,e,n,a,r,o,i,l,s){t.save(),t.translate(e,n),t.rotate(o),t.scale(a,r),t.arc(0,0,1,i,l,s),t.restore()}(t,e.x,e.y,Math.abs(o-a)*e.ovalScalar,Math.abs(i-r)*e.ovalScalar,Math.PI/10*e.wobble,0,2*Math.PI);else if("star"===e.shape)for(var l=Math.PI/2*3,s=4*e.scalar,c=8*e.scalar,u=e.x,d=e.y,f=5,h=Math.PI/f;f--;)u=e.x+Math.cos(l)*c,d=e.y+Math.sin(l)*c,t.lineTo(u,d),l+=h,u=e.x+Math.cos(l)*s,d=e.y+Math.sin(l)*s,t.lineTo(u,d),l+=h;else t.moveTo(Math.floor(e.x),Math.floor(e.y)),t.lineTo(Math.floor(e.wobbleX),Math.floor(r)),t.lineTo(Math.floor(o),Math.floor(i)),t.lineTo(Math.floor(a),Math.floor(e.wobbleY));return t.closePath(),t.fill(),e.tick<e.totalTicks}(d,t)})).length?s=m.frame(e):l()}),c=l});return{addFettis:function(t){return u=u.concat(t),f},canvas:t,promise:f,reset:function(){s&&m.cancel(s),c&&c()}}}function I(t,n){var a,r=!t,i=!!v(n||{},"resize"),s=v(n,"disableForReducedMotion",Boolean),c=o&&!!v(n||{},"useWorker")?g():null,u=r?x:C,d=!(!t||!c)&&!!t.__confetti_initialized,f="function"==typeof matchMedia&&matchMedia("(prefers-reduced-motion)").matches;function h(e,n,r){for(var o,i,l,s,c,d=v(e,"particleCount",p),f=v(e,"angle",Number),h=v(e,"spread",Number),m=v(e,"startVelocity",Number),g=v(e,"decay",Number),b=v(e,"gravity",Number),M=v(e,"drift",Number),w=v(e,"colors",y),x=v(e,"ticks",Number),C=v(e,"shapes"),I=v(e,"scalar"),k=function(t){var e=v(t,"origin",Object);return e.x=v(e,"x",Number),e.y=v(e,"y",Number),e}(e),E=d,S=[],F=t.width*k.x,N=t.height*k.y;E--;)S.push((o={x:F,y:N,angle:f,spread:h,startVelocity:m,color:w[E%w.length],shape:C[(s=0,c=C.length,Math.floor(Math.random()*(c-s))+s)],ticks:x,decay:g,gravity:b,drift:M,scalar:I},i=void 0,l=void 0,i=o.angle*(Math.PI/180),l=o.spread*(Math.PI/180),{x:o.x,y:o.y,wobble:10*Math.random(),wobbleSpeed:Math.min(.11,.1*Math.random()+.05),velocity:.5*o.startVelocity+Math.random()*o.startVelocity,angle2D:-i+(.5*l-Math.random()*l),tiltAngle:(.5*Math.random()+.25)*Math.PI,color:o.color,shape:o.shape,tick:0,totalTicks:o.ticks,decay:o.decay,drift:o.drift,random:Math.random()+2,tiltSin:0,tiltCos:0,wobbleX:0,wobbleY:0,gravity:3*o.gravity,ovalScalar:.6,scalar:o.scalar}));return a?a.addFettis(S):(a=T(t,S,u,n,r)).promise}function m(n){var o=s||v(n,"disableForReducedMotion",Boolean),m=v(n,"zIndex",Number);if(o&&f)return l(function(t){t()});r&&a?t=a.canvas:r&&!t&&(t=function(t){var e=document.createElement("canvas");return e.style.position="fixed",e.style.top="0px",e.style.left="0px",e.style.pointerEvents="none",e.style.zIndex=t,e}(m),document.body.appendChild(t)),i&&!d&&u(t);var g={width:t.width,height:t.height};function b(){if(c){var e={getBoundingClientRect:function(){if(!r)return t.getBoundingClientRect()}};return u(e),void c.postMessage({resize:{width:e.width,height:e.height}})}g.width=g.height=null}function p(){a=null,i&&e.removeEventListener("resize",b),r&&t&&(document.body.removeChild(t),t=null,d=!1)}return c&&!d&&c.init(t),d=!0,c&&(t.__confetti_initialized=!0),i&&e.addEventListener("resize",b,!1),c?c.fire(n,g,p):h(n,g,p)}return m.reset=function(){c&&c.reset(),a&&a.reset()},m}function k(){return h||(h=I(null,{useWorker:!0,resize:!0})),h}n.exports=function(){return k().apply(this,arguments)},n.exports.reset=function(){k().reset()},n.exports.create=I}(function(){return"undefined"!=typeof window?window:"undefined"!=typeof self?self:this||{}}(),e,!1);var n=e.exports;exports.default=n;var a=e.exports.create;exports.create=a;
},{}],"fUdq":[function(require,module,exports) {
"use strict";var e=t(require("canvas-confetti"));function t(e){return e&&e.__esModule?e:{default:e}}function n(e){return a(e)||o(e)||c(e)||r()}function r(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}function a(e){if(Array.isArray(e))return s(e)}function i(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=c(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,s=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return i=e.done,e},e:function(e){s=!0,a=e},f:function(){try{i||null==n.return||n.return()}finally{if(s)throw a}}}}function c(e,t){if(e){if("string"==typeof e)return s(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?s(e,t):void 0}}function s(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var u=new Worker("https://osamahanoun.github.io/genetic-algorithm-timetable-scheduler/worker.8ff35a27.js"),l=!1,d=document.getElementById("go-button"),f=document.getElementById("setup-form"),m=document.getElementById("setup-form-button"),h=document.getElementById("best-fitness-badge"),y=document.getElementById("conflicts-badge"),p=document.getElementById("out-of-range-badge"),v=document.getElementById("over-number-of-days-badge"),b=document.getElementById("tables-container");function g(e){d.innerText=e}function E(){T();var t=200,n={origin:{y:.7}};function r(r,o){(0,e.default)(Object.assign({},n,o,{particleCount:Math.floor(t*r)}))}r(.25,{spread:26,startVelocity:55}),r(.2,{spread:60}),r(.35,{spread:100,decay:.91,scalar:.8}),r(.1,{spread:120,startVelocity:25,decay:.92,scalar:1.2}),r(.1,{spread:120,startVelocity:45})}function _(e){var t=e.brokenConstrains,n=t.teacherConflicts,r=t.overNumDays,o=t.outOfRangeDay,a=I(e.timetable);b.innerHTML="";for(var i=0;i<a.length/5;i++){var c=5*i,s=c+5,u=w(a.slice(c,s));b.appendChild(u)}var l=(n*=-1)+(o*=-1)+(r*=-1);h.innerText=l+"",y.innerText=n+"",p.innerText=o+"",v.innerText=r+"",0===l&&h.classList.add("green"),0===n&&y.classList.add("green"),0===o&&p.classList.add("green"),0===r&&v.classList.add("green"),n<0&&y.classList.remove("green"),o<0&&p.classList.remove("green"),r<0&&v.classList.remove("green")}function L(e){var t=new FormData(e);return Object.fromEntries(t)}function T(){d.innerText="Finished"}function I(e){var t,r=[],o=void 0,a=void 0,c=[],s=i(e);try{for(s.s();!(t=s.n()).done;){var u=t.value;a!==u._room_id||o!==u._day._id?(c.length&&r.push(n(c)),o=u._day._id,a=u._room_id,c=["".concat(u._day._name),u._subject._name]):c.push(u._subject._name)}}catch(l){s.e(l)}finally{s.f()}return r.push(n(c)),r}function w(e){var t=document.createElement("table");t.classList.add("table","table-striped"),t.innerHTML=' \n  <thead>\n    <tr>\n      <th scope="col">#</th>\n      <th scope="col">1</th>\n      <th scope="col">2</th>\n      <th scope="col">3</th>\n      <th scope="col">4</th>\n      <th scope="col">5</th>\n      <th scope="col">6</th>\n      <th scope="col">7</th>\n      <th scope="col">8</th>\n    </tr>\n  </thead>';var n=document.createElement("tbody");return e.forEach(function(e){n.appendChild(function(e){var t=document.createElement("tr");t.innerHTML='<th scope="row">'.concat(e[0],"</th>\n    ");for(var n=1;n<e.length;n++){var r=document.createElement("td");r.innerText=e[n],t.appendChild(r)}return t}(e))}),t.appendChild(n),t}d.addEventListener("click",function(){m.click()}),"undefined"!=typeof Worker&&(u.onmessage=function(e){switch(e.data.eventType){case"newBestFitness":_(e.data.value);break;case"foundSolution":E();break;case"generationCount":g(e.data.value);break;case"noSolution":T()}},f.addEventListener("submit",function(e){var t;e.preventDefault(),l&&location.reload(),b.innerHTML="";var n=L(e.target),r=n.population,o=n.generations,a=n.candidates,i=n.mutationRate,c=n.rooms,s=n.conflict,d=n.outOfRange,f=n.overDays;u.postMessage({totalPopulation:+r,maxNumGeneration:+o,candidatesPerTournament:+a,mutationRate:+i,numRooms:+c,conflict:"on"===s?-1:0,outOfRange:"on"===d?-1:0,overDays:"on"===f?-1:0}),null===(t=document.getElementById("current-state"))||void 0===t||t.classList.remove("d-none"),l=!l}));
},{"canvas-confetti":"YvuL","./worker.ts":[["worker.8ff35a27.js","Aq5a"],"worker.8ff35a27.js.map","Aq5a"]}]},{},["fUdq"], null)
//# sourceMappingURL=https://osamahanoun.github.io/genetic-algorithm-timetable-scheduler/src.13439210.js.map