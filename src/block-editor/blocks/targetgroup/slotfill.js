/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
const TARGETGROUP_META =
	window.Theater.ProductionBlocks.targetgroup.PostMetaKey;

import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { TextControl, Fill } from '@wordpress/components';

export default function TargetgroupFill() {
	const post = useSelect(
		(select) => select('core/editor').getCurrentPost(),
		[]
	);
	const [meta, setMeta] = useEntityProp(
		'postType',
		post.type,
		'meta',
		post.id
	);
	const metaFieldValue = meta[TARGETGROUP_META];
	const updateMetaValue = (newValue) => {
		setMeta({ ...meta, [TARGETGROUP_META]: newValue });
	};

	return (
		<Fill name="ProductionPluginPostStatusInfo">
			<TextControl
				label={__('Targetgroup', 'theater-production-blocks')}
				value={metaFieldValue}
				onChange={updateMetaValue}
			/>
		</Fill>
	);
}
