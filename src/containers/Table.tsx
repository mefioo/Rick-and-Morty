import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCharacters } from '../actions/characters-actions';
import TableHeader from '../components/Table/TableHeader';
import TableRow from '../components/Table/TableRow';
import { loadingActions } from '../slices/lodaing-slice';
import { StoreState } from '../store';
import classes from './Table.module.css';

const API_CHARACTERS = 'https://rickandmortyapi.com/api/character/';

const Table = React.memo(() => {
	const dispatch = useDispatch();

	const isLoading = useSelector((state: StoreState) => state.loading.isLoading);

	const characters = useSelector((state: StoreState) => state.characters);
	const charactersAmount = characters.results.length;
	const pageNo = characters.currentPage;
	const nextPage = characters.info.next;

	useEffect(() => {
		dispatch(loadingActions.setIsLoading({ isLoading: true }));
		dispatch(getCharacters(API_CHARACTERS, 1) as any);
		dispatch(loadingActions.setIsLoading({ isLoading: false }));
	}, [dispatch]);

	useEffect(() => {
		if (pageNo * 5 > charactersAmount && charactersAmount !== 0) {
			dispatch(loadingActions.setIsLoading({ isLoading: true }));
			dispatch(getCharacters(nextPage, pageNo) as any);
		} else {
			dispatch(loadingActions.setIsLoading({ isLoading: false }));
		}
	}, [pageNo, dispatch, charactersAmount, nextPage]);

	return (
		<div className={classes.table}>
			<table>
				<TableHeader />
				<tbody>
					{!isLoading && (
						<React.Fragment>
							<TableRow {...characters.results[(pageNo - 1) * 5]} />
							<TableRow {...characters.results[(pageNo - 1) * 5 + 1]} />
							<TableRow {...characters.results[(pageNo - 1) * 5 + 2]} />
							<TableRow {...characters.results[(pageNo - 1) * 5 + 3]} />
							<TableRow {...characters.results[(pageNo - 1) * 5 + 4]} />
						</React.Fragment>
					)}
				</tbody>
			</table>
		</div>
	);
});

export default Table;
