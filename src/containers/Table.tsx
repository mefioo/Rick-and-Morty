import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCharacters } from '../actions/api-info-actions';
import TableHeader from '../components/Table/TableHeader';
import TableRow from '../components/Table/TableRow';
import { tableActions } from '../slices/table-slice';
import { StoreState } from '../store';
import { necessaryCharacterInfoType } from '../types/types';
import classes from './Table.module.css';

const filterCharacters = (
	characters: necessaryCharacterInfoType[],
	nameFilter: string,
	status: string,
	species: { id: number; name: string }[],
	origins: { id: number; name: string }[]
) => {
	const nameFiltered = characters.filter((item) =>
		item.name.toLowerCase().includes(nameFilter.toLowerCase().trim())
	);
	const statusFiltered =
		status === 'All'
			? nameFiltered
			: nameFiltered.filter((item) => item.status === status);

	const speciesFiltered =
		species.length === 10
			? statusFiltered
			: statusFiltered.filter((character) =>
					species.map((item) => item.name).includes(character.species)
			  );

	const originsFiltered =
		origins.length === 126
			? speciesFiltered
			: speciesFiltered.filter((character) =>
					origins.map((item) => item.name).includes(character.origin.name)
			  );

	return originsFiltered;
};

const Table = React.memo(() => {
	const dispatch = useDispatch();

	const isLoading = useSelector((state: StoreState) => state.loading.isLoading);
	const apiInfo = useSelector((state: StoreState) => state.apiInfo);
	const allCharacters = apiInfo.characters;

	const table = useSelector((state: StoreState) => state.table);
	const currentPage = table.currentPage;
	const currentCharacters = table.rows
		.slice(currentPage * 5 - 5, currentPage * 5)
		.map(
			(item) => allCharacters.filter((character) => character.id === item.id)[0]
		);

	const filters = useSelector((state: StoreState) => state.filters);
	const nameFilter = filters.name;
	const statusFilter = filters.status;
	const speciesFilter = filters.species;
	const originsFilter = filters.origins;

	useEffect(() => {
		dispatch(getAllCharacters() as any);
	}, [dispatch]);

	useEffect(() => {
		const filteredCharacters = filterCharacters(
			allCharacters,
			nameFilter,
			statusFilter,
			speciesFilter,
			originsFilter
		);

		dispatch(
			tableActions.updateRows({
				rows: filteredCharacters.map((item) => ({
					id: item.id,
					isChecked: false,
					status: item.status,
				})),
			})
		);
	}, [
		dispatch,
		allCharacters,
		nameFilter,
		statusFilter,
		speciesFilter,
		originsFilter,
	]);

	return (
		<div className={classes.table}>
			<table>
				<TableHeader />
				<tbody>
					{!isLoading && (
						<React.Fragment>
							<TableRow {...currentCharacters[0]} />
							<TableRow {...currentCharacters[1]} />
							<TableRow {...currentCharacters[2]} />
							<TableRow {...currentCharacters[3]} />
							<TableRow {...currentCharacters[4]} />
						</React.Fragment>
					)}
				</tbody>
			</table>
		</div>
	);
});

export default Table;
