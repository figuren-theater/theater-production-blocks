<?php
/**
 * Figuren_Theater Production_Blocks.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks\Block_Loading;

use Figuren_Theater\Production_Blocks;

use function add_action;
use function load_plugin_textdomain;
use function plugins_url;
// use function register_block_type; // TEMP. Disabled !
use function wp_enqueue_script;
use function wp_get_environment_type;
use function wp_register_script;
use function wp_set_script_translations;

/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap() : void {
	add_action( 'init', __NAMESPACE__ . '\\i18n', 1 );

	add_action( 'init', __NAMESPACE__ . '\\dynamic_blocks_init', 9 );

	// phpcs:ignore
	// add_action( 'init', __NAMESPACE__ . '\\static_blocks_init', 10 ); // TEMP. Disabled !

	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\\enqueue_assets' );
}

/**
 * Load translated strings.
 *
 * @return void
 */
function i18n() : void {
	load_plugin_textdomain(
		'theater-production-blocks',
		false,
		Production_Blocks\DIRECTORY . '/languages'
	);

	\array_map(
		__NAMESPACE__ . '\\register_asset',
		get_assets()
	);
}

// phpcs:ignore
/*
 * TEMP. Disabled !
 *
function static_blocks_init() {

	$static_blocks = [
		// '...',
	];

	foreach ( $static_blocks as $block ) {
		register_block_type( Production_Blocks\DIRECTORY . 'src/block-editor/blocks/' . $block );
	}
}
*/

/**
 * Load dynamic blocks from build files.
 *
 * @return void
 */
function dynamic_blocks_init() : void {

	$dynamic_blocks = [
		'duration',
		'premiere',
		'targetgroup',
	];

	foreach ( $dynamic_blocks as $block ) {
		require_once Production_Blocks\DIRECTORY . '/build/' . $block . '/index.php'; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingCustomConstant
	}
}

/**
 * Get backend-only editor assets.
 *
 * @return string[]
 */
function get_assets() : array {
	return [
		'document-setting-panel',
	];
}

/**
 * Register a new script and sets translated strings for the script.
 *
 * @throws \Error If build-files doesn't exist errors out in local environments and writes to error_log otherwise.
 *
 * @param  string $asset Slug of the block to register scripts and translations for.
 *
 * @return void
 */
function register_asset( string $asset ) : void {

	$dir = Production_Blocks\DIRECTORY;

	$script_asset_path = "$dir/build/$asset.asset.php";

	$error_message = "You need to run `npm start` or `npm run build` for the '$asset' block-asset first.";

	if ( ! file_exists( $script_asset_path ) ) {
		if ( \in_array( wp_get_environment_type(), [ 'local', 'development' ], true ) ) {
			throw new \Error(
				$error_message
			);
		} else {
			\error_log( $error_message );
			return;
		}
	}

	$index_js     = "build/$asset.js";
	$script_asset = require $script_asset_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable

	wp_register_script(
		"theater-production-blocks--$asset",
		plugins_url( $index_js, "$dir/plugin.php" ),
		$script_asset['dependencies'],
		$script_asset['version']
	);

	wp_set_script_translations(
		"theater-production-blocks--$asset",
		'theater-production-blocks',
		Production_Blocks\DIRECTORY . '/languages'
	);
}

/**
 * Enqueue all scripts.
 *
 * @return void
 */
function enqueue_assets() : void {
	\array_map(
		__NAMESPACE__ . '\\enqueue_asset',
		get_assets()
	);
}

/**
 * Enqueue a script.
 *
 * @param  string $asset Slug of the block to load the frontend scripts for.
 *
 * @return void
 */
function enqueue_asset( string $asset ) : void {
	wp_enqueue_script( "theater-production-blocks--$asset" );
}
