(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{YmWs:function(e,r,t){"use strict";t.r(r);var n=t("o0o1"),a=t.n(n),c=t("yXPU"),o=t.n(c),s=t("t3Un");function u(e){return i.apply(this,arguments)}function i(){return i=o()(a.a.mark(function e(r){return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",Object(s["a"])("/api/".concat(r)));case 1:case"end":return e.stop()}},e,this)})),i.apply(this,arguments)}r["default"]={namespace:"error",state:{error:"",isloading:!1},effects:{query:a.a.mark(function e(r,t){var n,c,o;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=r.payload,c=t.call,o=t.put,e.next=4,c(u,n.code);case 4:return e.next=6,o({type:"trigger",payload:n.code});case 6:case"end":return e.stop()}},e,this)})},reducers:{trigger:function(e,r){return{error:r.payload}}}}}}]);