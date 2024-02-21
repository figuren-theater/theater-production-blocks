/**
 * Returns a BlockInstance given its type and attributes.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { createBlock } from '@wordpress/blocks';

const PT_PRODUCTION = window.Theater.ProductionPosttype.Slug;

export const wpt_productions = {
    /**
     * Replace the deprecated shortcode '[wpt_productions]'
     * 
     * @see https://github.com/slimndap/wp-theatre/wiki/Shortcodes#production-listing
     * 
     * Tested & successfully transformed:
     * 
     * 1. [wpt_productions]
     * 2. [wpt_productions limit=1]
     * 3. [wpt_productions cat=2]
     * 4. [wpt_productions post__not_in=11,12]
     * 5. [wpt_productions order=desc]
     * 6. [wpt_productions limit=8 cat=2 post__not_in=11,12 order=desc]
     * 7. [wpt_productions fields="thumbnail,title,summary"]
     */
    type: 'shortcode',
    tag: 'wpt_productions',
    transform( props ) {

        /**
         * Available templates inside the enclosing Shortcode OR the 'fields' attribute
         * 
         * @example [wpt_productions] {{content}} [/wpt_productions]
         * @example [wpt_productions fields="content"]
         * 
         * @see https://github.com/slimndap/wp-theatre/wiki/Shortcodes#template-2
         * 
         * [x] {{categories}}
         * [ ] {{cities}}
         * [x] {{content}}
         * [ ] {{dates}}
         * [x] {{excerpt}}
         * [ ] {{prices}}
         * [x] {{tags}}
         * [x] {{thumbnail}}
         * [x] {{title}}
         * [ ] {{title|permalink}} "To turn a field into a link, you can add a permalink filter to the placeholder:"
         * [x] {{summary}}
         * [ ] {{composer}}        "To display a custom 'composer' field:"
         * 
         */
        
        let innerBlocks = [ 
            createBlock( 'core/post-title' )
        ];
        
        
        if ( props.named?.fields ) {
            const fieldList = props.named.fields.split(',');

            // Unset default post-title, to rely completely on 'fields'.
            innerBlocks = [];	
            
            fieldList.forEach(field => {
                switch (field) {
                    case 'categories':
                        innerBlocks.push( createBlock( 'core/post-terms' ), { 'term':'category' } )
                        break;
                    case 'content':
                        innerBlocks.push( createBlock( 'core/post-content' ) )
                        break;
                    case 'tags':
                        innerBlocks.push( createBlock( 'core/post-terms' ), { 'term':'post_tag' } )
                        break;
                    case 'thumbnail':
                        innerBlocks.push( createBlock( 'core/post-featured-image' ) )
                        break;
                    case 'title':
                        innerBlocks.push( createBlock( 'core/post-title' ) )
                        break;
                    case 'excerpt':
                    case 'summary':
                        innerBlocks.push( createBlock( 'core/post-excerpt' ) )
                        break;
                
                    default:
                        break;
                }
            });

        }

        /**
         * Available arguments to the shortcode
         * 
         * @example [wpt_productions limit=8 cat=23 post__not_in=11,12 order=desc]
         * 
         * @see https://github.com/slimndap/wp-theatre/wiki/Shortcodes#arguments-2
         * 
         * [x] limit        {number}       The maximum number of productions to show. No maximum when left empty.
         * [x] cat          {int}          A comma-seperated list of category IDs. Only show productions within certain categories. Use negative category IDs to exclude a category. Default <emtpy>
         * [x] post__not_in {int}          A comma-seperated list of post IDs. Don't show the productions with one of the IDs. Default <empty>
         * [x] order        {asc or desc}  Show productions in ascending or descending order. Default <asc>.
         */
        const perPage  = props.named?.limit || null;
        const taxQuery = ( props.named?.cat ) ? { 'taxonomy': parseInt( props.named?.cat ) } : null;
        const exclude  = ( props.named?.post__not_in ) ? props.named?.post__not_in.split(',') : [];
        const order    = props.named?.order || 'asc';

        return createBlock( 
            'core/query',
            {
                /**
                 * Try to best match the shortcode attributes to block attributes
                 * 
                 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/block-library/src/query/block.json
                 */
                'query': {
                    perPage,
                    'postType': PT_PRODUCTION,
                    order,
                    exclude,
                    'inherit':false,
                    taxQuery
                }
            },
            [
                createBlock( 
                    'core/post-template',
                    {},
                    innerBlocks
                ),
            ]
            
        );
    },
    // Prevent the shortcode to be converted
    // into this block when it doesn't
    // have the proper ID.
    // isMatch( { named: { id } } ) {
    // 	return id === 'my-id';
    // },
}