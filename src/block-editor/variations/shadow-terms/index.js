/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockVariation } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
const TAX_PRODUCTION_SHADOW = window.Theater.ProductionPosttype.ShadowTaxonomy;

/**
 * 4. Add Custom Taxonomy Terms as Blocks
 */
registerBlockVariation('core/post-terms', {
	// category:		'wpt', // blockvariations can't be added to blockCollections, yet
	name: 'wpt/ft_production_shadow',
	title: __('Related Productions', 'theater-production-blocks'),
	description: __(
		'Lists the Production(s) related to the current content.',
		'theater-production-blocks'
	),
	keywords: [
		__('relates', 'theater-production-blocks'),
		__('staging', 'theater-production-blocks'),
		__('theater', 'theater-production-blocks'),
		__('connected', 'theater-production-blocks'),
	],
	icon: 'art',
	isDefault: false,
	attributes: { term: TAX_PRODUCTION_SHADOW },
	isActive: (blockAttributes) =>
		blockAttributes.term === TAX_PRODUCTION_SHADOW,
});
