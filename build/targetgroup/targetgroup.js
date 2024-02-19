(()=>{var e={967:(e,t)=>{var r;!function(){"use strict";var o={}.hasOwnProperty;function n(){for(var e="",t=0;t<arguments.length;t++){var r=arguments[t];r&&(e=l(e,a(r)))}return e}function a(e){if("string"==typeof e||"number"==typeof e)return e;if("object"!=typeof e)return"";if(Array.isArray(e))return n.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var t="";for(var r in e)o.call(e,r)&&e[r]&&(t=l(t,r));return t}function l(e,t){return t?e?e+" "+t:e+t:e}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()}},t={};function r(o){var n=t[o];if(void 0!==n)return n.exports;var a=t[o]={exports:{}};return e[o](a,a.exports,r),a.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.i18n,t=window.wp.blocks,o=window.wp.plugins,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wpt/production-targetgroup","version":"0.1.0","title":"Targetgroup","category":"text","description":"Shows targetgroup of current production.","icon":"groups","usesContext":["postType","postId"],"attributes":{"textAlign":{"type":"string"},"tagName":{"type":"string","default":"p"},"prefix":{"type":"string","default":""},"suffix":{"type":"string","default":""}},"example":{"viewportWidth":300},"supports":{"align":true,"color":{"gradients":true,"background":true,"text":true},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}},"multiple":true,"html":false,"reusable":false},"textdomain":"theater-production-blocks","editorScript":"file:targetgroup.js","editorStyle":"file:./targetgroup.css","style":"file:./style-targetgroup.css"}'),a=window.React;var l=r(967),i=r.n(l);const u=window.wp.components,c=window.wp.coreData,s=window.wp.blockEditor,p=["core/bold","core/image","core/italic","core/text-color"],g=(0,e.__)("Prefix","theater-production-blocks"),d=(0,e.__)("Prefix","theater-production-blocks")+" ",m=({prefix:e,setAttributes:t,isSelected:r,label:o=g,placeholder:n=d,tagName:l="span"})=>(0,a.createElement)(a.Fragment,null,r?(0,a.createElement)(s.RichText,{allowedFormats:p,className:"wpt-production-blocks__prefix",multiline:!1,"aria-label":o,placeholder:n,value:e,onChange:e=>t({prefix:e}),tagName:l}):(0,a.createElement)(a.Fragment,null,e?(0,a.createElement)(s.RichText.Content,{tagName:l,value:e}):(0,a.createElement)(a.Fragment,null))),f=(0,e.__)("Suffix","theater-production-blocks"),x=(0,e.__)("Suffix","theater-production-blocks")+" ",h=({suffix:e,setAttributes:t,isSelected:r,label:o=f,placeholder:n=x,tagName:l="span"})=>(0,a.createElement)(a.Fragment,null,r?(0,a.createElement)(s.RichText,{allowedFormats:p,className:"wpt-production-blocks__suffix",multiline:!1,"aria-label":o,placeholder:n,value:e,onChange:e=>t({suffix:e}),tagName:l}):(0,a.createElement)(a.Fragment,null,e?(0,a.createElement)(s.RichText.Content,{tagName:l,value:e}):(0,a.createElement)(a.Fragment,null))),b=window.Theater.ProductionBlocks.targetgroup.PostMetaKey,w=window.wp.data,y=window.Theater.ProductionBlocks.targetgroup.PostMetaKey,{name:_,...v}=n;(0,t.registerBlockType)(_,{...v,title:(0,e._x)("Targetgroup","block title","theater-production-blocks"),description:(0,e._x)("Shows targetgroup of current production.","block description","theater-production-blocks"),edit:function({attributes:{textAlign:t,prefix:r,suffix:o},setAttributes:n,isSelected:l,context:{postType:p,postId:g}}){const d=(0,s.useBlockProps)({className:i()({[`has-text-align-${t}`]:t})}),[f,x]=(0,c.useEntityProp)("postType",p,"meta",g),w=f[b];return(0,a.createElement)(a.Fragment,null,(0,a.createElement)(s.BlockControls,{group:"block"},(0,a.createElement)(s.AlignmentControl,{value:t,onChange:e=>{n({textAlign:e})}})),(0,a.createElement)("div",{...d},(0,a.createElement)(u.Flex,{justify:"space-around"},(0,a.createElement)(u.FlexItem,null,(0,a.createElement)(m,{prefix:r,isSelected:l,setAttributes:n})),(0,a.createElement)(u.FlexItem,null,(0,a.createElement)(s.RichText,{tagName:"p",value:w,onChange:e=>{x({...f,[b]:e})},placeholder:(0,e.__)("Targetgroup","theater-production-blocks")})),(0,a.createElement)(u.FlexItem,null,(0,a.createElement)(h,{suffix:o,isSelected:l,setAttributes:n})))))},save:function(){return null}}),(0,o.registerPlugin)("targetgroup-slot-fill",{render:function(){const t=(0,w.useSelect)((e=>e("core/editor").getCurrentPost()),[]),[r,o]=(0,c.useEntityProp)("postType",t.type,"meta",t.id),n=r[y];return(0,a.createElement)(u.Fill,{name:"ProductionPluginPostStatusInfo"},(0,a.createElement)(u.TextControl,{label:(0,e.__)("Targetgroup","theater-production-blocks"),value:n,onChange:e=>{o({...r,[y]:e})}}))}})})()})();