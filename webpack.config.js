const defaultConfig = require('@wordpress/scripts/config/webpack.config');
module.exports = {
	...defaultConfig,
	entry: {
		'shadow-terms/shadow-terms':
			'./src/block-editor/variations/shadow-terms',
		'shadow-related-query/shadow-related-query':
			'./src/block-editor/variations/shadow-related-query',

		'premiere/premiere': './src/block-editor/blocks/premiere',
		'duration/duration': './src/block-editor/blocks/duration',
		'targetgroup/targetgroup': './src/block-editor/blocks/targetgroup',
		'shortcode-compat/shortcode-compat': './src/block-editor/blocks/shortcode-compat',

		'document-setting-panel/document-setting-panel':
			'./src/block-editor/plugins/document-setting-panel',

		'document-setting-panel/slot':
			'./src/block-editor/plugins/document-setting-panel/slot.js',
	},
};
