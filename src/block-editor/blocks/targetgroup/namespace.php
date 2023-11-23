<?php
/**
 * Production Targetgroup Block
 *
 * Show Targetgroup of production.
 *
 * @package           figuren-theater/theater-production-blocks
 */

declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Targetgroup;

use Figuren_Theater\Production_Blocks\Block_Loading;
use WP_Block;
use function get_block_wrapper_attributes;
use function get_post_meta;

/**
 * Get type definition of current blocks post_meta to be used for register_post_meta().
 *
 * @return array<string, boolean|string>
 */
function get_meta_definition(): array {
	return [
		'single' => true,
		'type'   => 'string',
	];
}
/**
 * Renders the `theater-production-targetgroup` block on the server.
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

	$targetgroup = get_post_meta(
		$block->context['postId'],
		Block_Loading\get_meta_key( __DIR__, __NAMESPACE__ ),
		true
	);

	if ( ! \is_string( $targetgroup ) || empty( $targetgroup ) ) {
		return '';
	}

	// TODO // not used at the moment, so it defaults to: div !
	$tag_name = empty( $attributes['tagName'] ) ? 'p' : $attributes['tagName'];

	// Set text-align CSS class.
	$align_class_name = empty( $attributes['textAlign'] ) ? '' : "has-text-align-{$attributes['textAlign']}";

	// Get and merge wrapper attributes with text-align CSS class.
	$wrapper_attributes = get_block_wrapper_attributes( [ 'class' => $align_class_name ] );

	// Get and prepare html.
	$prefix = empty( $attributes['prefix'] ) ? '' : '<span>' . $attributes['prefix'] . '</span> ';
	$suffix = empty( $attributes['suffix'] ) ? '' : ' <span>' . $attributes['suffix'] . '</span>';

	return sprintf(
		'<%1$s %2$s>%3$s</%1$s>',
		$tag_name,
		$wrapper_attributes,
		$prefix . $targetgroup . $suffix
	);
}
