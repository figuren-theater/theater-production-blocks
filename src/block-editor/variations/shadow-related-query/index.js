import assign from 'lodash.assign';

/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { registerBlockVariation } from '@wordpress/blocks';

import { moveTo } from '@wordpress/icons';

// import { getEntityRecord  } from '@wordpress/core-data';
import { select, useSelect } from '@wordpress/data';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Get stuff to filter block attributes on the fly
 *
 * @see https://github.com/WordPress/gutenberg/issues/10082#issuecomment-642786811
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
const PT_PRODUCTION = window.Theater.ProductionPosttype.Slug;
const TAX_PRODUCTION_SHADOW = window.Theater.ProductionPosttype.ShadowTaxonomy;

/*
 * New `core/query` block variation.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
 */
const productionShadowRelatedQuery = {
	// category:		'wpt', // blockvariations can't be added to blockCollections, yet
	name: 'wpt/production-shadow-related-query',
	title: __('Production Related', 'theater-production-blocks'),
	description: __(
		'Shows content related to the production, that is connected to this post. ',
		'theater-production-blocks'
	),
	keywords: [
		__('relates', 'theater-production-blocks'),
		__('staging', 'theater-production-blocks'),
		__('theater', 'theater-production-blocks'),
		__('connected', 'theater-production-blocks'),
	],
	// isDefault: 	true,
	icon: moveTo, // default: loop
	attributes: {
		// queryId:		0,
		query: {
			perPage: 3,
			pages: 1,
			offset: 0,
			postType: 'post',
			//		order:		"asc",
			//		orderBy:	"title",
			//		author: 	"",
			//      search: 	"",
			exclude: [], // or pass multiple values in an array, e.g. [ 1, 9098 ]
			sticky: 'exclude',
			inherit: false,
			taxQuery: {
				[TAX_PRODUCTION_SHADOW]: [],
			},
			//		parents: 	[] // important to be empty, to make the filter work
		},
		displayLayout: {
			type: 'flex', // list | flex
			columns: 3,
		},
		// align:		"wide",
		className: 'wpt-production-shadow-related-query', // important for isActive callback fn
		customClassName: false,
	},
	innerBlocks: [
		[
			'core/post-template',
			{},
			[
				[
					'core/cover',
					{
						useFeaturedImage: true,
						dimRatio: 20,
						overlayColor: 'foreground',
						minHeight: 200,
						minHeightUnit: 'px',
						style: {
							spacing: {
								padding: {
									top: '0px',
								},
							},
						},
					},
					[
						[
							'core/post-title',
							{
								textAlign: 'center',
								level: 3,
								isLink: true,
								style: {
									typography: {
										lineHeight: '1',
									},
								},
								fontSize: 'large',
							},
						],
					],
				],
			],
		],
	],
	// scope: [ 'inserter', 'block', 'transform' ],
	scope: ['inserter', 'transform'],
	// scope: [ 'inserter'],
	isActive: (blockAttributes) =>
		'wpt-production-shadow-related-query' === blockAttributes.className,
	usesContext: ['core/post-template/postId'],
};

registerBlockVariation('core/query', productionShadowRelatedQuery);

const productionShadowRelatedQueryEngine = createHigherOrderComponent(
	(BlockListBlock) => {
		return (props) => {
			if (
				'wpt-production-shadow-related-query' !==
				props.attributes.className
			)
				return <BlockListBlock {...props} />;

			if ('core/query' !== props.name)
				return <BlockListBlock {...props} />;

			// console.log(props);
			// console.log(props.attributes.query.taxQuery.ft_production_shadow);
			// console.log(props.attributes.query.taxQuery[TAX_PRODUCTION_SHADOW]);
			// console.log(props.attributes.query.taxQuery[TAX_PRODUCTION_SHADOW][0]);

			// VARIANT 1 // run only one time
			if (
				// 'undefined' !== props.attributes.query.taxQuery.ft_production_shadow
				// &&
				0 !== props.attributes.query.taxQuery[TAX_PRODUCTION_SHADOW][0]
			)
				// VARIANT 2 // run everytime and update previous block
				// if ( 1 !== props.attributes.query.taxQuery.length )
				return <BlockListBlock {...props} />;

			const currentPost = select('core/editor').getCurrentPost();
			// console.log(currentPost);
			// go on if it's a 'production' or if current post can have 'production_shadow' terms
			// otherwise exit
			if (
				PT_PRODUCTION !== currentPost.type &&
				!currentPost.TAX_PRODUCTION_SHADOW
			)
				return <BlockListBlock {...props} />;

			// empty default,
			// like in the block-variation/template
			let shadowedProductions = [];

			if (PT_PRODUCTION === currentPost.type) {
				shadowedProductions = [
					currentPost.meta.shadow_ft_production_shadow_term_id,
				];
				// console.log(shadowedProductions);
			} else {
				/**
				 * HOly holy holy
				 *
				 * @param {Function} select Curreent posts terms of production-shadow taxonomy.
				 * @return  Array           List of term-IDs
				 */
				shadowedProductions = useSelect((select) => {
					const { getEditedPostAttribute } = select('core/editor');
					return getEditedPostAttribute(TAX_PRODUCTION_SHADOW);
				}, []);
			}

			// still using the defaults
			if (0 === shadowedProductions.length)
				return <BlockListBlock {...props} />;

			// Use Lodash's assign to gracefully handle if attributes are undefined
			// props.attributes.query = assign( props.attributes.query, {
			assign(props.attributes.query, {
				exclude: [currentPost.id],
				taxQuery: {
					[TAX_PRODUCTION_SHADOW]: shadowedProductions,
				},
			});

			return <BlockListBlock {...props} />;
		};
	},
	'productionShadowRelatedQueryEngine'
);

addFilter(
	'editor.BlockListBlock',
	'wpt/production-shadow-related-query',
	productionShadowRelatedQueryEngine
);

// const FT_COLOR = '#d20394';

// 1.
// EDITED_POST = wp.data.select('core/editor').getCurrentPost()
// VARIANT 1.1
// is a 'ft_production'

// VARIANT 1.2.
// is not a 'ft_production', but allows connection to 'ft_production_shadow' taxononmy

// 2.
// PRODUCTION_SHADOW = wp.data.select('core').getEntityRecord('taxonomy','ft_production_shadow',91)

// VARIANT 2.1
// get other posts of different type than EDITED_POST, that belong to the same PRODUCTION_SHADOW taxonomy

// 3.
// PRODUCTION = PRODUCTION_SHADOW.meta.shadow_ft_production_shadow_post_id

// VARIANT 3
// get PRODUCTION
