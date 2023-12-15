<?php
/**
 * Figuren_Theater Production_Blocks.
 * 
 * Pattern for a light variant of a typical production page,
 * including all theater-relevant meta-data.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks\Patterns;

use Figuren_Theater\Production_Blocks\Registration;
 
return array(
	'title'      => __( 'Production Page: Light variant', 'theater-production-blocks' ),
	'categories' => array( 'page', 'columns', 'theater' ),
	'postTypes'  => (array) Registration\get_production_post_type(),
	'blockTypes' => array( 'core/post-content' ),
	'content'    => '<!-- wp:group {"align":"full","layout":{"inherit":true,"type":"constrained"}} -->
<div class="wp-block-group alignfull"><!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":"5%"}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"70%"} -->
<div class="wp-block-column" style="flex-basis:70%"><!-- wp:heading {"level":1,"align":"wide","style":{"typography":{"fontSize":"clamp(3rem, 6vw, 4.5rem)"},"spacing":{"margin":{"bottom":"0px"}}}} -->
<h1 class="wp-block-heading alignwide" id="flattern-eine-sammlung-vogelbezogener-ephemera-1" style="margin-bottom:0px;font-size:clamp(3rem, 6vw, 4.5rem)">Ein Stück übers <em>Flattern</em></h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Ein Untertitel verleiht Flügel: <em><strong>Vogelbezogene Ephemera</strong></em></p>
<!-- /wp:paragraph --></div>
<!-- /wp:column -->

<!-- wp:column {"width":""} -->
<div class="wp-block-column"></div>
<!-- /wp:column --></div>
<!-- /wp:columns -->

<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":"5%"}}} -->
<div class="wp-block-columns alignwide"><!-- wp:column {"width":"70%","style":{"spacing":{"padding":{"bottom":"32px"}}}} -->
<div class="wp-block-column" style="padding-bottom:32px;flex-basis:70%"><!-- wp:post-featured-image {"aspectRatio":"4/3"} /--></div>
<!-- /wp:column -->

<!-- wp:column {"width":""} -->
<div class="wp-block-column"><!-- wp:pattern {"slug":"wpt/production-important-metadata"} /--></div>
<!-- /wp:column --></div>
<!-- /wp:columns --></div>
<!-- /wp:group -->',
);
