import React from 'react';
import classes from './EditPanel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const EditPanel = () => {
	return (
		<div className={classes.edit}>
			<button className={classes['button--blue']}>
				<FontAwesomeIcon className={classes.icon} icon={faPenToSquare} />
				<p>Change status</p>
			</button>
			<button className={classes['button--red']}>
				<FontAwesomeIcon icon={faTrashCan} />
				<p>Remove characters</p>
			</button>
		</div>
	);
};

export default EditPanel;
