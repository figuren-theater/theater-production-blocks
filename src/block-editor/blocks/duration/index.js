/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { _x } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import json from './block.json';
import Edit from './edit';
import save from './save';
import DurationFill from './slotfill';

const { name, ...settings } = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(name, {
	...settings,
	title: _x('Duration', 'block title', 'theater-production-blocks'),
	description: _x(
		'Shows duration of current production.',
		'block description',
		'theater-production-blocks'
	),
	edit: Edit,
	save,
});

registerPlugin('duration-slot-fill', { render: DurationFill });
