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
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import json from './block.json';
import Edit from './edit';
import save from './save';

const { name, ...settings } = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(name, {
	...settings,
	title: _x('Premiere', 'block title', 'theater-production-blocks'),
	description: _x(
		'Show Premiere Date of production.',
		'block description',
		'theater-production-blocks'
	),
	edit: Edit,
	save,

	/**
	 * Bäh!
	 * Transforms makes no sense when transforming between dynamic and other fields.
	 * So disable this for now.
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block
	 */
	transforms: {
		from: [
			{
				type: 'block',
				blocks: ['core/post-date'],
				transform: ({ content }) => {
					return createBlock(name, {
						content,
					});
				},
			},
		],
	},
});
