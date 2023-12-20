(()=>{var e={184:(e,t)=>{var r;!function(){"use strict";var a={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var o=typeof r;if("string"===o||"number"===o)e.push(r);else if(Array.isArray(r)){if(r.length){var l=n.apply(null,r);l&&e.push(l)}}else if("object"===o){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var i in r)a.call(r,i)&&r[i]&&e.push(i)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()}},t={};function r(a){var n=t[a];if(void 0!==n)return n.exports;var o=t[a]={exports:{}};return e[a](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var a in t)r.o(t,a)&&!r.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{"use strict";const e=window.wp.i18n,t=window.wp.blocks,a=window.wp.plugins,n=JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"wpt/production-premiere","version":"0.1.0","title":"Premiere","category":"text","description":"Show Premiere Date of production.","icon":"calendar-alt","usesContext":["postType","postId"],"attributes":{"textAlign":{"type":"string","default":"left"},"tagName":{"type":"string","default":"div"},"prefix":{"type":"string","default":""},"suffix":{"type":"string","default":""}},"example":{"viewportWidth":300},"supports":{"align":true,"color":{"gradients":true,"background":true,"text":true,"link":true},"spacing":{"margin":true,"padding":true},"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontWeight":true,"__experimentalFontStyle":true,"__experimentalTextTransform":true,"__experimentalLetterSpacing":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}},"multiple":true,"html":false,"reusable":false},"textdomain":"theater-production-blocks","editorScript":"file:premiere.js","editorStyle":"file:./premiere.css","style":"file:./style-premiere.css"}'),o=window.React;var l=r(184),i=r.n(l);const s=window.wp.components,c=window.wp.coreData,p=window.wp.blockEditor,u=window.wp.date,m=window.wp.element,d=({placeholder:e,value:t,dateFormat:r,onChange:a,className:n})=>(0,m.createElement)(s.Dropdown,{className:n,position:"bottom left",renderToggle:({onToggle:a,isOpen:n})=>(0,m.createElement)(s.Button,{variant:"tertiary",onClick:a,"aria-expanded":n,"aria-live":"polite"},t?(0,u.dateI18n)(r,t):e),renderContent:()=>(0,m.createElement)(s.DatePicker,{currentDate:t,onChange:a})});d.Content=({value:e,dateFormat:t,className:r})=>e&&(0,m.createElement)("time",{className:r,dateTime:(0,u.dateI18n)("c",e)},(0,u.dateI18n)(t,e));const f=d,g=["core/bold","core/image","core/italic","core/text-color"],x=(0,e.__)("Prefix","theater-production-blocks"),h=(0,e.__)("Prefix","theater-production-blocks")+" ",w=({prefix:e,setAttributes:t,isSelected:r,label:a=x,placeholder:n=h,tagName:l="span"})=>(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(p.RichText,{allowedFormats:g,className:"wpt-production-blocks__prefix",multiline:!1,"aria-label":a,placeholder:n,value:e,onChange:e=>t({prefix:e}),tagName:l}):(0,o.createElement)(o.Fragment,null,e?(0,o.createElement)(p.RichText.Content,{tagName:l,value:e}):(0,o.createElement)(o.Fragment,null))),_=(0,e.__)("Suffix","theater-production-blocks"),b=(0,e.__)("Suffix","theater-production-blocks")+" ",v=({suffix:e,setAttributes:t,isSelected:r,label:a=_,placeholder:n=b,tagName:l="span"})=>(0,o.createElement)(o.Fragment,null,r?(0,o.createElement)(p.RichText,{allowedFormats:g,className:"wpt-production-blocks__suffix",multiline:!1,"aria-label":a,placeholder:n,value:e,onChange:e=>t({suffix:e}),tagName:l}):(0,o.createElement)(o.Fragment,null,e?(0,o.createElement)(p.RichText.Content,{tagName:l,value:e}):(0,o.createElement)(o.Fragment,null))),y=window.Theater.ProductionBlocks.premiere.PostMetaKey,k=window.wp.data,E=window.Theater.ProductionBlocks.premiere.PostMetaKey,{name:S,...P}=n;(0,t.registerBlockType)(S,{...P,title:(0,e._x)("Premiere","block title","theater-production-blocks"),description:(0,e._x)("Show Premiere Date of production.","block description","theater-production-blocks"),edit:function({attributes:{textAlign:t,prefix:r,suffix:a},setAttributes:n,isSelected:l,context:{postType:m,postId:d}}){const g=(0,u.getSettings)(),x=(0,p.useBlockProps)({className:i()({[`has-text-align-${t}`]:t})}),[h,_]=(0,c.useEntityProp)("postType",m,"meta",d),b=h[y];return(0,o.createElement)(o.Fragment,null,(0,o.createElement)(p.BlockControls,{group:"block"},(0,o.createElement)(p.AlignmentControl,{value:t,onChange:e=>{n({textAlign:e})}})),(0,o.createElement)("div",{...x},(0,o.createElement)(s.Flex,{justify:"space-around"},(0,o.createElement)(s.FlexItem,null,(0,o.createElement)(w,{prefix:r,isSelected:l,setAttributes:n})),(0,o.createElement)(s.FlexItem,{className:"event__time"},b&&!l?(0,o.createElement)(f.Content,{className:"event__date-select",dateFormat:g.formats.date,value:b}):(0,o.createElement)(f,{className:"event__date-select",dateFormat:g.formats.date,value:b,onChange:e=>{_({...h,[y]:e})},placeholder:(0,e.__)("Choose a Date","theater-production-blocks")})),(0,o.createElement)(s.FlexItem,null,(0,o.createElement)(v,{suffix:a,isSelected:l,setAttributes:n})))))},save:function(){return null},transforms:{from:[{type:"block",blocks:["core/post-date"],transform:({content:e})=>(0,t.createBlock)(S,{content:e})}]}}),(0,a.registerPlugin)("premiere-slot-fill",{render:function(){const t=(0,k.useSelect)((e=>e("core/editor").getCurrentPost()),[]),[r,a]=(0,c.useEntityProp)("postType",t.type,"meta",t.id),n=r[E];return(0,o.createElement)(s.Fill,{name:"ProductionPluginPostStatusInfo"},(0,o.createElement)(p.RichText,{tagName:"p",className:"css-1imalal",value:(0,e.__)("Premiere Date","theater-production-blocks")}),(0,o.createElement)(f,{label:(0,e.__)("Premiere Date","theater-production-blocks"),className:"event__date-select",dateFormat:(0,u.getSettings)().formats.date,value:n,onChange:e=>{a({...r,[E]:e})},placeholder:(0,e.__)("Choose a Date","theater-production-blocks")}))}})})()})();