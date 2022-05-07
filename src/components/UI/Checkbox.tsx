import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableRowActions } from '../../slices/table-row-slice';
import { StoreState } from '../../store';
import classes from './Checkbox.module.css';

const Checkbox = ({ ids, disabled }: { ids: number[]; disabled: boolean }) => {
	const rows = useSelector((state: StoreState) => state.tableRows.rows);
	const dispatch = useDispatch();

	const checkCheckboxHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLInputElement;
		console.log(target.value);
		if (ids.length === 1) {
			const updatedRows = rows.map((item) =>
				item.id === ids[0] ? { id: item.id, isChecked: !item.isChecked } : item
			);
			dispatch(tableRowActions.updateRows({ rows: updatedRows }));
		}
	};

	return (
		<input
			onChange={checkCheckboxHandler}
			disabled={disabled}
			className={classes.checkbox}
			type='checkbox'
		></input>
	);
};

export default Checkbox;
