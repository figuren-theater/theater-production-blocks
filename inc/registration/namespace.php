<?php
/**
 * Figuren_Theater Production_Blocks.
 *
 * @package figuren-theater/theater-production-blocks
 */

namespace Figuren_Theater\Production_Blocks\Registration;

use function add_post_type_support;
use function apply_filters;

/**
 * Get list of post_type slugs
 *
 * @return string[]
 */
function get_post_types(): array {
	/**
	 * Select which post_types the production blocks should be loaded for.
	 *
	 * @param  string[] $post_types Slugs of registered post_types.
	 *
	 * @return string[]
	 */
	return (array) apply_filters(
		__NAMESPACE__ . '\\post_types',
		(array) get_production_post_type()
	);
}

/**
 * Get the slug of that post_type that is or should be used for theater-productions.
 *
 * @return string
 */
function get_production_post_type(): string {
	/**
	 * Use the 'production-post-type' of the WordPress 'theater' plugin as a default.
	 *
	 * Also provides a default, which is the old slug, I (@carstingaxion) used throughout the figuren.theater multisite network.
	 *
	 * @todo This filter is documented at ...
	 */
	return (string) apply_filters(
		'wpt-production-posttype',
		'ft_production'
	);
}

/**
 * Get list of post_type supports, per post_type.
 *
 * @param  string $post_type Slug of the post_type on which to add theater-related post_type_supports for.
 *
 * @return string[]
 */
function get_post_type_supports( string $post_type ): array {
	/**
	 * Filter post_type_supports per post_type.
	 *
	 * @param string[] $post_type_supports List of post_type_supports to load.
	 * @param string   $post_type          Slug of the post_type in question.
	 */
	return (array) apply_filters(
		__NAMESPACE__ . '\\post_type_supports',
		[
			'premiere',
			'duration',
			'targetgroup',
		],
		$post_type
	);
}

/**
 * Registers support of theater-related features for a given post type.
 *
 * @param  string $post_type Slug of the post_type on which to add theater-related post_type_supports for.
 *
 * @return void
 */
function add_post_type_supports( string $post_type ): void {
	\array_map(
		function ( $post_type_support ) use ( $post_type ): void {
			add_post_type_support( $post_type, "theater-$post_type_support" );
		},
		get_post_type_supports( $post_type )
	);
}
