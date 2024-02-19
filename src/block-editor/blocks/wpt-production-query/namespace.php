<?php
/**
 * We are on INIT:9
 */
// wp_die( 'huh' );

/**
 * Fires after WordPress has finished loading but before any headers are sent.
 */
\add_action(
	'init', 
	function (): void {
        // wp_die( var_export( \register_block_type_from_metadata( __DIR__ ) ) );
		// \register_block_type( __DIR__ );
        \register_block_type_from_metadata( __DIR__ );
	} 
);
