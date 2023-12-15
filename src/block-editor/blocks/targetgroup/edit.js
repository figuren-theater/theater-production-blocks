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
import { Flex, FlexItem } from '@wordpress/components';

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
const TARGETGROUP_META =
	window.Theater.ProductionBlocks.targetgroup.PostMetaKey;
import { Prefix, Suffix } from '../../../utils/pre-suf-fix.js';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}  root0
 * @param {Object}  root0.attributes
 * @param {string}  root0.attributes.textAlign
 * @param {string}  root0.attributes.prefix
 * @param {string}  root0.attributes.suffix
 * @param {symbol}  root0.setAttributes
 * @param {boolean} root0.isSelected
 * @param {Object}  root0.context
 * @param {string}  root0.context.postType
 * @param {number}  root0.context.postId
 *
 * @return {Function} Element to render.
 */
export default function Edit({
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
				<Flex justify="space-around">
					<FlexItem>
						<Prefix
							prefix={prefix}
							isSelected={isSelected}
							setAttributes={setAttributes}
						/>
					</FlexItem>
					<FlexItem>
						<RichText
							tagName="p"
							value={metaFieldValue}
							onChange={updateMetaValue}
							placeholder={__(
								'Targetgroup',
								'theater-production-blocks'
							)}
						/>
					</FlexItem>
					<FlexItem>
						<Suffix
							suffix={suffix}
							isSelected={isSelected}
							setAttributes={setAttributes}
						/>
					</FlexItem>
				</Flex>
			</div>
		</>
	);
}
