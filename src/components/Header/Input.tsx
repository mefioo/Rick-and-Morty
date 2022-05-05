import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Input.module.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const Input = ({
	placeholder,
	icon,
}: {
	placeholder: string;
	icon: IconProp;
}) => {
	return (
		<div className={classes['input-group']}>
			<input type='text' placeholder={placeholder} />
			<FontAwesomeIcon className={classes.icon} icon={icon} />
		</div>
	);
};

export default Input;
