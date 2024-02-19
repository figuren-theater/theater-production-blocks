<?php
/**
 * 
 *
 * Show ...
 *
 * @package           figuren-theater/theater-production-blocks
 */

declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Shortcode_Compat;

use function add_action;
use function register_block_type_from_metadata;

/**
 * Fires after WordPress has finished loading but before any headers are sent.
 * 
 * We are on INIT:9
 */
add_action(
	'init', 
	function (): void {
		register_block_type_from_metadata( __DIR__ );
	} 
);
