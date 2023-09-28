// export default ()=>{
	/**
	 * A helper function for getting post meta by key.
	 *
	 * @param {string} key - The meta key to read.
	 * @return {*} - Meta value.
	 */
	export const getPostMeta = ( meta, key ) => meta[ key ] || '';

	/**
	 * A helper function for updating post meta that accepts a meta key and meta
	 * value rather than entirely new meta object.
	 *
	 * Important! Don't forget to register_post_meta (see ../index.php).
	 *
	 * @param {string} key   - The meta key to update.
	 * @param {*}      value - The meta value to update.
	 */
	export const setPostMeta = ( meta, key, value, setMeta ) =>
		setMeta( {
			...meta,
			[ key ]: value,
		} );


//}