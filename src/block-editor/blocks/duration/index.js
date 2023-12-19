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
	title: _x('Duration', 'block title', 'theater-production-blocks'),
	description: _x(
		'Shows duration of current production.',
		'block description',
		'theater-production-blocks'
	),
	edit: Edit,
	save,
});



/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import {
	TextControl
} from '@wordpress/components';

const DURATION_META = window.Theater.ProductionBlocks.duration.PostMetaKey;

// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { Fill } from '@wordpress/components';
import { registerPlugin } from '@wordpress/plugins';

function DurationFill() {
	const post = useSelect(
		(select) => select('core/editor').getCurrentPost(),
		[]
	);
	const [meta, setMeta] = useEntityProp('postType', post.type, 'meta', post.id);
	const metaFieldValue = meta[DURATION_META];
	const updateMetaValue = (newValue) => {
		setMeta({ ...meta, [DURATION_META]: newValue });
	};

	return (
		<Fill name="ProductionPluginPostStatusInfo">
			<TextControl
				label={__('Duration', 'theater-production-blocks')}
				type="number"
				isShiftStepEnabled
				shiftStep="5"
				step="5"
				min={0}
				placeholder="80"
				value={metaFieldValue}
				onChange={updateMetaValue}
			/>
		</Fill>
	);
}
registerPlugin('duration-slot-fill', { render: DurationFill });