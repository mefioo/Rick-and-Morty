import React from 'react';
import classes from './EditPanel.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';

const EditPanel = () => {
	const checkedNumber = useSelector(
		(state: StoreState) => state.tableRows.rows
	).filter((item) => item.isChecked === true).length;

	return (
		<div className={classes.edit}>
			{checkedNumber < 2 && (
				<button className={classes['button--blue']}>
					<FontAwesomeIcon className={classes.icon} icon={faPenToSquare} />
					<p>Change status</p>
				</button>
			)}
			<button className={classes['button--red']}>
				<FontAwesomeIcon icon={faTrashCan} />
				<p>Remove characters</p>
			</button>
		</div>
	);
};

export default EditPanel;
