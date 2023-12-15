<?php
/**
 * Figuren_Theater Production_Blocks.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks;

/**
 * Register module.
 *
 * @return void
 */
function register(): void {

	$post_types = Registration\get_post_types();

	if ( empty( $post_types ) ) {
		return;
	}

	\array_map(
		__NAMESPACE__ . '\\Registration\\add_post_type_supports',
		$post_types
	);

	Block_Loading\bootstrap(); // Should run on init|0 or earlier.
	Pattern_Loading\bootstrap(); // Should run on init.
}

/**
 * Bootstrap module, when enabled.
 *
 * @return void
 */
function bootstrap(): void {

	/**
	 * Automatically load Plugins.
	 *
	 * @example NameSpace\bootstrap();
	 */

	/**
	 * Load 'Best practices'.
	 *
	 * @example NameSpace\bootstrap();
	 */
}
