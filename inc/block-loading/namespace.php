<?php
/**
 * Figuren_Theater Production_Blocks.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks\Block_Loading;

use Figuren_Theater\Production_Blocks;
use WP_Post_Type;
use function add_action;
use function current_user_can;
use function esc_html;
use function get_post_types_by_support;
// use function register_block_type; // TEMP. Disabled !
use function get_post_type;
use function get_post_type_object;
use function load_plugin_textdomain;
use function plugins_url;
use function register_block_type;
use function register_post_meta;
use function wp_add_inline_script;
use function wp_enqueue_script;
use function wp_get_environment_type;
use function wp_json_encode;
use function wp_register_script;
use function wp_set_script_translations;



/**
 * Start the engines.
 *
 * @return void
 */
function bootstrap(): void {
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
function i18n(): void {
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
function dynamic_blocks_init(): void {

	/**
	 * Get list of folders from the src-directory
	 *
	 * @see https://stackoverflow.com/a/52499093/585690 (scandir to only show folders, not files)
	 */
	$dynamic_blocks = array_map(
		function ( string|false $dir ): string {
			return ( $dir ) ? basename( $dir ) : '';
		},
		(array) glob(
			Production_Blocks\DIRECTORY . '/src/block-editor/blocks/*',
			GLOB_ONLYDIR
		)
	);

	foreach ( $dynamic_blocks as $block ) {
		$build_dir = Production_Blocks\DIRECTORY . '/build/' . $block;
		$namespace = 'Figuren_Theater\Production_Blocks\\' . \ucfirst( $block );

		require_once $build_dir . '/namespace.php'; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable
		register_dynamic_block( $build_dir, $namespace );
	}
}

/**
 * Register multiple new server-side-rendered blocks to WordPress.
 *
 * @param  string $dir             Absolute path to the directory of the block.
 * @param  string $block_namespace The blocks namespace.
 *
 * @return void
 */
function register_dynamic_block( string $dir, string $block_namespace ): void {

	$block      = \basename( $dir );
	$post_types = get_post_types_by_support( "theater-$block" );
	$render_fn  = $block_namespace . '\\render_block';
	$callback   = $block_namespace . '\\get_meta_definition';
	if ( empty( $post_types ) ) {
		return;
	}
	if ( ! is_callable( $render_fn ) ) {
		return;
	}
	if ( ! is_callable( $callback ) ) {
		return;
	}

	register_block_type(
		$dir,
		[
			'render_callback' => $render_fn,
		]
	);

	$meta_key = get_meta_key( $dir, $block_namespace );
	$meta_def = array_merge(
		\call_user_func( $callback ),
		[
			'auth_callback' => __NAMESPACE__ . '\\is_user_allowed_to_edit_postmeta',
			'show_in_rest'  => true,
		]
	);

	array_map(
		function ( string $post_type ) use ( $meta_key, $meta_def ): void {
			register_post_meta(
				$post_type,
				$meta_key,
				$meta_def
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
		'window.Theater = window.Theater || {};' .
		'window.Theater.ProductionBlocks = window.Theater.ProductionBlocks || {};' .
		"window.Theater.ProductionBlocks.{$block} = " . wp_json_encode(
			[
				'PostMetaKey' => $meta_key,
			] 
		) . ';',
		'before'
	);
}

/**
 * 'auth_callback' for register_post_meta()
 *
 * @param  bool   $allowed    Or not.
 * @param  string $meta_key   Key of the post_meta data.
 * @param  int    $object_id  ID of the post (or other post_type).
 *
 * @return bool
 */
function is_user_allowed_to_edit_postmeta( bool $allowed, string $meta_key, int $object_id ): bool {

	$post_type = get_post_type( $object_id );
	if ( empty( $post_type ) ) {
		return false;
	}

	$pto = get_post_type_object( $post_type );
	if ( ! $pto instanceof WP_Post_Type ) {
		return false;
	}

	return current_user_can( $pto->cap->edit_post_meta, $object_id, $meta_key );
}

/**
 * Get post_meta key by name of given blocks directory and namespace.
 *
 * @param  string $dir             Absolute path to the directory of the block.
 * @param  string $block_namespace The blocks namespace.
 *
 * @return string
 */
function get_meta_key( string $dir, string $block_namespace ): string {
	$block = \basename( $dir );
	return apply_filters(
		// "Hook names invoked by a theme/plugin should start with the theme/plugin prefix."
		// which is absolutely the case here.
		// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.DynamicHooknameFound
		$block_namespace . '\\meta_key',
		'_wpt_' . $block
	);
}

/**
 * Get backend-only editor assets.
 *
 * @return string[]
 */
function get_assets(): array {
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
function register_asset( string $asset ): void {

	$dir = Production_Blocks\DIRECTORY;

	$script_asset_path = "$dir/build/$asset.asset.php";

	
	if ( ! \file_exists( $script_asset_path ) ) {
		$error_message = "You need to run `npm start` or `npm run build` for the '$asset' block-asset first.";
		if ( \in_array( wp_get_environment_type(), [ 'local', 'development' ], true ) ) {
			throw new \Error( esc_html( $error_message ) );
		} else {
			// Should write to the \error_log( $error_message ); if possible.
			return;
		}
	}

	$index_js     = "build/$asset.js";
	$script_asset = require $script_asset_path; // phpcs:ignore WordPressVIPMinimum.Files.IncludingFile.UsingVariable

	wp_register_script(
		"theater-production-blocks--$asset",
		plugins_url( $index_js, "$dir/plugin.php" ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
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
function enqueue_assets(): void {
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
function enqueue_asset( string $asset ): void {
	wp_enqueue_script( "theater-production-blocks--$asset" );
}
