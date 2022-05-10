import classes from './Label.module.css';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../store';
import { necessaryCharacterInfoType } from '../../types/types';
import { apiInfoActions } from '../../slices/api-info-slice';

const sortItems = (
	characters: necessaryCharacterInfoType[],
	name: string,
	sort: string
) => {
	const unsortedItems = [...characters];
	let sortedItems: necessaryCharacterInfoType[] = [];
	switch (name) {
		case 'Name':
			sortedItems =
				sort === 'asc'
					? unsortedItems.sort((a, b) => (a.name < b.name ? -1 : 1))
					: unsortedItems.sort((a, b) => (a.name < b.name ? 1 : -1));
			break;
		case 'Avatar':
			sortedItems =
				sort === 'asc'
					? unsortedItems.sort((a, b) => (a.image < b.image ? -1 : 1))
					: unsortedItems.sort((a, b) => (a.image < b.image ? 1 : -1));
			break;
		case 'Origin':
			sortedItems =
				sort === 'asc'
					? unsortedItems.sort((a, b) =>
							a.origin.name < b.origin.name ? -1 : 1
					  )
					: unsortedItems.sort((a, b) =>
							a.origin.name < b.origin.name ? 1 : -1
					  );
			break;
		case 'Episodes':
			sortedItems =
				sort === 'asc'
					? unsortedItems.sort((a, b) =>
							a.episode[0].name < b.episode[0].name ? -1 : 1
					  )
					: unsortedItems.sort((a, b) =>
							a.episode[0].name < b.episode[0].name ? 1 : -1
					  );
			break;
		case 'Status':
			sortedItems =
				sort === 'asc'
					? unsortedItems.sort((a, b) => (a.status < b.status ? -1 : 1))
					: unsortedItems.sort((a, b) => (a.status < b.status ? 1 : -1));
			break;
		default:
			break;
	}
	return sortedItems;
};

const Label = ({ name }: { name: string }) => {
	const [sort, setSort] = useState('');
	const dispatch = useDispatch();

	const apiInfo = useSelector((state: StoreState) => state.apiInfo);

	const characters = useMemo(() => {
		return apiInfo.characters;
	}, [apiInfo.characters]);

	const sortHandler = () => {
		sort === 'asc' ? setSort('desc') : setSort('asc');
	};

	useEffect(() => {
		const sortedItems = sortItems(characters, name, sort);

		dispatch(apiInfoActions.changeCharacters({ characters: sortedItems }));
	}, [dispatch, name, sort]);

	return (
		<div onClick={sortHandler} className={classes.label}>
			<p>{name}</p>
			<div className={classes.arrows}>
				<FontAwesomeIcon
					className={
						sort === 'asc'
							? `${classes.icon} ${classes.selected}`
							: classes.icon
					}
					icon={faSortUp}
				/>
				<FontAwesomeIcon
					className={
						sort === 'desc'
							? `${classes.icon} ${classes.selected}`
							: classes.icon
					}
					icon={faSortDown}
				/>
			</div>
		</div>
	);
};

export default Label;
