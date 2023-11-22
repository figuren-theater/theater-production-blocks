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

// taken from https://developer.wordpress.org/block-editor/how-to-guides/metabox/
import {
	__experimentalNumberControl as NumberControl,
	TextControl,
	Flex,
	FlexItem,
	ToggleControl,
} from '@wordpress/components';

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
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';

import ServerSideRender from '@wordpress/server-side-render';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * Internal dependencies
 */
import { DURATION_META } from '../../../utils/constants.js';
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
 * @param {boolean} root0.attributes.humanReadable
 * @param {symbol}  root0.setAttributes
 * @param {boolean} root0.isSelected
 * @param {Object}  root0.context
 * @param {string}  root0.context.postType
 * @param {number}  root0.context.postId
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes: { textAlign, prefix, suffix, humanReadable },
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

	const metaFieldValue = meta[DURATION_META];
	const updateMetaValue = (newValue) => {
		setMeta({ ...meta, [DURATION_META]: newValue });
	};

	/**
	 * Prepare ServerSideRenderer
	 *
	 * makes use of WPs native PHP function human_readable_duration()
	 * sending the metaFiledValue as a query parameter
	 * bypasses the serverside DB lookup for the
	 * (properly) new and unsaved post_meta.
	 *
	 * @package
	 * @version 2022.05.22
	 * @author  Carsten Bach
	 *
	 * @return  {ServerSideRender}     Rendered output of our block
	 */
	const DurationServerSideRender = () => (
		<ServerSideRender
			block="wpt/production-duration"
			attributes={{
				textAlign,
				prefix,
				suffix,
				humanReadable,
			}}
			urlQueryArgs={{
				metaFieldValue,
			}}
		/>
	);

	return (
		<>
			<InspectorControls>
				<div className="block-editor-block-card">
					<ToggleControl
						label={__(
							'Show human readable duration.',
							'theater-production-blocks'
						)}
						onChange={(newHumanReadable) =>
							setAttributes({ humanReadable: newHumanReadable })
						}
						checked={humanReadable}
						help={
							humanReadable
								? __(
										'Shows e.g. "2 hours 10 minutes".',
										'theater-production-blocks'
								  )
								: __(
										'Shows pure "130" minutes only.',
										'theater-production-blocks'
								  )
						}
					/>
				</div>
			</InspectorControls>

			<BlockControls group="block">
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>

			<div {...blockProps}>
				{humanReadable && !isSelected ? (
					<DurationServerSideRender />
				) : (
					<Flex
						justify="space-around"
					>
						<FlexItem>
							<Prefix
								prefix={prefix}
								isSelected={isSelected}
								setAttributes={setAttributes}
							/>
						</FlexItem>
						<FlexItem>
							<TextControl
								type="number"
								isShiftStepEnabled
								shiftStep="5"
								step="5"
								min={0}
								placeholder="80"
								value={metaFieldValue}
								onChange={updateMetaValue}
								fontSize="initial"
								width="max-content"
								style={{ all: "inherit" }}
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
				)}
			</div>
		</>
	);
}
