(()=>{"use strict";const t=window.wp.blocks,o=window.wp.i18n,e=window.Theater.ProductionPosttype.ShadowTaxonomy;(0,t.registerBlockVariation)("core/post-terms",{name:"wpt/ft_production_shadow",title:(0,o.__)("Related Productions","theater-production-blocks"),description:(0,o.__)("Lists the Production(s) related to the current content.","theater-production-blocks"),keywords:[(0,o.__)("relates","theater-production-blocks"),(0,o.__)("staging","theater-production-blocks"),(0,o.__)("theater","theater-production-blocks"),(0,o.__)("connected","theater-production-blocks")],icon:"art",isDefault:!1,attributes:{term:e},isActive:t=>t.term===e})})();