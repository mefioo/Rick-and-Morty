import React, { SyntheticEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { tableRowActions } from '../../slices/table-row-slice';
import { StoreState } from '../../store';
import classes from './DropdownInput.module.css';

const DropdownInput = ({
	characterStatus,
	id,
}: {
	characterStatus: string;
	id: number;
}) => {
	const dispatch = useDispatch();

	const tableRows = useSelector((state: StoreState) => state.tableRows.rows);

	const changeOptionHandler = (event: SyntheticEvent) => {
		const target = event.target as HTMLSelectElement;
		const updatedRows = tableRows.map((item) =>
			item.id === id ? { ...item, status: target.value } : item
		);
		dispatch(tableRowActions.updateRows({ rows: updatedRows }));
	};

	const options =
		characterStatus === 'Alive' ? (
			<React.Fragment>
				<option value='Alive'>Alive</option>
				<option value='Dead'>Dead</option>
			</React.Fragment>
		) : (
			<React.Fragment>
				<option value='unknown'>unknown</option>
				<option value='Alive'>Alive</option>
				<option value='Dead'>Dead</option>
			</React.Fragment>
		);

	return (
		<select onChange={changeOptionHandler} className={classes.select}>
			{options}
		</select>
	);
};

export default DropdownInput;
