<?php
/**
 * Figuren_Theater Production_Blocks.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks\Pattern_Loading;

use Figuren_Theater\Production_Blocks;
use function add_action;
use function apply_filters;
use function register_block_pattern;
use function register_block_pattern_category;


/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap(): void {
	add_action( 'init', __NAMESPACE__ . '\\register_patterns' );
	add_action( 'init', __NAMESPACE__ . '\\register_pattern_category' );
}

/**
 * Registers multiple new block patterns.
 *
 * @return void
 */
function register_patterns(): void {

	/**
	 * Filters the block patterns provided by the plugin.
	 *
	 * @param array $block_patterns List of block patterns by name.
	 */
	$block_patterns = apply_filters( 
		__NAMESPACE__ . '\\register_patterns',
		[
			// Important parts of productions.
			'production-important-metadata',

			// Layouts can be used for Productions Details.
			'production-page-dark',
			'production-page-light',
		]
	);

	\array_map(
		__NAMESPACE__ . '\\register_pattern',
		$block_patterns
	);
}

/**
 * Registers a new block pattern.
 *
 * @param  string $block_pattern Slug|Filename of the pattern.
 *
 * @return void
 */
function register_pattern( string $block_pattern ): void {
	// @todo use a more global prefix.
	$_namespace = 'wpt';

	$pattern_file = Production_Blocks\DIRECTORY . '/patterns/' . $block_pattern . '.php';

	register_block_pattern(
		$_namespace . '/' . $block_pattern,
		require $pattern_file // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
	);
}

/**
 * Registers a new block pattern category 'Theater'.
 *
 * @return void
 */
function register_pattern_category(): void {
	register_block_pattern_category(
		'theater',
		[
			'label' => __( 'Theater', 'theater-production-blocks' ),
		]
	);
}
