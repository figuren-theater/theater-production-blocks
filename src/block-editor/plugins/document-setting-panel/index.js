/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies.
 */
import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

import { ProductionPluginPostStatusInfo } from './slot.js';

const PT_PRODUCTION = window.Theater.ProductionPosttype.Slug;

const ProductionDocumentSettingPanel = () => {
	// Get post type.
	const post = useSelect(
		(select) => select('core/editor').getCurrentPost(),
		[]
	);

	if (PT_PRODUCTION !== post.type) return '';

	return (
		<PluginDocumentSettingPanel
			name="production-document-setting-panel"
			icon="art"
			title={__('Production Meta', 'theater-production-blocks')}
			className="wpt-production-document-setting-panel"
		>
			<ProductionPluginPostStatusInfo.Slot />
			
		</PluginDocumentSettingPanel>
	);
};


registerPlugin('production-document-setting-panel', {
	render: ProductionDocumentSettingPanel,
});

