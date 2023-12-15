<?php
/**
 * Figuren_Theater Production_Blocks.
 * 
 * Pattern for all theater-relevant meta-data
 * to be used on a typical production page.
 *
 * @package figuren-theater/theater-production-blocks
 */

 namespace Figuren_Theater\Production_Blocks\Patterns;

 use Figuren_Theater\Production_Blocks\Registration;
 
return array(
	'title'         => __( 'Production Meta Data', 'theater-production-blocks' ),
	'description'   => __( 'All essential parts of a theater production.', 'theater-production-blocks' ),
	'keywords'      => array( 
		__( 'Targetgroup', 'theater-production-blocks' ),
		__( 'Duration', 'theater-production-blocks' ),
		__( 'Premiere', 'theater-production-blocks' ),
		__( 'Location', 'theater-production-blocks' ),
	),
	'viewportWidth' => 300,
	'categories'    => array( 'text', 'columns', 'theater' ),
	'postTypes'     => (array) Registration\get_production_post_type(),
	// 'blockTypes'    => array( 'core/post-content' ),
	'content'       => '<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"fontSize":"large"} -->
<h3 class="has-large-font-size"><em>' . __( 'Targetgroup', 'theater-production-blocks' ) . '</em></h3>
<!-- /wp:heading -->

<!-- wp:wpt/production-targetgroup /--></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"fontSize":"large"} -->
<h3 class="has-large-font-size"><em>' . __( 'Duration', 'theater-production-blocks' ) . '</em></h3>
<!-- /wp:heading -->

<!-- wp:wpt/production-duration {"suffix":"Minuten","humanReadable":false} /--></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"fontSize":"large"} -->
<h3 class="has-large-font-size"><em>' . __( 'Premiere', 'theater-production-blocks' ) . '</em></h3>
<!-- /wp:heading -->

<!-- wp:wpt/production-premiere /--></div>
<!-- /wp:group -->

<!-- wp:group {"layout":{"type":"flex","orientation":"vertical"}} -->
<div class="wp-block-group"><!-- wp:heading {"level":3,"fontSize":"large"} -->
<h3 class="has-large-font-size"><em>' . __( 'Location', 'theater-production-blocks' ) . '</em></h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Stadttheater auf dem Land</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
);
