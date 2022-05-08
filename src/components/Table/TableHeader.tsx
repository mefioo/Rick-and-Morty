import React from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../store';
import Label from './Label';
import classes from './TableHeader.module.css';
import TableHeaderCheckbox from './TableHeaderCheckbox';

const TableHeader = () => {
	const resultsLength = useSelector(
		(state: StoreState) => state.characters.results.length
	);
	const idInRows = useSelector((state: StoreState) => state.tableRows.rows).map(
		(item) => item.id
	);

	return (
		<thead className={classes.head}>
			<tr>
				<th>
					<TableHeaderCheckbox
						ids={idInRows}
						disabled={resultsLength === 0 ? true : false}
					/>
				</th>
				<th>
					<Label name='Name' />
				</th>
				<th>
					<Label name='Avatar' />
				</th>
				<th>
					<Label name='Origin' />
				</th>
				<th>
					<Label name='Episodes' />
				</th>
				<th>
					<Label name='Status' />
				</th>
			</tr>
		</thead>
	);
};

export default TableHeader;
