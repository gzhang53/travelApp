var Client=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";function o(e){e.preventDefault();let t=new Date;let n=new Date(document.getElementById("travelDay").value+"T00:00"),o=document.getElementById("cityName").value,r=Math.floor((n-t)/864e5);const a=`http://api.geonames.org/searchJSON?q=${o}&maxRows=10&username=gzhang53`;null!=o&&Client.getCoordinates(a).then(async e=>{await fetch("http://localhost:8081/geoname",{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify({cityGeo:e})})}).then(async()=>{await fetch("http://localhost:8081/weatherbit")}).then(async()=>{const e=await fetch("http://localhost:8081/pixabay");try{const t=await e.json();document.getElementById("img").src=""+t[t.length-1].img,document.getElementById("weather").innerHTML=`${r} days until your trip to ${t[t.length-1].cityname}, ${t[t.length-1].country}\n                <br> The temperature is ${t[t.length-1].temp} C degrees`}catch(e){console.log(e)}})}async function r(e){const t=await fetch(e);try{const e=await t.json(),n=e.geonames[0].lat,o=e.geonames[0].lng,r=e.geonames[0].name,a=[n,o,r,e.geonames[0].countryName];return console.log(e),a}catch(e){alert("Error from Geoname",e)}}n.r(t),n.d(t,"handleSubmit",(function(){return o})),n.d(t,"getCoordinates",(function(){return r}));n(0),n(1),n(2),n(3),n(4);alert("I exist ")}]);