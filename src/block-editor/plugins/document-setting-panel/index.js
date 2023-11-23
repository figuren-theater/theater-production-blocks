/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies.
 */
import { TextControl } from '@wordpress/components';

import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { PluginDocumentSettingPanel } from '@wordpress/edit-post';
import { registerPlugin } from '@wordpress/plugins';

import { RichText } from '@wordpress/block-editor';

import { getSettings } from '@wordpress/date';

/**
 * Internal dependencies
 */

import DateSelect from '../../../utils/date-select';

import { PT_PRODUCTION } from '../../../utils/constants.js';
const DURATION_META = window.Theater.ProductionBlocks.duration.PostMetaKey;
const PREMIERE_META = window.Theater.ProductionBlocks.premiere.PostMetaKey;
const TARGETGROUP_META =
	window.Theater.ProductionBlocks.targetgroup.PostMetaKey;

// import { getPostMeta, setPostMeta } from '../../../utils/helper.js'

const ProductionDocumentSettingPanel = () => {
	// Get post type.
	const post = useSelect(
		(select) => select('core/editor').getCurrentPost(),
		[]
	);

	// Get the value of meta and a function for updating meta from useEntityProp.
	const [meta, setMeta] = useEntityProp(
		'postType',
		post.type,
		'meta',
		post.id
	);

	if (PT_PRODUCTION !== post.type) return '';

	const settings = getSettings();

	return (
		<PluginDocumentSettingPanel
			name="production-document-setting-panel"
			icon="art"
			title={__('Production Meta', 'theater-production-blocks')}
			className="t7b4-production-document-setting-panel"
		>
			<div className="plugin-sidebar-content">
				<RichText
					tagName="p"
					value={__('Premiere Date', 'theater-production-blocks')}
				/>
				<DateSelect
					className="event__date-select"
					dateFormat={settings.formats.date}
					value={meta[PREMIERE_META]}
					onChange={(newValue) => {
						setMeta({ ...meta, [PREMIERE_META]: newValue });
					}}
					placeholder={__(
						'Choose a Date',
						'theater-production-blocks'
					)}
				/>

				<TextControl
					label={__('Targetgroup', 'theater-production-blocks')}
					value={meta[TARGETGROUP_META]}
					onChange={(newValue) => {
						setMeta({ ...meta, [TARGETGROUP_META]: newValue });
					}}
				/>
				<TextControl
					label={__('Duration', 'theater-production-blocks')}
					type="number"
					isShiftStepEnabled
					shiftStep="5"
					step="5"
					min={0}
					placeholder="80"
					value={meta[DURATION_META]}
					onChange={(newValue) => {
						setMeta({ ...meta, [DURATION_META]: newValue });
					}}
				/>

				<RichText
					tagName="p"
					className="howto"
					value={__(
						'Add the duration in Minutes.',
						'theater-production-blocks'
					)}
				/>
			</div>
		</PluginDocumentSettingPanel>
	);
};
registerPlugin('production-document-setting-panel', {
	render: ProductionDocumentSettingPanel,
});
