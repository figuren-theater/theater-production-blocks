/**
 * STOLEN from
 * https://github.com/Automattic/block-experiments/blob/master/blocks/event/src/date-select.js
 */

/**
 * WordPress dependencies
 */
import { Button, DatePicker, Dropdown } from '@wordpress/components';
import { dateI18n } from '@wordpress/date';

const DateSelect = ({
	placeholder,
	value,
	dateFormat,
	onChange,
	className,
}) => (
	<Dropdown
		className={className}
		position="bottom left"
		renderToggle={({ onToggle, isOpen }) => (
			<Button
				variant="tertiary"
				onClick={onToggle}
				aria-expanded={isOpen}
				aria-live="polite"
			>
				{value ? dateI18n(dateFormat, value) : placeholder}
			</Button>
		)}
		renderContent={() => (
			<DatePicker currentDate={value} onChange={onChange} />
		)}
	/>
);

DateSelect.Content = ({ value, dateFormat, className }) =>
	value && (
		<time className={className} dateTime={dateI18n('c', value)}>
			{dateI18n(dateFormat, value)}
		</time>
	);

export default DateSelect;
