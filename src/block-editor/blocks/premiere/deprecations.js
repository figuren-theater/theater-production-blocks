/**
 * WordPress dependencies
 */
// import { useBlockProps, RichText } from '@wordpress/block-editor';
// import { __ } from '@wordpress/i18n';
// import { omit } from 'lodash';


/*
const v5 = {
	attributes: {
		message: {
			type: 'string',
			default: 'Default message',
		},
		content: {
			type: 'string',
		},
	},
	save({ attributes: { message, content } }) {
		return (
			<div {...useBlockProps.save()}>
				<RichText.Content tagName="h2" value={message} />
				<RichText.Content tagName="p" value={content} />
			</div>
		);
	},
};

const v4 = {
	attributes: {
		message: {
			type: 'string',
			default: 'Default message',
		},
		content: {
			type: 'string',
		},
	},
	migrate(attributes) {
		const { message } = attributes;
		return {
			...omit(attributes, ['message']),
			title: message,
		};
	},
	save({ attributes: { message, content } }) {
		<div {...useBlockProps.save()}>
			<RichText.Content tagName="h2" value={message} />
			<RichText.Content tagName="p" value={content} />
		</div>;
	},
};

const v3 = {
	save({ attributes: { message } }) {
		<RichText.Content
			{...useBlockProps.save()}
			tagName="h2"
			value={message}
		/>;
	},
};

const v2 = {
	attributes: {
		message: {
			type: 'string',
			default: 'Default message',
		},
	},
	save() {
		return (
			<h2 {...useBlockProps.save()}>
				{__(
					'Block Deprecations – hello from the saved content!',
					'block-deprecations'
				)}
			</h2>
		);
	},
};*/

const v1 = {
	"attributes": {
		"textAlign": {
			"type": "string"
		}
	},
	"supports": {
		"align": true,
		"color": {
			"gradients": true,
			"background": true,
			"text": true,
			"link": true
		},
		"spacing": {
			"margin": true,
			"padding": true
		},
		"typography": {
			"fontSize": true,
			"lineHeight": true,
			"__experimentalFontFamily": true,
			"__experimentalFontWeight": true,
			"__experimentalFontStyle": true,
			"__experimentalTextTransform": true,
			"__experimentalLetterSpacing": true,
			"__experimentalDefaultControls": {
				"fontSize": true,
				"fontAppearance": true,
				"textTransform": true
			}
		},
		"multiple": true,
		"html": false,
		"reusable": false
	},};

// export default [v5, v4, v3, v2, v1];
export default [v1];
