/**
 * Returns a BlockInstance given its type and attributes.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { createBlock } from '@wordpress/blocks';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

export const wpt_event_ticket_button = {
    /**
     * Replace the deprecated shortcode '[wpt_event_ticket_button]'
     * 
     * @see https://github.com/slimndap/wp-theatre/wiki/Shortcodes#event-ticket-link
     * 
     * Tested & successfully transformed:
     * 
     * 1. [wpt_event_ticket_button]
     * 2. [wpt_event_ticket_button id=123]
     */
    type: 'shortcode',
    tag: 'wpt_event_ticket_button',
    transform( props ) {
        return createBlock( 
            'core/buttons',
            {},
            [
                createBlock(
                    'core/button',
                    {
                        'text': __('Tickets','theater-production-blocks'),
                        'url': ( props.named?.id ) ? '/?p=' + props.named.id : '',
                    }
                )
            ]						
        );
    },
}