import React, { SyntheticEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from './Input.module.css';
import { useDispatch } from 'react-redux';
import { linkActions } from '../../slices/link-slice';

const DropdownInput = ({
	placeholder,
	icon,
	select,
}: {
	placeholder: string;
	icon: IconProp;
	select?: boolean;
}) => {
	const dispatch = useDispatch();

	const openMultiDropdownHandler = (event: SyntheticEvent) => {
		event.preventDefault();
	};

	const selectStatusHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLSelectElement;
		dispatch(linkActions.changeStatus({ status: target.value }));
	};

	return (
		<div className={classes['input-group']}>
			{!select && (
				<button onClick={openMultiDropdownHandler} value={placeholder}>
					{placeholder}
				</button>
			)}
			{select && (
				<select onChange={selectStatusHandler}>
					<option disabled selected>
						Status
					</option>
					<option value='All'>All</option>
					<option value='Alive'>Alive</option>
					<option value='Unknown'>unknown</option>
					<option value='Dead'>Dead</option>
				</select>
			)}
			<FontAwesomeIcon className={classes.icon} icon={icon} />
		</div>
	);
};

export default DropdownInput;
