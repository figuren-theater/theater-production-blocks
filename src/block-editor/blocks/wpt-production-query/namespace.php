<?php
/**
 * We are on INIT:9
 */

/**
 * Fires after WordPress has finished loading but before any headers are sent.
 */
\add_action(
	'init', 
	function (): void {
        \register_block_type_from_metadata( __DIR__ );
	} 
);
