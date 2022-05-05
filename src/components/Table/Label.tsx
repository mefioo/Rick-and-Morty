import React from 'react';
import classes from './Label.module.css'
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Label = ({name}: {name: string}) => {
	return (
		<div className={classes.label}>
			<p>{name}</p>
			<div className={classes.arrows}>
				<FontAwesomeIcon className={classes.icon} icon={faSortUp} />
				<FontAwesomeIcon className={classes.icon} icon={faSortDown} />
			</div>
		</div>
	);
};

export default Label;
