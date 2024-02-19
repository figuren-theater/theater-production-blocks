/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { _x } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import json from './block.json';
import { wpt_event_ticket_button } from './shortcode-combat/wpt_event_ticket_button';
import { wpt_productions } from './shortcode-combat/wpt_productions';

const {name, ...settings} = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(name, {
	...settings,
	supports: {
		// Hide this block from the inserter.
		inserter: false,
	},
	transforms: {
		from: [
			wpt_event_ticket_button,
			wpt_productions,
		],
	},
});
