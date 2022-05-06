import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../actions/characters-actions';
import TableHeader from '../components/Table/TableHeader';
import TableRow from '../components/Table/TableRow';
import { StoreState } from '../store';
import classes from './Table.module.css';

const Table = React.memo(() => {
	const dispatch = useDispatch();

	const characters = useSelector((state: StoreState) => state.characters);
	console.log(characters.results[11]);

	useEffect(() => {
		dispatch(getCharacters() as any);
	}, [dispatch]);

	return (
		<div className={classes.table}>
			<table>
				<TableHeader />
				<tbody>
					<TableRow {...characters.results[0]} />
					<TableRow {...characters.results[11]} />
					<TableRow {...characters.results[7]} />
					<TableRow {...characters.results[5]} />
					<TableRow {...characters.results[6]} />
				</tbody>
			</table>
		</div>
	);
});

export default Table;
