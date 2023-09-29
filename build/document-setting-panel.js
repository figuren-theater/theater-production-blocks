!function(){"use strict";var e=window.wp.element,t=window.wp.i18n,n=window.wp.components,a=window.wp.coreData,o=window.wp.data,r=window.wp.editPost,i=window.wp.plugins,l=window.wp.blockEditor,c=window.wp.date;const d=({placeholder:t,value:a,dateFormat:o,onChange:r,className:i})=>(0,e.createElement)(n.Dropdown,{className:i,position:"bottom left",renderToggle:({onToggle:r,isOpen:i})=>(0,e.createElement)(n.Button,{variant:"tertiary",onClick:r,"aria-expanded":i,"aria-live":"polite"},a?(0,c.dateI18n)(o,a):t),renderContent:()=>(0,e.createElement)(n.DatePicker,{currentDate:a,onChange:r})});d.Content=({value:t,dateFormat:n,className:a})=>t&&(0,e.createElement)("time",{className:a,dateTime:(0,c.dateI18n)("c",t)},(0,c.dateI18n)(n,t));var s=d;const p=window.Theater.ProductionBlocks.duration.PostMetaKey,u="_theatre_base_prod_and_event__premiere",m="_theatre_base_prod_and_event__targetgroup";(0,i.registerPlugin)("production-document-setting-panel",{render:()=>{const i=(0,o.useSelect)((e=>e("core/editor").getCurrentPost()),[]);if("ft_production"!==i.type)return"";const d=(0,c.__experimentalGetSettings)(),[_,w]=(0,a.useEntityProp)("postType",i.type,"meta",i.id);return(0,e.createElement)(r.PluginDocumentSettingPanel,{name:"production-document-setting-panel",icon:"art",title:(0,t.__)("Production Meta","theater-production-blocks"),className:"t7b4-production-document-setting-panel"},(0,e.createElement)("div",{className:"plugin-sidebar-content"},(0,e.createElement)(l.RichText,{tagName:"p",value:(0,t.__)("Premiere Date","theater-production-blocks")}),(0,e.createElement)(s,{className:"event__date-select",dateFormat:d.formats.date,value:_[u],onChange:e=>{w({..._,[u]:e})},placeholder:(0,t.__)("Choose a Date","theater-production-blocks")}),(0,e.createElement)(n.TextControl,{label:(0,t.__)("Targetgroup","theater-production-blocks"),value:_[m],onChange:e=>{w({..._,[m]:e})}}),(0,e.createElement)(n.__experimentalNumberControl,{label:(0,t.__)("Duration","theater-production-blocks"),isShiftStepEnabled:!0,shiftStep:"5",step:"5",min:0,placeholder:"80",value:_[p],onChange:e=>{w({..._,[p]:e})}}),(0,e.createElement)(l.RichText,{tagName:"p",className:"howto",value:(0,t.__)("Add the duration in Minutes.","theater-production-blocks")})))}})}();