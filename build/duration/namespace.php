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

use Figuren_Theater\Production_Blocks\Block_Loading;
use WP_Block;
use function get_block_wrapper_attributes;
use function get_post_meta;
use function human_readable_duration;
use function sanitize_text_field;
use function wp_unslash;



/**
 * Get type definition of current blocks post_meta to be used for register_post_meta().
 *
 * @return array<string, boolean|string>
 */
function get_meta_definition(): array {
	return [
		'single' => true,
		'type'   => 'integer',
	];
}

/**
 * Renders the `theater-production-duration` block on the server.
 *
 * @param array<string, string|int> $attributes Block attributes.
 * @param string                    $content    Block default content.
 * @param WP_Block                  $block      Block instance.
 *
 * @return string
 */
function render_block( array $attributes, string $content, WP_Block $block ): string {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$duration = get_duration( $block );

	if ( 0 === $duration ) {
		return '';
	}

	// Show human readable version
	// of given duration.
	if ( ! empty( $attributes['humanReadable'] ) ) {
		$duration = get_reduced_human_readable_duration( $duration );
	}

	// TODO // not used at the moment, so it defaults to: div !
	$tag_name = empty( $attributes['tagName'] ) ? 'div' : $attributes['tagName'];

	// Set text-align CSS class.
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : sprintf(
		'has-text-align-%s',
		(string) $attributes['textAlign']
	);

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
 * Get duration from either post_meta or the current user-input.
 *
 * @param  WP_Block $block The block (~s parent post) to get the post_meta from.
 *
 * @return int
 */
function get_duration( WP_Block $block ): int {

	$meta_field_value = false;
	// Check nonce for security.
	if ( 
	// ( \defined( 'DOING_AJAX' ) && \DOING_AJAX ) 
	// && false !== \check_ajax_referer( 'update-post_' . $block->context['postId'], '_wpnonce' )
	// && 
	isset( $_GET['metaFieldValue'] )
	&& ! empty( $_GET['metaFieldValue'] )
	&& \is_string( $_GET['metaFieldValue'] )
	) {
		$meta_field_value = sanitize_text_field( wp_unslash( $_GET['metaFieldValue'] ) );
	}

	// Using the '$_GET['metaFieldValue']' helps the <ServerSideRenderer>
	// to show up-to-date results
	// otherwise it would use the saved post_meta
	// which could be not correct during the edit process.
	$duration = ( $meta_field_value ) ? $meta_field_value : get_post_meta(
		$block->context['postId'],
		Block_Loading\get_meta_key( __DIR__, __NAMESPACE__ ),
		true
	);

	// Cast to string - for type-safety, the terminator way.
	$duration = $duration . '';

	return \intval( $duration );
}

/**
 * Transform a given duration in a human readable way and remove useless values like '00 hours' or '00 seconds'.
 *
 * @param  int $duration The given duration in minutes.
 *
 * @return string A text saying sth. like for eg.: "2 hours and 45 minutes" for a given duration of 165.
 */
function get_reduced_human_readable_duration( int $duration ): string {

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
