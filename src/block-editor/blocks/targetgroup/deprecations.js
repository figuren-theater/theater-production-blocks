const v1 = {
	attributes: {
		textAlign: {
			type: 'string',
		},
	},
	supports: {
		align: true,
		color: {
			gradients: true,
			background: true,
			text: true,
			link: true,
		},
		spacing: {
			margin: true,
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalFontWeight: true,
			__experimentalFontStyle: true,
			__experimentalTextTransform: true,
			__experimentalLetterSpacing: true,
			__experimentalDefaultControls: {
				fontSize: true,
				fontAppearance: true,
				textTransform: true,
			},
		},
		multiple: true,
		html: false,
		reusable: false,
	},
};

// export default [v5, v4, v3, v2, v1];
export default [v1];
