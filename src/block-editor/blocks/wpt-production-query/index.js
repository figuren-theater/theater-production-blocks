/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { _x } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import json from './block.json';
import Edit from './edit';
import save from './save';

const {name, ...settings} = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(name, {
	...settings,
	title: _x('Wpt production query', 'block title', 'wpt'),
	description: _x(
		'',
		'block description',
		'wpt'
	),
	edit: Edit,
	save,
	transforms: {
		from: [
			{
				type: 'shortcode',
				tag: 'wpt_productions',
				// transform( { named: { src } } ) {
				transform( { named: { src } } ) {
					return createBlock( 
						'core/query',
						{
							"query": {
								"postType": "wp_theatre_prod",
								"inherit":false
							}
						},
						[
							createBlock( 'core/post-template', {}, [

								createBlock( 'core/post-title' ),
								// createBlock( 'core/post-excerpt' ),
							] ),
						]
						
					);
				},
				// Prevent the shortcode to be converted
				// into this block when it doesn't
				// have the proper ID.
				// isMatch( { named: { id } } ) {
				// 	return id === 'my-id';
				// },
			},
		],
	},
});

/**
[wpt_productions]
 */
