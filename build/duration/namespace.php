<?php
/**
 * Production Duration Block
 *
 * Shows Duration of production either in minutes or in a human readable sentence.
 *
 * @package           figuren-theater/theater-production-blocks
 */

declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Duration;

use Figuren_Theater\Production_Blocks;

use function apply_filters;
use function current_user_can;
use function get_block_wrapper_attributes;
use function get_post_meta;
use function get_post_types_by_support;
use function get_post_type_object;
use function human_readable_duration;
use function register_block_type;
use function register_post_meta;
use function wp_add_inline_script;
use function wp_set_script_translations;

use WP_Block;
use WP_Post_Type;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/writing-your-first-block-type/
 *
 * @return void
 */
function block_init() : void {

	$block      = \basename( __DIR__ );
	$post_types = get_post_types_by_support( "theater-$block" );

	if ( empty( $post_types ) ) {
		return;
	}

	register_block_type(
		__DIR__,
		[
			'render_callback' => __NAMESPACE__ . '\\render_block',
		]
	);

	array_map(
		function( $post_type ) {
			register_post_meta(
				$post_type,
				get_meta_key(),
				[
					'show_in_rest'  => true,
					'single'        => true,
					'type'          => 'integer',
					'auth_callback' => __NAMESPACE__ . '\\is_user_allowed_to_edit_postmeta',
				]
			);
		},
		$post_types
	);

	wp_set_script_translations(
		"wpt-production-$block-editor-script",
		'theater-production-blocks',
		Production_Blocks\DIRECTORY . '/languages'
	);

	wp_add_inline_script(
		"wpt-production-$block-editor-script",
		"window.Theater = window.Theater || {};" .
		"window.Theater.ProductionBlocks = window.Theater.ProductionBlocks || {};" .
		"window.Theater.ProductionBlocks.{$block} = " . json_encode( [
			'PostMetaKey' => get_meta_key(),
		] ) . ';',
		'before'
	);

}

\add_action( 'init', __NAMESPACE__ . '\\block_init' );


// function is_user_allowed_to_edit_postmeta( string $post_type ) : bool {
function is_user_allowed_to_edit_postmeta( $allowed, $meta_key, $object_id, $user_id, $cap, $caps ) : bool {

	// \do_action('qm/debug', [$allowed, $meta_key, $object_id]);
	// \error_log(\var_export([$allowed, $meta_key, $object_id],true));

	$post_type = \get_post_type( $object_id );
	$pto = get_post_type_object( $post_type );

	if ( ! $pto instanceof WP_Post_Type ) {
		return false;
	}
	// return current_user_can( $pto->cap->edit_posts );
	// return current_user_can( $pto->cap->edit_post, $object_id );
	return current_user_can( $pto->cap->edit_post_meta, $object_id, $meta_key );
}


function get_meta_key() : string {
	return apply_filters(
		__NAMESPACE__ . '\\meta_key',
		'_wpt_duration' // TODO could better use the wp.theater default
	);
}

/**
 * Renders the `theater-production-duration` block on the server.
 *
 * @param array<string, mixed> $attributes Block attributes.
 * @param string               $content    Block default content.
 * @param WP_Block             $block      Block instance.
 *
 * @return string
 */
function render_block( array $attributes, string $content, WP_Block $block ) : string {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	// Using the '$attributes['metaFieldValue']' helps the <ServerSideRenderer>
	// to show up-to-date results
	// otherwise it would use the saved post_meta
	// which could be not correct during the edit process.
	$duration = ( isset( $_GET['metaFieldValue'] ) && ! empty( $_GET['metaFieldValue'] ) ) ? $_GET['metaFieldValue'] : get_post_meta(
		$block->context['postId'],
		get_meta_key(),
		true
	);

	$duration = \intval( $duration );

	if ( 0 === $duration ) {
		return '';
	}

	// Show human readable version
	// of given duration.
	if ( ! empty( $attributes['humanReadable'] ) ) {
		$duration = get_reduced_human_readable_duration( $duration );
	}

	// TODO // not used at the moment, so it defaults to: div
	$tag_name = empty( $attributes['tagName'] ) ? 'div' : $attributes['tagName'];

	// Set text-align CSS class.
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	// Get and merge wrapper attributes with text-align CSS class.
	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $align_class_name ] );

	// Get and prepare html.
	$prefix   = empty( $attributes['prefix'] ) ? '' : '<span>' . $attributes['prefix'] . '</span> ';
	$suffix   = empty( $attributes['suffix'] ) ? '' : ' <span>' . $attributes['suffix'] . '</span>';
	$duration = '<span>' . $duration . '</span>';

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$prefix . $duration . $suffix
	);
}

/**
 * Transform a given duration in a human readable way and remove useless values like '00 hours' or '00 seconds'.
 *
 * @param  int    $duration The given duration in minutes.
 *
 * @return string A text saying sth. like for eg.: "2 hours and 45 minutes" for a given duration of 165.
 */
function get_reduced_human_readable_duration( int $duration ) : string {

	// Get "1 hour 20 minutes 20 seconds"
	// from wp, based on our given "123" minutes.
	$duration_readable = human_readable_duration(
		\gmdate(
			'H:i:s',
			$duration * 60
		)
	);

	if ( false === $duration_readable ) {
		return (string) $duration;
	}

	// Cut sentence into parts.
	$duration_parts = explode( ', ', $duration_readable );

	// Remove seconds, as this is useless.
	array_pop( $duration_parts );

	// Remove "00 minutes", as this might be useless.
	if ( is_int( ( intval( $duration ) / 60 ) ) ) {
		array_pop( $duration_parts );
	}

	// If less than 60 minutes
	// remove '00 hours'.
	if ( 60 > intval( $duration ) ) {
		$duration_parts = array_reverse( $duration_parts );
		array_pop( $duration_parts );
	}

	// Re-glue everything.
	return implode( ' ', $duration_parts );
}
