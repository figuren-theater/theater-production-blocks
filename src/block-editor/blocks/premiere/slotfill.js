/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { getSettings } from '@wordpress/date';

import DateSelect from '../../../utils/date-select';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { RichText } from '@wordpress/block-editor';

const PREMIERE_META = window.Theater.ProductionBlocks.premiere.PostMetaKey;

// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import { useEntityProp } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';

import { Fill } from '@wordpress/components';

export default function PremiereFill() {
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
	const metaFieldValue = meta[PREMIERE_META];
	const updateMetaValue = (newValue) => {
		setMeta({ ...meta, [PREMIERE_META]: newValue });
	};

	return (
		<Fill name="ProductionPluginPostStatusInfo">
			<RichText
				tagName="p"
				className="css-1imalal"
				value={__('Premiere Date', 'theater-production-blocks')}
			/>
			<DateSelect
				label={__('Premiere Date', 'theater-production-blocks')}
				className="event__date-select"
				dateFormat={getSettings().formats.date}
				value={metaFieldValue}
				onChange={updateMetaValue}
				placeholder={__('Choose a Date', 'theater-production-blocks')}
			/>
		</Fill>
	);
}
