/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';

/**
 * Variations are an excellent way to create iterations of existing blocks 
 * without building entirely new blocks from scratch.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/#creating-a-block-variation
*/
registerBlockVariation(
	'core/paragraph',
	{
		name: 'remark-paragraph',
		title: __( 'Remark (post_meta)' ),
		description: __( 'UNCHANGEABLE Remark (post_meta)' ),
		icon: 'format-aside',
		attributes: { 
			html: false,
			className: 'remark-paragraph', // Important for isActive() to work.
			metadata: {
				bindings: {
					content: {
						source: "core/post-meta",
						args: {
							key: "remark"
						}
					}
				}
			}
		},
		isActive: ( attributes, variationAttributes ) =>
			// metadata is undefined, className not ;)
			attributes.className === variationAttributes.className
			// attributes.metadata.bindings.content.args.key === variationAttributes.metadata.bindings.content.args.key
	}
);
