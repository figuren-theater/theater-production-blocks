<?php
declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Targetgroup;

use Figuren_Theater\Network\Post_Types;



/**
 * Production Targetgroup Block
 *
 * Show Targetgroup of production.
 *
 * @package           figuren-theater/theater-production-blocks
 */


const TARGETGROUP_META = '_theatre_base_prod_and_event__targetgroup';

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 */
function block_init() {
	\register_block_type(
		__DIR__,
		array(
			'render_callback' => __NAMESPACE__.'\\render_block',
		)
	);

	// register custom meta tag field
	// $post_types = [ THEATRE_BASE_PRODUCTION_CPT, THEATRE_BASE_EVENT_CPT ];
	$post_types = [
		Post_Types\Post_Type__ft_production::NAME,
		'post'
	];
	array_map(
		function( $post_type ) {
			\register_post_meta(
				$post_type,
				TARGETGROUP_META,
				[
					'show_in_rest' => true,
					'single' => true,
					'type' => 'string',
					'auth_callback' => function() {
						return \current_user_can('edit_posts');
					},
				]
			);
		},
		$post_types
	);


	$block = 'targetgroup';
	\wp_set_script_translations(
		"wpt-production-$block-editor-script",
		// 'wpt-production-targetgroup-editor-script',
		'theater-production-blocks',
		\plugin_dir_path( dirname((dirname(__FILE__)) ) ) . 'languages'
	);

}
\add_action( 'init', __NAMESPACE__.'\\block_init' );




/**
 * Renders the `theater-production-targetgroup` block on the server.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block default content.
 * @param WP_Block $block      Block instance.
 *
 * @return string Returns the filtered post title for the current post wrapped inside "h1" tags.
 */
function render_block( $attributes, $content, $block ) {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$post_ID = $block->context['postId'];

	// using the '$attributes['metaFieldValue']' helps the <ServerSideRenderer>
	// to show up-to-date results
	// otherwise it would use the saved post_meta
	// which could be not correct during the edit process
	$targetgroup   = ( isset( $_GET['metaFieldValue'] ) && ! empty( $_GET['metaFieldValue'] )) ? $_GET['metaFieldValue'] : \get_post_meta(
		$post_ID,
		TARGETGROUP_META,
		true
	);

	// return early
	if ( ! $targetgroup )
		return '';

	// TODO // not used at the moment, so it defaults to: p
	$tag_name         = empty( $attributes['tagName'] ) ? 'p' : $attributes['tagName'];

	// set text-align CSS class
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	// get and merge wrapper attributes with text-align CSS class
	$wrapper_attributes = \get_block_wrapper_attributes( [ 'class' => $align_class_name ] );

	// get and prepare html
	$prefix   = empty( $attributes['prefix'] ) ? '' : '<span>'. $attributes['prefix'] . '</span> ';
	$suffix   = empty( $attributes['suffix'] ) ? '' : ' <span>'. $attributes['suffix'] . '</span>';
	// $targetgroup = '<span>'. $targetgroup . '</span>';

	//
	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$prefix . $targetgroup . $suffix
	);
}
