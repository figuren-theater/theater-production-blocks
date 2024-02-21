<?php
/**
 * 
 *
 * Show ...
 *
 * @package           figuren-theater/theater-production-blocks
 */

declare(strict_types=1);

namespace Figuren_Theater\Production_Blocks\Remark;

use Figuren_Theater\Production_Blocks\Registration;
use function add_action;

/**
 * Fires after WordPress has finished loading but before any headers are sent.
 * 
 * We are on INIT:9
 */
add_action(
	'init', 
	function (): void {
		register_meta(
			'post',
			'remark',
			[
				Registration\get_production_post_type(),
				'type'         => 'string',
				// 'description'  => 'Is this shown somewhere? No ...',
				'single'       => true,
				// 'default'      => ( \is_admin() ) ? 'This is the content of the remark field' : '...',

				'sanitize_callback' => 'sanitize_text_field',
				// 'auth_callback' => '__return_true',
				'show_in_rest' => true,
			]
		);
	} 
);
