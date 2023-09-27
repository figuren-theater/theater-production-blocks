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
 */

namespace Figuren_Theater\Production_Blocks;

use function add_action;

const DIRECTORY = __DIR__;

add_action( 'init', __NAMESPACE__ . '\\register', 0 );
