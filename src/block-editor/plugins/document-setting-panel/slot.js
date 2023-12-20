/**
 * Defines as extensibility slot for the Production panel.
 */

/**
 * WordPress dependencies
 */
import { createSlotFill, PanelRow } from '@wordpress/components';

export const { Fill, Slot } = createSlotFill('ProductionPluginPostStatusInfo');

export const ProductionPluginPostStatusInfo = ({ children, className }) => (
	<Fill>
		<PanelRow className={className}>{children}</PanelRow>
	</Fill>
);

ProductionPluginPostStatusInfo.Slot = Slot;
