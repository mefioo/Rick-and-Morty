import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCharacters } from '../actions/characters-actions';
import TableHeader from '../components/Table/TableHeader';
import TableRow from '../components/Table/TableRow';
import { loadingActions } from '../slices/lodaing-slice';
import { StoreState } from '../store';
import classes from './Table.module.css';

const buildApiLink = (data: {
	apiLink: string;
	name: string;
	status: string;
}) => {
	const apiName = data.name === '' ? '' : `name=${data.name}&`;
	const apiStatus = data.status === 'All' ? '' : `status=${data.status}&`;
	const qMark = apiName !== '' || apiStatus !== '' ? '?' : '';
	return data.apiLink + qMark + apiName + apiStatus;
};

const Table = React.memo(() => {
	const dispatch = useDispatch();

	const isLoading = useSelector((state: StoreState) => state.loading.isLoading);
	const characters = useSelector((state: StoreState) => state.characters);
	const link = useSelector((state: StoreState) => state.link);
	const apiLink = buildApiLink(link);

	const loadedCharactersNo = characters.results.length;

	const charactersAmount = characters.info.count;
	const pageNo = characters.currentPage;
	const nextPage = characters.info.next;

	useEffect(() => {
		if (
			pageNo * 5 > loadedCharactersNo &&
			loadedCharactersNo !== charactersAmount &&
			charactersAmount !== 0
		) {
			dispatch(loadingActions.setIsLoading({ isLoading: true }));
			dispatch(updateCharacters(nextPage, pageNo, 'ADD') as any);
		} else {
			dispatch(loadingActions.setIsLoading({ isLoading: false }));
		}
	}, [pageNo, dispatch, charactersAmount, nextPage]);

	useEffect(() => {
		dispatch(loadingActions.setIsLoading({ isLoading: true }));
		dispatch(updateCharacters(apiLink, 1, 'SET') as any);
		dispatch(loadingActions.setIsLoading({ isLoading: false }));
	}, [dispatch, apiLink]);

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
