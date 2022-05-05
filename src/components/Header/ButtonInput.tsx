import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Input.module.css';

const ButtonInput = ({
	placeholder,
	icon,
}: {
	placeholder: string;
	icon: IconProp;
}) => {
	return (
		<div className={classes['input-group']}>
			<button value={placeholder}>{placeholder}</button>
			<FontAwesomeIcon className={classes.icon} icon={icon} />
		</div>
	);
};

export default ButtonInput;
