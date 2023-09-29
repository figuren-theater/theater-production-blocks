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

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './style.scss';

/**
 * Internal dependencies
 */
import json from './block.json';
import edit from './edit';
import save from './save';
import deprecated from './deprecations';

const { name, ...settings } = json;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(name, {
	...settings,
	title: _x('Targetgroup', 'block title', 'theater-production-blocks'),
	description: _x(
		'Shows targetgroup of current production.',
		'block description',
		'theater-production-blocks'
	),

	/**
	 * @see ./edit.js
	 */
	edit,

	/**
	 * @see ./save.js
	 */
	save,

	/**
	 * @see ./deprecations.js
	 */
	deprecated,
	/**
	 * Bäh!
	 * Transforms makes no sense when transforming between dynamic and other fields.
	 * So disable this for now.
	 *
	 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-transforms/#block
	 */
	//	transforms: {
	//	    from: [
	//	        {
	//	            type: 'block',
	//	            blocks: [ 'core/paragraph', 'core/heading' ],
	//	            //transform: ( { content } ) => {
	//	            //    return createBlock( name, {
	//	            //        content,
	//	            //    } );
	//	            //},
	//	        },
	//	    ]
	//	},
});
