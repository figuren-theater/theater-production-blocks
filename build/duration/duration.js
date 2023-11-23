!function(){var e={184:function(e,t){var r;!function(){"use strict";var n={}.hasOwnProperty;function o(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var a=typeof r;if("string"===a||"number"===a)e.push(r);else if(Array.isArray(r)){if(r.length){var l=o.apply(null,r);l&&e.push(l)}}else if("object"===a){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var i in r)n.call(r,i)&&r[i]&&e.push(i)}}}return e.join(" ")}e.exports?(o.default=o,e.exports=o):void 0===(r=function(){return o}.apply(t,[]))||(e.exports=r)}()}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={exports:{}};return e[n](a,a.exports,r),a.exports}r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){"use strict";var e=window.wp.i18n,t=window.wp.blocks,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wpt/production-duration","version":"0.1.0","title":"Duration","category":"text","description":"Shows duration of current production.","icon":"clock","usesContext":["postType","postId"],"attributes":{"textAlign":{"type":"string"},"tagName":{"type":"string","default":"div"},"prefix":{"type":"string","default":""},"suffix":{"type":"string","default":""},"humanReadable":{"type":"boolean"}},"example":{"viewportWidth":300},"supports":{"align":true,"color":{"gradients":true,"background":true,"text":true},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}},"multiple":true,"html":false,"reusable":false},"textdomain":"theater-production-blocks","editorScript":"file:duration.js","editorStyle":"file:./duration.css","style":"file:./style-duration.css"}'),o=window.wp.element,a=r(184),l=r.n(a),i=window.wp.components,u=window.wp.coreData,c=window.wp.blockEditor,s=window.wp.serverSideRender,p=r.n(s);const d=["core/bold","core/image","core/italic","core/text-color"],m=(0,e.__)("Prefix","theater-production-blocks"),f=(0,e.__)("Prefix","theater-production-blocks")+" ",h=({prefix:e,setAttributes:t,isSelected:r,label:n=m,placeholder:a=f,tagName:l="span"})=>(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(c.RichText,{allowedFormats:d,className:"t7b4-production-blocks__prefix",multiline:!1,"aria-label":n,placeholder:a,value:e,onChange:e=>t({prefix:e}),tagName:l}):(0,o.createElement)(o.Fragment,null,e?(0,o.createElement)(c.RichText.Content,{tagName:l,value:e}):(0,o.createElement)(o.Fragment,null))),g=(0,e.__)("Suffix","theater-production-blocks"),x=(0,e.__)("Suffix","theater-production-blocks")+" ",b=({suffix:e,setAttributes:t,isSelected:r,label:n=g,placeholder:a=x,tagName:l="span"})=>(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(c.RichText,{allowedFormats:d,className:"t7b4-production-blocks__suffix",multiline:!1,"aria-label":n,placeholder:a,value:e,onChange:e=>t({suffix:e}),tagName:l}):(0,o.createElement)(o.Fragment,null,e?(0,o.createElement)(c.RichText.Content,{tagName:l,value:e}):(0,o.createElement)(o.Fragment,null))),w=window.Theater.ProductionBlocks.duration.PostMetaKey,{name:y,..._}=n;(0,t.registerBlockType)(y,{..._,title:(0,e._x)("Duration","block title","theater-production-blocks"),description:(0,e._x)("Shows duration of current production.","block description","theater-production-blocks"),edit:function({attributes:{textAlign:t,prefix:r,suffix:n,humanReadable:a},setAttributes:s,isSelected:d,context:{postType:m,postId:f}}){const g=(0,c.useBlockProps)({className:l()({[`has-text-align-${t}`]:t})}),[x,y]=(0,u.useEntityProp)("postType",m,"meta",f),_=x[w];return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(c.InspectorControls,null,(0,o.createElement)("div",{className:"block-editor-block-card"},(0,o.createElement)(i.ToggleControl,{label:(0,e.__)("Show human readable duration.","theater-production-blocks"),onChange:e=>s({humanReadable:e}),checked:a,help:a?(0,e.__)('Shows e.g. "2 hours 10 minutes".',"theater-production-blocks"):(0,e.__)('Shows pure "130" minutes only.',"theater-production-blocks")}))),(0,o.createElement)(c.BlockControls,{group:"block"},(0,o.createElement)(c.AlignmentControl,{value:t,onChange:e=>{s({textAlign:e})}})),(0,o.createElement)("div",{...g},a&&!d?(0,o.createElement)((()=>(0,o.createElement)(p(),{block:"wpt/production-duration",attributes:{textAlign:t,prefix:r,suffix:n,humanReadable:a},urlQueryArgs:{metaFieldValue:_}})),null):(0,o.createElement)(i.Flex,{justify:"space-around"},(0,o.createElement)(i.FlexItem,null,(0,o.createElement)(h,{prefix:r,isSelected:d,setAttributes:s})),(0,o.createElement)(i.FlexItem,null,(0,o.createElement)(i.TextControl,{type:"number",isShiftStepEnabled:!0,shiftStep:"5",step:"5",min:0,placeholder:"80",value:_,onChange:e=>{y({...x,[w]:e})},fontSize:"initial",width:"max-content",style:{all:"inherit"}})),(0,o.createElement)(i.FlexItem,null,(0,o.createElement)(b,{suffix:n,isSelected:d,setAttributes:s})))))},save:function(){return null}})}()}();