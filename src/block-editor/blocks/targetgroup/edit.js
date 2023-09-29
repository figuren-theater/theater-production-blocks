/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */

import { __experimentalHStack as HStack } from '@wordpress/components';

// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import { useEntityProp } from '@wordpress/core-data';
/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	AlignmentControl,
	BlockControls,
	useBlockProps,
	RichText,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { TARGETGROUP_META } from '../../../utils/constants.js';
import { Prefix, Suffix } from '../../../utils/pre-suf-fix.js';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @param  root0
 * @param  root0.attributes
 * @param  root0.attributes.textAlign
 * @param  root0.attributes.prefix
 * @param  root0.attributes.suffix
 * @param  root0.setAttributes
 * @param  root0.isSelected
 * @param  root0.context
 * @param  root0.context.postType
 * @param  root0.context.postId
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function edit({
	attributes: { textAlign, prefix, suffix },
	setAttributes,
	isSelected,
	context: { postType, postId },
}) {
	const blockProps = useBlockProps({
		className: classnames({
			[`has-text-align-${textAlign}`]: textAlign,
		}),
	});

	const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId);

	const metaFieldValue = meta[TARGETGROUP_META];
	const updateMetaValue = (newValue) => {
		setMeta({ ...meta, [TARGETGROUP_META]: newValue });
	};

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<HStack justify={textAlign}>
					<Prefix
						prefix={prefix}
						isSelected={isSelected}
						setAttributes={setAttributes}
					/>
					<RichText
						tagName="p"
						value={metaFieldValue}
						onChange={updateMetaValue}
						placeholder={__(
							'Targetgroup',
							'theater-production-blocks'
						)}
					/>
					<Suffix
						suffix={suffix}
						isSelected={isSelected}
						setAttributes={setAttributes}
					/>
				</HStack>
			</div>
		</>
	);
}
