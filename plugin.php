<?php
/**
 * Load the theater-production-blocks WordPress plugin
 *
 * @package           figuren-theater/theater-production-blocks
 * @author            figuren.theater
 * @copyright         2023 figuren.theater
 * @license           GPL-3.0+
 *
 * @wordpress-plugin
 * Plugin Name:       Theater Production Blocks
 * Plugin URI:        https://github.com/figuren-theater/theater-production-blocks
 * Description:       WordPress blocks for theater productions to be used with the Site- and Block-Editor.
 * Version:           0.1.0-alpha
 * Requires at least: 6.0
 * Requires PHP:      7.1
 * Author:            figuren.theater
 * Author URI:        https://figuren.theater
 * Text Domain:       theater-production-blocks
 * Domain Path:       /languages
 * License:           GPL-3.0+
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 * Update URI:        https://github.com/figuren-theater/theater-production-blocks
 *
 * @todo PHP: Add autoloading as alternative to composer
 * @todo JS: Register block-collection
 * @todo JS: Automate build via deploy
 * @todo TXT: Add readme.md in WordPress readme.txt style
 * @todo TXT: Add CHANGELOG updates to readme.md (in WordPress readme.txt style)
 * @todo i18n: Automate i18n-json-file generation
 * @todo JS: wp.blockEditor.RichText value prop as children type is deprecated since version 6.1 and will be removed in version 6.3. Please use value prop as string instead. See: https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/introducing-attributes-and-editable-fields/ deprecated.min.js:2:628
 * @todo JS: wp.blocks.children.toHTML is deprecated since version 6.1 and will be removed in version 6.3. Please use wp.richText.toHTMLString instead. See: https://developer.wordpress.org/block-editor/how-to-guides/block-tutorial/introducing-attributes-and-editable-fields/
 * @todo JS: wp.date.__experimentalGetSettings is deprecated since version 6.1. Please use wp.date.getSettings instead.
 */

namespace Figuren_Theater\Production_Blocks;

use function add_action;

const DIRECTORY = __DIR__;

// TEMP needed
require_once DIRECTORY . '/inc/block-loading/namespace.php';
require_once DIRECTORY . '/inc/registration/namespace.php';
require_once DIRECTORY . '/inc/namespace.php';

add_action( 'init', __NAMESPACE__ . '\\register', 0 );
