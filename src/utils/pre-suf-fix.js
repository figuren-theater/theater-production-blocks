/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress dependencies
 */

import { RichText } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
// Allowed formats for the prefix and suffix fields.
const ALLOWED_PRE_SUF_FIX_FORMATS = [
	'core/bold',
	'core/image',
	'core/italic',
	// 'core/link',
	// 'core/strikethrough',
	'core/text-color',
];

const defaultPrefixLabel = __('Prefix', 'theater-production-blocks');
const defaultPrefixPlaceholder =
	__('Prefix', 'theater-production-blocks') + ' ';

export const Prefix = ({
	prefix,
	setAttributes,
	isSelected,
	label = defaultPrefixLabel,
	placeholder = defaultPrefixPlaceholder,
	tagName = 'span',
}) => (
	<>
		{isSelected ? (
			<RichText
				allowedFormats={ALLOWED_PRE_SUF_FIX_FORMATS}
				className="wpt-production-blocks__prefix"
				multiline={false}
				aria-label={label}
				placeholder={placeholder}
				value={prefix}
				onChange={(value) => setAttributes({ prefix: value })}
				tagName={tagName}
			/>
		) : (
			<>
				{prefix ? (
					<RichText.Content tagName={tagName} value={prefix} />
				) : (
					<></>
				)}
			</>
		)}
	</>
);

const defaultSuffixLabel = __('Suffix', 'theater-production-blocks');
const defaultSuffixPlaceholder =
	__('Suffix', 'theater-production-blocks') + ' ';

export const Suffix = ({
	suffix,
	setAttributes,
	isSelected,
	label = defaultSuffixLabel,
	placeholder = defaultSuffixPlaceholder,
	tagName = 'span',
}) => (
	<>
		{isSelected ? (
			<RichText
				allowedFormats={ALLOWED_PRE_SUF_FIX_FORMATS}
				className="wpt-production-blocks__suffix"
				multiline={false}
				aria-label={label}
				placeholder={placeholder}
				value={suffix}
				onChange={(value) => setAttributes({ suffix: value })}
				tagName={tagName}
			/>
		) : (
			<>
				{suffix ? (
					<RichText.Content tagName={tagName} value={suffix} />
				) : (
					<></>
				)}
			</>
		)}
	</>
);
