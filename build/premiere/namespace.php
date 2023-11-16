<?php
/**
 * Production Premiere Block
 *
 * Show Premiere Date of production.
 *
 * @package           figuren-theater/theater-production-blocks
 */

declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Premiere;

use Figuren_Theater\Production_Blocks\Block_Loading;

use function date_i18n;
use function get_block_wrapper_attributes;
use function get_option;
use function get_post_meta;

use WP_Block;

/**
 * Get type definition of current blocks post_meta to be used for register_post_meta().
 *
 * @return array<string, boolean|string>
 */
function get_meta_definition() : array {
	return [
		'single' => true,
		'type'   => 'string',
	];
}
/**
 * Renders the `theater-production-premiere` block on the server.
 *
 * @param array<string, string|int> $attributes Block attributes.
 * @param string                    $content    Block default content.
 * @param WP_Block                  $block      Block instance.
 *
 * @return string
 */
function render_block( array $attributes, string $content, WP_Block $block ) : string {
	if ( ! isset( $block->context['postId'] ) ) {
		return '';
	}

	$premiere = get_post_meta(
		$block->context['postId'],
		Block_Loading\get_meta_key( __DIR__, __NAMESPACE__ ),
		true
	);

	if ( ! \is_string( $premiere ) || empty( $premiere ) ) {
		return '';
	}

	$date_format = get_option( 'date_format' );
	// Cast to string - for type-safety, the terminator way.
	$date_format = $date_format . '';
	
	$premiere    = date_i18n( $date_format, strtotime( $premiere ) );

	// TODO // not used at the moment, so it defaults to: div !
	$tag_name = empty( $attributes['tagName'] ) ? 'p' : $attributes['tagName'];

	// Set text-align CSS class.
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	// Get and merge wrapper attributes with text-align CSS class.
	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $align_class_name ] );

	// Get and prepare html.
	$prefix = empty( $attributes['prefix'] ) ? '' : '<span>' . $attributes['prefix'] . '</span> ';
	$suffix = empty( $attributes['suffix'] ) ? '' : ' <span>' . $attributes['suffix'] . '</span>';
	// $premiere = '<span>'. $premiere . '</span>'; // This is weird, because 'the duration' block uses this span.

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$prefix . $premiere . $suffix
	);
}
